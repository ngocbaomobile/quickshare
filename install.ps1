# ==============================================================================
# ⚡ QuickShare 1-Click Installer for Windows
# Usage: iwr -useb https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/install.ps1 | iex
# ==============================================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  ⚡ QuickShare 1-Click Installer for Windows" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

$InstallDir = "$env:USERPROFILE\QuickShare"
$DownloadsDir = "$env:USERPROFILE\Downloads\QuickShare"
$DesktopPath = [System.Environment]::GetFolderPath("Desktop")

# 1. Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "🔍 Node.js not found. Installing Node.js LTS via winget..." -ForegroundColor Yellow
    try {
        winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
        # Refresh current process environment PATH
        $machinePath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
        $userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
        $env:Path = "$machinePath;$userPath"
    } catch {
        Write-Host "⚠️ Automatic Node.js installation failed. Please install Node.js from https://nodejs.org" -ForegroundColor Red
        return
    }
} else {
    Write-Host "✅ Node.js detected: $(node -v)" -ForegroundColor Green
}

# 2. Download / Clone QuickShare
if (Test-Path "$InstallDir\.git") {
    Write-Host "🔄 Updating existing QuickShare installation..." -ForegroundColor Cyan
    Set-Location $InstallDir
    if (Get-Command git -ErrorAction SilentlyContinue) {
        git pull --quiet
    }
} elseif (Test-Path $InstallDir) {
    Write-Host "📁 Using existing directory: $InstallDir" -ForegroundColor Cyan
    Set-Location $InstallDir
} else {
    Write-Host "📥 Downloading QuickShare..." -ForegroundColor Cyan
    if (Get-Command git -ErrorAction SilentlyContinue) {
        git clone --quiet https://github.com/ngocbaomobile/quickshare.git $InstallDir
        Set-Location $InstallDir
    } else {
        # Fallback: Download ZIP from GitHub without Git
        $zipFile = "$env:TEMP\quickshare.zip"
        $extractDir = "$env:TEMP\quickshare_extract"
        Invoke-WebRequest -Uri "https://github.com/ngocbaomobile/quickshare/archive/refs/heads/main.zip" -OutFile $zipFile
        Expand-Archive -Path $zipFile -DestinationPath $extractDir -Force
        Move-Item -Path "$extractDir\quickshare-main" -Destination $InstallDir -Force
        Remove-Item $zipFile -Force
        Remove-Item $extractDir -Recurse -Force
        Set-Location $InstallDir
    }
}

# 3. Install NPM dependencies
Write-Host "📦 Installing Node dependencies..." -ForegroundColor Cyan
npm install --silent --omit=dev

# 4. Create Downloads folder
if (-not (Test-Path $DownloadsDir)) {
    New-Item -ItemType Directory -Force -Path $DownloadsDir | Out-Null
}

# 5. Add Windows Firewall rule for Port 5050 (Best effort)
try {
    $existingRule = Get-NetFirewallRule -DisplayName "QuickShare Server" -ErrorAction SilentlyContinue
    if (-not $existingRule) {
        Write-Host "🛡️ Configuring Windows Defender Firewall for Port 5050..." -ForegroundColor Cyan
        New-NetFirewallRule -DisplayName "QuickShare Server" -Direction Inbound -LocalPort 5050 -Protocol TCP -Action Allow -ErrorAction SilentlyContinue | Out-Null
    }
} catch {
    # Ignore firewall error if not running as Administrator
}

# 6. Create Desktop 1-Click Shortcut
Write-Host "🖥️ Creating Desktop shortcut (QuickShare.lnk)..." -ForegroundColor Cyan
try {
    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut("$DesktopPath\QuickShare.lnk")
    $Shortcut.TargetPath = "$InstallDir\start.bat"
    $Shortcut.WorkingDirectory = $InstallDir
    $Shortcut.Description = "Launch QuickShare Server"
    $Shortcut.IconLocation = "$env:SystemRoot\System32\shell32.dll,13"
    $Shortcut.Save()
} catch {}

# 7. Start QuickShare & open browser
Write-Host "🚀 Launching QuickShare..." -ForegroundColor Green
Start-Process -FilePath "$InstallDir\start.bat" -WorkingDirectory $InstallDir
Start-Sleep -Seconds 2
Start-Process "http://localhost:5050"

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  🎉 INSTALLATION COMPLETE!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  💻 Web UI:           http://localhost:5050"
Write-Host "  📂 Downloads Folder: $DownloadsDir"
Write-Host "  🖥️ Desktop Shortcut: QuickShare on your Desktop"
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""
