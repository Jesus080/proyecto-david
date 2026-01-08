# DEPLOYMENT - RESUMEN RAPIDO

## TU BASE DE DATOS POSTGRESQL ESTA LISTA
- Database: gestor_gastos_vz94
- Host: dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com
- Estado: CONFIGURADA Y MIGRADA ✓

## JWT SECRET GENERADO
```
j6pDt0qIObdHKilxav7ZGem9kNL15XVyWrUPgAuc8snTCSEzhfo3QBMY2R4FwJ
```

---

## PASO 1: SUBIR A GITHUB

```bash
git init
git add .
git commit -m "Deploy inicial"
git remote add origin https://github.com/TU_USUARIO/gestor-gastos.git
git branch -M main
git push -u origin main
```

---

## PASO 2: RENDER - BACKEND

1. Ve a https://render.com/
2. New + → Web Service
3. Conecta tu repositorio

**Configuracion:**
- Name: `gestor-gastos-api`
- Region: Oregon
- Branch: main
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

**Variables de Entorno:**
```
NODE_ENV=production
DATABASE_URL=postgresql://gestor_gastos_vz94_user:5mN3cFFHL8M7LT6RXnCoOecYMjnyGeBp@dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com/gestor_gastos_vz94
JWT_SECRET=j6pDt0qIObdHKilxav7ZGem9kNL15XVyWrUPgAuc8snTCSEzhfo3QBMY2R4FwJ
PORT=10000
```

**IMPORTANTE:** Copia la URL del backend cuando termine (ej: https://gestor-gastos-api.onrender.com)

---

## PASO 3: RENDER - FRONTEND

1. New + → Static Site
2. Mismo repositorio

**Configuracion:**
- Name: `gestor-gastos-frontend`
- Branch: main
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

**Variable de Entorno:**
```
VITE_API_URL=https://TU-BACKEND.onrender.com
```
(Reemplaza con la URL del paso 2)

**Rewrite Rules:**
- Source: `/*`
- Destination: `/index.html`
- Action: Rewrite

---

## LISTO!

Tu app estara en:
- Backend: https://gestor-gastos-api.onrender.com
- Frontend: https://gestor-gastos-frontend.onrender.com

---

## ALTERNATIVA: CLEVER CLOUD

Si prefieres Clever Cloud:

```bash
npm install -g clever-tools
clever login
clever create --type node gestor-gastos-api --region par
clever env set NODE_ENV production
clever env set DATABASE_URL "postgresql://gestor_gastos_vz94_user:5mN3cFFHL8M7LT6RXnCoOecYMjnyGeBp@dpg-d5ffoekhg0os73f9r5d0-a.oregon-postgres.render.com/gestor_gastos_vz94"
clever env set JWT_SECRET "j6pDt0qIObdHKilxav7ZGem9kNL15XVyWrUPgAuc8snTCSEzhfo3QBMY2R4FwJ"
clever deploy
```

---

**Documentacion completa:** DEPLOYMENT_INSTRUCTIONS.md
