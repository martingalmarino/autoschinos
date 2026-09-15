import type { Metadata } from 'next';
import { Suspense } from 'react';
import SiteShell from '@/components/SiteShell';
import CatalogClient from '@/components/CatalogClient';
import { getAllModels } from '@/lib/models';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Catálogo de Autos Chinos en Argentina – Modelos y Fichas Técnicas',
  description:
    'Explorá el catálogo completo de autos chinos en Argentina: SUV, sedanes, pick-ups y eléctricos. Detalles de cada modelo, versiones y características.',
  alternates: { canonical: absoluteUrl('/catalogo') },
  openGraph: {
    title: 'Catálogo de Autos Chinos en Argentina | autoschinos.ar',
    url: absoluteUrl('/catalogo'),
  },
};

export default function CatalogoPage() {
  const models = getAllModels();

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Catálogo', href: '/catalogo' },
      ]}
    >
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Catálogo de Modelos
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {models.length} modelos de autos chinos con fichas técnicas, marcas y
            datos relevantes.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="text-center py-12 text-gray-600">
                Cargando catálogo…
              </div>
            }
          >
            <CatalogClient models={models} />
          </Suspense>
        </div>
      </section>
    </SiteShell>
  );
}
