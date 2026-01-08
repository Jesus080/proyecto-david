const fs = require('fs');

// Crear un canvas HTML simple para generar iconos
const generateIcon = (size) => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${size/5}" fill="#3B82F6"/>
  <g fill="#FFFFFF">
    <circle cx="${size/2}" cy="${size*0.35}" r="${size*0.12}"/>
    <path d="M${size*0.7} ${size*0.47}c-${size*0.04} 0-${size*0.074} ${size*0.016}-${size*0.102} ${size*0.041}l-${size*0.102}-${size*0.041}-${size*0.102} ${size*0.041}c-${size*0.027}-${size*0.025}-${size*0.062}-${size*0.041}-${size*0.102}-${size*0.041}-${size*0.086} 0-${size*0.156} ${size*0.07}-${size*0.156} ${size*0.156}v${size*0.156}h${size*0.72}v-${size*0.156}c0-${size*0.086}-${size*0.07}-${size*0.156}-${size*0.156}-${size*0.156}z"/>
    <text x="${size/2}" y="${size*0.92}" font-size="${size*0.35}" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif">$</text>
  </g>
</svg>`;
  
  fs.writeFileSync(`icon-${size}.svg`, svg);
  console.log(`✅ Creado icon-${size}.svg - Ahora conviértelo a PNG usando un conversor online`);
};

generateIcon(192);
generateIcon(512);

console.log('\n📌 SIGUIENTE PASO:');
console.log('Ve a https://cloudconvert.com/svg-to-png');
console.log('Sube icon-192.svg y icon-512.svg');
console.log('Descarga los PNG generados y guárdalos aquí');
