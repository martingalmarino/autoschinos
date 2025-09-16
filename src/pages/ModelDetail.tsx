import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';
import { useModels } from '../hooks/useModels';

const ModelDetail: React.FC = () => {
  const { brandName, modelName } = useParams<{ brandName: string; modelName: string }>();
  const { allModels } = useModels();
  
  const model = allModels.find(m => 
    m.brand.toLowerCase() === brandName?.toLowerCase() && 
    m.nombre.toLowerCase() === modelName?.toLowerCase()
  );

  if (!model) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumbs />
        <div className="pt-20 pb-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Modelo no encontrado</h1>
          <p className="text-gray-600 mt-4">El modelo que buscás no existe o fue removido.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${model.brand} ${model.nombre} ${model.año} – Ficha Técnica y Características`}
        description={`${model.descripcion} Conocé todas las especificaciones, características y precio del ${model.brand} ${model.nombre} ${model.año}.`}
        keywords={`${model.brand.toLowerCase()}, ${model.nombre.toLowerCase()}, ${model.año}, ${model.categoria.toLowerCase()}, ficha tecnica, especificaciones`}
        canonical={`https://www.autoschinos.ar/marcas/${brandName}/${modelName}`}
      />
      <Navbar />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagen del modelo */}
            <div className="relative">
              <img
                src={model.imagen}
                alt={`${model.brand} ${model.nombre}`}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Más visto
                </span>
              </div>
            </div>

            {/* Información principal */}
            <div>
              <div className="mb-6">
                <span className="text-lg font-medium text-primary-500">{model.brand}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                  {model.nombre}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {model.descripcion}
                </p>
              </div>

              {/* Información básica */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-500">Año</span>
                  <p className="font-bold text-gray-900">{model.año}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-500">Categoría</span>
                  <p className="font-bold text-gray-900">{model.categoria}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-500">Combustible</span>
                  <p className="font-bold text-gray-900">{model.combustible}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-500">Transmisión</span>
                  <p className="font-bold text-gray-900">{model.transmision}</p>
                </div>
              </div>

              {/* Precio */}
              <div className="bg-primary-50 border border-primary-200 p-6 rounded-xl mb-6">
                <span className="text-sm text-primary-600 font-medium">Precio de referencia</span>
                <p className="text-2xl font-bold text-primary-600">{model.precio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Especificaciones técnicas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Especificaciones */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Especificaciones Técnicas</h2>
              <div className="space-y-4">
                {Object.entries(model.especificaciones).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Características */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Características y Equipamiento</h2>
              <div className="grid grid-cols-1 gap-3">
                {model.caracteristicas.map((caracteristica, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Te interesa este modelo?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explorá más modelos de {model.brand} o volvé al catálogo completo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              onClick={() => window.location.href = `/marcas/${brandName}`}
            >
              Ver más modelos {model.brand}
            </button>
            <button 
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              onClick={() => window.location.href = `/marcas/${brandName}`}
            >
              Volver a {model.brand}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ModelDetail;
