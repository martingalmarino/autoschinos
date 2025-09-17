import React, { useState, useMemo } from 'react';
import { useModels } from '../hooks/useModels';

interface FilterOptions {
  marcas: string[];
  combustibles: string[];
  transmisiones: string[];
  segmentos: string[];
}

interface CatalogFiltersProps {
  onFiltersChange: (filters: any) => void;
  currentFilters: any;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({ onFiltersChange, currentFilters }) => {
  const { allModels, getFilteredModels } = useModels();
  
  const [selectedFilters, setSelectedFilters] = useState({
    marca: '',
    combustible: '',
    transmision: '',
    segmento: ''
  });

  // Generar opciones de filtros dinámicamente desde los modelos reales
  const filterOptions: FilterOptions = useMemo(() => {
    const marcas = ['Todas las marcas', ...new Set(allModels.map(model => model.brand))].sort();
    const combustibles = ['Todos', ...new Set(allModels.map(model => model.combustible))].sort();
    const transmisiones = ['Todas', ...new Set(allModels.flatMap(model => 
      model.transmision.split(' / ').map(t => t.trim())
    ))].sort();
    const segmentos = ['Todos', ...new Set(allModels.map(model => model.categoria))].sort();

    return {
      marcas,
      combustibles,
      transmisiones,
      segmentos
    };
  }, [allModels]);

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      marca: '',
      combustible: '',
      transmision: '',
      segmento: ''
    };
    setSelectedFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          Limpiar todo
        </button>
      </div>

      {/* Marca */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Marca
        </label>
        <select
          value={selectedFilters.marca}
          onChange={(e) => handleFilterChange('marca', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          aria-label="Seleccionar marca"
        >
          {filterOptions.marcas.map((marca) => (
            <option key={marca} value={marca === 'Todas las marcas' ? '' : marca}>
              {marca}
            </option>
          ))}
        </select>
      </div>

      {/* Combustible */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Combustible
        </label>
        <select
          value={selectedFilters.combustible}
          onChange={(e) => handleFilterChange('combustible', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          aria-label="Seleccionar combustible"
        >
          {filterOptions.combustibles.map((combustible) => (
            <option key={combustible} value={combustible === 'Todos' ? '' : combustible}>
              {combustible}
            </option>
          ))}
        </select>
      </div>

      {/* Transmisión */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transmisión
        </label>
        <select
          value={selectedFilters.transmision}
          onChange={(e) => handleFilterChange('transmision', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          aria-label="Seleccionar transmisión"
        >
          {filterOptions.transmisiones.map((transmision) => (
            <option key={transmision} value={transmision === 'Todas' ? '' : transmision}>
              {transmision}
            </option>
          ))}
        </select>
      </div>

      {/* Segmentos */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Segmentos
        </label>
        <select
          value={selectedFilters.segmento}
          onChange={(e) => handleFilterChange('segmento', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          aria-label="Seleccionar segmento"
        >
          {filterOptions.segmentos.map((segmento) => (
            <option key={segmento} value={segmento === 'Todos' ? '' : segmento}>
              {segmento}
            </option>
          ))}
        </select>
      </div>

      {/* Resultados dinámicos */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-medium">
            {getFilteredModels(currentFilters).length} modelos
          </span> encontrados
        </p>
      </div>
    </div>
  );
};

export default CatalogFilters;
