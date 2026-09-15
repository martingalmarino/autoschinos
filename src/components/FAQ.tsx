'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { getTotalBrandCount, getTotalModelCount } from '@/lib/models';
import JsonLd from '@/components/JsonLd';
import { faqJsonLd } from '@/lib/json-ld';

export const faqItems = [
  {
    id: 1,
    question: '¿Qué marcas chinas de autos hay en Argentina?',
    answer: `En este portal reunimos información de ${getTotalBrandCount()} marcas chinas con presencia o disponibilidad de datos en Argentina, entre ellas Chery, Geely, BYD, Haval, JAC, DFSK, Great Wall, Changan, MG, BAIC, Foton, FAW, Dongfeng y Lifan.`,
  },
  {
    id: 2,
    question: '¿Cuál es la mejor marca de coches china?',
    answer:
      'No hay una única respuesta: depende del uso, presupuesto y preferencia por combustión, híbrido o eléctrico. BYD, Chery, Geely y Great Wall suelen destacarse por tecnología, volumen o trayectoria.',
  },
  {
    id: 3,
    question: '¿Cuáles son los autos chinos más accesibles en Argentina?',
    answer:
      'Suelen ser SUV compactos o versiones base de marcas como Chery y JAC. Los precios de referencia varían según tipo de cambio y equipamiento: consultá cada ficha del catálogo.',
  },
  {
    id: 4,
    question: '¿Cuántos modelos hay en el catálogo?',
    answer: `Actualmente el catálogo de autoschinos.ar incluye ${getTotalModelCount()} modelos con fichas técnicas y precios de referencia.`,
  },
  {
    id: 5,
    question: '¿Los precios son oficiales?',
    answer:
      'Los precios publicados son de referencia informativa y pueden cambiar. Siempre confirmá valores actualizados con concesionarios o importadores oficiales.',
  },
  {
    id: 6,
    question: '¿Hay autos chinos eléctricos en Argentina?',
    answer:
      'Sí. Marcas como BYD lideran la oferta de eléctricos e híbridos. En el catálogo podés filtrar por combustible para ver opciones electrificadas.',
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-white scroll-mt-28">
      <JsonLd
        data={faqJsonLd(
          faqItems.map(({ question, answer }) => ({ question, answer }))
        )}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Respuestas claras sobre autos chinos en Argentina
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(item.id) ? (
                    <ChevronUpIcon className="h-5 w-5 text-primary-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              ¿Tenés más preguntas?
            </h3>
            <p className="text-gray-600 mb-6">
              Escribinos o explorá el catálogo completo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogo" className="btn-primary text-center">
                Ver catálogo completo
              </Link>
              <Link href="/contacto" className="btn-secondary text-center">
                Ir a contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
