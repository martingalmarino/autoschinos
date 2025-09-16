import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CatalogFilters from '../components/CatalogFilters';
import CatalogGrid from '../components/CatalogGrid';
import Pagination from '../components/Pagination';

const Catalogo: React.FC = () => {
  const [filters, setFilters] = useState({
    marca: '',
    combustible: '',
    transmision: '',
    segmento: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset a página 1 cuando cambian los filtros
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll hacia arriba cuando cambia la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular total de páginas (simulado - en una app real vendría del backend)
  const totalPages = 7;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Catálogo de Modelos
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explorá nuestra amplia selección de autos chinos. Usados y 0km disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros - Sidebar */}
            <div className="lg:w-1/4">
              <CatalogFilters onFiltersChange={handleFiltersChange} />
            </div>

            {/* Contenido principal */}
            <div className="lg:w-3/4">
              {/* Resultados header */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Resultados de búsqueda
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Página {currentPage} de {totalPages}
                    </span>
                    <select 
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Ordenar resultados"
                    >
                      <option>Ordenar por precio</option>
                      <option>Más recientes</option>
                      <option>Marca A-Z</option>
                      <option>Marca Z-A</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid de autos */}
              <CatalogGrid filters={filters} currentPage={currentPage} />

              {/* Paginación */}
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogo;
