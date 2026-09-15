import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { guides } from '@/lib/guides';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Guías de Autos Chinos en Argentina: Compra y Modelos',
  description:
    'Guías prácticas sobre SUV, eléctricos, marcas, precios y cómo elegir un auto chino en Argentina.',
  alternates: { canonical: absoluteUrl('/guias') },
  openGraph: {
    title: 'Guías de Autos Chinos en Argentina | autoschinos.ar',
    url: absoluteUrl('/guias'),
  },
};

export default function GuiasIndexPage() {
  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Guías', href: '/guias' },
      ]}
    >
      <section className="pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Guías de autos chinos
            </h1>
            <p className="text-lg text-gray-600">
              Contenido editorial para entender el mercado argentino: segmentos,
              electrificación, marcas y costos de uso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
              >
                <p className="text-xs font-medium text-primary-600 mb-2 uppercase tracking-wide">
                  Actualizado {guide.updatedAt}
                </p>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {guide.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                <span className="text-primary-600 font-semibold text-sm">
                  Leer guía →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
