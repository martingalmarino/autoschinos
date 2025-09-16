import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BrandGrid from '../components/BrandGrid';

const Marcas: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBrands] = useState(12); // Total de marcas disponibles
  const brandsPerPage = 9;
  const totalPages = Math.ceil(totalBrands / brandsPerPage);
  const hasMoreBrands = currentPage < totalPages;

  const handleLoadMore = () => {
    if (hasMoreBrands) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Marcas de Autos Chinos
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conocé todas las marcas chinas disponibles en Argentina y sus características distintivas.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Información de marcas */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm border">
              <span className="text-sm font-medium text-gray-600">
                Mostrando {Math.min(currentPage * brandsPerPage, totalBrands)} de {totalBrands} marcas
              </span>
            </div>
          </div>

          {/* Grid de marcas */}
          <BrandGrid currentPage={currentPage} />

          {/* Controles de paginación */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {/* Botón Volver Atrás */}
              {currentPage > 1 && (
                <button 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  ← MOSTRAR MENOS
                </button>
              )}

              {/* Botón Cargar Más */}
              {hasMoreBrands && (
                <button 
                  onClick={handleLoadMore}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  CARGAR MÁS →
                </button>
              )}
            </div>

            {/* Mensaje cuando se muestran todas */}
            {!hasMoreBrands && currentPage === 1 && (
              <p className="text-gray-600 bg-white rounded-full px-6 py-3 inline-block shadow-sm border mt-4">
                ✨ Todas las marcas están siendo mostradas
              </p>
            )}

            {/* Mensaje cuando se llegó al final */}
            {!hasMoreBrands && currentPage > 1 && (
              <p className="text-gray-600 bg-white rounded-full px-6 py-3 inline-block shadow-sm border mt-4">
                ✨ Has visto todas las marcas disponibles
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Sección informativa adicional */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Por qué elegir marcas chinas?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Excelente relación precio-calidad</h3>
                <p className="text-gray-600">Tecnología avanzada a precios accesibles</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tecnología moderna</h3>
                <p className="text-gray-600">Innovación en conectividad y sistemas de seguridad</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enfoque ecológico</h3>
                <p className="text-gray-600">Líderes en vehículos eléctricos e híbridos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marcas;
