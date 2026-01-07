#!/bin/bash

# Script de deployment completo para Render y Clever Cloud
# Uso: ./deploy.sh [platform]
# Ejemplo: ./deploy.sh render

PLATFORM=${1:-check}

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Gestor de Gastos - Script de Deployment${NC}"
echo -e "${CYAN}==========================================${NC}"
echo ""

check_prerequisites() {
    echo -e "${YELLOW}📋 Verificando prerequisitos...${NC}"
    
    # Verificar Git
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ Git no está instalado${NC}"
        return 1
    fi
    echo -e "${GREEN}✅ Git instalado${NC}"
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js no está instalado${NC}"
        return 1
    fi
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js $NODE_VERSION instalado${NC}"
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm no está instalado${NC}"
        return 1
    fi
    echo -e "${GREEN}✅ npm instalado${NC}"
    
    # Verificar repositorio Git
    if [ ! -d .git ]; then
        echo -e "${RED}❌ No es un repositorio Git${NC}"
        echo -e "${YELLOW}   Ejecuta: git init${NC}"
        return 1
    fi
    echo -e "${GREEN}✅ Repositorio Git inicializado${NC}"
    
    # Verificar remote origin
    REMOTE=$(git remote get-url origin 2>/dev/null)
    if [ -z "$REMOTE" ]; then
        echo -e "${YELLOW}⚠️  No hay remote 'origin' configurado${NC}"
        echo -e "${YELLOW}   Configura GitHub primero${NC}"
    else
        echo -e "${GREEN}✅ Remote origin: $REMOTE${NC}"
    fi
    
    return 0
}

check_config_files() {
    echo ""
    echo -e "${YELLOW}📁 Verificando archivos de configuración...${NC}"
    
    FILES=(
        "render.yaml"
        ".gitignore"
        ".github/workflows/ci-cd.yml"
        "clevercloud/nodejs.json"
    )
    
    ALL_EXIST=true
    for file in "${FILES[@]}"; do
        if [ -f "$file" ]; then
            echo -e "${GREEN}✅ $file${NC}"
        else
            echo -e "${RED}❌ $file no encontrado${NC}"
            ALL_EXIST=false
        fi
    done
    
    [ "$ALL_EXIST" = true ]
}

install_dependencies() {
    echo ""
    echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
    
    # Backend
    echo -e "${CYAN}  → Backend...${NC}"
    cd backend
    npm install
    if [ $? -ne 0 ]; then
        cd ..
        return 1
    fi
    cd ..
    echo -e "${GREEN}✅ Backend dependencies instaladas${NC}"
    
    # Frontend
    echo -e "${CYAN}  → Frontend...${NC}"
    cd frontend
    npm install
    if [ $? -ne 0 ]; then
        cd ..
        return 1
    fi
    cd ..
    echo -e "${GREEN}✅ Frontend dependencies instaladas${NC}"
    
    return 0
}

test_build() {
    echo ""
    echo -e "${YELLOW}🏗️  Probando build del frontend...${NC}"
    
    cd frontend
    VITE_API_URL="https://api.example.com" npm run build
    BUILD_SUCCESS=$?
    cd ..
    
    if [ $BUILD_SUCCESS -eq 0 ]; then
        echo -e "${GREEN}✅ Build exitoso${NC}"
        return 0
    else
        echo -e "${RED}❌ Build falló${NC}"
        return 1
    fi
}

push_to_github() {
    echo ""
    echo -e "${YELLOW}📤 Preparando para GitHub...${NC}"
    
    # Verificar si hay cambios
    STATUS=$(git status --porcelain)
    if [ -z "$STATUS" ]; then
        echo -e "${GREEN}✅ No hay cambios para commitear${NC}"
        return 0
    fi
    
    echo -e "${CYAN}📝 Cambios detectados:${NC}"
    git status --short
    
    echo ""
    read -p "¿Commitear y pushear cambios? (s/n): " COMMIT
    
    if [ "$COMMIT" = "s" ] || [ "$COMMIT" = "S" ]; then
        read -p "Mensaje de commit: " MESSAGE
        if [ -z "$MESSAGE" ]; then
            MESSAGE="Deploy: actualizaciones $(date '+%Y-%m-%d %H:%M')"
        fi
        
        git add .
        git commit -m "$MESSAGE"
        
        BRANCH=$(git branch --show-current)
        git push origin "$BRANCH"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Push exitoso${NC}"
            return 0
        else
            echo -e "${RED}❌ Push falló${NC}"
            return 1
        fi
    fi
    
    return 0
}

