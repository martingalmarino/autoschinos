import React from 'react';
import SEO from '../components/SEO';

const PoliticaPrivacidad: React.FC = () => {
  return (
    <>
      <SEO 
        title="Política de Privacidad - AutosChinos.ar"
        description="Política de privacidad de autoschinos.ar. Conocé cómo recopilamos, utilizamos y protegemos tus datos personales."
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Política de Privacidad
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recopilación de datos</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>El Sitio recopila datos personales únicamente cuando el usuario los proporciona de forma voluntaria (por ejemplo, al enviar formularios de contacto o suscribirse a boletines).</li>
                  <li>También se utilizan herramientas automáticas como cookies para analizar la navegación y mejorar la experiencia del usuario.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uso de los datos</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Los datos podrán emplearse para responder consultas, enviar comunicaciones relacionadas con el Sitio o mejorar los servicios ofrecidos.</li>
                  <li>No se venderán, cederán ni transferirán a terceros sin consentimiento expreso, salvo obligación legal.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Derechos del usuario</h2>
                <p className="text-gray-600 leading-relaxed">
                  El usuario puede ejercer sus derechos de acceso, rectificación, cancelación y oposición 
                  enviando un correo a{' '}
                  <a 
                    href="mailto:contacto@autoschinos.ar" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    contacto@autoschinos.ar
                  </a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seguridad</h2>
                <p className="text-gray-600 leading-relaxed">
                  Se aplican medidas técnicas razonables para proteger la información recopilada, 
                  si bien no se puede garantizar seguridad absoluta en internet.
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

export default PoliticaPrivacidad;
