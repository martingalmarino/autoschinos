import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import {
  brandSlug,
  getAllModels,
  getModelBySlugs,
  modelSlug,
} from '@/lib/models';
import { absoluteUrl, WHATSAPP_NUMBER } from '@/lib/site';
import { breadcrumbJsonLd, vehicleJsonLd } from '@/lib/json-ld';
import { getSheet } from '@/data/technical';
import TechnicalSheet from '@/components/TechnicalSheet';
import { publicProfile } from '@/lib/technical/editorial';

interface PageProps {
  params: Promise<{ brand: string; model: string }>;
}

export function generateStaticParams() {
  return getAllModels().map((m) => ({
    brand: brandSlug(m.brand),
    model: modelSlug(m.nombre),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, model: modelParam } = await params;
  const model = getModelBySlugs(brand, modelParam);
  if (!model) return { title: 'Modelo no encontrado' };

  const profile = publicProfile(model, getSheet(model.id));
  const year = profile.anio ? ` ${profile.anio}` : '';
  const subject = profile.precios.length ? 'Precio y ficha técnica' : 'Ficha técnica';
  const title = `${model.brand} ${model.nombre}${year}: ${subject} en Argentina`;
  const description = [
    `${model.brand} ${model.nombre}${year} en Argentina.`,
    profile.descripcion,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/marcas/${brand}/${modelParam}`),
    },
    openGraph: {
      title: `${title} | autoschinos.ar`,
      images: [{ url: absoluteUrl(model.imagen) }],
    },
  };
}

export default async function ModelPage({ params }: PageProps) {
  const { brand, model: modelParam } = await params;
  const model = getModelBySlugs(brand, modelParam);
  if (!model) notFound();

  const path = `/marcas/${brand}/${modelParam}`;
  const sheet = getSheet(model.id);
  const profile = publicProfile(model, sheet);
  const facts = [
    profile.anio ? { label: 'Año', value: profile.anio } : null,
    profile.categoria ? { label: 'Categoría', value: profile.categoria } : null,
    profile.combustible ? { label: 'Combustible', value: profile.combustible } : null,
    profile.transmision ? { label: 'Transmisión', value: profile.transmision } : null,
  ].filter((fact): fact is { label: string; value: string } => fact !== null);
  const interest = [model.brand, model.nombre, profile.anio].filter(Boolean).join(' ');

  const waMessage = encodeURIComponent(
    `Hola! Quiero información sobre el ${interest}.`
  );

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Marcas', href: '/marcas' },
        { name: model.brand, href: `/marcas/${brand}` },
        { name: model.nombre, href: path },
      ]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Marcas', path: '/marcas' },
          { name: model.brand, path: `/marcas/${brand}` },
          { name: model.nombre, path },
        ])}
      />
      <JsonLd data={vehicleJsonLd(model, path)} />

      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={model.imagen}
                alt={`${model.brand} ${model.nombre}`}
                className="model-image-detail"
              />
            </div>
            <div>
              <span className="text-lg font-medium text-primary-500">
                {model.brand}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                {model.nombre}
              </h1>
              {profile.descripcion && (
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {profile.descripcion}
                </p>
              )}

              {facts.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {facts.map((fact) => (
                    <div key={fact.label} className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-sm text-gray-500">{fact.label}</span>
                      <p className="font-bold text-gray-900">{fact.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {profile.precios.length > 0 && (
                <div className="bg-primary-50 border border-primary-200 p-6 rounded-xl mb-6 space-y-3">
                  <span className="text-sm text-primary-600 font-medium">Precio</span>
                  {profile.precios.map((price) => (
                    <div key={`${price.version}-${price.amount}`}>
                      <p className="text-lg md:text-xl font-bold text-primary-600 break-words">
                        {price.amount}
                        <span className="block text-sm font-semibold text-gray-800">
                          {price.version}
                        </span>
                      </p>
                      {price.bonificado && (
                        <p className="text-sm text-gray-700">Con bonificación: {price.bonificado}</p>
                      )}
                      <p className="text-sm text-gray-600">{price.note}</p>
                      {price.condiciones && (
                        <p className="text-sm text-gray-600">{price.condiciones}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {WHATSAPP_NUMBER ? (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Consultar por WhatsApp
                </a>
              ) : (
                <Link href="/contacto" className="btn-primary inline-block">
                  Consultar
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {sheet ? <TechnicalSheet model={model} sheet={sheet} /> : null}

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Te interesa este modelo?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Seguí explorando {model.brand} o volvé al catálogo completo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/marcas/${brand}`}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg"
            >
              Ver más modelos {model.brand}
            </Link>
            <Link
              href="/catalogo"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg"
            >
              Ir al catálogo
            </Link>
          </div>
        </div>
      </section>

      <ContactForm
        vehicleOfInterest={interest}
      />
    </SiteShell>
  );
}
