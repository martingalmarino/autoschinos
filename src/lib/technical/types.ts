/** Tipos del relevamiento argentino. La fecha de consulta no es vigencia. */

export const CONSULTA_FECHA = '2026-11-08' as const;
export const CONSULTA_ZONA = 'America/Argentina/Cordoba' as const;

export type SourceKind = 'primaria' | 'secundaria' | 'historica' | 'prensa';

export type FactStatus = 'confirmado' | 'historico';

export type Cobertura =
  | 'integrada'
  | 'historica'
  | 'retiro'
  | 'pendiente';

export interface Source {
  id: string;
  titulo: string;
  url: string;
  tipo: SourceKind;
  /** Edición, fecha del documento o de la página, tal como consta. */
  edicion: string;
  consulta: typeof CONSULTA_FECHA;
  nota?: string;
}

export interface Fact {
  etiqueta: string;
  valor: string;
  fuenteId: string;
  estado: FactStatus;
  nota?: string;
}

export interface TechSection {
  id: string;
  titulo: string;
  intro?: string;
  hechos: Fact[];
}

export type PriceStatus =
  | 'lista-fechada'
  | 'observado-sin-vencimiento'
  | 'historico'
  | 'secundario-sin-vigencia'
  | 'prensa-sin-condiciones';

export interface PriceQuote {
  version: string;
  moneda: 'USD' | 'ARS';
  lista?: number;
  bonificado?: number;
  /** Fecha de la lista o "no explicitada". */
  fechaLista: string;
  /** Vigencia que la propia fuente declara, o la ausencia de vigencia. */
  vigencia: string;
  exclusiones?: string;
  fuenteId: string;
  estado: PriceStatus;
  nota?: string;
}

export interface SpecSummary {
  motor: string;
  potencia: string;
  traccion: string;
  capacidad_tanque: string;
  peso: string;
}

export interface PriceSort {
  moneda: 'USD' | 'ARS';
  monto: number;
}

export interface PublicSheet {
  descripcion: string;
  combustible: string;
  transmision: string;
  categoria?: string;
  precio: string;
  /** Solo listas observadas como actuales y comparables. Históricos no ordenan. */
  precioOrden?: PriceSort | null;
  especificaciones: SpecSummary;
  caracteristicas: string[];
  anioNota: string;
  avisoCorto?: string;
  aviso?: string;
}

export interface ModelSheet {
  id: string;
  cobertura: Cobertura;
  correspondencia: string;
  fuentes: Source[];
  secciones: TechSection[];
  conflictos: string[];
  pendientes: string[];
  precios: PriceQuote[];
  public: PublicSheet;
}
