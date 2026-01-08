# GENERAR ICONOS PWA

Los iconos PNG son necesarios para que la PWA se pueda instalar.

## Opción 1: Usar un generador online (MÁS FÁCIL)

1. Ve a https://realfavicongenerator.net/ o https://www.pwabuilder.com/imageGenerator
2. Sube el archivo `icon.svg`
3. Descarga los iconos generados (192x192 y 512x512)
4. Guárdalos en `frontend/public/` como:
   - `icon-192.png`
   - `icon-512.png`

## Opción 2: Usar ImageMagick (si lo tienes instalado)

```bash
# Instalar ImageMagick primero si no lo tienes
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Generar iconos
magick convert icon.svg -resize 192x192 icon-192.png
magick convert icon.svg -resize 512x512 icon-512.png
```

## Opción 3: Usar Node.js (desde este proyecto)

```bash
cd frontend/public
npm install sharp
node generate-icons.js
```

## Opción 4: Descargar iconos temporales

He creado iconos básicos que puedes usar. Ejecuta:

```powershell
cd frontend/public
# Los iconos se generarán automáticamente
```

## Después de generar los iconos

1. Verifica que existan:
   - `frontend/public/icon-192.png`
   - `frontend/public/icon-512.png`

2. Haz commit y push:
```bash
git add .
git commit -m "Add PWA icons"
git push
```

3. Render actualizará automáticamente

4. Espera 2-3 minutos y recarga tu app

5. Ahora debería aparecer la opción "Instalar app" o "Agregar a pantalla de inicio"
