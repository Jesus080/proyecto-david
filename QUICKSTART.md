# Gestor de Gastos - Guía de Inicio Rápido

## 🚀 Inicio Rápido (5 minutos)

### 1. Instalar Dependencias

```powershell
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### 2. Configurar Base de Datos Local

```powershell
# Asegúrate de tener PostgreSQL instalado
# Crear base de datos
psql -U postgres
CREATE DATABASE gestor_gastos;
\q
```

### 3. Configurar Variables de Entorno

**Backend** - Crear `backend/.env`:
```
PORT=5000
DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/gestor_gastos
JWT_SECRET=mi_secreto_super_seguro_de_desarrollo_12345
NODE_ENV=development
```

**Frontend** - Crear `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```

### 4. Crear las Tablas

```powershell
cd backend
npm run migrate
```

### 5. Iniciar la Aplicación

**Terminal 1 - Backend**:
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```powershell
cd frontend
npm run dev
```

### 6. Abrir en el Navegador

Abre http://localhost:5173

---

## 📱 Características

✅ **Autenticación**: Registro y login de usuarios
✅ **Gestión de Gastos**: Crear, editar y eliminar gastos
✅ **Categorías**: Organiza tus gastos por categorías personalizables
✅ **Estadísticas**: Visualiza resúmenes y gráficos de tus gastos
✅ **PWA**: Instala la app en tu celular o computadora
✅ **Offline**: Funciona sin internet una vez instalado
✅ **Responsive**: Se adapta a cualquier pantalla

---

## 🛠️ Stack Tecnológico

### Backend
- Node.js + Express
- PostgreSQL
- JWT para autenticación
- Bcrypt para contraseñas

### Frontend
- React 18
- Vite
- React Router
- Axios
- PWA con Service Worker

---

## 📂 Estructura del Proyecto

```
proyecto-david/
├── backend/
│   ├── config/          # Configuración de BD
│   ├── middleware/      # Middleware de autenticación
│   ├── routes/          # Rutas de la API
│   ├── scripts/         # Scripts de migración
│   ├── server.js        # Servidor principal
│   └── package.json
├── frontend/
│   ├── public/          # Archivos estáticos y PWA
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── context/     # Context API (Auth)
│   │   ├── pages/       # Páginas de la app
│   │   ├── services/    # Servicios API
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── README.md
├── DEPLOYMENT.md
└── package.json
```

---

## 🎯 Flujo de Uso

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Crear Categorías**: Define categorías como "Comida", "Transporte", etc.
3. **Registrar Gastos**: Agrega tus gastos con monto, descripción, fecha y categoría
4. **Ver Dashboard**: Consulta resúmenes y estadísticas
5. **Analizar**: Revisa gráficos por categoría y período

---

## 🧪 Comandos Útiles

### Backend
```powershell
npm run dev          # Modo desarrollo con nodemon
npm start           # Modo producción
npm run migrate     # Ejecutar migraciones
```

### Frontend
```powershell
npm run dev         # Servidor de desarrollo
npm run build       # Build para producción
npm run preview     # Vista previa del build
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
```powershell
# Verificar que PostgreSQL esté corriendo
# En Windows, abre Services y busca "PostgreSQL"
# O ejecuta:
pg_ctl status
```

### Error: "Port 5000 already in use"
```powershell
# Cambiar el puerto en backend/.env
PORT=5001
```

### Error: "npm install" falla
```powershell
# Limpiar cache y reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Instalar como PWA

### Android/iOS
1. Abre la app en Chrome/Safari
2. Toca el menú (⋮)
3. Toca "Agregar a pantalla de inicio"
4. Confirma la instalación

### Windows/Mac/Linux
1. Abre la app en Chrome
2. Busca el icono (+) en la barra de direcciones
3. Haz clic en "Instalar"
4. La app aparecerá en tu menú de aplicaciones

---

## 🚢 Deploy a Producción

Ver guía completa en [DEPLOYMENT.md](DEPLOYMENT.md)

**Opciones gratuitas**:
- ✅ Render (Backend + Frontend)
- ✅ Clever Cloud (Base de datos)
- ✅ Railway (Todo en uno)

---

## 📝 Notas Importantes

⚠️ **Desarrollo**:
- El backend usa nodemon para recarga automática
- El frontend usa HMR (Hot Module Replacement)
- Los cambios se reflejan inmediatamente

⚠️ **Producción**:
- Usa variables de entorno seguras
- Cambia JWT_SECRET por un valor aleatorio largo
- Usa HTTPS (Render lo provee gratis)
- Habilita CORS solo para tu dominio

⚠️ **Base de Datos**:
- Haz backups regulares
- El plan gratuito de Clever Cloud tiene límite de 256MB
- Considera migrar a un plan pagado si creces

---

## 📈 Próximas Mejoras

Ideas para expandir la aplicación:

- [ ] Exportar gastos a CSV/PDF
- [ ] Notificaciones push
- [ ] Presupuestos mensuales
- [ ] Modo oscuro
- [ ] Múltiples cuentas bancarias
- [ ] Reportes avanzados
- [ ] Compartir gastos con otros usuarios
- [ ] Sincronización en tiempo real

---

## 📄 Licencia

MIT - Usa y modifica libremente

---

## 💬 Soporte

¿Preguntas o problemas? Revisa:
1. [README.md](README.md) - Información general
2. [DEPLOYMENT.md](DEPLOYMENT.md) - Guía de despliegue
3. Logs del servidor (para errores del backend)
4. Consola del navegador (para errores del frontend)

---

**¡Listo para empezar! 🎉**

Ejecuta los comandos de inicio rápido y tendrás la app corriendo en minutos.
