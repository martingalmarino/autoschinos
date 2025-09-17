import React from 'react';
import { getBrandLogo, getBrandColor } from '../utils/logoUtils';
import { useModels } from '../hooks/useModels';

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
  const { getModelsByBrand } = useModels();
  
  // Sistema dinámico de marcas - solo información estática, modelsCount será dinámico
  const brandData = [
    { name: 'JAC', slogan: 'FEEL A BETTER DRIVE' },
    { name: 'Chery', slogan: 'LIFE IS EASIER' },
    { name: 'Geely', slogan: 'MAKE LIFE WONDERFUL' },
    { name: 'Haval', slogan: 'LOVE THE WAY FORWARD' },
    { name: 'BYD', slogan: 'BUILD YOUR DREAMS' },
    { name: 'Dongfeng', slogan: 'QUALITY DRIVES US' },
    { name: 'Great Wall', slogan: 'DARE TO CHALLENGE' },
    { name: 'Lifan', slogan: 'SMART & RELIABLE' },
    { name: 'MG', slogan: 'MAKE THINGS BETTER' },
    { name: 'Changan', slogan: 'INNOVATION FOR LIFE' },
    { name: 'Foton', slogan: 'POWER YOUR BUSINESS' },
    { name: 'BAIC', slogan: 'DRIVE THE FUTURE' },
    { name: 'DFSK', slogan: 'POWER FOR LIFE' },
    { name: 'FAW', slogan: 'COMING SOON' }
  ];

  // Generar marcas dinámicamente con conteo real de modelos
  const allBrands: Brand[] = brandData.map((brand, index) => {
    // Mapeo correcto para obtener nombre exacto del JSON
    const brandNameMapping: { [key: string]: string } = {
      'JAC': 'JAC',
      'Chery': 'Chery',
      'Geely': 'Geely',
      'Haval': 'Haval',
      'BYD': 'BYD',
      'Dongfeng': 'Dongfeng',
      'Great Wall': 'Great Wall',
      'Lifan': 'Lifan',
      'MG': 'MG',
      'Changan': 'Changan',
      'Foton': 'Foton',
      'BAIC': 'BAIC',
      'DFSK': 'DFSK',
      'FAW': 'FAW'
    };
    
    const exactBrandName = brandNameMapping[brand.name] || brand.name;
    const realModelsCount = getModelsByBrand(exactBrandName).length;
    
    return {
      id: index + 1,
      name: brand.name,
      logo: getBrandLogo(brand.name),
      slogan: brand.slogan,
      color: getBrandColor(brand.name),
      modelsCount: realModelsCount // ✅ DINÁMICO - Conteo real del JSON
    };
  });

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
                className="brand-logo-standard"
                onError={(e) => {
                  // Fallback si el PNG no existe - usar SVG genérico
                  const target = e.target as HTMLImageElement;
                  const svgContent = `
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="40" cy="40" r="40" fill="${brand.color}"/>
                      <text x="40" y="50" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
                        ${brand.name.charAt(0)}
                      </text>
                    </svg>
                  `;
                  target.src = `data:image/svg+xml;base64,${btoa(svgContent)}`;
                }}
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
                window.location.href = `/marcas/${brand.name.toLowerCase().replace(/\s+/g, '-')}`;
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