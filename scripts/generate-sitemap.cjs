const fs = require('fs');
const path = require('path');

// Importar datos de modelos
const modelsData = require('../src/data/models.json');

const baseUrl = 'https://www.autoschinos.ar';
const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

// Páginas estáticas
const staticPages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: currentDate
  },
  {
    url: '/catalogo',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: currentDate
  },
  {
    url: '/marcas',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: currentDate
  },
  {
    url: '/terminos-condiciones',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: currentDate
  },
  {
    url: '/politica-privacidad',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: currentDate
  },
  {
    url: '/politica-cookies',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: currentDate
  },
  {
    url: '/aviso-legal',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: currentDate
  }
];

// Generar URLs dinámicas
const dynamicPages = [];

// Páginas de marcas y modelos
Object.entries(modelsData).forEach(([brandName, brandData]) => {
  const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-');
  
  // Página de marca
  dynamicPages.push({
    url: `/marcas/${brandSlug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: currentDate
  });

  // Páginas de modelos
  brandData.modelos.forEach((modelo) => {
    const modelSlug = modelo.nombre.toLowerCase().replace(/\s+/g, '-');
    dynamicPages.push({
      url: `/marcas/${brandSlug}/${modelSlug}`,
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: currentDate
    });
  });
});

// Combinar todas las páginas
const allPages = [...staticPages, ...dynamicPages];

// Generar XML del sitemap
const generateSitemap = (pages) => {
  const urls = pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

// Generar y escribir el sitemap
const sitemapContent = generateSitemap(allPages);
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');

console.log(`✅ Sitemap generado exitosamente!`);
console.log(`📁 Ubicación: ${sitemapPath}`);
console.log(`📊 Total de URLs: ${allPages.length}`);
console.log(`   - Páginas estáticas: ${staticPages.length}`);
console.log(`   - Páginas de marcas: ${Object.keys(modelsData).length}`);
console.log(`   - Páginas de modelos: ${dynamicPages.length - Object.keys(modelsData).length}`);
console.log(`🌐 Sitemap disponible en: ${baseUrl}/sitemap.xml`);
