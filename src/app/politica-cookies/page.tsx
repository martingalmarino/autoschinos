import { LegalLayout, legalMetadata } from '@/components/LegalLayout';

export const metadata = legalMetadata(
  'Política de Cookies del Sitio',
  'Cookies de autoschinos.ar, incluida publicidad con Google AdSense.',
  '/politica-cookies'
);

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Política de Cookies"
      description="Última actualización: septiembre 2026"
      path="/politica-cookies"
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Qué son las cookies
        </h2>
        <p>
          Las cookies son pequeños archivos que el navegador almacena para
          recordar preferencias, medir uso del sitio o permitir servicios de
          terceros como publicidad.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Tipos que usamos
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Cookies técnicas:</strong> necesarias para el
            funcionamiento básico del Sitio (por ejemplo, recordar que
            aceptaste el aviso de cookies).
          </li>
          <li>
            <strong>Cookies de publicidad:</strong> cuando está activo{' '}
            <strong>Google AdSense</strong>, Google y sus socios pueden usar
            cookies para servir anuncios (personalizados o no personalizados)
            según sus políticas.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Google AdSense
        </h2>
        <p className="mb-3">
          Utilizamos Google AdSense para monetizar el contenido. Más
          información sobre el uso de datos por parte de Google:
        </p>
        <p>
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline"
          >
            policies.google.com/technologies/partner-sites
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Cómo gestionarlas
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Desde la configuración de cookies de tu navegador.</li>
          <li>
            Desde la{' '}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 underline"
            >
              configuración de anuncios de Google
            </a>
            .
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
