# Start Frontend Script
# This script sets up and runs the React frontend

Write-Host "Starting NBCFDC Frontend Setup..." -ForegroundColor Cyan

# Add Node.js to PATH for this session
$env:Path += ";C:\Program Files\nodejs"

# Verify Node.js
Write-Host "`nVerifying Node.js installation..." -ForegroundColor Yellow
node --version
npm --version

# Install dependencies
Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
npm install

# Start development server
Write-Host "`nStarting development server..." -ForegroundColor Green
Write-Host "Frontend will open at: http://localhost:3000" -ForegroundColor Cyan
npm run dev
