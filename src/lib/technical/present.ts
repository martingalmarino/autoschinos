import { getSheet } from '@/data/technical';
import type { ModelSheet, PriceSort, SpecSummary } from '@/lib/technical/types';
import {
  displayFactValue,
  publicCategory,
  publicCopy,
  publicFuel,
  publicHighlights,
  publicPrices,
  publicTransmission,
  type PublicPrice,
} from '@/lib/technical/editorial';

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
  preciosPublicos: PublicPrice[];
}

function cleanSpec(value: string): string {
  return displayFactValue(value) ?? '';
}

export function presentCatalogModel<T extends CatalogRecord>(
  model: T
): T & PresentedExtras {
  const sheet = getSheet(model.id);
  if (!sheet) {
    return { ...model, precioOrden: null, preciosPublicos: [] };
  }

  const pub = sheet.public;
  const overlaid = {
    ...model,
    descripcion: pub.descripcion,
    combustible: pub.combustible,
    transmision: pub.transmision,
    categoria: pub.categoria ?? model.categoria,
    caracteristicas: pub.caracteristicas,
  };
  const preciosPublicos = publicPrices(sheet);
  const retiro = sheet.cobertura === 'retiro' || sheet.cobertura === 'pendiente';

  return {
    ...model,
    descripcion: retiro ? '' : publicCopy(pub.descripcion) ?? '',
    combustible: publicFuel(overlaid) ?? '',
    transmision: publicTransmission(overlaid) ?? '',
    categoria: publicCategory(overlaid) ?? '',
    precio: preciosPublicos
      .map((price) =>
        [
          price.amount,
          price.bonificado ? `bonificación ${price.bonificado}` : '',
          price.version,
          price.note,
        ]
          .filter(Boolean)
          .join(' · ')
      )
      .join(' | '),
    especificaciones: {
      motor: cleanSpec(pub.especificaciones.motor),
      potencia: cleanSpec(pub.especificaciones.potencia),
      traccion: cleanSpec(pub.especificaciones.traccion),
      capacidad_tanque: cleanSpec(pub.especificaciones.capacidad_tanque),
      peso: cleanSpec(pub.especificaciones.peso),
    },
    caracteristicas: publicHighlights(overlaid),
    precioOrden: pub.precioOrden ?? null,
    fichaCobertura: sheet.cobertura,
    preciosPublicos,
  };
}
