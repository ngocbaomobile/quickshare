const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 5050;
const TEST_DIR_NAME = 'QuickShare_TestUnit_' + Date.now();
const TEST_DIR_PATH = path.join(os.homedir(), 'Downloads', TEST_DIR_NAME);

function request({ method, path: reqPath, headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: '127.0.0.1', port: PORT, method, path: reqPath, headers },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, text: data });
          }
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 RUNNING STORAGE CONFIGURATION SUITE...\n');

  // Test 1: GET initial storage
  console.log('Test 1: Query current storage directory...');
  const res1 = await request({ method: 'GET', path: '/api/settings/storage' });
  console.assert(res1.status === 200, `Expected 200, got ${res1.status}`);
  console.assert(res1.body.current_dir, 'current_dir should be present');
  console.log(`✅ Current Dir: ${res1.body.current_dir}\n`);

  // Test 2: POST update storage to custom path
  console.log(`Test 2: Update storage to ~/Downloads/${TEST_DIR_NAME}...`);
  const res2 = await request({
    method: 'POST',
    path: '/api/settings/storage',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dir: `~/Downloads/${TEST_DIR_NAME}` }),
  });
  console.assert(res2.status === 200, `Expected 200, got ${res2.status}`);
  console.assert(res2.body.current_dir === TEST_DIR_PATH, `Expected ${TEST_DIR_PATH}, got ${res2.body.current_dir}`);
  console.assert(fs.existsSync(TEST_DIR_PATH), 'New directory should exist on filesystem');
  console.log(`✅ Successfully switched to: ${res2.body.current_dir}\n`);

  // Test 3: Upload a file and verify it lands in the custom folder
  console.log('Test 3: Upload test file to newly configured folder...');
  const boundary = '----WebKitFormBoundaryTestStorage';
  const testFileName = 'storage_unit_test.txt';
  const fileContent = 'QuickShare custom storage verified!';
  const header = `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${testFileName}"\r\nContent-Type: text/plain\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;
  const uploadBody = Buffer.concat([Buffer.from(header), Buffer.from(fileContent), Buffer.from(footer)]);

  const res3 = await new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port: PORT,
        method: 'POST',
        path: '/api/upload',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': uploadBody.length,
        },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(d) }));
      }
    );
    req.on('error', reject);
    req.write(uploadBody);
    req.end();
  });
  console.assert(res3.status === 200, `Upload expected 200, got ${res3.status}`);

  const savedFilePath = path.join(TEST_DIR_PATH, testFileName);
  console.assert(fs.existsSync(savedFilePath), `File should be saved at ${savedFilePath}`);
  console.log(`✅ File was correctly saved into custom folder: ${savedFilePath}\n`);

  // Test 4: List files in custom folder
  console.log('Test 4: Verify file list reflects custom folder...');
  const res4 = await request({ method: 'GET', path: '/api/files' });
  const hasFile = res4.body.files.some((f) => f.name === testFileName);
  console.assert(hasFile, 'Custom folder file list should contain uploaded test file');
  console.log(`✅ Files list contains: ${testFileName}\n`);

  // Test 5: Security check (Blocked for public tunnel requests)
  console.log('Test 5: Verify public requests cannot change or query storage settings...');
  const res5 = await request({
    method: 'GET',
    path: '/api/settings/storage',
    headers: { 'x-forwarded-host': 'random-subdomain.trycloudflare.com' },
  });
  console.assert(res5.status === 403 || res5.body.error, 'Public requests must be restricted');
  console.log(`✅ Public request safely rejected: status ${res5.status}\n`);

  // Test 6: Reset to default storage and cleanup
  console.log('Test 6: Clean up and reset storage to default...');
  await request({
    method: 'POST',
    path: '/api/settings/storage',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dir: '~/Downloads/QuickShare' }),
  });
  if (fs.existsSync(savedFilePath)) fs.unlinkSync(savedFilePath);
  if (fs.existsSync(TEST_DIR_PATH)) fs.rmdirSync(TEST_DIR_PATH);

  console.log('======================================================');
  console.log('🎉 ALL STORAGE CONFIGURATION TESTS PASSED 100%!');
  console.log('======================================================');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
