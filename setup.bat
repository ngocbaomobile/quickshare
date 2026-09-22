@echo off
title QuickShare Setup
echo ======================================================
echo   QuickShare 1-Click Setup for Windows
echo ======================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/ngocbaomobile/quickshare/main/install.ps1 | iex"
echo.
pause
