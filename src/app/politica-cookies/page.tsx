import { LegalLayout, legalMetadata } from '@/components/LegalLayout';

export const metadata = legalMetadata(
  'Política de Cookies',
  'Información sobre el uso de cookies en autoschinos.ar.',
  '/politica-cookies'
);

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Política de Cookies"
      description="Uso de cookies en el sitio"
      path="/politica-cookies"
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos que el navegador almacena para
          recordar preferencias o medir uso del sitio.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Tipos que usamos</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Cookies técnicas necesarias para el funcionamiento del Sitio.</li>
          <li>
            Cookies de terceros (por ejemplo, publicidad o analítica) cuando
            estén activas.
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
