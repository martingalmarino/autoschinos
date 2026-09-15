import type { MetadataRoute } from 'next';
import {
  brandSlug,
  getAllModels,
  getBrandNames,
  modelSlug,
} from '@/lib/models';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/catalogo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/marcas`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/terminos-condiciones`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/politica-privacidad`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/politica-cookies`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/aviso-legal`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const brandRoutes: MetadataRoute.Sitemap = getBrandNames().map((brand) => ({
    url: `${SITE_URL}/marcas/${brandSlug(brand)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const modelRoutes: MetadataRoute.Sitemap = getAllModels().map((model) => ({
    url: `${SITE_URL}/marcas/${brandSlug(model.brand)}/${modelSlug(model.nombre)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...brandRoutes, ...modelRoutes];
}
