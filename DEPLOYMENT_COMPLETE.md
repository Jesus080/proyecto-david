# 🚀 Guía de Deployment Completa

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

### 4. GitHub Actions ya configuradas ✅
Las GitHub Actions están en `.github/workflows/`:
- `ci-cd.yml`: Tests automáticos en cada push
- `deploy-render.yml`: Deploy automático a Render

---

## Deployment en Render

### Opción 1: Usando Blueprint (Recomendado) ⭐

1. **Crear cuenta en Render**: https://render.com
2. **Conectar repositorio de GitHub**:
   - Sube todo el proyecto a GitHub (ver sección anterior)
   - En Render, ve a "Blueprints"
   - Click en "New Blueprint Instance"
   - Conecta tu repositorio
   - Render detectará automáticamente el archivo `render.yaml`

3. **Configurar variables de entorno**:
   - `DATABASE_URL`: Añade la URL de tu base de datos PostgreSQL (ver sección Base de Datos)
   - `JWT_SECRET` se generará automáticamente
   - `VITE_API_URL` se configurará automáticamente

4. **Deploy**: Haz clic en "Apply" y espera que se desplieguen los servicios (5-10 minutos)

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
   - **Build Command**: `npm ci`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. Variables de entorno:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://usuario:password@host:5432/database
   JWT_SECRET=tu_secreto_super_seguro_de_64_caracteres_minimo
   PORT=10000
   ```

#### Frontend (Static Site)
1. En Render Dashboard, haz clic en "New +" → "Static Site"
2. Conecta tu repositorio
3. Configura:
   - **Name**: `gestor-gastos-frontend`
   - **Branch**: main
   - **Root Directory**: `frontend`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`

4. Variables de entorno:
   ```
   VITE_API_URL=https://gestor-gastos-api.onrender.com
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

### 4. Configuración desde archivos ✅
Clever Cloud detectará automáticamente los archivos en `clevercloud/`:
- `nodejs.json`: Configuración del backend
- `frontend.json`: Configuración del frontend
- Hooks post-deploy para migraciones

---

## Base de Datos PostgreSQL

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

### Opción 3: Supabase PostgreSQL (Gratis y sin hibernación)

1. Crea cuenta en https://supabase.com
2. Crea un nuevo proyecto
3. Ve a Settings → Database
4. Copia la "Connection String" (modo directo)
5. Configura como variable `DATABASE_URL`

### Ejecutar migraciones

#### Desde tu computadora local:
```bash
# Windows PowerShell
$env:DATABASE_URL="postgresql://username:password@host:5432/database"
cd backend
npm run migrate
```

```bash
# Linux/Mac
export DATABASE_URL="postgresql://username:password@host:5432/database"
cd backend
npm run migrate
```

#### Desde Render Shell:
1. Ve a tu servicio backend en Render
2. Haz clic en "Shell"
3. Ejecuta: `npm run migrate`

#### Desde Clever Cloud:
Se ejecuta automáticamente vía hook post-deploy definido en `clevercloud/nodejs.json`

---

## CI/CD con GitHub Actions

### Configuración automática ✅
Las GitHub Actions ya están configuradas y se ejecutarán automáticamente:

### Workflow CI/CD (`ci-cd.yml`)
Se ejecuta en cada push a `main` o `develop`:
- ✅ Tests del backend con PostgreSQL de prueba
- ✅ Build del frontend
- ✅ Lint (si está configurado)
- ✅ Notificaciones de éxito/error

### Workflow Deploy Render (`deploy-render.yml`)
Se ejecuta solo en push a `main`:
- ✅ Trigger manual de deployment a Render
- ✅ Notificación de deployment completo

### Configurar Deploy Hook (opcional)
Para deployments manuales desde GitHub Actions:

1. En Render, ve a tu servicio → Settings
2. Copia el "Deploy Hook URL"
3. En GitHub, ve a tu repositorio → Settings → Secrets and variables → Actions
4. Crea un nuevo secret:
   - Name: `RENDER_DEPLOY_HOOK`
   - Value: La URL copiada

---

## Verificación Post-Deployment

### 1. Probar Backend
```bash
# Verificar que la API funciona
curl https://tu-backend.onrender.com/
# Debería responder: {"message": "Gestor de Gastos API funcionando ✅"}

