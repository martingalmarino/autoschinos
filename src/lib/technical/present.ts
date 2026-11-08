import { getSheet } from '@/data/technical';
import type { ModelSheet, PriceSort, SpecSummary } from '@/lib/technical/types';

export interface CatalogRecord {
  id: string;
  nombre: string;
  año: string;
  categoria: string;
  combustible: string;
  transmision: string;
  precio: string;
  imagen: string;
  descripcion: string;
  especificaciones: SpecSummary;
  caracteristicas: string[];
  brand: string;
}

export interface PresentedExtras {
  anioNota?: string;
  avisoCorto?: string;
  identidadAviso?: string;
  precioOrden: PriceSort | null;
  fichaCobertura?: ModelSheet['cobertura'];
}

export function presentCatalogModel<T extends CatalogRecord>(
  model: T
): T & PresentedExtras {
  const sheet = getSheet(model.id);
  if (!sheet) {
    return { ...model, precioOrden: null };
  }

  const pub = sheet.public;
  return {
    ...model,
    descripcion: pub.descripcion,
    combustible: pub.combustible,
    transmision: pub.transmision,
    categoria: pub.categoria ?? model.categoria,
    precio: pub.precio,
    especificaciones: pub.especificaciones,
    caracteristicas: pub.caracteristicas,
    anioNota: pub.anioNota,
    avisoCorto: pub.avisoCorto,
    identidadAviso: pub.aviso,
    precioOrden: pub.precioOrden ?? null,
    fichaCobertura: sheet.cobertura,
  };
}
