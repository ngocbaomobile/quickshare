#!/usr/bin/env bash
# ==============================================================================
# ⚡ QuickShare 1-Click Installer for macOS
# Zero-config setup for seamless local & public file/clipboard sharing.
# Usage: curl -fsSL https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/install.sh | bash
# ==============================================================================

set -e

echo ""
echo "======================================================"
echo "  ⚡ QuickShare 1-Click Installer for macOS"
echo "======================================================"
echo ""

INSTALL_DIR="$HOME/QuickShare"
DESKTOP_DIR="$HOME/Desktop"
SHELL_RC="$HOME/.zshrc"
if [ -n "$BASH_VERSION" ] && [ ! -f "$SHELL_RC" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "🔍 Node.js not detected on your Mac."
    if ! command -v brew &> /dev/null; then
        echo "📦 Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        if [ -x "/opt/homebrew/bin/brew" ]; then
            eval "$(/opt/homebrew/bin/brew shellenv)"
        elif [ -x "/usr/local/bin/brew" ]; then
            eval "$(/usr/local/bin/brew shellenv)"
        fi
    fi
    echo "📦 Installing Node.js via Homebrew..."
    brew install node
else
    echo "✅ Node.js is already installed ($(node -v))."
fi

# 2. Clone or update repository
if [ -d "$INSTALL_DIR/.git" ]; then
    echo "🔄 Updating existing QuickShare installation..."
    cd "$INSTALL_DIR"
    git pull --quiet || true
else
    echo "📥 Downloading QuickShare to $INSTALL_DIR..."
    git clone --quiet https://github.com/ngocbaomobile/quickshare.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

# 3. Install NPM dependencies
echo "📦 Installing dependencies..."
npm install --silent --omit=dev

# 4. Create Downloads folder
mkdir -p "$HOME/Downloads/QuickShare"

# 5. Create Desktop 1-Click Launcher (QuickShare.command)
echo "🖥️ Creating Desktop shortcut (QuickShare.command)..."
cat << 'EOF' > "$DESKTOP_DIR/QuickShare.command"
#!/bin/bash
DIR="$HOME/QuickShare"
cd "$DIR" || exit 1
node daemon.js
sleep 1
open "http://localhost:5050"
EOF
chmod +x "$DESKTOP_DIR/QuickShare.command"

# 6. Add CLI aliases to shell config
if [ -f "$SHELL_RC" ]; then
    if ! grep -q "quickshare-on" "$SHELL_RC" 2>/dev/null; then
        echo "⚡ Registering Terminal aliases in $(basename "$SHELL_RC")..."
        cat << 'EOF' >> "$SHELL_RC"

# QuickShare CLI
alias quickshare="node $HOME/QuickShare/server.js"
alias quickshare-on="node $HOME/QuickShare/daemon.js"
alias quickshare-off="kill -9 \$(lsof -t -i :5050) 2>/dev/null && echo '🛑 QuickShare stopped'"
alias quickshare-public="curl -s -X POST http://localhost:5050/api/tunnel/start"
EOF
    fi
fi

# 7. Start QuickShare daemon immediately
echo "🚀 Starting QuickShare in background..."
node "$INSTALL_DIR/daemon.js"
sleep 1

# 8. Open Web UI in default browser
open "http://localhost:5050"

echo ""
echo "======================================================"
echo "  🎉 INSTALLATION COMPLETE!"
echo "======================================================"
echo "  💻 Web UI:           http://localhost:5050"
echo "  📂 Downloads Folder: ~/Downloads/QuickShare"
echo "  🖥️ Desktop App:      Double-click 'QuickShare.command' on Desktop"
echo "  ⌨️ Terminal Commands: quickshare-on | quickshare-off"
echo "======================================================"
echo ""
