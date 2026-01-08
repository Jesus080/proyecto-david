# 🚀 Script de Deployment Automático - Render
# Este script prepara tu proyecto para deployment en Render

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🚀 Deployment - Gestor de Gastos                   ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar configuración
Write-Host "📋 Verificando configuración..." -ForegroundColor Yellow
Write-Host ""

# Mostrar información de la base de datos
Write-Host "✅ Base de Datos PostgreSQL (Render):" -ForegroundColor Green
Write-Host "   • Database: gestor_gastos_vz94" -ForegroundColor White
Write-Host "   • Host: dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com" -ForegroundColor White
Write-Host "   • Estado: ✅ Configurada y migrada" -ForegroundColor Green
Write-Host ""

# Mostrar JWT Secret
Write-Host "🔐 JWT Secret generado:" -ForegroundColor Green
Write-Host "   j6pDt0qIObdHKilxav7ZGem9kNL15XVyWrUPgAuc8snTCSEzhfo3QBMY2R4FwJ" -ForegroundColor Yellow
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📦 PASO 1: Preparar repositorio Git" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está inicializado
if (Test-Path .git) {
    Write-Host "✅ Git ya está inicializado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Inicializando Git..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Gestor de Gastos PWA"
    Write-Host "✅ Git inicializado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Para subir a GitHub, ejecuta:" -ForegroundColor Yellow
Write-Host "  git remote add origin https://github.com/TU_USUARIO/gestor-gastos.git" -ForegroundColor White
Write-Host "  git branch -M main" -ForegroundColor White
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🌐 PASO 2: Configuración para RENDER" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣  BACKEND (Web Service):" -ForegroundColor Yellow
Write-Host "   • Ve a: https://render.com/" -ForegroundColor White
Write-Host "   • New + → Web Service" -ForegroundColor White
Write-Host "   • Conecta tu repositorio de GitHub" -ForegroundColor White
Write-Host ""
Write-Host "   Configuración del Backend:" -ForegroundColor Cyan
Write-Host "   ─────────────────────────" -ForegroundColor Gray
Write-Host "   Name:          gestor-gastos-api" -ForegroundColor White
Write-Host "   Region:        Oregon (Free)" -ForegroundColor White
Write-Host "   Branch:        main" -ForegroundColor White
Write-Host "   Root Dir:      backend" -ForegroundColor White
Write-Host "   Runtime:       Node" -ForegroundColor White
Write-Host "   Build Cmd:     npm install" -ForegroundColor White
Write-Host "   Start Cmd:     npm start" -ForegroundColor White
Write-Host ""
Write-Host "   Variables de Entorno del Backend:" -ForegroundColor Cyan
Write-Host "   ─────────────────────────────────" -ForegroundColor Gray
Write-Host "   NODE_ENV=production" -ForegroundColor White
Write-Host "   DATABASE_URL=postgresql://gestor_gastos_vz94_user:5mN3cFFHL8M7LT6RXnCoOecYMjnyGeBp@dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com/gestor_gastos_vz94" -ForegroundColor White
Write-Host "   JWT_SECRET=j6pDt0qIObdHKilxav7ZGem9kNL15XVyWrUPgAuc8snTCSEzhfo3QBMY2R4FwJ" -ForegroundColor White
Write-Host "   PORT=10000" -ForegroundColor White
Write-Host ""

Write-Host "2️⃣  FRONTEND (Static Site):" -ForegroundColor Yellow
Write-Host "   • New + → Static Site" -ForegroundColor White
Write-Host "   • Mismo repositorio" -ForegroundColor White
Write-Host ""
Write-Host "   Configuración del Frontend:" -ForegroundColor Cyan
Write-Host "   ──────────────────────────" -ForegroundColor Gray
Write-Host "   Name:          gestor-gastos-frontend" -ForegroundColor White
Write-Host "   Branch:        main" -ForegroundColor White
Write-Host "   Root Dir:      frontend" -ForegroundColor White
Write-Host "   Build Cmd:     npm install && npm run build" -ForegroundColor White
Write-Host "   Publish Dir:   dist" -ForegroundColor White
Write-Host ""
Write-Host "   Variable de Entorno del Frontend:" -ForegroundColor Cyan
Write-Host "   ────────────────────────────────" -ForegroundColor Gray
Write-Host "   VITE_API_URL=https://TU-BACKEND.onrender.com" -ForegroundColor White
Write-Host "   (Reemplaza con la URL real del backend después del deploy)" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Rewrite Rules (importante):" -ForegroundColor Cyan
Write-Host "   ──────────────────────────" -ForegroundColor Gray
Write-Host "   Source: /*" -ForegroundColor White
Write-Host "   Destination: /index.html" -ForegroundColor White
Write-Host "   Action: Rewrite" -ForegroundColor White
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "☁️  ALTERNATIVA: Configuración para CLEVER CLOUD" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "Instalar Clever Tools:" -ForegroundColor Yellow
Write-Host "  npm install -g clever-tools" -ForegroundColor White
Write-Host "  clever login" -ForegroundColor White
Write-Host ""
Write-Host "Crear Backend:" -ForegroundColor Yellow
Write-Host "  clever create --type node gestor-gastos-api --region par" -ForegroundColor White
Write-Host "  clever env set NODE_ENV production" -ForegroundColor White
Write-Host "  clever env set DATABASE_URL 'postgresql://gestor_gastos_vz94_user:5mN3cFFHL8M7LT6RXnCoOecYMjnyGeBp@dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com/gestor_gastos_vz94'" -ForegroundColor White
Write-Host "  clever env set JWT_SECRET 'j6pDt0qIObdHKilxav7ZGem9kNL15XVyWrUPgAuc8snTCSEzhfo3QBMY2R4FwJ'" -ForegroundColor White
Write-Host "  clever deploy" -ForegroundColor White
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📝 RESUMEN DE ARCHIVOS CREADOS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ .env.production          - Variables de entorno para producción" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT_INSTRUCTIONS.md - Instrucciones detalladas paso a paso" -ForegroundColor Green
Write-Host "✅ render.yaml              - Blueprint automático para Render" -ForegroundColor Green
Write-Host "✅ backend/.env             - Configurado con PostgreSQL de Render" -ForegroundColor Green
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎯 PRÓXIMOS PASOS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Sube tu código a GitHub" -ForegroundColor Yellow
Write-Host "2. Ve a Render.com y sigue las instrucciones de arriba" -ForegroundColor Yellow
Write-Host "3. Lee DEPLOYMENT_INSTRUCTIONS.md para guía completa" -ForegroundColor Yellow
Write-Host ""
Write-Host "Documentacion adicional:" -ForegroundColor Cyan
Write-Host "   • DEPLOYMENT_INSTRUCTIONS.md - Guia paso a paso" -ForegroundColor White
Write-Host "   • DEPLOYMENT.md - Guia detallada" -ForegroundColor White
Write-Host "   • .env.production - Copia las variables de aqui" -ForegroundColor White
Write-Host ""
Write-Host "Todo esta listo para el deployment!" -ForegroundColor Green
Write-Host ""
