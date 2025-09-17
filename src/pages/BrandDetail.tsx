import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';
import { useModels } from '../hooks/useModels';

const BrandDetail: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const { getModelsByBrand } = useModels();
  
  // Información de marcas
  const brandInfo: { [key: string]: { name: string; description: string; logo: string; color: string } } = {
    'jac': {
      name: 'JAC',
      description: 'JAC Motors es una de las marcas chinas más importantes en Argentina, ofreciendo vehículos de alta calidad con tecnología moderna y precios competitivos. Desde SUV familiares hasta pick-ups robustas, JAC combina diseño, confort y eficiencia.',
      logo: '/images/brands/logos/jac-logo.png',
      color: '#FF6347'
    },
    'chery': {
      name: 'Chery',
      description: 'Chery es una de las marcas chinas más reconocidas en Argentina, destacándose por su innovación tecnológica y diseño moderno. Con el Tiggo 4 Pro, Chery ofrece un SUV compacto que combina elegancia, confort y tecnología de vanguardia a precios accesibles.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRTExRDQ4Ii8+Cjwvc3ZnPg==',
      color: '#E11D48'
    },
    'geely': {
      name: 'Geely',
      description: 'Geely es una de las marcas chinas más innovadoras en Argentina, reconocida por su compromiso con la tecnología y el diseño moderno. Con modelos como el Emgrand GS y Emgrand X7 Sport, Geely ofrece SUV que combinan elegancia, confort y tecnología de vanguardia.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMDA1NkIzIi8+Cjwvc3ZnPg==',
      color: '#0056B3'
    },
    'dfsk': {
      name: 'DFSK',
      description: 'DFSK es una marca china especializada en vehículos comerciales y SUV en Argentina, ofreciendo soluciones versátiles para el trabajo y la familia. Con una amplia gama que incluye pick-ups robustas, utilitarios prácticos y SUV confortables, DFSK combina funcionalidad y tecnología a precios accesibles.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjOEI1Q0IwIi8+Cjwvc3ZnPg==',
      color: '#8B5CB0'
    },
    'baic': {
      name: 'BAIC',
      description: 'BAIC es una de las marcas chinas más prestigiosas en Argentina, reconocida por su innovación tecnológica y diseño de vanguardia. Con una amplia gama que incluye SUV familiares y sedanes elegantes, BAIC combina confort, tecnología y rendimiento a precios competitivos.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPg==',
      color: '#6B7280'
    },
    'foton': {
      name: 'Foton',
      description: 'Foton es una marca china especializada en vehículos comerciales y pick-ups en Argentina, ofreciendo soluciones robustas y confiables para el trabajo. Con una amplia gama que incluye pick-ups de cabina simple y doble, así como utilitarios, Foton combina durabilidad, capacidad de carga y tecnología a precios accesibles.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPg==',
      color: '#6B7280'
    },
    'shineray': {
      name: 'Shineray',
      description: 'Shineray es una marca china especializada en vehículos comerciales compactos en Argentina, ofreciendo soluciones prácticas y eficientes para el trabajo urbano. Con una gama que incluye pick-ups compactas de cabina simple y doble, así como utilitarios versátiles, Shineray combina funcionalidad, economía y tecnología a precios muy accesibles.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRUY0NDQ0Ii8+Cjwvc3ZnPg==',
      color: '#EF4444'
    },
    'haval': {
      name: 'Haval',
      description: 'Haval es una marca china de vanguardia en Argentina, especializada en SUV de alta gama con tecnología híbrida y eléctrica. Con modelos como el H6, Jolion y ORA 3, Haval combina diseño moderno, innovación tecnológica y eficiencia energética, ofreciendo soluciones sustentables para el futuro de la movilidad.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNjM3NDg3Ii8+Cjwvc3ZnPg==',
      color: '#637487'
    },
    'great-wall': {
      name: 'Great Wall',
      description: 'Great Wall es una marca china de prestigio en Argentina, reconocida por su compromiso con la calidad y la innovación tecnológica. Con modelos como el Poer y Wingle 7, Great Wall ofrece vehículos robustos y confiables que combinan durabilidad, confort y tecnología de vanguardia a precios competitivos.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPg==',
      color: '#6B7280'
    },
    'swm': {
      name: 'SWM',
      description: 'SWM es una marca que combina la elegancia italiana con la tecnología china, ofreciendo vehículos de alta calidad en Argentina. Con modelos como el G01 y X7, SWM representa la perfecta fusión entre diseño europeo y confiabilidad asiática, brindando una experiencia de conducción premium a precios accesibles.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjOUM0MEIzIi8+Cjwvc3ZnPg==',
      color: '#9C40B3'
    },
    'changan': {
      name: 'Changan',
      description: 'Changan es una de las marcas automotrices más importantes de China, reconocida por su innovación tecnológica y calidad de construcción. En Argentina, Changan ofrece una gama de vehículos utilitarios y pick-ups que combinan funcionalidad, durabilidad y tecnología de vanguardia para satisfacer las necesidades del mercado local.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjOUM0MEIzIi8+Cjwvc3ZnPg==',
      color: '#9C40B3'
    },
    'kyc': {
      name: 'KYC',
      description: 'KYC es una marca china especializada en vehículos utilitarios y comerciales, reconocida por su compromiso con la funcionalidad y la durabilidad. En Argentina, KYC ofrece la línea Mamut, una gama de vehículos utilitarios que combinan versatilidad, capacidad de carga y tecnología moderna para satisfacer las necesidades del mercado empresarial y comercial local.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMDU5NjY5Ii8+Cjwvc3ZnPg==',
      color: '#059669'
    },
    'jetour': {
      name: 'Jetour',
      description: 'Jetour es una marca china de vanguardia que se destaca por su diseño innovador y tecnología de punta. En Argentina, Jetour ofrece una gama de SUV que combinan elegancia, confort y rendimiento excepcional. Con modelos como el Dashing, T1, X70 y X70 Plus, Jetour representa la perfecta fusión entre estilo contemporáneo y funcionalidad avanzada para el mercado argentino.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMTQ5NEFBIi8+Cjwvc3ZnPg==',
      color: '#1494AA'
    },
    'faw': {
      name: 'FAW',
      description: 'FAW (First Automobile Works) es una de las marcas automotrices más antiguas y prestigiosas de China, con más de 60 años de experiencia en la industria. En Argentina, FAW ofrece una gama de vehículos que combinan la robustez tradicional china con tecnología moderna, incluyendo pick-ups confiables y SUV elegantes que satisfacen las necesidades del mercado local.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjREM0Mzc5Ii8+Cjwvc3ZnPg==',
      color: '#DC4379'
    },
    'jmc': {
      name: 'JMC',
      description: 'JMC (Jiangling Motors Corporation) es una marca china reconocida por su compromiso con la calidad y la innovación en vehículos comerciales. En Argentina, JMC ofrece la línea Grand Avenue, una gama de pick-ups que combinan robustez, confiabilidad y tecnología moderna. Con modelos como el Dadao Pro y Plus, JMC satisface las necesidades del mercado empresarial y comercial local.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMDU5NjY5Ii8+Cjwvc3ZnPg==',
      color: '#059669'
    },
    'maxus': {
      name: 'Maxus',
      description: 'Maxus es una marca china de vanguardia que se destaca por su innovación tecnológica y compromiso con la movilidad sostenible. En Argentina, Maxus ofrece una gama diversa de vehículos que incluye SUV elegantes, pick-ups robustos y opciones eléctricas de última generación. Con modelos como el D90, eDeliver 9, T60, T90 y T90 EV, Maxus representa el futuro de la movilidad en el mercado argentino.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMDBBNkY2Ii8+Cjwvc3ZnPg==',
      color: '#00A6F6'
    }
  };

  const brand = brandInfo[brandName?.toLowerCase() || ''];
  const models = getModelsByBrand(brand?.name || '');

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumbs />
        <div className="pt-20 pb-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Marca no encontrada</h1>
          <p className="text-gray-600 mt-4">La marca que buscás no existe o no está disponible.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${brand.name} Argentina – Modelos, Precios y Características 2025`}
        description={`${brand.description} Conocé todos los modelos ${brand.name} disponibles en Argentina con precios, especificaciones y características.`}
        keywords={`${brand.name.toLowerCase()}, ${brand.name.toLowerCase()} argentina, modelos ${brand.name.toLowerCase()}, precios ${brand.name.toLowerCase()}`}
        canonical={`https://www.autoschinos.ar/marcas/${brandName}`}
      />
      <Navbar />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de la marca */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                className="w-24 h-24 rounded-full shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {brand.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* Estadísticas de la marca */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-primary-500 mb-1">{models.length}</div>
              <div className="text-sm text-gray-600">Modelos disponibles</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-primary-500 mb-1">2024-2025</div>
              <div className="text-sm text-gray-600">Años de modelos</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-primary-500 mb-1">3+</div>
              <div className="text-sm text-gray-600">Categorías</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modelos de la marca */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modelos {brand.name}
            </h2>
            <p className="text-lg text-gray-600">
              Conocé toda la gama de vehículos {brand.name} disponibles
            </p>
          </div>

          {/* Grid de modelos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div key={model.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Header con modelo y badge */}
                <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-800">
                    {model.nombre} {model.año}
                  </span>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Más visto
                  </span>
                </div>

                {/* Imagen del modelo */}
                <div className="image-container-grid">
                  <img
                    src={model.imagen}
                    alt={model.nombre}
                    className="model-image-grid"
                  />
                </div>

                {/* Detalles del modelo */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 uppercase">
                      {model.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {model.año} | {model.combustible} | {model.transmision}
                    </p>
                    <p className="text-sm text-gray-500">
                      {model.categoria}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary-500 flex-1 mr-2">
                      {model.precio}
                    </span>
                    <button 
                      className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-200 flex-shrink-0"
                      onClick={() => window.location.href = `/marcas/${brandName}/${model.nombre.toLowerCase()}`}
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandDetail;
