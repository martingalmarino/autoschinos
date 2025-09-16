import React from 'react';

interface CarModel {
  id: number;
  name: string;
  brand: string;
  year: string;
  category: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
}

interface CatalogGridProps {
  filters: any;
  currentPage: number;
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ filters, currentPage }) => {
  // Datos de ejemplo expandidos para el catálogo
  const allCars: CarModel[] = [
    {
      id: 1,
      name: 'Tiggo 3 Pro',
      brand: 'Chery',
      year: '2023',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      transmission: 'Manual',
      price: '$25.000',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+'
    },
    {
      id: 2,
      name: 'Coolray',
      brand: 'Geely',
      year: '2024',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      transmission: 'Automática',
      price: '$28.500',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwMDU2QjMiLz4KPC9zdmc+'
    },
    {
      id: 3,
      name: 'T40',
      brand: 'JAC',
      year: '2022',
      category: 'Pickup',
      fuel: 'Nafta',
      transmission: 'Manual',
      price: '$32.000',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGRjYzNDciLz4KPC9zdmc+'
    },
    {
      id: 4,
      name: 'H6',
      brand: 'Haval',
      year: '2023',
      category: 'SUV Mediano',
      fuel: 'Nafta',
      transmission: 'Automática',
      price: '$35.500',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2Mzc0ODciLz4KPC9zdmc+'
    },
    {
      id: 5,
      name: 'Song Plus',
      brand: 'BYD',
      year: '2024',
      category: 'SUV Híbrido',
      fuel: 'Híbrido',
      transmission: 'CVT',
      price: '$42.000',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwMEE2RjYiLz4KPC9zdmc+'
    },
    {
      id: 6,
      name: 'AX7',
      brand: 'Dongfeng',
      year: '2023',
      category: 'SUV Mediano',
      fuel: 'Nafta',
      transmission: 'Automática',
      price: '$33.500',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM4QjVDQjAiLz4KPC9zdmc+'
    },
    {
      id: 7,
      name: 'Wingle 7',
      brand: 'Great Wall',
      year: '2023',
      category: 'Pickup',
      fuel: 'Nafta',
      transmission: 'Manual',
      price: '$29.800',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2QjcyODAiLz4KPC9zdmc+'
    },
    {
      id: 8,
      name: 'X60',
      brand: 'Lifan',
      year: '2022',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      transmission: 'Manual',
      price: '$22.500',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFRjQ0NDQiLz4KPC9zdmc+'
    },
    {
      id: 9,
      name: 'ZS',
      brand: 'MG',
      year: '2024',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      transmission: 'CVT',
      price: '$27.200',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM4QjVDQjAiLz4KPC9zdmc+'
    }
  ];

  // Filtrar autos basado en los filtros seleccionados
  const filteredCars = allCars.filter(car => {
    return (!filters.marca || car.brand === filters.marca) &&
           (!filters.combustible || car.fuel === filters.combustible) &&
           (!filters.transmision || car.transmission === filters.transmision) &&
           (!filters.segmento || car.category === filters.segmento);
  });

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
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Car Details */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1 uppercase">
                {car.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {car.year} | {car.fuel} | {car.transmission}
              </p>
              <p className="text-sm text-gray-500">
                {car.category}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-primary-500">
                {car.price}
              </span>
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-200">
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
