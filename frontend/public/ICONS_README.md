# Iconos PWA

## Instrucciones para generar los iconos

Los iconos para la PWA deben generarse a partir del archivo `icon.svg`. Puedes usar herramientas online gratuitas como:

### Opción 1: PWA Asset Generator (Recomendado)
1. Visita: https://www.pwabuilder.com/imageGenerator
2. Sube el archivo `icon.svg`
3. Descarga los iconos generados (192x192 y 512x512)
4. Colócalos en la carpeta `public/`

### Opción 2: Favicon.io
1. Visita: https://favicon.io/favicon-converter/
2. Sube el archivo `icon.svg`
3. Descarga el paquete
4. Extrae y renombra:
   - `android-chrome-192x192.png` → `icon-192.png`
   - `android-chrome-512x512.png` → `icon-512.png`

### Opción 3: Usando comandos (con ImageMagick instalado)
```bash
# Instalar ImageMagick primero
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Generar iconos
magick icon.svg -resize 192x192 icon-192.png
magick icon.svg -resize 512x512 icon-512.png
```

## Archivos necesarios
- `icon-192.png` - Icono de 192x192 píxeles
- `icon-512.png` - Icono de 512x512 píxeles
- `icon.svg` - Icono vectorial (ya creado)

## Nota
Los iconos son necesarios para que la PWA se instale correctamente. Mientras tanto, la aplicación funcionará pero mostrará un icono por defecto.
