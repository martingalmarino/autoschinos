import type {
  Fact,
  FactStatus,
  ModelSheet,
  PriceQuote,
  PublicSheet,
  Source,
  SourceKind,
  TechSection,
} from '@/lib/technical/types';
import { CONSULTA_FECHA } from '@/lib/technical/types';

export const PEND = 'Por especificar';
export const SIN_TANQUE = 'No aplica (eléctrico)';

export const ANIO_ETIQUETA =
  'El año que figura en el catálogo es una etiqueta previa. No confirma el año-modelo de los datos de abajo.';

export function anioDe(documento: string): string {
  return `${ANIO_ETIQUETA} Documento aplicado: ${documento}.`;
}

export function fuente(
  id: string,
  titulo: string,
  url: string,
  tipo: SourceKind,
  edicion: string,
  nota?: string
): Source {
  return { id, titulo, url, tipo, edicion, consulta: CONSULTA_FECHA, nota };
}

export function hecho(
  etiqueta: string,
  valor: string,
  fuenteId: string,
  estado: FactStatus = 'confirmado',
  nota?: string
): Fact {
  return { etiqueta, valor, fuenteId, estado, nota };
}

export function seccion(
  id: string,
  titulo: string,
  hechos: Fact[],
  intro?: string
): TechSection {
  return { id, titulo, intro, hechos: hechos.filter((item) => item.valor.trim()) };
}

export function precio(
  partial: Omit<PriceQuote, 'moneda'> & { moneda?: PriceQuote['moneda'] }
): PriceQuote {
  return { moneda: partial.moneda ?? 'USD', ...partial };
}

export function ficha(sheet: ModelSheet): ModelSheet {
  return sheet;
}

export function basePublic(
  partial: Omit<PublicSheet, 'anioNota'> & { anioNota?: string }
): PublicSheet {
  return {
    ...partial,
    anioNota: partial.anioNota ?? ANIO_ETIQUETA,
    precioOrden: partial.precioOrden ?? null,
  };
}
