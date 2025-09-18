import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterableCatalog from '../components/FilterableCatalog';
import { useModels } from '../hooks/useModels';

const TestCatalog: React.FC = () => {
  const { allModels } = useModels();

  if (allModels.length === 0) {
    return (
      <>
        <SEO 
          title="Catálogo de Prueba - AutosChinos.ar"
          description="Página de prueba para el nuevo componente de catálogo filtrable."
        />
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
                <div className="grid grid-cols-6 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-gray-300 rounded h-40"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }


  return (
    <>
      <SEO 
        title="Catálogo de Prueba - AutosChinos.ar"
        description="Página de prueba para el nuevo componente de catálogo filtrable con todos los modelos de autos chinos disponibles."
        keywords="catálogo, filtros, autos chinos, prueba, SUV, pickup, sedán"
      />
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🧪 Catálogo de Prueba
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Nuevo componente de filtrado avanzado
            </p>
            <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-block">
              ⚠️ Esta es una página de prueba para testing del nuevo componente
            </p>
          </div>

          {/* Componente filtrable */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <FilterableCatalog models={allModels} />
          </div>

          {/* Información de desarrollo */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              📋 Funcionalidades implementadas:
            </h2>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>✅ Filtros horizontales con scroll</li>
              <li>✅ Filtrado por categoría (SUV, Pickup, Sedán, etc.)</li>
              <li>✅ Filtrado por transmisión (Manual/Automático)</li>
              <li>✅ Grid responsive (1-6 columnas según pantalla)</li>
              <li>✅ Múltiples filtros simultáneos</li>
              <li>✅ Navegación a detalle de modelos</li>
              <li>✅ Contador de resultados</li>
              <li>✅ Enlace al catálogo completo</li>
            </ul>
          </div>

          {/* Estadísticas */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{allModels.length}</div>
              <div className="text-gray-600">Total de modelos</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {new Set(allModels.map(m => m.brand)).size}
              </div>
              <div className="text-gray-600">Marcas disponibles</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">10</div>
              <div className="text-gray-600">Filtros disponibles</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TestCatalog;
