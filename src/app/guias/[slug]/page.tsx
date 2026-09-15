import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import {
  getAllGuideSlugs,
  getGuideBySlug,
} from '@/lib/guides';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Guía no encontrada' };

  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: absoluteUrl(`/guias/${slug}`) },
    openGraph: {
      title: `${guide.seoTitle} | autoschinos.ar`,
      url: absoluteUrl(`/guias/${slug}`),
    },
  };
}

export default async function GuiaPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Guías', href: '/guias' },
        { name: guide.title, href: `/guias/${slug}` },
      ]}
    >
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
            <p className="text-sm text-primary-600 font-medium mb-3">
              Actualizado {guide.updatedAt}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-600 mb-10">{guide.description}</p>

            <div className="space-y-10 text-gray-700 leading-relaxed">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="mb-4">
                      {p}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc list-inside space-y-2 mb-2">
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <Link href="/catalogo" className="btn-primary text-center">
                Ver catálogo
              </Link>
              <Link href="/guias" className="btn-secondary text-center">
                Más guías
              </Link>
              <Link href="/contacto" className="btn-secondary text-center">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
