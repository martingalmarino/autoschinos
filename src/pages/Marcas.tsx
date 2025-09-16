import React, { useState } from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
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
      <SEO 
        title="Marcas de Autos Chinos en Argentina – Guía Completa 2025"
        description="Descubrí todas las marcas chinas que se venden en Argentina. Información sobre Chery, JAC, Haval, Geely, DFSK y más fabricantes líderes del mercado."
        keywords="marcas chinas argentina, chery, jac, haval, geely, byd, dfsk, great wall, changan, fabricantes chinos"
        canonical="https://autoschinos.vercel.app/marcas"
      />
      <Navbar />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-10 pb-20" style={{ paddingTop: '2.5rem' }}>
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

      {/* Sección informativa profesional */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header de la sección */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              El futuro de la movilidad
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Las marcas chinas han revolucionado la industria automotriz global con innovación, 
              calidad y tecnología de vanguardia.
            </p>
          </div>

          {/* Grid de características */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Innovación Tecnológica */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Innovación Tecnológica</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Sistemas de conectividad avanzados, inteligencia artificial integrada y 
                tecnologías de conducción autónoma que definen el futuro del transporte.
              </p>
            </div>

            {/* Sostenibilidad */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Liderazgo Sostenible</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Pioneros mundiales en vehículos eléctricos e híbridos, con el mayor 
                ecosistema de movilidad eléctrica y tecnologías de baterías avanzadas.
              </p>
            </div>

            {/* Calidad Global */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Estándares Globales</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Certificaciones internacionales, presencia en más de 80 países y 
                alianzas estratégicas con las principales automotrices del mundo.
              </p>
            </div>
          </div>

          {/* Estadísticas destacadas */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">12+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Marcas Principales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Modelos Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">80+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Países de Presencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">#1</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">En Vehículos Eléctricos</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marcas;
