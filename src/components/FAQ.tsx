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
      question: '¿Cómo saber cuánto debo pagar de patente en Córdoba?',
      answer: 'El monto de la patente en Córdoba depende del valor fiscal del vehículo y el año de fabricación. Para autos chinos, generalmente se calcula sobre el valor de adquisición. Puedes consultar el monto exacto en la página web de la Dirección General de Rentas de Córdoba o acercarte a nuestras oficinas donde te ayudamos con el cálculo.'
    },
    {
      id: 2,
      question: '¿Dónde puedo financiar mi auto chino?',
      answer: 'Trabajamos con las principales entidades financieras del país. Ofrecemos financiación a través de bancos como Banco Nación, Santander, Galicia, y también con financieras especializadas en vehículos. Nuestro equipo te asesora para encontrar la mejor opción según tu perfil crediticio y capacidad de pago.'
    },
    {
      id: 3,
      question: '¿Qué garantía tienen los autos 0km?',
      answer: 'Los vehículos 0km chinos que comercializamos cuentan con garantía de fábrica que varía según la marca: Chery (3 años o 100.000 km), Geely (3 años o 100.000 km), JAC (3 años o 100.000 km), Haval (5 años o 150.000 km), BYD (6 años o 150.000 km). Además, ofrecemos garantía extendida opcional.'
    },
    {
      id: 4,
      question: '¿Puedo hacer una prueba de manejo?',
      answer: '¡Por supuesto! Todos nuestros vehículos están disponibles para prueba de manejo. Solo necesitas presentar tu licencia de conducir vigente y un comprobante de domicilio. Las pruebas se realizan con un vendedor acompañante y tienen una duración aproximada de 30 minutos. Te recomendamos agendar tu cita con anticipación.'
    },
    {
      id: 5,
      question: '¿Los repuestos son fáciles de conseguir?',
      answer: 'Sí, trabajamos con una red de distribuidores oficiales y talleres especializados. Los repuestos para autos chinos son cada vez más accesibles en Argentina. Además, muchas marcas como Chery, Geely y JAC tienen centros de servicio oficiales en las principales ciudades del país.'
    },
    {
      id: 6,
      question: '¿Qué documentación necesito para comprar un auto?',
      answer: 'Para la compra necesitas: DNI, comprobante de ingresos (últimos 3 recibos de sueldo o declaración de ganancias), comprobante de domicilio, y si es financiado, documentación adicional según la entidad financiera. Nuestro equipo te guía paso a paso en todo el proceso de documentación.'
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
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              ¿No encontrás la respuesta que buscás?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestro equipo de expertos está listo para ayudarte con cualquier consulta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contactar por WhatsApp
              </button>
              <button className="btn-secondary">
                Llamar por teléfono
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
