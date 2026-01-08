# 🚀 Instrucciones de Deployment - Gestor de Gastos

## ✅ Estado Actual
- ✅ Base de datos PostgreSQL creada en Render
- ✅ Migraciones ejecutadas correctamente
- ✅ Tablas creadas (users, categories, expenses)
- ✅ Configuración lista

## 📋 Datos de tu Base de Datos
**PostgreSQL en Render:**
- Host: `dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com`
- Database: `gestor_gastos_vz94`
- Usuario: `gestor_gastos_vz94_user`
- ✅ Ya está configurada y lista

---

## 🎯 Opción 1: Deployment en Render (Recomendado)

### Paso 1: Sube tu código a GitHub

```bash
# Inicializar Git (si no lo has hecho)
git init
git add .
git commit -m "Preparar para deployment en Render"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/TU_USUARIO/gestor-gastos.git
git branch -M main
git push -u origin main
```

### Paso 2: Crear Backend en Render

1. Ve a https://render.com/
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Name:** `gestor-gastos-api`
   - **Region:** Oregon (Free)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. **Variables de Entorno** (Muy importante):
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://gestor_gastos_vz94_user:5mN3cFFHL8M7LT6RXnCoOecYMjnyGeBp@dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com/gestor_gastos_vz94
   JWT_SECRET=tu_secreto_super_seguro_de_minimo_64_caracteres_aleatorios
   PORT=10000
   ```

6. Click **"Create Web Service"**
7. **¡IMPORTANTE!** Copia la URL del backend cuando termine el deployment
   - Será algo como: `https://gestor-gastos-api.onrender.com`

### Paso 3: Crear Frontend en Render

1. Click en **"New +"** → **"Static Site"**
2. Conecta el mismo repositorio
3. Configuración:
   - **Name:** `gestor-gastos-frontend`
   - **Branch:** `main`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. **Variable de Entorno:**
   ```
   VITE_API_URL=https://TU-BACKEND-URL.onrender.com
   ```
   (Reemplaza con la URL del backend del Paso 2)

5. **Rewrite Rules** (importante para React Router):
   - Source: `/*`
   - Destination: `/index.html`
   - Action: Rewrite

6. Click **"Create Static Site"**

### ✅ Listo - Render
Cuando termine el deployment:
- Backend: `https://gestor-gastos-api.onrender.com`
- Frontend: `https://gestor-gastos-frontend.onrender.com`

**Nota:** El backend se dormirá después de 15 minutos sin uso (plan gratuito).

---

## 🎯 Opción 2: Deployment en Clever Cloud

### Paso 1: Instalar Clever Tools

```bash
npm install -g clever-tools
clever login
```

### Paso 2: Crear aplicación Backend

```bash
# Desde la raíz del proyecto
clever create --type node gestor-gastos-api --region par

# Configurar variables de entorno
clever env set NODE_ENV production
clever env set DATABASE_URL "postgresql://gestor_gastos_vz94_user:5mN3cFFHL8M7LT6RXnCoOecYMjnyGeBp@dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com/gestor_gastos_vz94"
clever env set JWT_SECRET "tu_secreto_super_seguro_64_caracteres"
clever env set CC_NODE_VERSION "18"
clever env set CC_RUN_COMMAND "cd backend && npm start"

# Deployar
clever deploy
```

### Paso 3: Crear aplicación Frontend

```bash
# Crear otra aplicación para el frontend
clever create --type static gestor-gastos-frontend --region par

# Configurar
clever env set VITE_API_URL "https://gestor-gastos-api.cleverapps.io"
clever env set CC_WEBROOT "/frontend/dist"
clever env set CC_PRE_BUILD_HOOK "cd frontend && npm install && npm run build"

# Deployar
clever deploy
```

---

## 🔐 Generar JWT_SECRET Seguro

Ejecuta en PowerShell:

```powershell
# Generar secreto aleatorio de 64 caracteres
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

O en Linux/Mac:
```bash
openssl rand -base64 64
```

---

## 🧪 Verificar que todo funciona

### 1. Verificar Backend
```bash
# Reemplaza con tu URL de backend
curl https://tu-backend.onrender.com/
```

Debería responder con un mensaje del API.

### 2. Crear primer usuario
Ve a tu frontend y regístrate con un nuevo usuario.

### 3. Verificar base de datos
```bash
# Desde el directorio backend
node scripts/list-users.js
```

---

## 📱 PWA - Instalación en móvil

1. Abre el frontend en Chrome/Edge en tu móvil
2. Debería aparecer un banner "Agregar a pantalla de inicio"
3. La app funcionará offline después de la primera carga

---

## 🔄 Actualizaciones futuras

### Con Git conectado:
```bash
git add .
git commit -m "Descripción de cambios"
git push
```

Render y Clever Cloud se actualizarán automáticamente.

---

## ⚠️ Troubleshooting

### Backend no responde en Render
- El plan gratuito se duerme después de 15 min
- Primera petición tarda 30-60 segundos en despertar
- Esto es normal en el plan gratuito

### Error de CORS
Verifica que `VITE_API_URL` en el frontend tenga la URL correcta del backend (sin `/` al final).

### Error de conexión a base de datos
1. Verifica que `DATABASE_URL` esté correcta
2. Asegúrate de que incluya el host completo de Render
3. En producción debe tener `NODE_ENV=production` para SSL

### Frontend no carga
1. Verifica que las rewrite rules estén configuradas
2. Comprueba la consola del navegador para errores
3. Verifica que `VITE_API_URL` apunte al backend correcto

---

## 📊 Recursos Consumidos (Plan Gratuito)

### Render Free Tier:
- ✅ 1 PostgreSQL Database (256MB)
- ✅ 750 horas/mes de Web Service (backend)
- ✅ Frontend estático ilimitado
- ⚠️ Backend se duerme después de 15 min inactivo

### Clever Cloud Free Tier:
- ✅ PostgreSQL addon (256MB)
- ✅ 1 aplicación Node.js
- ✅ 1 aplicación estática
- ✅ Sin hibernación de BD

---

## 🎉 ¡Éxito!

Tu aplicación debería estar funcionando. Cualquier duda, revisa:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guía completa
- [README.md](README.md) - Documentación general
