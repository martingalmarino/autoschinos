import React from 'react';
import type { CarModel } from '@/lib/models';
import type { Fact, ModelSheet, PriceQuote, Source } from '@/lib/technical/types';
import { CONSULTA_FECHA } from '@/lib/technical/types';

interface TechnicalSheetProps {
  model: CarModel;
  sheet: ModelSheet;
}

const PRECIO_ESTADO: Record<PriceQuote['estado'], string> = {
  'lista-fechada': 'Lista fechada',
  'observado-sin-vencimiento': 'Observado, sin vencimiento comprobado',
  historico: 'Histórico',
  'secundario-sin-vigencia': 'Referencia secundaria sin vigencia',
  'prensa-sin-condiciones': 'Prensa, sin condiciones completas',
};

function money(moneda: PriceQuote['moneda'], value: number): string {
  return `${moneda} ${new Intl.NumberFormat('es-AR').format(value)}`;
}

function Facts({ hechos, sources }: { hechos: Fact[]; sources: Map<string, Source> }) {
  if (!hechos.length) return null;
  return (
    <dl className="divide-y divide-gray-100">
      {hechos.map((fact) => {
        const source = sources.get(fact.fuenteId);
        return (
          <div
            key={`${fact.etiqueta}-${fact.valor}`}
            className="grid grid-cols-1 sm:grid-cols-[minmax(9rem,34%)_1fr] gap-1 sm:gap-4 py-3"
          >
            <dt className="text-sm font-medium text-gray-600">{fact.etiqueta}</dt>
            <dd className="text-sm text-gray-900">
              <span className="font-semibold">{fact.valor}</span>
              {fact.estado === 'historico' && (
                <span className="ml-2 inline-block align-middle text-[11px] font-medium uppercase tracking-wide text-amber-800 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                  Fuente histórica
                </span>
              )}
              {fact.nota && <span className="block text-xs text-gray-500 mt-1">{fact.nota}</span>}
              {source && (
                <span className="block text-xs text-gray-400 mt-1">
                  {source.titulo} · edición {source.edicion}
                </span>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export default function TechnicalSheet({ model, sheet }: TechnicalSheetProps) {
  const sources = new Map(sheet.fuentes.map((source) => [source.id, source]));
  const secciones = sheet.secciones.filter((section) => section.hechos.length > 0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Ficha técnica</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{sheet.correspondencia}</p>
        <p className="text-sm text-gray-500 mb-8">
          Consulta del relevamiento: {CONSULTA_FECHA}, Argentina (UTC−3). Esa fecha no es la
          vigencia de cada lista ni el año-modelo.
        </p>

        {model.identidadAviso && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            {model.identidadAviso}
          </div>
        )}

        {model.caracteristicas.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Datos que sí cubre la fuente</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {model.caracteristicas.map((item) => (
                <li key={item} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                  <span className="text-green-600 mt-0.5" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Si un equipo no aparece, la fuente usada no lo confirmó. No significa que el vehículo no lo tenga.
            </p>
          </div>
        )}

        {secciones.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {secciones.map((section) => (
              <article key={section.id} className="rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{section.titulo}</h3>
                {section.intro && <p className="text-sm text-gray-600 mb-3">{section.intro}</p>}
                <Facts hechos={section.hechos} sources={sources} />
              </article>
            ))}
          </div>
        )}

        {sheet.precios.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Precios con versión y fecha</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sheet.precios.map((quote) => (
                <article key={`${quote.version}-${quote.lista}`} className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
                    {PRECIO_ESTADO[quote.estado]}
                  </p>
                  <h4 className="font-bold text-gray-900 mt-1">{quote.version}</h4>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {quote.lista != null ? money(quote.moneda, quote.lista) : 'Sin monto de lista'}
                    {quote.bonificado != null && (
                      <span className="block text-sm font-medium text-gray-600">
                        Bonificado o final: {money(quote.moneda, quote.bonificado)}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Fecha de lista: {quote.fechaLista}.</p>
                  <p className="text-sm text-gray-600 mt-1">{quote.vigencia}</p>
                  {quote.exclusiones && (
                    <p className="text-sm text-gray-600 mt-1">Exclusiones: {quote.exclusiones}</p>
                  )}
                  {quote.nota && <p className="text-sm text-gray-600 mt-1">{quote.nota}</p>}
                </article>
              ))}
            </div>
          </div>
        )}

        {sheet.conflictos.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Conflictos sin cerrar</h3>
            <ul className="space-y-2">
              {sheet.conflictos.map((item) => (
                <li key={item} className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {sheet.pendientes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pendiente de confirmar</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {sheet.pendientes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {sheet.fuentes.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fuentes</h3>
            <ul className="space-y-3">
              {sheet.fuentes.map((source) => (
                <li key={source.id} className="text-sm text-gray-700">
                  <a
                    href={source.url}
                    className="font-medium text-primary-600 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.titulo}
                  </a>
                  <span className="block text-gray-500">
                    {source.tipo} · edición o fecha de la fuente: {source.edicion} · consulta {source.consulta}
                  </span>
                  {source.nota && <span className="block text-gray-500">{source.nota}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
