# Gestor de Gastos - PWA

Aplicación web progresiva (PWA) para gestionar gastos personales, descargable en PC y móvil.

## 🚀 Características

- ✅ Autenticación de usuarios (registro/login)
- ✅ Crear, editar y eliminar gastos
- ✅ Categorías de gastos personalizables
- ✅ Estadísticas y resúmenes por período
- ✅ Funciona offline (PWA)
- ✅ Instalable en PC y móvil
- ✅ Diseño responsivo

## 🛠️ Tecnologías

### Frontend
- React 18 + Vite
- PWA (Service Worker)
- CSS Modules / Styled Components
- Axios para API calls

### Backend
- Node.js + Express
- PostgreSQL
- JWT para autenticación
- Bcrypt para contraseñas

## 📦 Instalación Local

### Requisitos
- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:
```
PORT=5000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/gestor_gastos
JWT_SECRET=tu_secreto_super_seguro_aqui
NODE_ENV=development
```

Crear la base de datos:
```bash
npm run migrate
```

Iniciar servidor:
```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 🌐 Deployment

### Backend en Render

1. Crear cuenta en [Render.com](https://render.com)
2. Conectar repositorio de GitHub
3. Crear nuevo Web Service
4. Configurar:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. Agregar variables de entorno:
   - `DATABASE_URL` (desde Clever Cloud)
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Base de Datos en Clever Cloud

1. Crear cuenta en [Clever Cloud](https://clever-cloud.com)
2. Crear addon PostgreSQL (plan gratuito)
3. Copiar la `DATABASE_URL` a Render
4. Ejecutar migraciones desde terminal local

### Frontend en Render (Static Site)

1. Crear nuevo Static Site en Render
2. Configurar:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
3. Agregar variable de entorno:
   - `VITE_API_URL=https://tu-backend.onrender.com`

## 📱 Instalar como PWA

### En Android/iOS:
1. Abrir la app en el navegador
2. Tocar el menú (3 puntos)
3. Seleccionar "Agregar a pantalla de inicio" o "Instalar app"

### En PC (Chrome/Edge):
1. Abrir la app en el navegador
2. Buscar el icono de instalación en la barra de direcciones
3. Hacer clic en "Instalar"

## 📄 Licencia

MIT
