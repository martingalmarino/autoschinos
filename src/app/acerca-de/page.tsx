import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { absoluteUrl, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Acerca de autoschinos.ar: Portal de Autos Chinos',
  description:
    'Conocé quién está detrás de autoschinos.ar, el portal informativo de marcas, modelos y fichas técnicas de autos chinos en Argentina.',
  alternates: { canonical: absoluteUrl('/acerca-de') },
  openGraph: {
    title: 'Acerca de autoschinos.ar: Portal de Autos Chinos | autoschinos.ar',
    url: absoluteUrl('/acerca-de'),
  },
};

export default function AcercaDePage() {
  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Acerca de', href: '/acerca-de' },
      ]}
    >
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">
            <header>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Acerca de autoschinos.ar
              </h1>
              <p className="text-lg text-gray-600">
                Un portal informativo independiente sobre autos chinos en
                Argentina.
              </p>
            </header>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Quiénes somos
              </h2>
              <p>
                autoschinos.ar es un proyecto editorial operado por{' '}
                <strong>Martín Galmarino</strong>. Nació para reunir en un solo
                lugar información clara y actualizada sobre marcas y modelos
                chinos disponibles o relevantes para el mercado argentino:
                fichas técnicas, categorías, precios de referencia y guías
                prácticas para comparar opciones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Qué ofrecemos
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Catálogo de marcas y modelos con fichas técnicas.</li>
                <li>Precios de referencia cuando hay datos públicos disponibles.</li>
                <li>Guías para entender SUV, eléctricos, híbridos y criterios de compra.</li>
                <li>Navegación simple para explorar por marca o por modelo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Qué no somos
              </h2>
              <p>
                No somos concesionario, importador ni representante oficial de
                ninguna marca. No vendemos vehículos ni intermediamos
                operaciones comerciales. Los contenidos tienen carácter
                informativo y orientativo: siempre confirmá precios,
                disponibilidad y especificaciones con fuentes oficiales antes
                de decidir una compra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Contacto
              </h2>
              <p>
                Si tenés consultas, sugerencias o querés reportar un dato
                desactualizado, escribinos a{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary-600 underline"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                o usá el{' '}
                <Link href="/contacto" className="text-primary-600 underline">
                  formulario de contacto
                </Link>
                .
              </p>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/catalogo" className="btn-primary text-center">
                Ver catálogo
              </Link>
              <Link href="/guias" className="btn-secondary text-center">
                Leer guías
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
