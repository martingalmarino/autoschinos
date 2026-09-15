import Link from 'next/link';
import { getBrands } from '@/lib/models';
import { getBrandLogo } from '@/lib/logo-utils';

export default function BrandPills() {
  const brands = getBrands();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Marcas chinas en Argentina
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            {brands.length} marcas con fichas técnicas actualizadas
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/marcas/${brand.slug}`}
              className="flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 text-sm sm:text-base font-medium text-gray-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getBrandLogo(brand.name)}
                alt={`Logo ${brand.name}`}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-contain bg-gray-50"
              />
              <span className="font-medium">{brand.name}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/marcas" className="btn-primary inline-block">
            Ver todas las marcas
          </Link>
        </div>
      </div>
    </section>
  );
}
