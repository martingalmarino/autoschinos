import { LegalLayout, legalMetadata } from '@/components/LegalLayout';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = legalMetadata(
  'Política de Privacidad del Sitio',
  'Política de privacidad de autoschinos.ar, incluido el uso de Google AdSense y cookies.',
  '/politica-privacidad'
);

export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      description="Última actualización: septiembre 2026"
      path="/politica-privacidad"
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Responsable
        </h2>
        <p>
          El sitio autoschinos.ar es operado por Martín Galmarino. Para
          consultas sobre privacidad escribinos a{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-600 underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Datos que recogemos
        </h2>
        <p>
          Podemos recibir datos de contacto cuando completás un formulario
          (nombre, email, teléfono y mensaje). Esos datos se usan únicamente
          para responder tu consulta y no se venden a terceros.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Publicidad y Google AdSense
        </h2>
        <p className="mb-3">
          Este sitio utiliza <strong>Google AdSense</strong> para mostrar
          anuncios. Google y sus socios pueden usar cookies u otras
          tecnologías para servir anuncios basados en visitas previas a este
          u otros sitios web.
        </p>
        <p className="mb-3">
          Los usuarios pueden optar por no recibir publicidad personalizada
          visitando la configuración de anuncios de Google y revisando cómo
          Google usa la información en sitios o apps que emplean sus
          servicios:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 underline"
            >
              Cómo usa Google la información de sitios o apps que utilizan
              nuestros servicios
            </a>
          </li>
          <li>
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 underline"
            >
              Configuración de anuncios de Google
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cookies</h2>
        <p>
          Usamos cookies técnicas necesarias y, cuando corresponde, cookies
          de terceros vinculadas a publicidad (incluido AdSense). Detalles en
          la{' '}
          <a href="/politica-cookies" className="text-primary-600 underline">
            Política de Cookies
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Derechos</h2>
        <p>
          Podés solicitar acceso, rectificación o eliminación de tus datos de
          contacto escribiendo al email indicado. Para cookies de terceros,
          gestioná preferencias desde tu navegador o desde las herramientas
          de Google citadas arriba.
        </p>
      </section>
    </LegalLayout>
  );
}
