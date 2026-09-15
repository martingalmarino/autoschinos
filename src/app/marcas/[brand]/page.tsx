import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import ModelCard from '@/components/ModelCard';
import JsonLd from '@/components/JsonLd';
import {
  brandSlug,
  getBrandBySlug,
  getBrandNames,
  getModelsByBrand,
} from '@/lib/models';
import { getBrandDescription } from '@/lib/brand-info';
import { getBrandLogo } from '@/lib/logo-utils';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbJsonLd } from '@/lib/json-ld';

interface PageProps {
  params: Promise<{ brand: string }>;
}

export function generateStaticParams() {
  return getBrandNames().map((name) => ({ brand: brandSlug(name) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const brandName = getBrandBySlug(brand);
  if (!brandName) return { title: 'Marca no encontrada' };

  return {
    title: `${brandName} Argentina – Modelos, Precios y Fichas Técnicas`,
    description: `Conocé todos los modelos ${brandName} disponibles en Argentina: SUV, sedanes, pick-ups. Fichas técnicas y precios de referencia.`,
    alternates: { canonical: absoluteUrl(`/marcas/${brand}`) },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { brand } = await params;
  const brandName = getBrandBySlug(brand);
  if (!brandName) notFound();

  const models = getModelsByBrand(brandName);
  const description = getBrandDescription(brand, brandName);
  const logo = getBrandLogo(brandName);

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Marcas', href: '/marcas' },
        { name: brandName, href: `/marcas/${brand}` },
      ]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Marcas', path: '/marcas' },
          { name: brandName, path: `/marcas/${brand}` },
        ])}
      />

      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={`Logo ${brandName}`}
              className="w-28 h-28 object-contain rounded-full shadow-lg bg-white p-3"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Modelos {brandName}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Catálogo {brandName}
            </h2>
            <p className="text-gray-600">
              {models.length}{' '}
              {models.length === 1 ? 'modelo disponible' : 'modelos disponibles'}
            </p>
          </div>

          {models.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Todavía no hay modelos de {brandName}
              </h3>
              <p className="text-gray-600 mb-6">
                Mientras tanto podés explorar el catálogo completo.
              </p>
              <Link href="/catalogo" className="btn-primary inline-block">
                Ir al catálogo
              </Link>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
