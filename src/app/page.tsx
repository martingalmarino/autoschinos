import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import Hero from '@/components/Hero';
import SearchBlock from '@/components/SearchBlock';
import FeaturedCatalog from '@/components/FeaturedCatalog';
import BrandPills from '@/components/BrandPills';
import FAQ from '@/components/FAQ';
import GuidesTeaser from '@/components/GuidesTeaser';
import { getAllModels } from '@/lib/models';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    absolute: 'Autos Chinos Argentina 2026: Marcas, Precios y Modelos | autoschinos.ar',
  },
  description:
    'Autos chinos en Argentina 2026: marcas, precios de referencia, modelos y fichas técnicas para comparar antes de comprar.',
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    title: 'Autos Chinos Argentina 2026: Marcas, Precios y Modelos | autoschinos.ar',
    description:
      'Autos chinos en Argentina 2026: marcas, precios de referencia, modelos y fichas técnicas.',
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
      <GuidesTeaser />
      <BrandPills />
      <FAQ />
    </SiteShell>
  );
}
