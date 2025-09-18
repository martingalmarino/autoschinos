const fs = require('fs');
const path = require('path');

// Script para crear estructura de carpetas e imágenes para nuevas marcas
// Uso: node scripts/create-brand-images.cjs <marca> <modelo1> <modelo2> ...
// Ejemplo: node scripts/create-brand-images.cjs BYD "Song Pro DM-i" "Dolphin Mini" "Yuan Pro"

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('❌ Error: Debes proporcionar al menos una marca y un modelo');
  console.log('📋 Uso: node scripts/create-brand-images.cjs <marca> <modelo1> <modelo2> ...');
  console.log('📋 Ejemplo: node scripts/create-brand-images.cjs BYD "Song Pro DM-i" "Dolphin Mini"');
  process.exit(1);
}

const brandName = args[0];
const modelNames = args.slice(1);

// Función para convertir nombre a slug (URL-friendly)
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Crear carpeta de la marca
const brandSlug = createSlug(brandName);
const brandDir = path.join(__dirname, '../public/images/models', brandSlug);

if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
  console.log(`📁 Carpeta creada: ${brandDir}`);
} else {
  console.log(`📁 Carpeta ya existe: ${brandDir}`);
}

// Crear archivos placeholder para cada modelo
const createdFiles = [];
const fileNames = [];

modelNames.forEach(modelName => {
  const modelSlug = createSlug(modelName);
  const fileName = `${brandSlug}-${modelSlug}-2025.jpg`;
  const filePath = path.join(brandDir, fileName);
  
  // Crear archivo placeholder vacío
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`🖼️  Creado: ${fileName}`);
    createdFiles.push(fileName);
  } else {
    console.log(`🖼️  Ya existe: ${fileName}`);
  }
  
  fileNames.push({
    modelo: modelName,
    archivo: fileName,
    ruta: `/images/models/${brandSlug}/${fileName}`
  });
});

// Generar resumen
console.log('\n✅ ¡Estructura de imágenes creada exitosamente!');
console.log(`📂 Marca: ${brandName}`);
console.log(`📁 Carpeta: public/images/models/${brandSlug}/`);
console.log(`📊 Total de archivos: ${fileNames.length}`);

console.log('\n📋 NOMBRES DE ARCHIVOS PARA SUBIR:');
console.log('=' .repeat(50));
fileNames.forEach((file, index) => {
  console.log(`${index + 1}. ${file.modelo}`);
  console.log(`   📄 Archivo: ${file.archivo}`);
  console.log(`   🌐 Ruta: ${file.ruta}`);
  console.log('');
});

console.log('💡 INSTRUCCIONES:');
console.log('1. Descarga las imágenes de los modelos');
console.log('2. Renómbralas exactamente con los nombres mostrados arriba');
console.log('3. Súbelas a la carpeta: public/images/models/' + brandSlug + '/');
console.log('4. ¡Las imágenes aparecerán automáticamente en el sitio!');

// Crear archivo de referencia
const referenceFile = path.join(brandDir, '_image-reference.txt');
const referenceContent = `REFERENCIA DE IMÁGENES - ${brandName.toUpperCase()}
Generado: ${new Date().toLocaleString('es-AR')}

CARPETA: public/images/models/${brandSlug}/

ARCHIVOS REQUERIDOS:
${fileNames.map((file, index) => 
  `${index + 1}. ${file.modelo}
   Archivo: ${file.archivo}
   Ruta web: ${file.ruta}
`).join('\n')}

INSTRUCCIONES:
1. Descargar imágenes de alta calidad (preferible 1200x800px o similar)
2. Renombrar exactamente como se indica arriba
3. Formato recomendado: JPG o PNG
4. Subir a la carpeta correspondiente
5. Las imágenes aparecerán automáticamente en el sitio

NOTA: Este archivo se puede eliminar una vez subidas las imágenes.
`;

fs.writeFileSync(referenceFile, referenceContent);
console.log(`\n📝 Archivo de referencia creado: ${brandSlug}/_image-reference.txt`);
