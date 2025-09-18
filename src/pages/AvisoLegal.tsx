import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AvisoLegal: React.FC = () => {
  return (
    <>
      <SEO 
        title="Aviso Legal - AutosChinos.ar"
        description="Aviso legal de autoschinos.ar. Información legal sobre el sitio web y sus condiciones de uso."
      />
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Aviso Legal
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Identificación del titular</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Titular:</strong> Autos Chinos Argentina</li>
                  <li><strong>Sitio web:</strong> <a href="https://www.autoschinos.ar/" className="text-blue-600 hover:text-blue-800 underline">https://www.autoschinos.ar/</a></li>
                  <li><strong>Email de contacto:</strong> <a href="mailto:contacto@autoschinos.ar" className="text-blue-600 hover:text-blue-800 underline">contacto@autoschinos.ar</a></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Objeto</h2>
                <p className="text-gray-600 leading-relaxed">
                  El Aviso Legal regula el acceso, navegación y uso del Sitio. 
                  El acceso implica la aceptación sin reservas del presente documento.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exclusión de garantías y responsabilidad</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>El Sitio se ofrece "tal cual", sin garantías de ningún tipo.</li>
                  <li>Autos Chinos Argentina no se responsabiliza por daños derivados del uso indebido del Sitio ni por la información proporcionada por terceros a través de enlaces externos.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legislación aplicable</h2>
                <p className="text-gray-600 leading-relaxed">
                  Las presentes condiciones se rigen por la legislación de la República Argentina. 
                  Cualquier controversia se someterá a los tribunales ordinarios de la ciudad de Córdoba.
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
      <Footer />
    </>
  );
};

export default AvisoLegal;
