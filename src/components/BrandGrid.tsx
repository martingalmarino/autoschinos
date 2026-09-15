import Link from 'next/link';
import { getBrands } from '@/lib/models';
import { getBrandLogo } from '@/lib/logo-utils';

export default function BrandGrid() {
  const brands = getBrands();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/marcas/${brand.slug}`}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getBrandLogo(brand.name)}
              alt={`Logo ${brand.name}`}
              className="w-16 h-16 object-contain rounded-full bg-gray-50 p-2"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
              <p className="text-sm text-gray-500">
                {brand.modelCount}{' '}
                {brand.modelCount === 1 ? 'modelo' : 'modelos'}
              </p>
            </div>
          </div>
          <span className="text-primary-600 font-medium text-sm">
            Ver modelos →
          </span>
        </Link>
      ))}
    </div>
  );
}
