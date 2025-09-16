import React from 'react';

interface Brand {
  id: number;
  name: string;
  logo: string;
  slogan: string;
  color: string;
  modelsCount?: number;
}

interface BrandGridProps {
  currentPage: number;
}

const BrandGrid: React.FC<BrandGridProps> = ({ currentPage }) => {
  // Datos de marcas con información más detallada
  const allBrands: Brand[] = [
    {
      id: 1,
      name: 'JAC',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRjYzNDciLz4KCjwvc3ZnPg==',
      slogan: 'FEEL A BETTER DRIVE',
      color: '#FF6347',
      modelsCount: 8
    },
    {
      id: 2,
      name: 'Chery',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+',
      slogan: 'LIFE IS EASIER',
      color: '#E11D48',
      modelsCount: 12
    },
    {
      id: 3,
      name: 'Geely',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMwMDU2QjMiLz4KPC9zdmc+',
      slogan: 'MAKE LIFE WONDERFUL',
      color: '#0056B3',
      modelsCount: 15
    },
    {
      id: 4,
      name: 'Haval',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2Mzc0ODciLz4KPC9zdmc+',
      slogan: 'LOVE THE WAY FORWARD',
      color: '#637487',
      modelsCount: 9
    },
    {
      id: 5,
      name: 'BYD',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMwMEE2RjYiLz4KPC9zdmc+',
      slogan: 'BUILD YOUR DREAMS',
      color: '#00A6F6',
      modelsCount: 18
    },
    {
      id: 6,
      name: 'Dongfeng',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM4QjVDQjAiLz4KPC9zdmc+',
      slogan: 'QUALITY DRIVES US',
      color: '#8B5CB0',
      modelsCount: 7
    },
    {
      id: 7,
      name: 'Great Wall',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPC9zdmc+',
      slogan: 'DARE TO CHALLENGE',
      color: '#6B7280',
      modelsCount: 11
    },
    {
      id: 8,
      name: 'Lifan',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNFRjQ0NDQiLz4KPC9zdmc+',
      slogan: 'SMART & RELIABLE',
      color: '#EF4444',
      modelsCount: 6
    },
    {
      id: 9,
      name: 'MG',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM4QjVDQjAiLz4KPC9zdmc+',
      slogan: 'MAKE THINGS BETTER',
      color: '#8B5CB0',
      modelsCount: 10
    },
    {
      id: 10,
      name: 'Changan',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM5QzQwQjMiLz4KPC9zdmc+',
      slogan: 'INNOVATION FOR LIFE',
      color: '#9C40B3',
      modelsCount: 13
    },
    {
      id: 11,
      name: 'Foton',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPC9zdmc+',
      slogan: 'POWER YOUR BUSINESS',
      color: '#6B7280',
      modelsCount: 5
    },
    {
      id: 12,
      name: 'BAIC',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPC9zdmc+',
      slogan: 'DRIVE THE FUTURE',
      color: '#6B7280',
      modelsCount: 4
    }
  ];

  // Paginación: 9 marcas por página
  const brandsPerPage = 9;
  const startIndex = (currentPage - 1) * brandsPerPage;
  const currentBrands = allBrands.slice(startIndex, startIndex + brandsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentBrands.map((brand) => (
        <div key={brand.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="p-8 text-center">
            {/* Logo de la marca */}
            <div className="flex justify-center mb-6">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-20 h-20 rounded-full shadow-md"
              />
            </div>

            {/* Slogan */}
            <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-wide">
              {brand.slogan}
            </h3>

            {/* Información adicional */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                {brand.modelsCount} modelos disponibles
              </p>
            </div>

            {/* Botón Ver Modelos */}
            <button 
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              onClick={() => {
                window.location.href = `/marcas/${brand.name.toLowerCase()}`;
              }}
            >
              VER MODELOS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandGrid;
