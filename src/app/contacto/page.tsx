import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import ContactForm from '@/components/ContactForm';
import { absoluteUrl, CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contacto Autos Chinos Argentina: Consultas',
  description:
    'Consultas sobre autos chinos en Argentina: marcas, modelos, precios de referencia y fichas técnicas.',
  alternates: { canonical: absoluteUrl('/contacto') },
  openGraph: {
    title: 'Contacto Autos Chinos Argentina: Consultas | autoschinos.ar',
    url: absoluteUrl('/contacto'),
  },
};

export default function ContactoPage() {
  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Contacto', href: '/contacto' },
      ]}
    >
      <section className="pt-10 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Consultas sobre marcas, modelos o el contenido del portal.
          </p>
          <p className="text-sm text-gray-500">
            Email:{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary-600 underline"
            >
              {CONTACT_EMAIL}
            </a>
            {WHATSAPP_NUMBER ? (
              <>
                {' '}
                · WhatsApp disponible al enviar el formulario
              </>
            ) : null}
          </p>
        </div>
      </section>

      <ContactForm
        vehicleOfInterest="Consulta general"
        title="Escribinos"
        subtitle="Completá el formulario y te respondemos a la brevedad"
      />
    </SiteShell>
  );
}
