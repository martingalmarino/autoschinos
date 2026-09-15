import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import BrandGrid from '@/components/BrandGrid';
import {
  getTotalBrandCount,
  getTotalModelCount,
} from '@/lib/models';
import { absoluteUrl } from '@/lib/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Marcas de Autos Chinos en Argentina: Guía y Modelos',
  description:
    'Guía de marcas de autos chinos en Argentina: Chery, JAC, Haval, Geely, BYD, DFSK y más, con modelos y fichas técnicas.',
  alternates: { canonical: absoluteUrl('/marcas') },
  openGraph: {
    title: 'Marcas de Autos Chinos en Argentina: Guía y Modelos | autoschinos.ar',
    url: absoluteUrl('/marcas'),
  },
};

export default function MarcasPage() {
  const brandCount = getTotalBrandCount();
  const modelCount = getTotalModelCount();

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Marcas', href: '/marcas' },
      ]}
    >
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Marcas de Autos Chinos
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {brandCount} marcas y {modelCount} modelos con información técnica
            en Argentina.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm border text-sm font-medium text-gray-600">
              Mostrando {brandCount} marcas
            </span>
          </div>
          <BrandGrid />
          <div className="text-center mt-12">
            <Link href="/catalogo" className="btn-primary inline-block">
              Ir al catálogo completo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Información clara, sin promesas inventadas
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Nuestro objetivo es ayudarte a comparar marcas y modelos chinos con
            fichas técnicas y precios de referencia actualizados.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-3xl font-bold text-white">{brandCount}</p>
              <p className="text-slate-300 text-sm mt-1">Marcas</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-3xl font-bold text-white">{modelCount}</p>
              <p className="text-slate-300 text-sm mt-1">Modelos</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-3xl font-bold text-white">AR</p>
              <p className="text-slate-300 text-sm mt-1">Enfoque Argentina</p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
