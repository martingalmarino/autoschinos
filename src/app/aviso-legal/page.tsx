import { LegalLayout, legalMetadata } from '@/components/LegalLayout';

export const metadata = legalMetadata(
  'Aviso Legal',
  'Aviso legal de autoschinos.ar.',
  '/aviso-legal'
);

export default function AvisoLegalPage() {
  return (
    <LegalLayout
      title="Aviso Legal"
      description="Información legal del sitio"
      path="/aviso-legal"
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Titular</h2>
        <p>
          El sitio autoschinos.ar es un portal informativo sobre autos chinos
          en Argentina. Los contenidos tienen carácter orientativo.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Propiedad intelectual
        </h2>
        <p>
          Textos, marcas comerciales e imágenes de vehículos pertenecen a sus
          respectivos titulares. El uso en este Sitio es meramente informativo.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Exención</h2>
        <p>
          No garantizamos exactitud absoluta de precios o especificaciones.
          Verificá siempre con fuentes oficiales antes de una decisión de
          compra.
        </p>
      </section>
    </LegalLayout>
  );
}
