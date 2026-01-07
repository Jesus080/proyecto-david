# Clever Cloud Deployment

## Variables de entorno necesarias

### Backend (Node.js App)
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your_super_secure_jwt_secret_min_64_chars
PORT=8080
```

### Frontend (Static App)
```
VITE_API_URL=https://your-backend-app.cleverapps.io
```

## Instrucciones de deployment

### Backend
1. Crear una aplicación Node.js en Clever Cloud
2. Vincular el repositorio de GitHub
3. Configurar las variables de entorno
4. Clever Cloud detectará automáticamente la configuración desde `clevercloud/nodejs.json`

### Frontend
1. Crear una aplicación Static en Clever Cloud
2. Configurar el build command: `cd frontend && npm install && npm run build`
3. Configurar el static folder: `frontend/dist`

### Base de datos PostgreSQL
1. Crear un addon PostgreSQL
2. Vincular el addon a la aplicación backend
3. La variable DATABASE_URL se configurará automáticamente
