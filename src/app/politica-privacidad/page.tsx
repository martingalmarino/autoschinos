import { LegalLayout, legalMetadata } from '@/components/LegalLayout';

export const metadata = legalMetadata(
  'Política de Privacidad del Sitio',
  'Política de privacidad de autoschinos.ar.',
  '/politica-privacidad'
);

export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      description="Cómo tratamos tus datos personales"
      path="/politica-privacidad"
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Datos que recogemos</h2>
        <p>
          Podemos recibir datos de contacto cuando completás un formulario
          (nombre, email, teléfono y mensaje). Esos datos se usan únicamente
          para responder tu consulta.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cookies</h2>
        <p>
          El Sitio puede utilizar cookies técnicas y de medición. Podés
          gestionarlas desde tu navegador. Ver también la Política de Cookies.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Derechos</h2>
        <p>
          Podés solicitar acceso, rectificación o eliminación de tus datos
          escribiendo al email de contacto indicado abajo.
        </p>
      </section>
    </LegalLayout>
  );
}
