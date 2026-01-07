# 🚀 Guía Rápida de Deployment

## Para empezar rápidamente

### 1. Verificar que todo está listo
```powershell
# Windows
.\deploy.ps1 check

# Linux/Mac
chmod +x deploy.sh
./deploy.sh check
```

### 2. Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/gestor-gastos-pwa.git
git push -u origin main
```

### 3. Deployment automático

#### Opción A: Render (Recomendado para principiantes)
```powershell
.\deploy.ps1 render
```
Luego sigue las instrucciones en pantalla.

#### Opción B: Clever Cloud
```powershell
.\deploy.ps1 clever-cloud
```
Luego sigue las instrucciones en pantalla.

---

## Documentación completa
- 📘 [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) - Guía detallada paso a paso
- 📄 [DEPLOYMENT.md](DEPLOYMENT.md) - Guía original

---

## Resumen rápido

### Render (Plan Gratuito)
✅ **Ventajas:**
- Configuración automática con Blueprint
- SSL gratis
- Frontend sin límites

⚠️ **Limitaciones:**
- Backend se duerme después de 15 min sin uso
- Tarda 30-60s en despertar

### Clever Cloud (Plan Gratuito)
✅ **Ventajas:**
- PostgreSQL gratis (256MB)
- Sin hibernación en la BD
- Soporte europeo

⚠️ **Limitaciones:**
- Límites de recursos en plan gratuito
- Configuración más manual

---

## Scripts disponibles

### Windows PowerShell
```powershell
.\deploy.ps1 check          # Verificar prerequisitos
.\deploy.ps1 render         # Preparar para Render
.\deploy.ps1 clever-cloud   # Preparar para Clever Cloud
.\deploy.ps1 all            # Ver toda la información
```

### Linux/Mac
```bash
./deploy.sh check           # Verificar prerequisitos
./deploy.sh render          # Preparar para Render
./deploy.sh clever-cloud    # Preparar para Clever Cloud
./deploy.sh all             # Ver toda la información
```

---

## Variables de entorno necesarias

### Backend
```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=minimo_64_caracteres_super_seguros
NODE_ENV=production
PORT=10000 (Render) o 8080 (Clever Cloud)
```

### Frontend
```
VITE_API_URL=https://tu-backend.onrender.com
```

---

## ¿Necesitas ayuda?
Lee [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) para:
- ✅ Checklist completo de deployment
- 🔧 Troubleshooting de problemas comunes
- 📊 Información sobre monitoreo
- 🔒 Mejores prácticas de seguridad
- 💰 Detalles sobre planes gratuitos
