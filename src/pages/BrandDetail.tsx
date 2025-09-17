import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';
import { useModels } from '../hooks/useModels';
import { getBrandLogo, getBrandColor } from '../utils/logoUtils';

const BrandDetail: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const { getModelsByBrand } = useModels();
  
  // Sistema dinámico de información de marcas - solo descripción, logo y color automáticos
  const brandDescriptions: { [key: string]: string } = {
    'jac': 'JAC Motors es una de las marcas chinas más importantes en Argentina, ofreciendo vehículos de alta calidad con tecnología moderna y precios competitivos. Desde SUV familiares hasta pick-ups robustas, JAC combina diseño, confort y eficiencia.',
    'chery': 'Chery es una de las marcas chinas más reconocidas en Argentina, destacándose por su innovación tecnológica y diseño moderno. Con el Tiggo 4 Pro, Chery ofrece un SUV compacto que combina elegancia, confort y tecnología de vanguardia a precios accesibles.',
    'geely': 'Geely es una de las marcas chinas más innovadoras en Argentina, reconocida por su compromiso con la tecnología y el diseño moderno. Con modelos como el Emgrand GS y Emgrand X7 Sport, Geely ofrece SUV que combinan elegancia, confort y tecnología de vanguardia.',
    'haval': 'Haval es una marca china de vanguardia en Argentina, especializada en SUV de alta gama con tecnología híbrida y eléctrica. Con modelos como el H6, Jolion y ORA 3, Haval combina diseño moderno, innovación tecnológica y eficiencia energética, ofreciendo soluciones sustentables para el futuro de la movilidad.',
    'dfsk': 'DFSK es una marca china especializada en vehículos comerciales y SUV en Argentina, ofreciendo soluciones versátiles para el trabajo y la familia. Con una amplia gama que incluye pick-ups robustas, utilitarios prácticos y SUV confortables, DFSK combina funcionalidad y tecnología a precios accesibles.',
    'baic': 'BAIC es una de las marcas chinas más prestigiosas en Argentina, reconocida por su innovación tecnológica y diseño de vanguardia. Con una amplia gama que incluye SUV familiares y sedanes elegantes, BAIC combina confort, tecnología y rendimiento a precios competitivos.',
    'foton': 'Foton es una marca china especializada en vehículos comerciales y pick-ups en Argentina, ofreciendo soluciones robustas y confiables para el trabajo. Con una amplia gama que incluye pick-ups de cabina simple y doble, así como utilitarios, Foton combina durabilidad, capacidad de carga y tecnología a precios accesibles.',
    'mg': 'MG es una marca con herencia británica y tecnología china que se ha establecido fuertemente en Argentina. Con una gama moderna de SUV y sedanes, MG ofrece vehículos que combinan diseño europeo, tecnología avanzada y la confiabilidad de la manufactura china a precios muy competitivos.',
    'lifan': 'Lifan es una marca china que se ha consolidado en Argentina ofreciendo vehículos accesibles y confiables. Con una gama que incluye SUV compactos y sedanes familiares, Lifan se enfoca en brindar soluciones de movilidad práctica con buena relación calidad-precio.',
    'dongfeng': 'Dongfeng es una de las marcas chinas más grandes del mundo, presente en Argentina con una variada gama de vehículos. Desde SUV familiares hasta utilitarios comerciales, Dongfeng combina experiencia en manufactura, tecnología moderna y precios accesibles.',
    'great-wall': 'Great Wall es una marca china de prestigio en Argentina, reconocida por su compromiso con la calidad y la innovación tecnológica. Con modelos como el Poer y Wingle 7, Great Wall ofrece vehículos robustos y confiables que combinan durabilidad, confort y tecnología de vanguardia a precios competitivos.',
    'changan': 'Changan es una de las marcas chinas más antiguas y respetadas, presente en Argentina con una amplia gama de vehículos. Con SUV modernos y tecnología avanzada, Changan se destaca por su compromiso con la innovación, la seguridad y la eficiencia.',
    'byd': 'BYD es líder mundial en vehículos eléctricos e híbridos, llegando a Argentina con tecnología de vanguardia. Especializada en movilidad sustentable, BYD ofrece desde sedanes híbridos hasta SUV eléctricos, combinando innovación, eficiencia energética y respeto por el medio ambiente.',
    'shineray': 'Shineray es una marca china especializada en vehículos comerciales compactos en Argentina, ofreciendo soluciones prácticas y eficientes para el trabajo urbano. Con una gama que incluye pick-ups compactas de cabina simple y doble, así como utilitarios versátiles, Shineray combina funcionalidad, economía y tecnología a precios muy accesibles.',
    'faw': 'FAW (First Automotive Works) es una de las marcas automotrices más grandes y prestigiosas de China, preparándose para su llegada al mercado argentino. Con más de 70 años de experiencia en la industria, FAW se destaca por su innovación tecnológica, calidad de manufactura y amplia gama de vehículos que van desde automóviles familiares hasta vehículos comerciales de alta gama.'
  };

  if (!brandName) {
    return <div>Marca no encontrada</div>;
  }

  const normalizedBrandName = brandName.toLowerCase();
  
  // Mapeo correcto de nombres de URL a nombres exactos del JSON
  const brandNameMapping: { [key: string]: string } = {
    'jac': 'JAC',
    'chery': 'Chery',
    'geely': 'Geely',
    'haval': 'Haval',
    'dfsk': 'DFSK',
    'byd': 'BYD',
    'baic': 'BAIC',
    'foton': 'Foton',
    'mg': 'MG',
    'lifan': 'Lifan',
    'dongfeng': 'Dongfeng',
    'great-wall': 'Great Wall',
    'changan': 'Changan',
    'shineray': 'Shineray',
    'faw': 'FAW'
  };
  
  // Obtener el nombre exacto como está en el JSON
  const exactBrandName = brandNameMapping[normalizedBrandName] || brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase();
  const displayName = exactBrandName;
  const description = brandDescriptions[normalizedBrandName] || `${displayName} es una marca china reconocida en Argentina por su calidad, innovación y precios competitivos.`;
  
  // Generar logo y color dinámicamente
  const brandLogo = getBrandLogo(displayName);
  const brandColor = getBrandColor(displayName);
  
  // Obtener modelos de la marca usando el nombre exacto del JSON
  const models = getModelsByBrand(exactBrandName);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${displayName} Argentina – Modelos, Precios y Fichas Técnicas`}
        description={`Conocé todos los modelos ${displayName} disponibles en Argentina: SUV, sedanes, pick-ups. Fichas técnicas completas, precios y especificaciones.`}
        keywords={`${displayName.toLowerCase()} argentina, modelos ${displayName.toLowerCase()}, precios ${displayName.toLowerCase()}, suv ${displayName.toLowerCase()}, autos chinos`}
        canonical={`https://www.autoschinos.ar/marcas/${brandName}`}
      />
      <Navbar />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Logo de la marca */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src={brandLogo}
                  alt={`${displayName} Logo`}
                  className="w-32 h-32 object-contain rounded-full shadow-lg"
                  onError={(e) => {
                    // Fallback si el PNG no existe
                    const target = e.target as HTMLImageElement;
                    const svgContent = `
                      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="64" cy="64" r="64" fill="${brandColor}"/>
                        <text x="64" y="80" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
                          ${displayName.charAt(0)}
                        </text>
                      </svg>
                    `;
                    target.src = `data:image/svg+xml;base64,${btoa(svgContent)}`;
                  }}
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-white shadow-xl"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Modelos {displayName.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Modelos Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Catálogo de Modelos {displayName.toUpperCase()}
            </h2>
            <p className="text-lg text-gray-600">
              Explorá toda la gama de vehículos {displayName} disponibles en Argentina
            </p>
          </div>

          {models.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {models.map((model) => (
              <div key={model.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Header con marca y badge */}
                <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-800">
                      {model.brand}
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
                  <div className="p-3 sm:p-4">
                  <div className="mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 uppercase">
                      {model.nombre}
                    </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      {model.año} | {model.combustible} | {model.transmision}
                    </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                      {model.categoria}
                    </p>
                  </div>

                    <div className="space-y-3">
                      <div className="text-left">
                        <p className="text-xs text-gray-500 mb-1">Precio estimado</p>
                        <p className="text-base sm:text-lg font-bold text-primary-600 leading-tight">
                      {model.precio}
                        </p>
                      </div>
                    <button 
                        onClick={() => window.location.href = `/marcas/${brandName}/${model.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm w-full"
                    >
                        Ver Detalles
                    </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Próximamente más modelos {displayName}
              </h3>
              <p className="text-gray-600">
                Estamos actualizando nuestro catálogo con los últimos modelos de {displayName}.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandDetail;