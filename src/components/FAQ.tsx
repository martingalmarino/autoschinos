import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '¿Qué marcas chinas de autos hay en Argentina?',
      answer: 'En Argentina se comercializan alrededor de 17 marcas chinas de autos, entre ellas: Chery, Changan, JAC Motors, DFSK, FAW, Great Wall, Jetour, Haval, Skywell, Baic, Foton, KyC, Victory, Shineray, Maxus y Geely.'
    },
    {
      id: 2,
      question: '¿Cuál es la mejor marca de coches china?',
      answer: 'No existe una respuesta única, depende del criterio: si es por volumen, tecnología eléctrica o confiabilidad. Marcas como BYD, Chery, Geely y Great Wall son frecuentemente destacadas por buen desempeño, innovación y crecimiento.'
    },
    {
      id: 3,
      question: '¿Cuáles son los autos chinos más baratos en Argentina?',
      answer: 'Algunos de los autos chinos más accesibles en Argentina son modelos compactos o SUVs base de marcas como Chery; por ejemplo el Chery Tiggo 4 PRO Comfort aparece entre los más económicos.'
    },
    {
      id: 4,
      question: '¿Cuál es la marca de coches más vendida en China?',
      answer: 'La marca más vendida en China actualmente es BYD.'
    },
    {
      id: 5,
      question: '¿Cuántas marcas de autos fabrica China?',
      answer: 'Se estima que hay cerca de 150 marcas de autos diferentes operando en China: unas 97 marcas locales, unas 43 marcas conjuntas (joint-ventures), y el resto extranjeras o colaboraciones.'
    },
    {
      id: 6,
      question: '¿Cuál es el auto chino más seguro?',
      answer: 'El BYD Dolphin Plus es hasta ahora el primer auto chino eléctrico que logró 5 estrellas en los test de Latin NCAP, convirtiéndose en referente de seguridad.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            Encontrá respuestas a las consultas más comunes sobre autos chinos
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="card overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
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
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="rounded-lg p-8" style={{ background: 'linear-gradient(to right, #f5f5f5 0%, #fafafa 60%, #ffffff 100%)' }}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              ¿Tenés más preguntas sobre autos chinos?
            </h3>
            <p className="text-gray-600 mb-6">
              Explorá nuestro catálogo completo o conocé más sobre las marcas disponibles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-primary"
                onClick={() => window.location.href = '/catalogo'}
              >
                Ver catálogo completo
              </button>
              <button 
                className="btn-secondary"
                onClick={() => window.location.href = '/marcas'}
              >
                Explorar marcas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
