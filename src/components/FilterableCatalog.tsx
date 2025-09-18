import React, { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Model {
  id: string;
  nombre: string;
  año: string;
  categoria: string;
  combustible: string;
  transmision: string;
  precio: string;
  imagen: string;
  descripcion: string;
  brand: string; // Cambiado de 'marca' a 'brand' para coincidir con useModels
}

interface FilterableCatalogProps {
  models: Model[];
}

const FilterableCatalog: React.FC<FilterableCatalogProps> = ({ models }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filtros disponibles basados en la imagen y los datos
  const filters = [
    { id: 'suv', label: 'SUV', type: 'categoria' },
    { id: 'pickup', label: 'PICKUP', type: 'categoria' },
    { id: 'sedan', label: 'SEDÁN', type: 'categoria' },
    { id: 'van', label: 'VAN', type: 'categoria' },
    { id: 'mini-truck', label: 'MINI TRUCK', type: 'categoria' },
    { id: 'utilitario', label: 'UTILITARIO', type: 'categoria' },
    { id: 'hatchback', label: 'HATCHBACK', type: 'categoria' },
    { id: 'furgo', label: 'FURGÓN', type: 'categoria' },
    { id: 'manual', label: 'MANUAL', type: 'transmision' },
    { id: 'automatico', label: 'AUTOMÁTICO', type: 'transmision' },
  ];

  // Función para determinar si un modelo coincide con los filtros
  const matchesFilter = (model: Model, filterId: string): boolean => {
    const filter = filters.find(f => f.id === filterId);
    if (!filter) return false;

    if (filter.type === 'categoria') {
      const categoria = model.categoria.toLowerCase();
      switch (filterId) {
        case 'suv':
          return categoria.includes('suv') || categoria.includes('crossover');
        case 'pickup':
          return categoria.includes('pick') || categoria.includes('pickup');
        case 'sedan':
          return categoria.includes('sedán') || categoria.includes('sedan');
        case 'van':
          return categoria.includes('van');
        case 'mini-truck':
          return categoria.includes('mini truck') || categoria.includes('camión');
        case 'utilitario':
          return categoria.includes('utilitario') || categoria.includes('carga');
        case 'hatchback':
          return categoria.includes('hatchback');
        case 'furgo':
          return categoria.includes('furgón');
        default:
          return false;
      }
    }

    if (filter.type === 'transmision') {
      const transmision = model.transmision.toLowerCase();
      switch (filterId) {
        case 'manual':
          return transmision.includes('manual');
        case 'automatico':
          return transmision.includes('automática') || transmision.includes('cvt') || transmision.includes('dct');
        default:
          return false;
      }
    }

    return false;
  };

  // Filtrar modelos
  const filteredModels = !activeFilter 
    ? models 
    : models.filter(model => matchesFilter(model, activeFilter));

  // Función para seleccionar filtro único
  const selectFilter = (filterId: string) => {
    setActiveFilter(prev => prev === filterId ? null : filterId);
  };

  // Funciones de scroll
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Filtros con scroll horizontal */}
      <div className="relative mb-8">
        <div className="flex items-center">
          {/* Botón scroll izquierda */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 p-2 rounded-full bg-blue-50 border border-blue-200 hover:bg-blue-100 mr-4 transition-colors"
            title="Desplazar filtros hacia la izquierda"
            aria-label="Desplazar filtros hacia la izquierda"
          >
            <ChevronLeftIcon className="w-5 h-5 text-blue-600" />
          </button>

          {/* Container de filtros */}
          <div 
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth flex-1 hide-scrollbar"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => selectFilter(filter.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Botón scroll derecha */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 p-2 rounded-full bg-blue-50 border border-blue-200 hover:bg-blue-100 ml-4 transition-colors"
            title="Desplazar filtros hacia la derecha"
            aria-label="Desplazar filtros hacia la derecha"
          >
            <ChevronRightIcon className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Grid de modelos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        {filteredModels.slice(0, 12).map((model) => (
          <div
            key={model.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
              <img
                src={model.imagen}
                alt={model.nombre}
                className="w-full h-full object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden text-gray-400 text-sm">Sin imagen</div>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-1 text-sm">
              {model.nombre}
            </h3>
            
            <button
              onClick={() => {
                // Navegar al detalle del modelo
                const brandSlug = model.brand.toLowerCase().replace(/\s+/g, '-');
                const modelSlug = model.nombre.toLowerCase().replace(/\s+/g, '-');
                window.location.href = `/marcas/${brandSlug}/${modelSlug}`;
              }}
              className="w-full mt-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-all duration-200 hover:shadow-md transform hover:scale-105"
            >
              VER
            </button>
          </div>
        ))}
      </div>

      {/* Enlace ver catálogo completo */}
      <div className="text-center">
        <a
          href="/catalogo"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium underline"
        >
          Ver catálogo completo
        </a>
      </div>

      {/* Contador de resultados */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Mostrando {Math.min(filteredModels.length, 12)} de {filteredModels.length} modelos
        {activeFilter && (
          <span className="ml-2 text-blue-600 font-medium">
            (Filtro: {filters.find(f => f.id === activeFilter)?.label})
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterableCatalog;
