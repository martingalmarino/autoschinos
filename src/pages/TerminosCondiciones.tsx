import React from 'react';
import SEO from '../components/SEO';

const TerminosCondiciones: React.FC = () => {
  return (
    <>
      <SEO 
        title="Términos y Condiciones - AutosChinos.ar"
        description="Términos y condiciones de uso del sitio web autoschinos.ar. Conocé las reglas y condiciones para el uso de nuestro portal de autos chinos."
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Términos y Condiciones
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introducción</h2>
                <p className="text-gray-600 leading-relaxed">
                  El presente documento regula el uso del sitio web autoschinos.ar (en adelante, "el Sitio"), 
                  de propiedad de Autos Chinos Argentina. Al acceder y utilizar el Sitio, el usuario acepta 
                  los términos aquí expuestos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uso del Sitio</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>El acceso es libre y gratuito, salvo los costes de conexión a internet.</li>
                  <li>El usuario se compromete a utilizar el Sitio de manera lícita, sin vulnerar derechos de terceros ni las leyes vigentes en Argentina.</li>
                  <li>Queda prohibido introducir virus, intentar acceder a datos restringidos o realizar actividades que puedan dañar el Sitio.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contenido y Propiedad Intelectual</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Todos los textos, imágenes, logotipos y bases de datos del Sitio son propiedad de Autos Chinos Argentina o de sus legítimos titulares, protegidos por la legislación de propiedad intelectual.</li>
                  <li>Está prohibida su reproducción total o parcial sin autorización expresa.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Responsabilidad</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>El Sitio ofrece información sobre marcas y modelos de automóviles de origen chino. Aunque se procura mantener la información actualizada, no se garantiza la exactitud total de precios o especificaciones.</li>
                  <li>El Sitio no se hace responsable por el uso que los usuarios hagan de la información publicada ni por los enlaces externos que puedan aparecer.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modificaciones</h2>
                <p className="text-gray-600 leading-relaxed">
                  Autos Chinos Argentina se reserva el derecho a modificar en cualquier momento los presentes 
                  Términos y Condiciones, siendo responsabilidad del usuario revisarlos periódicamente.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Última actualización: {new Date().toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminosCondiciones;
