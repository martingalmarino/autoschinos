import React from 'react';
import type { CarModel } from '@/lib/catalog';
import {
  publicHighlights,
  publicPrices,
  publicSections,
  quietEdition,
  sourceLabel,
} from '@/lib/technical/editorial';
import type { ModelSheet, Source } from '@/lib/technical/types';

interface TechnicalSheetProps {
  model: CarModel;
  sheet: ModelSheet;
}

function sourceLine(source: Source | undefined): string | undefined {
  if (!source) return undefined;
  const edition = quietEdition(source);
  const label = sourceLabel(source);
  return edition ? `${label} · ${edition}` : label;
}

export default function TechnicalSheet({ model, sheet }: TechnicalSheetProps) {
  const sources = new Map(sheet.fuentes.map((source) => [source.id, source]));
  const secciones = publicSections(sheet);
  const highlights = publicHighlights(model);
  const precios = publicPrices(sheet);
  const cited = new Set(secciones.flatMap((section) => section.hechos.map((fact) => fact.fuenteId)));
  for (const price of sheet.precios) {
    if (precios.some((item) => item.version === price.version)) cited.add(price.fuenteId);
  }
  const fuentes = sheet.fuentes.filter((source) => cited.has(source.id));

  if (!secciones.length && !highlights.length && !precios.length && !fuentes.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ficha técnica</h2>

        {highlights.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                <span className="text-green-600 mt-0.5" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {secciones.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {secciones.map((section) => (
              <article key={section.id} className="rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{section.titulo}</h3>
                {section.intro && <p className="text-sm text-gray-600 mb-3">{section.intro}</p>}
                <dl className="divide-y divide-gray-100">
                  {section.hechos.map((fact) => {
                    const source = sources.get(fact.fuenteId);
                    const line = sourceLine(source);
                    return (
                      <div
                        key={`${fact.etiqueta}-${fact.valor}`}
                        className="grid grid-cols-1 sm:grid-cols-[minmax(9rem,34%)_1fr] gap-1 sm:gap-4 py-3"
                      >
                        <dt className="text-sm font-medium text-gray-600">{fact.etiqueta}</dt>
                        <dd className="text-sm text-gray-900">
                          <span className="font-semibold">{fact.valor}</span>
                          {line && <span className="block text-xs text-gray-400 mt-1">{line}</span>}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </article>
            ))}
          </div>
        )}

        {precios.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Precios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {precios.map((price) => (
                <article key={`${price.version}-${price.amount}`} className="rounded-xl border border-gray-200 p-4">
                  <h4 className="font-bold text-gray-900">{price.version}</h4>
                  <p className="text-lg font-semibold text-gray-900 mt-2">{price.amount}</p>
                  {price.bonificado && (
                    <p className="text-sm text-gray-700 mt-1">Con bonificación: {price.bonificado}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{price.note}</p>
                  {price.condiciones && (
                    <p className="text-sm text-gray-600 mt-1">{price.condiciones}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {fuentes.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fuentes</h3>
            <ul className="space-y-3">
              {fuentes.map((source) => {
                const edition = quietEdition(source);
                return (
                  <li key={source.id} className="text-sm text-gray-700">
                    <a
                      href={source.url}
                      className="font-medium text-primary-600 underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {sourceLabel(source)}
                    </a>
                    {edition && <span className="block text-gray-500">{edition}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