# Probar registro
curl -X POST https://tu-backend.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"Test123!"}'
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

## Costos (Plan Gratuito) 💰

### Render Free Tier
- ✅ Web Services: 750 horas/mes (suficiente para 1 servicio)
- ✅ Static Sites: Ilimitado y sin hibernación
- ⚠️ Web Services se duermen después de 15 min de inactividad
- ⚠️ Tarda 30-60s en despertar al recibir una petición

### Clever Cloud Free Tier
- ✅ PostgreSQL DEV: 256 MB de almacenamiento
- ✅ Suficiente para ~10,000 gastos
- ✅ Sin hibernación
- ✅ Node.js apps tienen plan gratuito limitado

### Alternativa: Railway Free Tier
- ✅ $5 USD de crédito gratis/mes
- ✅ PostgreSQL incluido
- ✅ Sin hibernación (mientras haya crédito)
- ⚠️ Se agota después de ~550 horas/mes

### Alternativa: Vercel (Solo Frontend)
- ✅ Hosting de frontend ilimitado
- ✅ Sin hibernación
- ✅ CDN global
- ❌ No soporta backend Node.js

---

## Troubleshooting

### Error: "Cannot connect to database"
**Solución**:
- Verifica que `DATABASE_URL` esté correctamente configurada
- Asegúrate de haber ejecutado las migraciones
- Revisa los logs en Render/Clever Cloud
- Verifica que la base de datos esté activa

### Error: "CORS" en el frontend
**Solución**:
- Verifica que `VITE_API_URL` apunte a tu backend correcto
- Asegúrate de incluir `https://` en la URL
- Reconstruye el frontend después de cambiar la variable

### Error: "JWT malformed" o "Invalid token"
**Solución**:
- Genera un nuevo `JWT_SECRET` (mínimo 64 caracteres)
- Actualiza la variable en Render/Clever Cloud
- Reinicia el servicio backend

### PWA no se instala
**Solución**:
- Verifica que los iconos existan (icon-192.png, icon-512.png) en `frontend/public/`
- Verifica que el sitio use HTTPS (Render/Clever Cloud lo hace automáticamente)
- Limpia la caché del navegador (Ctrl + Shift + Delete)
- Abre DevTools → Application → Manifest para ver errores

