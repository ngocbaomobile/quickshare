// QuickShare Background Daemon Launcher
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = '/tmp/quickshare.log';
const out = fs.openSync(logFile, 'a');
const err = fs.openSync(logFile, 'a');

// Spawn server.js in detached mode so it continues running independently
const child = spawn(process.execPath, [path.join(__dirname, 'server.js')], {
  detached: true,
  stdio: ['ignore', out, err],
  cwd: __dirname,
});

child.unref();
fs.writeFileSync('/tmp/quickshare.pid', child.pid.toString());
console.log('QuickShare daemon launched with PID:', child.pid);
