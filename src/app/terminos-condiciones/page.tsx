import { LegalLayout, legalMetadata } from '@/components/LegalLayout';

export const metadata = legalMetadata(
  'Términos y Condiciones',
  'Términos y condiciones de uso del sitio web autoschinos.ar.',
  '/terminos-condiciones'
);

export default function TerminosPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      description="Última actualización: 2025"
      path="/terminos-condiciones"
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Introducción</h2>
        <p>
          Este documento regula el uso del sitio web autoschinos.ar. Al acceder
          y utilizar el Sitio, el usuario acepta los términos aquí expuestos.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Uso del Sitio</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>El acceso es libre y gratuito, salvo los costes de conexión.</li>
          <li>
            El usuario se compromete a utilizar el Sitio de manera lícita, sin
            vulnerar derechos de terceros ni las leyes vigentes en Argentina.
          </li>
          <li>
            Queda prohibido introducir malware o intentar acceder a datos
            restringidos.
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Contenido informativo
        </h2>
        <p>
          La información de precios, especificaciones y disponibilidad es de
          carácter referencial y puede variar. No constituye oferta comercial
          vinculante.
        </p>
      </section>
    </LegalLayout>
  );
}
