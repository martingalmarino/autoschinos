import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { absoluteUrl, CONTACT_EMAIL } from '@/lib/site';

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  children: React.ReactNode;
}

export function legalMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
  };
}

export function LegalLayout({
  title,
  description,
  path,
  children,
}: LegalPageProps) {
  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: title, href: path },
      ]}
    >
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500 text-sm mb-8">{description}</p>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              {children}
              <p className="text-sm">
                Contacto:{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary-600 underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
