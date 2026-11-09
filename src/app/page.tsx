import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import Hero from '@/components/Hero';
import SearchBlock from '@/components/SearchBlock';
import FeaturedCatalog from '@/components/FeaturedCatalog';
import BrandPills from '@/components/BrandPills';
import FAQ from '@/components/FAQ';
import BlogTeaser from '@/components/BlogTeaser';
import { getPosts } from '@/lib/blog';
import CalculatorTeaser from '@/components/CalculatorTeaser';
import { getAllModels, getTotalBrandCount, getTotalModelCount } from '@/lib/models';
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
      <CalculatorTeaser />
      <BlogTeaser posts={getPosts()} />
      <BrandPills />
      <FAQ brandCount={getTotalBrandCount()} modelCount={getTotalModelCount()} />
    </SiteShell>
  );
}
