import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import Hero from '@/components/Hero';
import SearchBlock from '@/components/SearchBlock';
import FeaturedCatalog from '@/components/FeaturedCatalog';
import BrandPills from '@/components/BrandPills';
import FAQ from '@/components/FAQ';
import { getAllModels } from '@/lib/models';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Autos Chinos en Argentina – Marcas, Modelos y Novedades',
  description:
    'Conocé todas las marcas y modelos de autos chinos disponibles en Argentina. Información actualizada, precios de referencia, seguridad y tendencias.',
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    title: 'Autos Chinos en Argentina – Marcas, Modelos y Novedades | autoschinos.ar',
    description:
      'Conocé todas las marcas y modelos de autos chinos disponibles en Argentina.',
    url: absoluteUrl('/'),
    images: [{ url: absoluteUrl('/images/hero-bg.jpg') }],
  },
};

export default function HomePage() {
  const models = getAllModels();

  return (
    <SiteShell>
      <Hero />
      <SearchBlock models={models} />
      <FeaturedCatalog models={models} />
      <BrandPills />
      <FAQ />
    </SiteShell>
  );
}
