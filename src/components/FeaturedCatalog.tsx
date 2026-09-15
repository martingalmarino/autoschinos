import type { CarModel } from '@/lib/models';
import FilterableCatalog from '@/components/FilterableCatalog';

interface FeaturedCatalogProps {
  models: CarModel[];
}

export default function FeaturedCatalog({ models }: FeaturedCatalogProps) {
  if (!models.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Autos chinos destacados en Argentina
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorá modelos de las {new Set(models.map((m) => m.brand)).size}{' '}
            marcas disponibles en nuestro catálogo.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <FilterableCatalog models={models} />
        </div>
      </div>
    </section>
  );
}