### El servicio se duerme muy rápido (Render)
**Solución** (mantenerlo despierto):
- Usa un servicio de ping:
  - [Cron-job.org](https://cron-job.org) (gratis)
  - [UptimeRobot](https://uptimerobot.com) (gratis)
- Configura un ping cada 10-14 minutos a tu API
- URL a pingear: `https://tu-backend.onrender.com/`

### Build falla en Render/Clever Cloud
**Solución**:
- Revisa los logs de build
- Verifica que `package.json` tenga todas las dependencias
- Asegúrate de usar `npm ci` en vez de `npm install`
- Verifica las versiones de Node.js (el proyecto usa Node 18+)

### Frontend no encuentra el backend
**Solución**:
1. Abre DevTools → Console
2. Busca errores de red
3. Verifica que `VITE_API_URL` esté correcta
4. Reconstruye el frontend:
   ```bash
   cd frontend
   npm run build
   ```
5. Haz commit y push para re-desplegar

---

## Monitoreo

### Logs en Render
1. Ve a tu servicio en Render
2. Haz clic en "Logs"
3. Revisa errores en tiempo real
4. Filtra por tipo: Info, Error, Warning

### Logs en Clever Cloud
1. Ve a tu aplicación
2. Haz clic en "Logs"
3. Usa filtros para buscar errores

### Base de datos
**Clever Cloud**:
1. Ve a tu addon PostgreSQL
2. Haz clic en "Metrics"
3. Revisa uso de espacio y conexiones

**Render**:
1. Ve a tu PostgreSQL Database
2. Revisa métricas de uso
3. Chequea conexiones activas

### Herramientas externas
- **Sentry**: Para tracking de errores (https://sentry.io)
- **LogRocket**: Para sesiones de usuario (https://logrocket.com)
- **Google Analytics**: Para analytics (gratis)

---

## Actualizaciones

### Flujo de trabajo de desarrollo

1. **Hacer cambios localmente**:
   ```bash
   # Hacer cambios en tu código
   git add .
   git commit -m "feat: nueva funcionalidad"
   ```

2. **Push a GitHub**:
   ```bash
   git push origin main
   ```

3. **Deployment automático**:
   - GitHub Actions ejecutará los tests
   - Si pasan, Render/Clever Cloud desplegará automáticamente
   - Espera 5-10 minutos para que se complete

4. **Verificar deployment**:
   - Revisa los logs en Render/Clever Cloud
   - Prueba la nueva funcionalidad en producción

### Rollback (volver atrás)

**En Render**:
1. Ve a tu servicio
2. Haz clic en "Events"
3. Busca un deployment anterior exitoso
4. Haz clic en "Rollback"

**En Clever Cloud**:
1. Ve a tu aplicación
2. Haz clic en "Deployments"
3. Selecciona un deployment anterior
4. Haz clic en "Redeploy"

---

## Dominios personalizados (opcional)

### En Render
1. Ve a tu servicio → Settings
2. Haz clic en "Custom Domains"
3. Añade tu dominio: `www.tudominio.com`
4. Configura DNS:
   ```
   CNAME www tuservicio.onrender.com
   ```
5. SSL se configura automáticamente

### En Clever Cloud
1. Ve a tu aplicación → Domain names
2. Añade tu dominio
3. Configura DNS según las instrucciones
4. SSL se configura automáticamente

---

## Seguridad 🔒

### Variables de entorno sensibles
- ✅ Nunca hagas commit de `.env` files
- ✅ Usa secretos de GitHub para CI/CD
- ✅ Rota `JWT_SECRET` periódicamente
- ✅ Usa contraseñas fuertes para la BD

### HTTPS
- ✅ Render y Clever Cloud proveen SSL gratis
- ✅ Fuerza HTTPS en tu backend
- ✅ Usa HSTS headers

### Rate Limiting
Considera añadir rate limiting al backend:
```bash
cd backend
npm install express-rate-limit
```

---

## Soporte

### Documentación oficial
- **Render**: https://render.com/docs
- **Clever Cloud**: https://www.clever-cloud.com/doc/
- **GitHub Actions**: https://docs.github.com/actions

### Comunidad
- GitHub Issues en tu repositorio
- Stack Overflow con tags: `render`, `clever-cloud`, `postgresql`
- Discord de Render: https://discord.gg/render

### Contacto
Si tienes problemas:
1. Revisa esta guía de troubleshooting
2. Revisa los logs en Render/Clever Cloud
3. Verifica las variables de entorno
4. Consulta la documentación oficial
5. Abre un Issue en GitHub

---

## Checklist de Deployment ✅

Antes de deployar, verifica:

- [ ] Código subido a GitHub
- [ ] `.env` en `.gitignore`
- [ ] Base de datos PostgreSQL creada
- [ ] Migraciones ejecutadas
- [ ] Variables de entorno configuradas:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
  - [ ] `VITE_API_URL`
- [ ] Backend desplegado y funcionando
- [ ] Frontend desplegado y funcionando
- [ ] PWA instalable
- [ ] Tests funcionando
- [ ] GitHub Actions configuradas

¡Tu aplicación está lista para producción! 🎉
