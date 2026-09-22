# ⚡ QuickShare — Mac ↔ iPhone | Samsung (LAN & Public Transfer)

> Seamless, bi-directional text (clipboard) and file/photo transfer between **macOS**, **iOS (iPhone)**, and **Android (Samsung)** with zero mobile app installation. Works over local Wi-Fi and global Internet via Cloudflare Tunnel.

---

## ✨ Key Features

- 🚫 **Zero App Installation:** No app needed on iPhone or Samsung. Works directly with native Cameras and mobile browsers (Safari, Chrome, Samsung Internet).
- 🔒 **100% Local LAN Speed:** Direct peer-to-peer transfer inside your Wi-Fi network at maximum local speeds. Zero internet bandwidth consumed.
- 🌐 **Instant Public Sharing (Cloudflare Tunnel):** Share files with anyone on 4G/5G or outside networks via an encrypted, public HTTPS link protected by a **4-digit PIN**.
- 🛡️ **Role-Based Security for Public Visitors:** Remote guests are strictly limited to downloading shared files and viewing text. Destructive actions (file deletion, local Finder operations) are blocked.
- 🎯 **Device-Aware UI:** Automatically detects whether the client is a Mac or a smartphone, displaying a clean, tailored interface with zero redundant buttons.
- 📸 **Direct Download QR:** Mobile camera scans the QR code and triggers an immediate native download prompt with `Content-Disposition: attachment`.
- 🔤 **Raw Text QR (Zero-Network Copy):** Generates native raw text QR codes. iPhone and Samsung cameras detect the text and provide a 1-tap "Copy Text" button right on the camera screen without launching a browser.
- ⌨️ **Cmd + V Instant Paste on Mac:** Take a screenshot (`Cmd + Ctrl + Shift + 4`) and press `Cmd + V` anywhere on the web page to instantly upload and generate a Direct Download QR code in under 0.5s.
- 🖼️ **Save to Camera Roll / Gallery:** Includes a 1-tap "Save to Album" button on mobile leveraging the Web Share API to save directly to iOS Photos or Samsung Gallery.
- 💻 **Dedicated macOS CLI:** Quick control directly from Terminal via `quickshare-on`, `quickshare-off`, and `quickshare-public`.

---

## 📖 Runbooks & Guides

Detailed step-by-step setup guides, autostart on boot, firewall configuration, and troubleshooting are available:
- 🍏 [**macOS Runbook (RUNBOOK_MACOS.md)**](file:///Users/admin/.gemini/antigravity-ide/scratch/local-quick-share/RUNBOOK_MACOS.md) — Homebrew, `launchd` autostart, macOS CLI, pbcopy/pbpaste.
- 🪟 [**Windows Runbook (RUNBOOK_WINDOWS.md)**](file:///Users/admin/.gemini/antigravity-ide/scratch/local-quick-share/RUNBOOK_WINDOWS.md) — `winget`, `start.bat`, `quickshare.ps1`, Windows Firewall rules, Windows Startup setup.

---

## 🚀 Getting Started

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
