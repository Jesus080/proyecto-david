# 🚀 Guía de Deployment

## Tabla de Contenidos
- [GitHub Setup](#github-setup)
- [Deployment en Render](#deployment-en-render)
- [Deployment en Clever Cloud](#deployment-en-clever-cloud)
- [Base de Datos PostgreSQL](#base-de-datos-postgresql)
- [CI/CD con GitHub Actions](#cicd-con-github-actions)
- [Verificación Post-Deployment](#verificación-post-deployment)
- [Troubleshooting](#troubleshooting)

---

## GitHub Setup

## GitHub Setup

### 1. Inicializar repositorio Git
```bash
git init
git add .
git commit -m "Initial commit: Gestor de Gastos PWA"
```

### 2. Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `gestor-gastos-pwa`
3. Descripción: "Progressive Web App para gestión de gastos personales"
4. Público o Privado (según prefieras)
5. NO inicialices con README (ya tienes uno)

### 3. Conectar y subir
```bash
git remote add origin https://github.com/TU_USUARIO/gestor-gastos-pwa.git
git branch -M main
git push -u origin main
```

### 4. Configurar GitHub Actions (opcional)
Las GitHub Actions ya están configuradas en `.github/workflows/`:
- `ci-cd.yml`: Tests automáticos en cada push
- `deploy-render.yml`: Deploy automático a Render

---

## Deployment en Render

### Opción 1: Usando Blueprint (Automático)

1. **Crear cuenta en Render**: https://render.com
2. **Conectar repositorio de GitHub**:
   - Sube todo el proyecto a GitHub
   - En Render, ve a "Blueprints"
   - Conecta tu repositorio
   - Render detectará automáticamente el archivo `render.yaml`

3. **Configurar variables de entorno**:
   - JWT_SECRET se generará automáticamente
   - DATABASE_URL se configurará automáticamente desde Clever Cloud

4. **Deploy**: Haz clic en "Apply" y espera que se desplieguen los servicios

### Opción 2: Manual

#### Backend (Web Service)
1. En Render Dashboard, haz clic en "New +" → "Web Service"
2. Conecta tu repositorio
3. Configura:
   - **Name**: `gestor-gastos-api`
   - **Region**: Oregon (Free)
   - **Branch**: main
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. Variables de entorno:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://usuario:password@host:5432/database
   JWT_SECRET=tu_secreto_super_seguro_de_64_caracteres_minimo
   ```

#### Frontend (Static Site)
1. En Render Dashboard, haz clic en "New +" → "Static Site"
2. Conecta tu repositorio
3. Configura:
   - **Name**: `gestor-gastos-frontend`
   - **Branch**: main
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Variables de entorno:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```

5. Rewrite Rules (para React Router):
   - Source: `/*`
   - Destination: `/index.html`
   - Action: Rewrite

---

## Deployment en Clever Cloud

### 1. Crear cuenta
- Visita: https://www.clever-cloud.com/
- Regístrate gratis (usa GitHub para login rápido)

### 2. Deploy Backend (Node.js)

#### Opción A: Desde la Consola Web
1. Haz clic en "Create" → "an application"
2. Selecciona tu repositorio de GitHub
3. Tipo de aplicación: **Node.js**
4. Configuración:
   - Name: `gestor-gastos-api`
   - Branch: `main`
   - Build command: `cd backend && npm install`
   - Run command: `cd backend && npm start`
   
5. Variables de entorno:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://user:pass@host:5432/db
   JWT_SECRET=tu_secreto_super_seguro_64_caracteres
   PORT=8080
   ```

6. Vincular PostgreSQL addon (ver sección Base de Datos)

#### Opción B: Desde CLI
```bash
# Instalar Clever Tools
npm install -g clever-tools

# Login
clever login

# Crear aplicación
clever create --type node gestor-gastos-api

# Configurar variables
clever env set NODE_ENV production
clever env set JWT_SECRET "tu_secreto_super_seguro"

# Deploy
clever deploy
```

### 3. Deploy Frontend (Static)

1. Crear otra aplicación tipo **Static**
2. Configuración:
   - Name: `gestor-gastos-frontend`
   - Branch: `main`
   - Build command: `cd frontend && npm install && npm run build`
   - Static folder: `frontend/dist`

3. Variable de entorno:
   ```
   VITE_API_URL=https://gestor-gastos-api.cleverapps.io
   ```

### 4. Configuración desde archivos
Clever Cloud detectará automáticamente los archivos en `clevercloud/`:
- `nodejs.json`: Configuración del backend
- `frontend.json`: Configuración del frontend
- Hooks post-deploy para migraciones

---

## Base de Datos PostgreSQL

### Opción 1: Clever Cloud PostgreSQL (Recomendado)
### Opción 1: Clever Cloud PostgreSQL (Recomendado)

1. En el dashboard, haz clic en "Create" → "an add-on"
2. Selecciona "PostgreSQL"
3. Elige el plan **DEV** (gratis - 256MB)
4. Nombre: `gestor-gastos-db`
5. Región: Elige la más cercana

#### Obtener credenciales
1. Ve a tu addon PostgreSQL
2. En "Connection information", copia **POSTGRESQL_ADDON_URI**
   
   Ejemplo:
   ```
   postgresql://username:password@host.clever-cloud.com:5432/database
   ```

3. Configurar en Render o Clever Cloud como variable `DATABASE_URL`

### Opción 2: Render PostgreSQL (También gratis)

1. En Render, crea un nuevo PostgreSQL Database
2. Plan: **Free**
3. Nombre: `gestor-gastos-db`
4. Copia la "Internal Database URL"
5. Configura como variable `DATABASE_URL` en tu backend

### Ejecutar migraciones
Desde tu computadora local:

```bash
# Configurar variable de entorno temporal
$env:DATABASE_URL="postgresql://username:password@host.clever-cloud.com:5432/database"

# Ejecutar migraciones
cd backend
npm run migrate
```

O conéctate desde Render Shell:
1. Ve a tu servicio backend en Render
2. Haz clic en "Shell"
3. Ejecuta: `npm run migrate`

---

## Alternativa: Railway (Más simple)

### 1. Crear cuenta en Railway
- Visita: https://railway.app/
- Regístrate con GitHub

### 2. Crear nuevo proyecto
1. Haz clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Elige tu repositorio

### 3. Railway configurará automáticamente:
- Backend con PostgreSQL incluido
- Variables de entorno
- Dominios públicos

### 4. Configurar variables de entorno
```
NODE_ENV=production
JWT_SECRET=tu_secreto_seguro_64_caracteres
```

---

## Verificación Post-Deployment

### 1. Probar Backend
```bash
# Verificar que la API funciona
curl https://tu-backend.onrender.com/
# Debería responder: {"message": "Gestor de Gastos API funcionando ✅"}
```

### 2. Probar Frontend
- Abre tu URL del frontend
- Regístrate con un usuario nuevo
- Crea una categoría
- Crea un gasto
- Verifica que todo funciona

### 3. Probar PWA
**En móvil**:
1. Abre el sitio en Chrome/Safari
2. Toca el menú (3 puntos)
3. Selecciona "Agregar a pantalla de inicio"
4. Abre la app instalada
5. Verifica que funciona offline

**En PC**:
1. Abre el sitio en Chrome
2. Busca el icono de instalación (⊕) en la barra de direcciones
3. Haz clic en "Instalar"
4. Abre la app instalada

---

## Costos (Plan Gratuito)

### Render Free Tier
- ✅ Backend: 750 horas/mes (suficiente)
- ✅ Frontend: Ilimitado (static site)
- ⚠️ Se duerme después de 15 min de inactividad
- ⚠️ Tarda 30-60s en despertar

### Clever Cloud PostgreSQL Free
- ✅ 256 MB de almacenamiento
- ✅ Suficiente para ~10,000 gastos
- ✅ Sin hibernación

### Railway Free Tier (Alternativa)
- ✅ $5 USD de crédito gratis/mes
- ✅ PostgreSQL incluido
- ✅ Sin hibernación (si hay crédito)

---

## Troubleshooting

### Error: "Cannot connect to database"
- Verifica que DATABASE_URL esté correctamente configurada
- Asegúrate de haber ejecutado las migraciones
- Revisa los logs en Render

### Error: "CORS" en el frontend
- Verifica que VITE_API_URL apunte a tu backend en Render
- Asegúrate de incluir https:// en la URL

### PWA no se instala
- Verifica que los iconos existan (icon-192.png, icon-512.png)
- Verifica que el sitio use HTTPS (Render lo hace automáticamente)
- Limpia la caché del navegador

### El servicio se duerme muy rápido
- Esto es normal en el plan gratuito de Render
- Para mantenerlo despierto, usa un servicio de ping como:
  - Cron-job.org
  - UptimeRobot
  - Configura un ping cada 10 minutos a tu API

---

## Monitoreo

### Logs en Render
1. Ve a tu servicio en Render
2. Haz clic en "Logs"
3. Revisa errores en tiempo real

### Base de datos en Clever Cloud
1. Ve a tu addon PostgreSQL
2. Haz clic en "Metrics"
3. Revisa uso de espacio y conexiones

---

## Actualizaciones

### Actualizar la aplicación
1. Haz cambios en tu código local
2. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Actualización de funcionalidad"
   git push
   ```
3. Render detectará el cambio y desplegará automáticamente

---

## Soporte

Si tienes problemas:
1. Revisa los logs en Render
2. Verifica las variables de entorno
3. Asegúrate de que las migraciones se ejecutaron
4. Consulta la documentación oficial:
   - Render: https://render.com/docs
   - Clever Cloud: https://www.clever-cloud.com/doc/
