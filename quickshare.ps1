# QuickShare PowerShell CLI for Windows
param (
    [Parameter(Position=0)]
    [string]$Action = "status"
)

$AppDir = $PSScriptRoot
$Port = 5050

function Get-QuickShareProcess {
    Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | 
        Select-Object -ExpandProperty OwningProcess -Unique | 
        ForEach-Object { Get-Process -Id $_ -ErrorAction SilentlyContinue }
}

switch ($Action.ToLower()) {
    "start" {
        $proc = Get-QuickShareProcess
        if ($proc) {
            Write-Host "⚡ QuickShare is already running (PID: $($proc.Id))" -ForegroundColor Green
        } else {
            Start-Process -FilePath "node.exe" -ArgumentList "server.js" -WorkingDirectory $AppDir -WindowStyle Hidden
            Start-Sleep -Seconds 1
            Write-Host "🚀 QuickShare started on http://localhost:$Port" -ForegroundColor Cyan
        }
    }
    "stop" {
        $proc = Get-QuickShareProcess
        if ($proc) {
            $proc | Stop-Process -Force
            Write-Host "🛑 QuickShare stopped successfully." -ForegroundColor Yellow
        } else {
            Write-Host "ℹ️ QuickShare is not running." -ForegroundColor Gray
        }
    }
    "status" {
        $proc = Get-QuickShareProcess
        if ($proc) {
            Write-Host "🟢 QuickShare is RUNNING (PID: $($proc.Id))" -ForegroundColor Green
            Write-Host "💻 Local: http://localhost:$Port" -ForegroundColor Cyan
        } else {
            Write-Host "🔴 QuickShare is STOPPED." -ForegroundColor Red
        }
    }
    default {
        Write-Host "Usage: .\quickshare.ps1 [start|stop|status]"
    }
}
