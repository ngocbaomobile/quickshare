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

// Setup directories
const DOWNLOADS_DIR = path.join(os.homedir(), 'Downloads', 'QuickShare');
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// In-memory text history
let textHistory = [];

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

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
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

// API: Get Info & Local IP
app.get('/api/info', (req, res) => {
  const ip = getLocalIp();
  res.json({
    local_ip: ip,
    port: PORT,
    url: `http://${ip}:${PORT}`,
    downloads_dir: DOWNLOADS_DIR,
    platform: process.platform,
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
  notifyMac('Quick Share', `Đã nhận text: "${preview}"`);
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
  const msg = req.files.length === 1 ? `Đã nhận: ${fileNames[0]}` : `Đã nhận ${req.files.length} tệp tin`;
  notifyMac('Quick Share', msg);
  res.json({ status: 'ok', files: fileNames });
});

// API: Quick Share a single file from Mac and get its Direct Download QR Link
app.post('/api/quick-qr-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Không có file nào được chọn' });
  }
  const ip = getLocalIp();
  const directUrl = `http://${ip}:${PORT}/api/direct-download/${encodeURIComponent(req.file.filename)}`;
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
          direct_url: `http://${ip}:${PORT}/api/direct-download/${encodeURIComponent(name)}`,
        };
      })
      .sort((a, b) => b.mtime - a.mtime);
    res.json({ files: list });
  } catch (err) {
    res.status(500).json({ error: 'Không thể đọc thư mục downloads' });
  }
});

// API: Direct Download with attachment headers (Quét QR là tự động nảy download trên iPhone/Samsung)
app.get('/api/direct-download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(DOWNLOADS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File không tồn tại trên Mac');
  }

  // Set HTTP headers to force direct download prompt
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

// API: Delete a file
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

// API: Open Downloads folder in macOS Finder
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
  console.log(`📡 URL truy cập: \x1b[36m${url}\x1b[0m`);
  console.log(`💻 Mở trên Mac:   \x1b[32mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`📂 Thư mục lưu:  \x1b[33m${DOWNLOADS_DIR}\x1b[0m\n`);
  console.log('📱 Quét mã QR dưới đây bằng Camera iPhone hoặc Samsung:');
  console.log('------------------------------------------------------');
  qrcode.generate(url, { small: true });
  console.log('------------------------------------------------------\n');
});
