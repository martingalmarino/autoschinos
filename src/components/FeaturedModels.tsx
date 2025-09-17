import React from 'react';
import { useModels } from '../hooks/useModels';

const FeaturedModels: React.FC = () => {
  const { allModels } = useModels();
  
  // Seleccionar los primeros 6 modelos disponibles para mostrar como destacados
  const featuredCars = allModels.slice(0, 6);

  if (featuredCars.length === 0) {
    return null; // No mostrar la sección si no hay modelos
  }

  // Código anterior hardcodeado removido - ahora usa datos dinámicos
  /*const oldFeaturedCars = [
    {
      id: 1,
      name: 'Tiggo 3 Pro',
      brand: 'Chery',
      year: '2023',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFMTFENDgiLz4KCjwvc3ZnPg=='
    },
    {
      id: 2,
      name: 'Coolray',
      brand: 'Geely',
      year: '2024',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwMDU2QjMiLz4KPC9zdmc+',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDU2QjMiLz4KCjwvc3ZnPg=='
    },
    {
      id: 3,
      name: 'T40',
      brand: 'JAC',
      year: '2022',
      category: 'Pickup',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGRjYzNDciLz4KPC9zdmc+',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRjYzNDciLz4KCjwvc3ZnPg=='
    },
    {
      id: 4,
      name: 'H6',
      brand: 'Haval',
      year: '2023',
      category: 'SUV Mediano',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2Mzc0ODciLz4KCjwvc3ZnPg==',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2Mzc0ODciLz4KCjwvc3ZnPg=='
    },
    {
      id: 5,
      name: 'Song Plus',
      brand: 'BYD',
      year: '2024',
      category: 'SUV Híbrido',
      fuel: 'Híbrido',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwMEE2RjYiLz4KCjwvc3ZnPg==',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMEE2RjYiLz4KCjwvc3ZnPg=='
    },
    {
      id: 6,
      name: 'AX7',
      brand: 'Dongfeng',
      year: '2023',
      category: 'SUV Mediano',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM4QjVDQjAiLz4KCjwvc3ZnPg==',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM4QjVDQjAiLz4KCjwvc3ZnPg=='
    },
    {
      id: 7,
      name: 'Wingle 7',
      brand: 'Great Wall',
      year: '2023',
      category: 'Pickup',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2QjcyODAiLz4KCjwvc3ZnPgo=',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2QjcyODAiLz4KCjwvc3ZnPgo='
    },
    {
      id: 8,
      name: 'X60',
      brand: 'Lifan',
      year: '2022',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFRjQ0NDQiLz4KCjwvc3ZnPg==',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFRjQ0NDQiLz4KCjwvc3ZnPg=='
    },
    {
      id: 9,
      name: 'ZS',
      brand: 'MG',
      year: '2024',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM4QjVDQjAiLz4KCjwvc3ZnPg==',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM4QjVDQjAiLz4KCjwvc3ZnPgo='
    },
    {
      id: 10,
      name: 'CS35 Plus',
      brand: 'Changan',
      year: '2023',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM5QzQwQjMiLz4KCjwvc3ZnPgo=',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM5QzQwQjMiLz4KCjwvc3ZnPg=='
    },
    {
      id: 11,
      name: 'Tunland',
      brand: 'Foton',
      year: '2022',
      category: 'Pickup',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2QjcyODAiLz4KCjwvc3ZnPg==',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2QjcyODAiLz4KCjwvc3ZnPg=='
    },
    {
      id: 12,
      name: 'X25',
      brand: 'BAIC',
      year: '2023',
      category: 'SUV Compacto',
      fuel: 'Nafta',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2QjcyODAiLz4KCjwvc3ZnPgo=',
      brandLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2QjcyODAiLz4KCjwvc3ZnPg=='
    }
  ]; */

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Autos Chinos destacados en Argentina
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            Estos son los modelos y marcas más buscados por nuestros usuarios.
          </p>
        </div>

        {/* Grid de 4 columnas por línea */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {featuredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Header con marca y badge separados */}
              <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
                <span className="text-sm font-bold text-gray-800 truncate pr-2 flex-1">
                  {car.brand}
                </span>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                  Destacado
                </span>
              </div>

              {/* Car Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={car.imagen}
                  alt={`${car.brand} ${car.nombre}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Car Details */}
              <div className="p-3 sm:p-4">
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 uppercase">
                    {car.nombre}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {car.año} | {car.combustible}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button 
                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-sm transition-colors duration-200"
                    onClick={() => {
                      // Usar la estructura de URL jerárquica
                      const brandSlug = car.brand.toLowerCase().replace(/ /g, '-');
                      const modelSlug = car.nombre.toLowerCase().replace(/ /g, '-');
                      window.location.href = `/marcas/${brandSlug}/${modelSlug}`;
                    }}
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block rounded-lg px-8 py-3" style={{ background: 'linear-gradient(to right, #f5f5f5 0%, #fafafa 60%, #ffffff 100%)' }}>
            <button 
              className="btn-secondary text-lg px-8 py-3"
              onClick={() => window.location.href = '/catalogo'}
            >
              Explorar catálogo completo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;