show_deployment_info() {
    PLATFORM=$1
    
    echo ""
    echo -e "${CYAN}📋 Información de Deployment - $PLATFORM${NC}"
    echo -e "${CYAN}===========================================${NC}"
    
    if [ "$PLATFORM" = "render" ] || [ "$PLATFORM" = "all" ]; then
        echo ""
        echo -e "${BLUE}🔷 RENDER${NC}"
        echo -e "${NC}1. Ve a https://render.com"
        echo -e "${NC}2. Crea una cuenta o inicia sesión"
        echo -e "${NC}3. Opciones:"
        echo -e "${YELLOW}   A) Blueprint (Recomendado):${NC}"
        echo -e "${NC}      - New → Blueprint"
        echo -e "${NC}      - Conecta tu repositorio GitHub"
        echo -e "${NC}      - Render detectará render.yaml automáticamente"
        echo -e "${NC}      - Configura DATABASE_URL en las variables de entorno"
        echo -e "${YELLOW}   B) Manual:${NC}"
        echo -e "${NC}      - New → Web Service (para backend)"
        echo -e "${NC}      - New → Static Site (para frontend)"
        echo ""
        echo -e "${YELLOW}Variables de entorno necesarias:${NC}"
        echo -e "${NC}  DATABASE_URL=postgresql://user:pass@host:5432/db"
        echo -e "${NC}  JWT_SECRET=<se genera automáticamente>"
        echo -e "${NC}  NODE_ENV=production"
    fi
    
    if [ "$PLATFORM" = "clever-cloud" ] || [ "$PLATFORM" = "all" ]; then
        echo ""
        echo -e "${GREEN}🟢 CLEVER CLOUD${NC}"
        echo -e "${NC}1. Ve a https://www.clever-cloud.com"
        echo -e "${NC}2. Crea una cuenta o inicia sesión"
        echo -e "${NC}3. Para Backend:"
        echo -e "${NC}   - Create → an application → Node.js"
        echo -e "${NC}   - Conecta tu repositorio GitHub"
        echo -e "${NC}   - Branch: main"
        echo -e "${NC}4. Para Frontend:"
        echo -e "${NC}   - Create → an application → Static"
        echo -e "${NC}   - Build: cd frontend && npm install && npm run build"
        echo -e "${NC}   - Folder: frontend/dist"
        echo -e "${NC}5. Para Base de Datos:"
        echo -e "${NC}   - Create → an add-on → PostgreSQL"
        echo -e "${NC}   - Plan: DEV (gratis)"
        echo ""
        echo -e "${YELLOW}La configuración en clevercloud/ se usará automáticamente${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}📚 Documentación completa: DEPLOYMENT_COMPLETE.md${NC}"
}

# Ejecutar según el parámetro
case $PLATFORM in
    check)
        echo -e "${MAGENTA}🔍 Modo: Verificación de prerequisitos${NC}"
        echo ""
        
        check_prerequisites
        PREREQ=$?
        check_config_files
        CONFIG=$?
        
        if [ $PREREQ -eq 0 ] && [ $CONFIG -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✅ Sistema listo para deployment${NC}"
            echo ""
            echo -e "${YELLOW}Siguiente paso:${NC}"
            echo -e "${NC}  ./deploy.sh all           - Ver instrucciones completas"
            echo -e "${NC}  ./deploy.sh render        - Deployment a Render"
            echo -e "${NC}  ./deploy.sh clever-cloud  - Deployment a Clever Cloud"
        else
            echo ""
            echo -e "${RED}❌ Hay problemas que resolver antes del deployment${NC}"
            exit 1
        fi
        ;;
    
    render)
        echo -e "${BLUE}🔷 Modo: Deployment a Render${NC}"
        echo ""
        
        check_prerequisites || exit 1
        check_config_files || exit 1
        install_dependencies || exit 1
        test_build || exit 1
        push_to_github || exit 1
        
        show_deployment_info 'render'
        ;;
    
    clever-cloud)
        echo -e "${GREEN}🟢 Modo: Deployment a Clever Cloud${NC}"
        echo ""
        
        check_prerequisites || exit 1
        check_config_files || exit 1
        install_dependencies || exit 1
        test_build || exit 1
        push_to_github || exit 1
        
        show_deployment_info 'clever-cloud'
        ;;
    
    all)
        echo -e "${MAGENTA}🌐 Modo: Información completa de deployment${NC}"
        echo ""
        
        check_prerequisites || exit 1
        check_config_files || exit 1
        
        show_deployment_info 'all'
        ;;
    
    *)
        echo -e "${RED}❌ Plataforma desconocida: $PLATFORM${NC}"
        echo -e "${YELLOW}Uso: ./deploy.sh [check|render|clever-cloud|all]${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Script completado!${NC}"
echo ""
