const http = require('http');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const HOST = '127.0.0.1';
const PORT = 5050;

function httpRequest({ method, path: reqPath, headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const req = http.request(
      {
        host: HOST,
        port: PORT,
        method,
        path: reqPath,
        headers,
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const duration = performance.now() - start;
          resolve({
            statusCode: res.statusCode,
            duration,
            body: Buffer.concat(chunks),
            headers: res.headers,
          });
        });
      }
    );
    req.on('error', reject);
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

function stats(durations) {
  durations.sort((a, b) => a - b);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const p50 = durations[Math.floor(durations.length * 0.5)];
  const p95 = durations[Math.floor(durations.length * 0.95)];
  const p99 = durations[Math.floor(durations.length * 0.99)];
  const min = durations[0];
  const max = durations[durations.length - 1];
  return { avg: avg.toFixed(2), min: min.toFixed(2), p50: p50.toFixed(2), p95: p95.toFixed(2), p99: p99.toFixed(2), max: max.toFixed(2) };
}

async function benchmarkEndpoint(name, reqOpts, count = 50) {
  const durations = [];
  for (let i = 0; i < count; i++) {
    const res = await httpRequest(reqOpts);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      durations.push(res.duration);
    }
  }
  return stats(durations);
}

async function benchmarkFileUpload(sizeMB) {
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const bufferSize = sizeMB * 1024 * 1024;
  const dummyData = Buffer.alloc(bufferSize, 'a');
  const filename = `bench_${sizeMB}MB_${Date.now()}.bin`;

  const header = `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${filename}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;

  const body = Buffer.concat([Buffer.from(header, 'utf-8'), dummyData, Buffer.from(footer, 'utf-8')]);

  const start = performance.now();
  const res = await httpRequest({
    method: 'POST',
    path: '/api/upload',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': body.length,
    },
    body,
  });
  const duration = performance.now() - start;
  const throughputMBs = (sizeMB / (duration / 1000)).toFixed(2);

  // Clean up uploaded file
  await httpRequest({ method: 'DELETE', path: `/api/files/${filename}` });

  return { duration: duration.toFixed(2), throughputMBs };
}

async function benchmarkFileDownload(sizeMB) {
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const bufferSize = sizeMB * 1024 * 1024;
  const dummyData = Buffer.alloc(bufferSize, 'b');
  const filename = `bench_dl_${sizeMB}MB_${Date.now()}.bin`;

  const header = `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${filename}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;
  const body = Buffer.concat([Buffer.from(header, 'utf-8'), dummyData, Buffer.from(footer, 'utf-8')]);

  // Upload first
  await httpRequest({
    method: 'POST',
    path: '/api/upload',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': body.length,
    },
    body,
  });

  // Now measure download
  const start = performance.now();
  const res = await httpRequest({
    method: 'GET',
    path: `/api/direct-download/${filename}`,
  });
  const duration = performance.now() - start;
  const throughputMBs = (sizeMB / (duration / 1000)).toFixed(2);

  // Clean up
  await httpRequest({ method: 'DELETE', path: `/api/files/${filename}` });

  return { duration: duration.toFixed(2), throughputMBs, receivedBytes: res.body.length };
}

async function benchmarkConcurrency(concurrency = 50, totalRequests = 200) {
  const start = performance.now();
  let completed = 0;
  const durations = [];

  const worker = async () => {
    while (completed < totalRequests) {
      completed++;
      const reqStart = performance.now();
      await httpRequest({ method: 'GET', path: '/api/info' });
      durations.push(performance.now() - reqStart);
    }
  };

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  const totalDuration = performance.now() - start;
  const rps = (totalRequests / (totalDuration / 1000)).toFixed(2);

  return { rps, ...stats(durations) };
}

