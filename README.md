# ⚡ QuickShare — Mac ↔ iPhone | Samsung (LAN & Public Transfer)

> Seamless, bi-directional text (clipboard) and file/photo transfer between **macOS**, **iOS (iPhone)**, and **Android (Samsung)** with zero mobile app installation. Works over local Wi-Fi and global Internet via Cloudflare Tunnel.

---

## ✨ Key Features

- 🚫 **Zero Mobile Install:** Works instantly via Camera & Browser (Safari, Chrome).
- ⚡ **Full Local Speed:** Fast Wi-Fi transfer, 100% local, zero internet data consumed.
- 🌐 **Public Share (4G/5G):** Encrypted Cloudflare link secured with a 4-digit PIN.
- 🎯 **Adaptive UI:** Clean, responsive interface tailored for Desktop or Mobile.
- 📸 **Instant QR Download:** Scan with Camera to download files immediately.
- 🔤 **Raw Text QR:** 1-tap copy directly on camera screen without opening a browser.
- 📋 **Instant Clipboard Sync:** Copy & paste text or screenshots via `Cmd+V` / `Ctrl+V`.
- 🖼️ **1-Tap Save to Photos:** Saves directly to iOS Photos & Samsung Gallery.
- 💻 **Cross-Platform:** Native support for both macOS and Windows with 1-click launchers.

---

## ⚡ 1-Step Quick Install (For Everyone)

### 🍏 macOS (Terminal)
Copy and paste this single command into Terminal:
```bash
curl -fsSL https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/install.sh | bash
```
*Auto-installs Node.js if missing, creates a `QuickShare.command` launcher on your Desktop, registers CLI aliases, and launches the app immediately in your browser.*

### 🪟 Windows (PowerShell)
Copy and paste this single command into PowerShell:
```powershell
iwr -useb https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/install.ps1 | iex
```
*(Or simply download and double-click [**`setup.bat`**](https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/setup.bat))*  
*Auto-installs Node.js LTS via winget, configures Windows Defender Firewall for port 5050, creates a Desktop shortcut, and launches QuickShare automatically.*

---

## 📖 Runbooks & Guides

Detailed step-by-step setup guides, autostart on boot, firewall configuration, and troubleshooting are available:
- 🍏 [**macOS Runbook (RUNBOOK_MACOS.md)**](file:///Users/admin/.gemini/antigravity-ide/scratch/local-quick-share/RUNBOOK_MACOS.md) — Homebrew, `launchd` autostart, macOS CLI, pbcopy/pbpaste.
- 🪟 [**Windows Runbook (RUNBOOK_WINDOWS.md)**](file:///Users/admin/.gemini/antigravity-ide/scratch/local-quick-share/RUNBOOK_WINDOWS.md) — `winget`, `start.bat`, `quickshare.ps1`, Windows Firewall rules, Windows Startup setup.

---

## 🚀 Manual Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **macOS** (for native `pbcopy`/`pbpaste` integration)
- **cloudflared** (optional, required only for public internet tunnels):
  ```bash
  brew install cloudflared
  ```

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/ngocbaomobile/quickshare.git
cd quickshare
npm install
```

### 3. Run the Server
```bash
# Start standard server
npm start

# Or run the background launcher
./start.sh
```

---

## 💻 Terminal CLI Setup (macOS)

Add the following aliases to your `~/.zshrc` (or `~/.bashrc`):

```bash
alias quickshare-on="quickshare on"
alias quickshare-off="quickshare off"
alias quickshare="quickshare status"
alias quickshare-public="quickshare-public"
```

Then reload your shell:
```bash
source ~/.zshrc
```

### CLI Usage:
| Command | Description |
| :--- | :--- |
| `quickshare-on` | Launches the server in background and displays local IP, web link, and Terminal QR code |
| `quickshare-off` | Gracefully stops the server and frees port `5050` |
| `quickshare-public` | Starts a secure Cloudflare Tunnel, generates a random 4-digit PIN, and prints the public link & QR |
| `quickshare public off` | Closes the public tunnel while keeping local LAN active |
| `quickshare` | Shows current operational status and connection URLs |

---

## 📂 File Storage
By default, all uploaded photos and files sent from mobile devices are saved directly to:
```
~/Downloads/QuickShare
```
The Mac web interface includes a **Finder** button to open this directory instantly in macOS Finder.

---

## 🛠️ Technology Stack
- **Backend:** Node.js, Express, Multer, `qrcode-terminal`, Cloudflare Tunnel (`cloudflared`)
- **Frontend:** Vanilla HTML5, Modern CSS (Glassmorphism & Dark Mode), Modern JavaScript (Clipboard API, Web Share API, HTML5 Drag & Drop)
- **Supported Platforms:** macOS, iOS (Safari), Android (Samsung Internet, Google Chrome)

---

## 📄 License
MIT License. Free to use, modify, and distribute.
