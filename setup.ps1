# Script de setup automático para Gestor de Gastos (Windows PowerShell)

Write-Host "🚀 Configurando Gestor de Gastos..." -ForegroundColor Blue

# 1. Instalar dependencias del backend
Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Cyan
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias del backend" -ForegroundColor Red
    exit 1
}

# 2. Crear .env del backend si no existe
if (-not (Test-Path .env)) {
    Write-Host "📝 Creando archivo .env del backend..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "✅ Archivo backend/.env creado. Por favor, edítalo con tus credenciales." -ForegroundColor Green
}
else {
    Write-Host "✅ Archivo backend/.env ya existe" -ForegroundColor Green
}

Set-Location ..

# 3. Instalar dependencias del frontend
Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Cyan
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias del frontend" -ForegroundColor Red
    exit 1
}

# 4. Crear .env del frontend si no existe
if (-not (Test-Path .env)) {
    Write-Host "📝 Creando archivo .env del frontend..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "✅ Archivo frontend/.env creado" -ForegroundColor Green
}
else {
    Write-Host "✅ Archivo frontend/.env ya existe" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "🎉 ¡Setup completado!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Edita backend/.env con tus credenciales de PostgreSQL"
Write-Host "2. Crea la base de datos en PostgreSQL:"
Write-Host "   psql -U postgres -c 'CREATE DATABASE gestor_gastos;'"
Write-Host "3. Ejecuta las migraciones:"
Write-Host "   cd backend"
Write-Host "   npm run migrate"
Write-Host "4. Inicia el backend:"
Write-Host "   cd backend"
Write-Host "   npm run dev"
Write-Host "5. En otra terminal, inicia el frontend:"
Write-Host "   cd frontend"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "Más información en QUICKSTART.md" -ForegroundColor Cyan
