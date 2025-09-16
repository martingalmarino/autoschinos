import React from 'react';
import { useModels, CarModel } from '../hooks/useModels';

interface CatalogGridProps {
  filters: any;
  currentPage: number;
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ filters, currentPage }) => {
  const { getFilteredModels } = useModels();
  
  // Obtener modelos filtrados
  const filteredCars = getFilteredModels(filters);

  // Paginación: 9 autos por página
  const carsPerPage = 9;
  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = filteredCars.slice(startIndex, startIndex + carsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentCars.map((car) => (
        <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Header con marca y badge separados */}
          <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
            <span className="text-sm font-bold text-gray-800">
              {car.brand}
            </span>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Más visto
            </span>
          </div>

          {/* Car Image */}
          <div className="relative h-48 bg-gray-100">
            <img
              src={car.imagen}
              alt={car.nombre}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Car Details */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1 uppercase">
                {car.nombre}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {car.año} | {car.combustible} | {car.transmision}
              </p>
              <p className="text-sm text-gray-500">
                {car.categoria}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-primary-500 flex-1 mr-2">
                {car.precio}
              </span>
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-200 flex-shrink-0">
                Ver detalle
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogGrid;
