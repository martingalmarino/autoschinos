'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { CarModel } from '@/lib/models';
import ModelCard from '@/components/ModelCard';

interface FilterableCatalogProps {
  models: CarModel[];
}

export default function FilterableCatalog({ models }: FilterableCatalogProps) {
  const [activeBrand, setActiveBrand] = useState<string>('Todas');

  const brands = useMemo(
    () => ['Todas', ...[...new Set(models.map((m) => m.brand))].sort((a, b) => a.localeCompare(b, 'es'))],
    [models]
  );

  const featured = useMemo(() => {
    const filtered =
      activeBrand === 'Todas'
        ? models
        : models.filter((m) => m.brand === activeBrand);
    return filtered.slice(0, 12);
  }, [models, activeBrand]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => setActiveBrand(brand)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeBrand === brand
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/catalogo" className="text-primary-600 hover:text-primary-700 font-semibold underline">
          Ver catálogo completo
        </Link>
      </div>
    </div>
  );
}
