import { getAllSheets } from '@/data/technical';
import type { Cobertura, ModelSheet } from '@/lib/technical/types';
import { CONSULTA_FECHA, CONSULTA_ZONA } from '@/lib/technical/types';

const TITULOS: Record<Cobertura, string> = {
  integrada: 'Datos integrados con alcance explícito',
  historica: 'Solo fuente histórica, marcada como tal',
  retiro: 'Identidad sin resolver: especificaciones retiradas',
  pendiente: 'Sin ficha utilizable: datos previos retirados',
};

export interface CoverageRow {
  id: string;
  cobertura: Cobertura;
  fuentes: number;
  conflictos: number;
  pendientes: number;
  precios: number;
}

export function coverageRows(): CoverageRow[] {
  return getAllSheets().map((sheet) => ({
    id: sheet.id,
    cobertura: sheet.cobertura,
    fuentes: sheet.fuentes.length,
    conflictos: sheet.conflictos.length,
    pendientes: sheet.pendientes.length,
    precios: sheet.precios.length,
  }));
}

export function coverageCounts(): Record<Cobertura, number> {
  const counts: Record<Cobertura, number> = {
    integrada: 0,
    historica: 0,
    retiro: 0,
    pendiente: 0,
  };
  for (const sheet of getAllSheets()) counts[sheet.cobertura] += 1;
  return counts;
}

function bloque(sheet: ModelSheet): string {
  const fuentes = sheet.fuentes.length
    ? sheet.fuentes
        .map(
          (fuente) =>
            `- ${fuente.titulo} (${fuente.tipo}, edición: ${fuente.edicion}; consulta ${fuente.consulta}). ${fuente.url}`
        )
        .join('\n')
    : '- Sin fuente aplicable. No se inventó una.';
  const conflictos = sheet.conflictos.length
    ? sheet.conflictos.map((item) => `- ${item}`).join('\n')
    : '- Ninguno dejado abierto en esta ficha.';
  const pendientes = sheet.pendientes.length
    ? sheet.pendientes.map((item) => `- ${item}`).join('\n')
    : '- Sin pendiente particular además del alcance ya escrito.';
  const precios = sheet.precios.length
    ? sheet.precios
        .map((item) => {
          const lista = item.lista != null ? `${item.moneda} ${item.lista}` : 'sin lista';
          const bonif =
            item.bonificado != null ? `, bonificado/final ${item.moneda} ${item.bonificado}` : '';
          return `- ${item.version}: ${lista}${bonif}. Estado ${item.estado}. Fecha de lista: ${item.fechaLista}. ${item.vigencia}`;
        })
        .join('\n')
    : '- Sin precio publicable.';

  return `### ${sheet.id}

Cobertura: ${TITULOS[sheet.cobertura]}.

${sheet.correspondencia}

Fuentes:

${fuentes}

Conflictos:

${conflictos}

Pendientes:

${pendientes}

Precios:

${precios}
`;
}

export function renderCoverageMarkdown(): string {
  const counts = coverageCounts();
  const total = getAllSheets().length;
  const body = getAllSheets().map(bloque).join('\n');

  return `# Cobertura del relevamiento — consulta ${CONSULTA_FECHA}

Zona de la consulta: ${CONSULTA_ZONA}. Esa fecha no es la vigencia de las listas ni el año-modelo de cada ficha.

Catálogo publicado: ${total} fichas. No es una matriz cerrada de todos los campos, versiones y años.

- ${counts.integrada} con datos argentinos integrados, siempre dentro de la versión o el documento citado.
- ${counts.historica} apoyadas solo en fuente histórica, marcada en la ficha.
- ${counts.retiro} con identidad sin resolver: se retiraron especificaciones y precios falsos y no se las convirtió en otro modelo.
- ${counts.pendiente} sin documentación utilizable: se retiraron cifras previas y no se completaron con otro país u otro modelo.

No se afirma que los precios estén actualizados a noviembre de 2026.

${body}`;
}
