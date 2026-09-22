# QuickShare Runbook for Windows

This runbook provides complete operational instructions for installing, configuring, running, and troubleshooting QuickShare on Windows 10 and Windows 11.

---

## ⚡ 1-Step Automated Install (Recommended)

### Method 1: Single PowerShell Command
Open PowerShell and run:
```powershell
iwr -useb https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/install.ps1 | iex
```

### Method 2: Double-Click File (Zero-Typing for Non-Tech Users)
Download [**`setup.bat`**](https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/setup.bat) and simply double-click it.

**What happens automatically:**
1. Installs Node.js LTS via `winget` if not detected.
2. Downloads QuickShare to `%USERPROFILE%\QuickShare`.
3. Installs dependencies.
4. Adds an inbound allow rule for Port 5050 in Windows Defender Firewall.
5. Generates a double-clickable **`QuickShare`** shortcut on your Desktop.
6. Launches QuickShare and opens `http://localhost:5050` in your default browser.

---

## 1. Manual Prerequisites

- **Operating System**: Windows 10 (version 1903+) or Windows 11 (64-bit / ARM64).
- **Node.js**: Version 18.0.0 or higher.
- **PowerShell**: Version 5.1 (built-in) or PowerShell 7+.
- **Wi-Fi Network**: Host PC and mobile devices must be connected to the **same Wi-Fi network**.

### Install Prerequisites via Windows Package Manager (`winget`):

Open PowerShell as Administrator and run:
```powershell
# Install Node.js LTS
winget install OpenJS.NodeJS.LTS

# (Optional) Install Cloudflare Tunnel for public Internet sharing
winget install Cloudflare.cloudflared

# (Optional) Install Git
winget install Git.Git
```
*Note: Restart your terminal after installation so that environment variables (`PATH`) take effect.*

---

## 2. Installation & Quick Setup

```powershell
# 1. Clone repository (or download as ZIP from GitHub)
git clone https://github.com/ngocbaomobile/quickshare.git "$env:USERPROFILE\QuickShare"
cd "$env:USERPROFILE\QuickShare"

# 2. Install dependencies
npm install

# 3. Create downloads directory
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\Downloads\QuickShare"
```

---

## 3. Starting QuickShare

### Option A: One-Click Double Click (`start.bat`)
Simply navigate to your `QuickShare` folder in Windows File Explorer and **double-click `start.bat`**:
- A console window opens showing the local IP and QR code.
- Open `http://localhost:5050` on your PC browser.
- Scan the terminal QR code with your mobile device.

---

### Option B: PowerShell CLI (`quickshare.ps1`)
Use the built-in PowerShell script to run QuickShare silently in the background:

```powershell
# Check status
.\quickshare.ps1 status

# Start QuickShare in background (hidden window)
.\quickshare.ps1 start

# Stop QuickShare
.\quickshare.ps1 stop
```

> **PowerShell Execution Policy Tip**:
> If PowerShell shows an execution policy error, run once:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
> ```

---

### Option C: Foreground Interactive Mode
```powershell
npm start
```

---

## 4. Windows Firewall & Network Configuration

By default, Windows Firewall might block incoming connections from other devices on your Wi-Fi. Follow these two essential steps:

### Step 1: Set Network Profile to "Private"
1. Open **Settings > Network & internet > Wi-Fi**.
2. Click on your connected Wi-Fi network.
3. Under **Network profile type**, select **Private network** (allows local devices to communicate).

### Step 2: Allow Port 5050 through Windows Firewall
Open PowerShell as **Administrator** and run:
```powershell
New-NetFirewallRule -DisplayName "QuickShare Server" -Direction Inbound -LocalPort 5050 -Protocol TCP -Action Allow
```

---

## 5. Automatic Startup on Boot (Windows Startup Folder)

To make QuickShare start automatically whenever you log into Windows:

1. Press `Win + R`, type `shell:startup` and press Enter.
2. In the Startup folder that opens, create a new file named `quickshare-start.vbs` with the following content:
```vbs
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "node """ & WshShell.ExpandEnvironmentStrings("%USERPROFILE%") & "\QuickShare\server.js""", 0, False
```
3. Save the file. QuickShare will now launch completely silently in the background whenever Windows starts.

---

## 6. Sharing Over Mobile Data / Outside Networks (Cloudflare Tunnel)

1. Ensure `cloudflared` is installed (`winget install Cloudflare.cloudflared`).
2. Open `http://localhost:5050` on your PC.
3. Click the **"🌐 Public Internet Share (4G/5G)"** button.
4. QuickShare will generate a public URL (`https://*.trycloudflare.com`) and a 4-digit PIN.
5. Send the link and PIN to any remote user outside your home network.
6. The remote guest can download and upload files securely. Destructive operations (delete, folder access) are locked.

---

## 7. Troubleshooting & FAQs

### Q1: Mobile phone cannot open `http://<PC-IP>:5050`
1. **Firewall Block**: Run the firewall command in Section 4 above.
2. **Network Type**: Ensure your Wi-Fi profile is set to **Private**, not **Public**.
3. **Router AP Isolation**: If your home router has "Client Isolation" or "AP Isolation" enabled, local devices cannot talk to each other. Turn it off in router settings or use **Public Share** mode.

### Q2: Port 5050 is already occupied
```powershell
# Find process using port 5050
Get-NetTCPConnection -LocalPort 5050 | Select-Object OwningProcess

# Terminate the process (replace <PID>)
Stop-Process -Id <PID> -Force
```

### Q3: Clipboard syncing on Windows
- QuickShare uses native PowerShell commands (`Get-Clipboard` and `Set-Clipboard`) on Windows.
- When text is sent from your phone, Windows will show a system balloon notification, and the text is immediately in your Windows `Ctrl + V` clipboard.

### Q4: How to access uploaded files quickly
- Click the **"📂 Open Folder"** button on `http://localhost:5050` to immediately open `%USERPROFILE%\Downloads\QuickShare` in Windows File Explorer.
