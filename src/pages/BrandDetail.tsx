import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactForm from '../components/ContactForm';
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
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRkY2MzQ3Ii8+Cjwvc3ZnPg==',
      color: '#FF6347'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">{models.length}</div>
              <div className="text-gray-600">Modelos disponibles</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">2024-2025</div>
              <div className="text-gray-600">Años de modelos</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">3+</div>
              <div className="text-gray-600">Categorías</div>
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
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={model.imagen}
                    alt={model.nombre}
                    className="w-full h-full object-cover"
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

      <ContactForm vehicleOfInterest={`Modelos ${brand.name}`} />
      <Footer />
    </div>
  );
};

export default BrandDetail;
