# QuickShare Runbook for macOS

This runbook provides complete operational instructions for installing, configuring, running, and troubleshooting QuickShare on macOS.

---

## 1. System Requirements & Prerequisites

- **Operating System**: macOS Monterey (12.0) or higher (Apple Silicon M1/M2/M3/M4 or Intel).
- **Node.js**: Version 18.0.0 or higher.
- **Homebrew** (recommended for package management): [brew.sh](https://brew.sh)
- **Wi-Fi Network**: Host Mac and mobile devices (iPhone, Samsung, iPad) must be connected to the **same Wi-Fi network**.

### Install Prerequisites via Homebrew:
```bash
# Install Node.js
brew install node

# (Optional) Install Cloudflare Tunnel for public Internet sharing
brew install cloudflared
```

---

## 2. Installation & Quick Setup

```bash
# 1. Clone repository
git clone git@github.com:ngocbaomobile/quickshare.git ~/QuickShare
cd ~/QuickShare

# 2. Install Node.js dependencies
npm install

# 3. Create downloads directory
mkdir -p ~/Downloads/QuickShare
```

---

## 3. Starting QuickShare

### Option A: Foreground Mode (Interactive Terminal)
Best for testing and monitoring real-time logs:
```bash
npm start
```
- A terminal QR code will appear.
- Open `http://localhost:5050` on your Mac.
- Scan the terminal QR code with your iPhone or Samsung camera.

---

### Option B: Background Daemon Mode
Runs QuickShare silently in the background, freeing your terminal window:
```bash
# Start background daemon
npm run daemon

# Check if running
lsof -i :5050

# Stop QuickShare daemon
npm run stop
# or
kill -9 $(lsof -t -i :5050)
```

---

### Option C: Global CLI Commands (Recommended for everyday use)

You can register convenient shortcuts in your shell:

```bash
# Add to ~/.zshrc (or ~/.bashrc)
cat << 'EOF' >> ~/.zshrc

# QuickShare CLI Aliases
alias quickshare="node $HOME/QuickShare/server.js"
alias quickshare-on="node $HOME/QuickShare/daemon.js"
alias quickshare-off="kill -9 \$(lsof -t -i :5050) 2>/dev/null && echo '🛑 QuickShare stopped'"
alias quickshare-public="curl -s -X POST http://localhost:5050/api/tunnel/start | jq ."
EOF

# Reload shell configuration
source ~/.zshrc
```

Now you can control QuickShare from anywhere in your terminal:
- `quickshare-on` — Start server in background
- `quickshare-off` — Stop server
- `quickshare-public` — Enable Cloudflare public tunnel for outside access

---

## 4. Automatic Startup on Boot (macOS `launchd`)

To have QuickShare automatically start whenever your Mac powers on or you log in:

1. Create a `launchd` plist file:
```bash
mkdir -p ~/Library/LaunchAgents
cat << EOF > ~/Library/LaunchAgents/com.user.quickshare.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.user.quickshare</string>
    <key>ProgramArguments</key>
    <array>
        <string>$(which node)</string>
        <string>$HOME/QuickShare/server.js</string>
    </array>
    <key>WorkingDirectory</key>
    <string>$HOME/QuickShare</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/quickshare.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/quickshare.error.log</string>
</dict>
</plist>
EOF
```

2. Load and enable the service:
```bash
launchctl load ~/Library/LaunchAgents/com.user.quickshare.plist
```

3. To stop or remove the auto-start service:
```bash
launchctl unload ~/Library/LaunchAgents/com.user.quickshare.plist
rm ~/Library/LaunchAgents/com.user.quickshare.plist
```

---

## 5. Sharing Over Mobile Data / Outside Networks (Cloudflare Tunnel)

When a friend or colleague is not on the same Wi-Fi network:

1. Click **"🌐 Public Internet Share (4G/5G)"** on your Mac dashboard (`http://localhost:5050`).
2. QuickShare spins up a temporary Cloudflare tunnel and displays a secured public link (e.g. `https://random-subdomain.trycloudflare.com`) and a **4-digit PIN**.
3. Share the link or QR code with the remote user.
4. **Security Enforcement**:
   - Guests outside the network must enter the 4-digit PIN to upload or download.
   - Deletion of files and opening host folders are strictly blocked for public guests.
5. Click **"🛑 Stop Sharing"** anytime to immediately tear down the public tunnel.

---

## 6. Troubleshooting & FAQs

### Q1: Mobile phone cannot open the link / connection timed out
- **Same Wi-Fi check**: Verify that your phone is not on cellular data (4G/5G) and is connected to the exact same Wi-Fi SSID as your Mac.
- **Router AP Isolation (Client Isolation)**: Some guest Wi-Fi networks or company routers block devices from communicating with each other. If AP isolation is enabled on the router, use the **Public Share (Cloudflare Tunnel)** mode instead.
- **macOS Firewall**: Check **System Settings > Network > Firewall**. If enabled, ensure incoming connections for `node` are allowed.

### Q2: Port 5050 is already in use
```bash
# Find and terminate the process holding port 5050
kill -9 $(lsof -t -i :5050)
```

### Q3: Clipboard sync is not working
- QuickShare uses macOS native `pbcopy` and `pbpaste`. Ensure Terminal has standard permissions.
- In your mobile browser, make sure to tap "Copy Text" to trigger clipboard write permission in iOS Safari or Samsung Internet.

### Q4: Uploaded images are not showing up in iPhone Photos
- In Safari, tap the green **"Album"** button on the received photo. iOS will open the native Share Sheet. Tap **"Save Image"** to store it directly in your Camera Roll.
