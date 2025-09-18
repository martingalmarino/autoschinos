import React from 'react';
import FilterableCatalog from './FilterableCatalog';
import { useModels } from '../hooks/useModels';

const FeaturedCatalog: React.FC = () => {
  const { allModels } = useModels();

  if (allModels.length === 0) {
    return null; // No mostrar la sección si no hay modelos
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Autos Chinos destacados en Argentina
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estos son los modelos y marcas más buscados por nuestros usuarios. 
            Explorá las diferentes categorías y encontrá tu próximo vehículo.
          </p>
        </div>

        {/* Componente de catálogo filtrable */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <FilterableCatalog models={allModels} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCatalog;
