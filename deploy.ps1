#!/usr/bin/env pwsh

# Script de deployment completo para Render y Clever Cloud
# Uso: .\deploy.ps1 [platform]
# Ejemplo: .\deploy.ps1 render

param(
    [Parameter(Position=0)]
    [ValidateSet('render', 'clever-cloud', 'all', 'check')]
    [string]$Platform = 'check'
)

Write-Host "🚀 Gestor de Gastos - Script de Deployment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

function Test-Prerequisites {
    Write-Host "📋 Verificando prerequisitos..." -ForegroundColor Yellow
    
    # Verificar Git
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Git no está instalado" -ForegroundColor Red
        return $false
    }
    Write-Host "✅ Git instalado" -ForegroundColor Green
    
    # Verificar Node.js
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
        return $false
    }
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion instalado" -ForegroundColor Green
    
    # Verificar npm
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Host "❌ npm no está instalado" -ForegroundColor Red
        return $false
    }
    Write-Host "✅ npm instalado" -ForegroundColor Green
    
    # Verificar que estamos en un repositorio Git
    if (-not (Test-Path .git)) {
        Write-Host "❌ No es un repositorio Git" -ForegroundColor Red
        Write-Host "   Ejecuta: git init" -ForegroundColor Yellow
        return $false
    }
    Write-Host "✅ Repositorio Git inicializado" -ForegroundColor Green
    
    # Verificar remote origin
    $remote = git remote get-url origin 2>$null
    if (-not $remote) {
        Write-Host "⚠️  No hay remote 'origin' configurado" -ForegroundColor Yellow
        Write-Host "   Configura GitHub primero" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Remote origin: $remote" -ForegroundColor Green
    }
    
    return $true
}

function Test-EnvironmentFiles {
    Write-Host ""
    Write-Host "📁 Verificando archivos de configuración..." -ForegroundColor Yellow
    
    $files = @(
        "render.yaml",
        ".gitignore",
        ".github/workflows/ci-cd.yml",
        "clevercloud/nodejs.json"
    )
    
    $allExist = $true
    foreach ($file in $files) {
        if (Test-Path $file) {
            Write-Host "✅ $file" -ForegroundColor Green
        } else {
            Write-Host "❌ $file no encontrado" -ForegroundColor Red
            $allExist = $false
        }
    }
    
    return $allExist
}

function Install-Dependencies {
    Write-Host ""
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    
    # Backend
    Write-Host "  → Backend..." -ForegroundColor Cyan
    Push-Location backend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Pop-Location
        return $false
    }
    Pop-Location
    Write-Host "✅ Backend dependencies instaladas" -ForegroundColor Green
    
    # Frontend
    Write-Host "  → Frontend..." -ForegroundColor Cyan
    Push-Location frontend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Pop-Location
        return $false
    }
    Pop-Location
    Write-Host "✅ Frontend dependencies instaladas" -ForegroundColor Green
    
    return $true
}

function Test-Build {
    Write-Host ""
    Write-Host "🏗️  Probando build del frontend..." -ForegroundColor Yellow
    
    Push-Location frontend
    $env:VITE_API_URL = "https://api.example.com"
    npm run build
    $buildSuccess = $LASTEXITCODE -eq 0
    Pop-Location
    
    if ($buildSuccess) {
        Write-Host "✅ Build exitoso" -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ Build falló" -ForegroundColor Red
        return $false
    }
}

function Push-ToGitHub {
    Write-Host ""
    Write-Host "📤 Preparando para GitHub..." -ForegroundColor Yellow
    
    # Verificar si hay cambios
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "✅ No hay cambios para commitear" -ForegroundColor Green
        return $true
    }
    
    Write-Host "📝 Cambios detectados:" -ForegroundColor Cyan
    git status --short
    
    Write-Host ""
    $commit = Read-Host "¿Commitear y pushear cambios? (s/n)"
    
    if ($commit -eq 's' -or $commit -eq 'S') {
        $message = Read-Host "Mensaje de commit"
        if (-not $message) {
            $message = "Deploy: actualizaciones $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        }
        
        git add .
        git commit -m $message
        
        $branch = git branch --show-current
        git push origin $branch
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Push exitoso" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Push falló" -ForegroundColor Red
            return $false
        }
    }
    
    return $true
}

