import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import SavingsCalculator from '@/components/SavingsCalculator';
import {
  getCombustionModels,
  getElectrifiedModels,
} from '@/lib/efficiency';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Calculadora Ahorro Auto Eléctrico e Híbrido Argentina',
  description:
    'Calculá cuánto podés ahorrar con autos chinos eléctricos e híbridos vs nafta o diésel. Multi-marca, parámetros editables y modelos reales del catálogo.',
  alternates: { canonical: absoluteUrl('/calculadora-ahorro') },
  openGraph: {
    title:
      'Calculadora Ahorro Auto Eléctrico e Híbrido Argentina | autoschinos.ar',
    url: absoluteUrl('/calculadora-ahorro'),
  },
};

export default function CalculadoraAhorroPage() {
  const electrified = getElectrifiedModels();
  const combustion = getCombustionModels();

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Calculadora de ahorro', href: '/calculadora-ahorro' },
      ]}
    >
      <section className="pt-10 pb-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculá tu ahorro energético
          </h1>
          <p className="text-lg text-gray-600 mb-3">
            Compará el costo de uso de un auto chino eléctrico o híbrido del
            catálogo frente a un naftero o diésel publicado en autoschinos.ar.
          </p>
          <p className="text-sm text-gray-500">
            Superior a las calculadoras de una sola marca: multi-marca, kWh
            editable, desglose y proyección a varios años.{' '}
            <Link href="/guias/autos-chinos-electricos-hibridos" className="text-primary-600 underline">
              Leer guía de electrificados
            </Link>
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <p className="text-center text-gray-600 py-12">
                Cargando calculadora…
              </p>
            }
          >
            <SavingsCalculator
              electrifiedModels={electrified}
              combustionModels={combustion}
            />
          </Suspense>

          <p className="mt-10 text-xs text-gray-500 text-center max-w-3xl mx-auto leading-relaxed">
            Estimación referencial de costo de energía/combustible. No incluye
            patente, seguro, mantenimiento ni precio de compra. Los consumos
            pueden ser estimados por segmento cuando la ficha no los publica.
            Los resultados varían según tarifas, estilo de manejo y versión del
            vehículo. Ver{' '}
            <Link href="/aviso-legal" className="underline">
              Aviso legal
            </Link>
            .
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
