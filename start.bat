@echo off
title QuickShare Server
cd /d "%~dp0"
echo Starting QuickShare on local network...
node server.js
pause
