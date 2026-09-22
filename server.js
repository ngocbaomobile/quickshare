const express = require('express');
const multer = require('multer');
const cors = require('cors');
const qrcode = require('qrcode-terminal');
const os = require('os');
const path = require('path');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5050;
const CLOUDFLARED_BIN = '/Users/admin/homebrew/bin/cloudflared';

// Setup directories
const DOWNLOADS_DIR = path.join(os.homedir(), 'Downloads', 'QuickShare');
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// In-memory text history
let textHistory = [];

// Cloudflare Tunnel State
let tunnelProcess = null;
let publicUrl = null;
let publicPin = null;

// Helper: Get active Wi-Fi IPv4 address
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  if (interfaces['en0']) {
    for (const iface of interfaces['en0']) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

// Helper: Read macOS clipboard
function getMacClipboard() {
  if (process.platform === 'darwin') {
    try {
      return execSync('pbpaste', { encoding: 'utf-8', timeout: 2000 });
    } catch (err) {
      return '';
    }
  }
  return '';
}

// Helper: Write to macOS clipboard
function setMacClipboard(text) {
  if (process.platform === 'darwin') {
    try {
      const proc = spawn('pbcopy');
      proc.stdin.write(text, 'utf-8');
      proc.stdin.end();
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
}

// Helper: macOS system notification
function notifyMac(title, message) {
  if (process.platform === 'darwin') {
    try {
      const safeTitle = (title || 'Quick Share').replace(/"/g, '\\"');
      const safeMsg = (message || '').replace(/"/g, '\\"');
      spawn('osascript', ['-e', `display notification "${safeMsg}" with title "${safeTitle}" sound name "Glass"`]);
    } catch (err) {}
  }
}

// Helper: Check if request is from Public Internet (via Cloudflare Tunnel)
function isPublicRequest(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  return host.includes('trycloudflare.com') || host.includes('cloudflare');
}

// Tunnel Controller Functions
function startCloudflareTunnel() {
  if (tunnelProcess && publicUrl) {
    return Promise.resolve({ public_url: publicUrl, pin: publicPin });
  }

  publicPin = Math.floor(1000 + Math.random() * 9000).toString();

  return new Promise((resolve, reject) => {
    try {
      tunnelProcess = spawn(CLOUDFLARED_BIN, ['tunnel', '--url', `http://localhost:${PORT}`]);
    } catch (err) {
      return reject(err);
    }

    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({ public_url: null, pin: publicPin, error: 'Hết thời gian khởi tạo tunnel' });
      }
    }, 15000);

    const onData = (data) => {
      const text = data.toString();
      const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
      if (match && !resolved) {
        resolved = true;
        clearTimeout(timeout);
        publicUrl = match[0];
        console.log('\n======================================================');
        console.log('🌐 PUBLIC CLOUDFLARE TUNNEL ĐÃ BẬT!');
        console.log('======================================================');
        console.log(`🔗 Link Public: \x1b[36m${publicUrl}?pin=${publicPin}\x1b[0m`);
        console.log(`🔑 Mã PIN:      \x1b[33m${publicPin}\x1b[0m\n`);
        notifyMac('Quick Share Public', `Link đã tạo: ${publicUrl} (PIN: ${publicPin})`);
        resolve({ public_url: publicUrl, pin: publicPin });
      }
    };

    tunnelProcess.stderr.on('data', onData);
    tunnelProcess.stdout.on('data', onData);

    tunnelProcess.on('close', () => {
      tunnelProcess = null;
      publicUrl = null;
      publicPin = null;
    });
  });
}

function stopCloudflareTunnel() {
  if (tunnelProcess) {
    tunnelProcess.kill('SIGTERM');
    tunnelProcess = null;
    publicUrl = null;
    publicPin = null;
    console.log('\n🛑 Public Cloudflare Tunnel đã TẮT.\n');
    notifyMac('Quick Share', 'Đã đóng Public Tunnel');
    return true;
  }
  return false;
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Public Access Security Guard
app.use((req, res, next) => {
  if (isPublicRequest(req)) {
    // Block dangerous admin endpoints for public users
    if (req.path.startsWith('/api/tunnel/') && req.path !== '/api/tunnel/verify-pin') {
      return res.status(403).json({ error: 'Không được phép thực hiện từ mạng công cộng' });
    }
    if (req.path === '/api/open-folder' || (req.method === 'DELETE' && req.path.startsWith('/api/files/'))) {
      return res.status(403).json({ error: 'Chức năng bị khóa trên liên kết công cộng' });
    }

    // Check PIN for data access APIs
    const pin = req.query.pin || req.headers['x-public-pin'];
    const isStaticAsset = req.path === '/' || req.path === '/index.html' || req.path.endsWith('.js') || req.path.endsWith('.css');
    
    if (!isStaticAsset && req.path.startsWith('/api/') && req.path !== '/api/info' && req.path !== '/api/tunnel/verify-pin') {
      if (!publicPin || pin !== publicPin) {
        return res.status(401).json({ error: 'Cần mã PIN để truy cập', require_pin: true });
      }
    }
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DOWNLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const ext = path.extname(originalName);
    const base = path.basename(originalName, ext);
    let targetName = originalName;
    let counter = 1;
    while (fs.existsSync(path.join(DOWNLOADS_DIR, targetName))) {
      targetName = `${base}_${counter}${ext}`;
      counter++;
    }
    cb(null, targetName);
  },
});
const upload = multer({ storage });

// API: Get Info & Status
app.get('/api/info', (req, res) => {
  const ip = getLocalIp();
  const isPublic = isPublicRequest(req);
  res.json({
    local_ip: ip,
    port: PORT,
    url: `http://${ip}:${PORT}`,
    downloads_dir: DOWNLOADS_DIR,
    platform: process.platform,
    is_public: isPublic,
    public_active: !!publicUrl,
    public_url: publicUrl,
    public_pin: isPublic ? null : publicPin, // don't expose pin to public caller
  });
});

// API: Verify PIN for Public Visitors
app.post('/api/tunnel/verify-pin', (req, res) => {
  const { pin } = req.body;
  if (publicPin && pin === publicPin) {
    res.json({ status: 'ok', valid: true });
  } else {
    res.status(401).json({ status: 'error', valid: false, error: 'Mã PIN không chính xác' });
  }
});

// API: Start Public Tunnel (Mac Only)
app.post('/api/tunnel/start', async (req, res) => {
  try {
    const result = await startCloudflareTunnel();
    if (result.public_url) {
      res.json({
        status: 'ok',
        public_url: result.public_url,
        pin: result.pin,
        share_link: `${result.public_url}?pin=${result.pin}`,
      });
    } else {
      res.status(500).json({ error: result.error || 'Không tạo được tunnel' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Stop Public Tunnel (Mac Only)
app.post('/api/tunnel/stop', (req, res) => {
  stopCloudflareTunnel();
  res.json({ status: 'ok' });
});

// API: Get Tunnel Status
app.get('/api/tunnel/status', (req, res) => {
  res.json({
    active: !!publicUrl,
    public_url: publicUrl,
    pin: publicPin,
    share_link: publicUrl ? `${publicUrl}?pin=${publicPin}` : null,
  });
});

// API: Read Mac Clipboard
app.get('/api/clipboard', (req, res) => {
  const text = getMacClipboard();
  res.json({ text });
});

// API: Set Mac Clipboard
app.post('/api/clipboard', (req, res) => {
  const text = req.body.text || '';
  if (!text) {
    return res.status(400).json({ error: 'Nội dung text trống' });
  }
  setMacClipboard(text);
  
  textHistory.unshift({
    id: Date.now().toString(),
    text,
    created_at: new Date().toLocaleTimeString('vi-VN'),
  });
  if (textHistory.length > 20) textHistory.pop();

  const preview = text.length > 40 ? text.slice(0, 40) + '...' : text;
  const source = isPublicRequest(req) ? 'Internet' : 'Mạng nội bộ';
  notifyMac('Quick Share', `[${source}] Nhận text: "${preview}"`);
  res.json({ status: 'ok', length: text.length });
});

// API: Get Text History
app.get('/api/history', (req, res) => {
  res.json({ history: textHistory });
});

// API: Upload Files / Images
app.post('/api/upload', upload.array('files'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Không có file nào được gửi' });
  }
  const fileNames = req.files.map((f) => f.filename);
  const source = isPublicRequest(req) ? 'Internet' : 'Wi-Fi';
  const msg = req.files.length === 1 ? `[${source}] Nhận: ${fileNames[0]}` : `[${source}] Nhận ${req.files.length} tệp tin`;
  notifyMac('Quick Share', msg);
  res.json({ status: 'ok', files: fileNames });
});

// API: Quick QR Single File Upload
app.post('/api/quick-qr-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Không có file nào được chọn' });
  }
  const ip = getLocalIp();
  const baseUrl = publicUrl || `http://${ip}:${PORT}`;
  const pinParam = publicPin ? `?pin=${publicPin}` : '';
  const directUrl = `${baseUrl}/api/direct-download/${encodeURIComponent(req.file.filename)}${pinParam}`;
  res.json({
    status: 'ok',
    filename: req.file.filename,
    size: req.file.size,
    direct_url: directUrl,
  });
});

// API: List Files in QuickShare folder
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(DOWNLOADS_DIR);
    const imageExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.bmp', '.heic']);
    const ip = getLocalIp();
    const baseUrl = publicUrl || `http://${ip}:${PORT}`;
    const pinParam = publicPin ? `?pin=${publicPin}` : '';

    const list = files
      .filter((f) => !f.startsWith('.'))
      .map((name) => {
        const fullPath = path.join(DOWNLOADS_DIR, name);
        const stat = fs.statSync(fullPath);
        return {
          name,
          size: stat.size,
          mtime: stat.mtimeMs,
          is_image: imageExts.has(path.extname(name).toLowerCase()),
          direct_url: `${baseUrl}/api/direct-download/${encodeURIComponent(name)}${pinParam}`,
        };
      })
      .sort((a, b) => b.mtime - a.mtime);
    res.json({ files: list });
  } catch (err) {
    res.status(500).json({ error: 'Không thể đọc thư mục downloads' });
  }
});

// API: Direct Download with attachment headers
app.get('/api/direct-download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(DOWNLOADS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File không tồn tại trên Mac');
  }

  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

