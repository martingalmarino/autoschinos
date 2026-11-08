import type { PublicPrice } from '@/lib/technical/editorial';
import type { ModelSheet, PriceSort, SpecSummary } from '@/lib/technical/types';

export interface CarModel {
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
  anioNota?: string;
  avisoCorto?: string;
  identidadAviso?: string;
  precioOrden: PriceSort | null;
  fichaCobertura?: ModelSheet['cobertura'];
  preciosPublicos: PublicPrice[];
}

export interface BrandInfo {
  name: string;
  slug: string;
  modelCount: number;
}

/** Slug SEO-friendly: sin paréntesis ni caracteres especiales. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function brandSlug(brandName: string): string {
  return slugify(brandName);
}

export function modelSlug(modelName: string): string {
  return slugify(modelName);
}

export function modelPath(model: CarModel): string {
  return `/marcas/${brandSlug(model.brand)}/${modelSlug(model.nombre)}`;
}

export function brandPath(brandName: string): string {
  return `/marcas/${brandSlug(brandName)}`;
}

export interface ModelFilters {
  marca?: string;
  search?: string;
  modelo?: string;
  combustible?: string;
  transmision?: string;
  segmento?: string;
}

export function filterModels(models: CarModel[], filters: ModelFilters): CarModel[] {
  return models.filter((model) => {
    const marcaMatch =
      !filters.marca || model.brand.toLowerCase() === filters.marca.toLowerCase();
    const searchMatch =
      !filters.search ||
      model.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
      model.nombre.toLowerCase().includes(filters.search.toLowerCase());
    const modeloMatch =
      !filters.modelo ||
      model.nombre.toLowerCase() === filters.modelo.toLowerCase() ||
      modelSlug(model.nombre) === slugify(filters.modelo);
    const combustibleMatch =
      !filters.combustible || model.combustible.includes(filters.combustible);
    const transmisionMatch =
      !filters.transmision || model.transmision.includes(filters.transmision);
    const segmentoMatch = !filters.segmento || model.categoria.includes(filters.segmento);
    return marcaMatch && searchMatch && modeloMatch && combustibleMatch && transmisionMatch && segmentoMatch;
  });
}

export type SortOption = 'precio' | 'recientes' | 'marca-asc' | 'marca-desc';

export function sortModels(models: CarModel[], sort: SortOption = 'marca-asc'): CarModel[] {
  const copy = [...models];
  switch (sort) {
    case 'recientes':
      return copy.sort((a, b) => Number(b.año) - Number(a.año));
    case 'marca-desc':
      return copy.sort(
        (a, b) => b.brand.localeCompare(a.brand, 'es') || a.nombre.localeCompare(b.nombre, 'es')
      );
    case 'precio':
      return copy.sort((a, b) => {
        const pa = a.precioOrden;
        const pb = b.precioOrden;
        if (!pa && !pb) return a.nombre.localeCompare(b.nombre, 'es');
        if (!pa) return 1;
        if (!pb) return -1;
        if (pa.moneda !== pb.moneda) return pa.moneda < pb.moneda ? -1 : 1;
        return pa.monto - pb.monto;
      });
    case 'marca-asc':
    default:
      return copy.sort(
        (a, b) => a.brand.localeCompare(b.brand, 'es') || a.nombre.localeCompare(b.nombre, 'es')
      );
  }
}

export const CARS_PER_PAGE = 9;
