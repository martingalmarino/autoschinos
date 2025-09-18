import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PoliticaCookies: React.FC = () => {
  return (
    <>
      <SEO 
        title="Política de Cookies - AutosChinos.ar"
        description="Política de cookies de autoschinos.ar. Información sobre el uso de cookies en nuestro sitio web."
      />
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Política de Cookies
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Qué son las cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario 
                  al navegar por el Sitio y permiten reconocerlo, recordar preferencias y analizar su comportamiento.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tipos de cookies utilizadas</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Cookies técnicas</h3>
                    <p className="text-gray-600">Necesarias para el correcto funcionamiento del Sitio.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Cookies de análisis</h3>
                    <p className="text-gray-600">
                      Empleadas para estadísticas de uso y mejora de la experiencia (ejemplo: Google Analytics).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Cookies publicitarias</h3>
                    <p className="text-gray-600">
                      Pueden emplearse para mostrar anuncios relevantes a través de redes de 
                      Google AdSense u otros proveedores.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  El usuario puede configurar su navegador para aceptar o rechazar cookies. 
                  No obstante, la desactivación de algunas podría afectar el correcto funcionamiento del Sitio.
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

export default PoliticaCookies;
