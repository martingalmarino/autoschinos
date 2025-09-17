import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';
import CatalogFilters from '../components/CatalogFilters';
import CatalogGrid from '../components/CatalogGrid';
import Pagination from '../components/Pagination';

const Catalogo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    marca: '',
    combustible: '',
    transmision: '',
    segmento: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Leer parámetros de búsqueda de la URL al cargar el componente
  useEffect(() => {
    const marca = searchParams.get('marca') || '';
    const modelo = searchParams.get('modelo') || '';
    
    if (marca || modelo) {
      setFilters(prev => ({
        ...prev,
        marca: marca,
        // Si hay un modelo específico, podríamos agregarlo como filtro adicional
        // Por ahora solo usamos la marca
      }));
    }
  }, [searchParams]);

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
      <SEO 
        title="Catálogo de Autos Chinos en Argentina – Modelos y Fichas Técnicas"
        description="Explorá el catálogo completo de autos chinos en Argentina: SUV, sedanes, pick-ups y eléctricos. Detalles de cada modelo, versiones y características."
        keywords="catalogo autos chinos, modelos chinos argentina, suv chinos, sedanes chinos, pickups chinos, electricos chinos"
        canonical="https://www.autoschinos.ar/catalogo"
      />
      <Navbar />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Catálogo de Modelos
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conocé la variedad de modelos de autos chinos en el mercado argentino: fichas técnicas, marcas y datos relevantes.
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
                {/* Título principal */}
                <div className="mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Resultados de búsqueda
                  </h2>
                </div>
                
                {/* Controles responsive */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  {/* Información de página */}
                  <div className="flex items-center justify-center sm:justify-start">
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                      Página {currentPage} de {totalPages}
                    </span>
                  </div>
                  
                  {/* Selector de ordenamiento */}
                  <div className="w-full sm:w-auto">
                    <select 
                      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
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
