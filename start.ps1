# NBCFDC Credit Scoring System - Quick Start
Write-Host "=== NBCFDC Credit Scoring System ===" -ForegroundColor Cyan
Write-Host ""

$Root = $PSScriptRoot

# Function to start backend
function Start-Backend {
    Write-Host "Starting Backend..." -ForegroundColor Yellow
    $BackendPath = Join-Path $Root "backend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BackendPath'; .\start-backend.ps1"
}

# Function to start frontend
function Start-Frontend {
    Write-Host "Starting Frontend..." -ForegroundColor Yellow
    $FrontendPath = Join-Path $Root "frontend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FrontendPath'; npm run dev"
}

# Start servers
Start-Backend
Start-Sleep -Seconds 2
Start-Frontend

Write-Host ""
Write-Host "Servers are launching in new windows." -ForegroundColor Green
Write-Host "Backend: http://localhost:8000"
Write-Host "Frontend: http://localhost:5173"
Write-Host ""
Write-Host "Press any key to exit this launcher..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