function Show-DeploymentInfo {
    param([string]$Platform)
    
    Write-Host ""
    Write-Host "📋 Información de Deployment - $Platform" -ForegroundColor Cyan
    Write-Host "===========================================" -ForegroundColor Cyan
    
    if ($Platform -eq 'render' -or $Platform -eq 'all') {
        Write-Host ""
        Write-Host "🔷 RENDER" -ForegroundColor Blue
        Write-Host "1. Ve a https://render.com" -ForegroundColor White
        Write-Host "2. Crea una cuenta o inicia sesión" -ForegroundColor White
        Write-Host "3. Opciones:" -ForegroundColor White
        Write-Host "   A) Blueprint (Recomendado):" -ForegroundColor Yellow
        Write-Host "      - New → Blueprint" -ForegroundColor White
        Write-Host "      - Conecta tu repositorio GitHub" -ForegroundColor White
        Write-Host "      - Render detectará render.yaml automáticamente" -ForegroundColor White
        Write-Host "      - Configura DATABASE_URL en las variables de entorno" -ForegroundColor White
        Write-Host "   B) Manual:" -ForegroundColor Yellow
        Write-Host "      - New → Web Service (para backend)" -ForegroundColor White
        Write-Host "      - New → Static Site (para frontend)" -ForegroundColor White
        Write-Host ""
        Write-Host "Variables de entorno necesarias:" -ForegroundColor Yellow
        Write-Host "  DATABASE_URL=postgresql://user:pass@host:5432/db" -ForegroundColor White
        Write-Host "  JWT_SECRET=<se genera automáticamente>" -ForegroundColor White
        Write-Host "  NODE_ENV=production" -ForegroundColor White
    }
    
    if ($Platform -eq 'clever-cloud' -or $Platform -eq 'all') {
        Write-Host ""
        Write-Host "🟢 CLEVER CLOUD" -ForegroundColor Green
        Write-Host "1. Ve a https://www.clever-cloud.com" -ForegroundColor White
        Write-Host "2. Crea una cuenta o inicia sesión" -ForegroundColor White
        Write-Host "3. Para Backend:" -ForegroundColor White
        Write-Host "   - Create → an application → Node.js" -ForegroundColor White
        Write-Host "   - Conecta tu repositorio GitHub" -ForegroundColor White
        Write-Host "   - Branch: main" -ForegroundColor White
        Write-Host "4. Para Frontend:" -ForegroundColor White
        Write-Host "   - Create → an application → Static" -ForegroundColor White
        Write-Host "   - Build: cd frontend && npm install && npm run build" -ForegroundColor White
        Write-Host "   - Folder: frontend/dist" -ForegroundColor White
        Write-Host "5. Para Base de Datos:" -ForegroundColor White
        Write-Host "   - Create → an add-on → PostgreSQL" -ForegroundColor White
        Write-Host "   - Plan: DEV (gratis)" -ForegroundColor White
        Write-Host ""
        Write-Host "La configuración en clevercloud/ se usará automáticamente" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "📚 Documentación completa: DEPLOYMENT_COMPLETE.md" -ForegroundColor Cyan
}

# Ejecutar según el parámetro
switch ($Platform) {
    'check' {
        Write-Host "🔍 Modo: Verificación de prerequisitos" -ForegroundColor Magenta
        Write-Host ""
        
        $prereq = Test-Prerequisites
        $config = Test-EnvironmentFiles
        
        if ($prereq -and $config) {
            Write-Host ""
            Write-Host "✅ Sistema listo para deployment" -ForegroundColor Green
            Write-Host ""
            Write-Host "Siguiente paso:" -ForegroundColor Yellow
            Write-Host "  .\deploy.ps1 all      - Ver instrucciones completas" -ForegroundColor White
            Write-Host "  .\deploy.ps1 render   - Deployment a Render" -ForegroundColor White
            Write-Host "  .\deploy.ps1 clever-cloud - Deployment a Clever Cloud" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "❌ Hay problemas que resolver antes del deployment" -ForegroundColor Red
        }
    }
    
    'render' {
        Write-Host "🔷 Modo: Deployment a Render" -ForegroundColor Blue
        Write-Host ""
        
        if (-not (Test-Prerequisites)) { exit 1 }
        if (-not (Test-EnvironmentFiles)) { exit 1 }
        if (-not (Install-Dependencies)) { exit 1 }
        if (-not (Test-Build)) { exit 1 }
        if (-not (Push-ToGitHub)) { exit 1 }
        
        Show-DeploymentInfo 'render'
    }
    
    'clever-cloud' {
        Write-Host "🟢 Modo: Deployment a Clever Cloud" -ForegroundColor Green
        Write-Host ""
        
        if (-not (Test-Prerequisites)) { exit 1 }
        if (-not (Test-EnvironmentFiles)) { exit 1 }
        if (-not (Install-Dependencies)) { exit 1 }
        if (-not (Test-Build)) { exit 1 }
        if (-not (Push-ToGitHub)) { exit 1 }
        
        Show-DeploymentInfo 'clever-cloud'
    }
    
    'all' {
        Write-Host "🌐 Modo: Información completa de deployment" -ForegroundColor Magenta
        Write-Host ""
        
        if (-not (Test-Prerequisites)) { exit 1 }
        if (-not (Test-EnvironmentFiles)) { exit 1 }
        
        Show-DeploymentInfo 'all'
    }
}

Write-Host ""
Write-Host "🎉 Script completado!" -ForegroundColor Green
Write-Host ""
