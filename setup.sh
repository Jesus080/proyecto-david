#!/bin/bash

# Script de setup automático para Gestor de Gastos
# Para Windows, ejecutar con Git Bash o WSL

echo "🚀 Configurando Gestor de Gastos..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Instalar dependencias del backend
echo -e "${BLUE}📦 Instalando dependencias del backend...${NC}"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del backend"
    exit 1
fi

# 2. Crear .env del backend si no existe
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creando archivo .env del backend...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Archivo backend/.env creado. Por favor, edítalo con tus credenciales.${NC}"
else
    echo -e "${GREEN}✅ Archivo backend/.env ya existe${NC}"
fi

cd ..

# 3. Instalar dependencias del frontend
echo -e "${BLUE}📦 Instalando dependencias del frontend...${NC}"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del frontend"
    exit 1
fi

# 4. Crear .env del frontend si no existe
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creando archivo .env del frontend...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Archivo frontend/.env creado${NC}"
else
    echo -e "${GREEN}✅ Archivo frontend/.env ya existe${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}🎉 ¡Setup completado!${NC}"
echo ""
echo "Próximos pasos:"
echo "1. Edita backend/.env con tus credenciales de PostgreSQL"
echo "2. Crea la base de datos: CREATE DATABASE gestor_gastos;"
echo "3. Ejecuta las migraciones: cd backend && npm run migrate"
echo "4. Inicia el backend: cd backend && npm run dev"
echo "5. En otra terminal, inicia el frontend: cd frontend && npm run dev"
echo ""
echo "Más información en QUICKSTART.md"