// API: Standard Download
app.get('/api/download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(DOWNLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename);
  } else {
    res.status(404).send('File không tồn tại');
  }
});

// API: Delete a file (Local Only)
app.delete('/api/files/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(DOWNLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ status: 'ok' });
  } else {
    res.status(404).json({ error: 'File không tồn tại' });
  }
});

// API: Open Downloads folder in macOS Finder (Local Only)
app.post('/api/open-folder', (req, res) => {
  if (process.platform === 'darwin') {
    spawn('open', [DOWNLOADS_DIR]);
    res.json({ status: 'ok' });
  } else {
    res.status(400).json({ error: 'Chỉ hỗ trợ macOS' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIp();
  const url = `http://${ip}:${PORT}`;

  console.log('\n======================================================');
  console.log('🚀 QUICK SHARE ĐANG CHẠY TRONG MẠNG WI-FI NỘI BỘ');
  console.log('======================================================');
  console.log(`📡 URL nội bộ:    \x1b[36m${url}\x1b[0m`);
  console.log(`💻 Mở trên Mac:    \x1b[32mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`📂 Thư mục lưu:   \x1b[33m${DOWNLOADS_DIR}\x1b[0m\n`);
  console.log('📱 Quét mã QR dưới đây bằng Camera iPhone hoặc Samsung:');
  console.log('------------------------------------------------------');
  qrcode.generate(url, { small: true });
  console.log('------------------------------------------------------\n');
});
