import Link from 'next/link';
import { guides } from '@/lib/guides';

export default function GuidesTeaser() {
  const preview = guides.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Guías para decidir mejor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contenido editorial sobre SUV, eléctricos, marcas y costos de uso
            en Argentina.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {preview.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className="rounded-xl border border-gray-200 bg-gray-50 p-6 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {guide.description}
              </p>
              <span className="text-primary-600 text-sm font-semibold">
                Leer →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/guias" className="btn-primary inline-block">
            Ver todas las guías
          </Link>
        </div>
      </div>
    </section>
  );
}
