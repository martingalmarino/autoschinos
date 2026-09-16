import { LegalLayout, legalMetadata } from '@/components/LegalLayout';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = legalMetadata(
  'Aviso Legal del Sitio',
  'Aviso legal de autoschinos.ar: información referencial y exención de responsabilidad.',
  '/aviso-legal'
);

export default function AvisoLegalPage() {
  return (
    <LegalLayout
      title="Aviso Legal"
      description="Última actualización: septiembre 2026"
      path="/aviso-legal"
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Titular</h2>
        <p>
          El sitio autoschinos.ar es un portal informativo sobre autos chinos
          en Argentina, operado por Martín Galmarino. Contacto:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-600 underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Naturaleza del contenido
        </h2>
        <p>
          Los contenidos (fichas técnicas, precios de referencia, guías y
          descripciones) tienen carácter meramente informativo y orientativo.
          <strong> No constituyen oferta comercial vinculante</strong>,
          cotización oficial ni asesoramiento legal o financiero. autoschinos.ar
          no es concesionario, importador ni representante de marcas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Precios y especificaciones
        </h2>
        <p>
          Los precios y especificaciones pueden variar según tipo de cambio,
          versión, equipamiento, impuestos y disponibilidad. Verificá siempre
          con concesionarios o fuentes oficiales antes de una decisión de
          compra. Algunos datos pueden figurar como pendientes de confirmar.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Calculadora de ahorro
        </h2>
        <p>
          La calculadora de ahorro estima únicamente costos de
          energía/combustible a partir de kilómetros, tarifas y consumos (a
          veces estimados por segmento). No incluye patente, seguro,
          mantenimiento ni precio de compra. Los resultados son referenciales.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Propiedad intelectual
        </h2>
        <p>
          Textos propios del Sitio pertenecen a su operador. Marcas comerciales
          e imágenes de vehículos pertenecen a sus respectivos titulares. El
          uso en este Sitio es meramente informativo.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Exención</h2>
        <p>
          No garantizamos exactitud absoluta ni actualización permanente de
          toda la información publicada. El uso del Sitio es bajo
          responsabilidad del usuario.
        </p>
      </section>
    </LegalLayout>
  );
}