async function run() {
  console.log('================================================================');
  console.log('⚡ QUICKSHARE PERFORMANCE BENCHMARK SUITE');
  console.log('================================================================\n');

  // Server Info
  const infoRes = await httpRequest({ method: 'GET', path: '/api/info' });
  const serverInfo = JSON.parse(infoRes.body.toString());
  console.log(`💻 Host OS:         ${serverInfo.os || process.platform} (${process.arch})`);
  console.log(`🌐 Server Port:     ${PORT}`);
  console.log(`📡 Local IP:        ${serverInfo.local_ip}\n`);

  // 1. API Latency Test
  console.log('--- 1. API Endpoints Latency (50 iterations each) ---');
  const infoStats = await benchmarkEndpoint('GET /api/info', { method: 'GET', path: '/api/info' });
  console.log(`GET  /api/info:       Avg: ${infoStats.avg}ms | p50: ${infoStats.p50}ms | p95: ${infoStats.p95}ms | p99: ${infoStats.p99}ms | Min: ${infoStats.min}ms`);

  const clipGetStats = await benchmarkEndpoint('GET /api/clipboard', { method: 'GET', path: '/api/clipboard' });
  console.log(`GET  /api/clipboard:  Avg: ${clipGetStats.avg}ms | p50: ${clipGetStats.p50}ms | p95: ${clipGetStats.p95}ms | p99: ${clipGetStats.p99}ms | Min: ${clipGetStats.min}ms`);

  const clipPostPayload = JSON.stringify({ text: 'Performance Benchmark Test: QuickShare' });
  const clipPostStats = await benchmarkEndpoint(
    'POST /api/clipboard',
    {
      method: 'POST',
      path: '/api/clipboard',
      headers: { 'Content-Type': 'application/json' },
      body: clipPostPayload,
    },
    30
  );
  console.log(`POST /api/clipboard:  Avg: ${clipPostStats.avg}ms | p50: ${clipPostStats.p50}ms | p95: ${clipPostStats.p95}ms | p99: ${clipPostStats.p99}ms | Min: ${clipPostStats.min}ms`);

  const filesStats = await benchmarkEndpoint('GET /api/files', { method: 'GET', path: '/api/files' });
  console.log(`GET  /api/files:      Avg: ${filesStats.avg}ms | p50: ${filesStats.p50}ms | p95: ${filesStats.p95}ms | p99: ${filesStats.p99}ms | Min: ${filesStats.min}ms\n`);

  // 2. File Upload & Download Throughput Test
  console.log('--- 2. File Transfer Throughput & Speeds ---');
  const sizes = [1, 10, 50];
  for (const size of sizes) {
    const up = await benchmarkFileUpload(size);
    const dl = await benchmarkFileDownload(size);
    console.log(`📁 Payload ${size.toString().padStart(2, ' ')} MB | Upload: ${up.duration.padStart(7, ' ')} ms (${up.throughputMBs.padStart(7, ' ')} MB/s) | Download: ${dl.duration.padStart(7, ' ')} ms (${dl.throughputMBs.padStart(7, ' ')} MB/s)`);
  }
  console.log('');

  // 3. High Concurrency & RPS
  console.log('--- 3. Concurrency & Throughput (Load Test) ---');
  const concResult = await benchmarkConcurrency(50, 250);
  console.log(`⚡ 50 Concurrent Clients | 250 Total Requests:`);
  console.log(`   RPS (Req/sec):    ${concResult.rps} req/sec`);
  console.log(`   Avg Latency:      ${concResult.avg} ms`);
  console.log(`   p50 Latency:      ${concResult.p50} ms`);
  console.log(`   p95 Latency:      ${concResult.p95} ms`);
  console.log(`   Max Latency:      ${concResult.max} ms\n`);

  // 4. Memory Footprint
  console.log('--- 4. Memory Footprint ---');
  const mem = process.memoryUsage();
  console.log(`   RSS:              ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Used:        ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Total:       ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB\n`);

  console.log('================================================================');
  console.log('✅ BENCHMARK COMPLETED SUCCESSFULLY');
  console.log('================================================================');
}

run().catch(console.error);
