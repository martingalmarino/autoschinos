import modelsData from '@/data/models.json';
import { presentCatalogModel } from '@/lib/technical/present';
import {
  brandSlug,
  modelSlug,
  type BrandInfo,
  type CarModel,
} from '@/lib/catalog';

export type { BrandInfo, CarModel, ModelFilters, SortOption } from '@/lib/catalog';
export {
  brandPath,
  brandSlug,
  CARS_PER_PAGE,
  filterModels,
  modelPath,
  modelSlug,
  slugify,
  sortModels,
} from '@/lib/catalog';

type RawModel = Omit<
  CarModel,
  | 'brand'
  | 'precioOrden'
  | 'anioNota'
  | 'avisoCorto'
  | 'identidadAviso'
  | 'fichaCobertura'
  | 'preciosPublicos'
>;

type RawModelsData = Record<
  string,
  {
    marca: string;
    modelos: RawModel[];
  }
>;

const data = modelsData as RawModelsData;

export function getAllModels(): CarModel[] {
  const models: CarModel[] = [];
  Object.entries(data).forEach(([brandName, brandData]) => {
    brandData.modelos.forEach((modelo) => {
      models.push(presentCatalogModel({ ...modelo, brand: brandName }));
    });
  });
  return models;
}

export function getBrandNames(): string[] {
  return Object.keys(data).sort((a, b) => a.localeCompare(b, 'es'));
}

export function getBrands(): BrandInfo[] {
  return getBrandNames().map((name) => ({
    name,
    slug: brandSlug(name),
    modelCount: data[name].modelos.length,
  }));
}

export function getBrandBySlug(slug: string): string | null {
  const found = getBrandNames().find((name) => brandSlug(name) === slug);
  return found ?? null;
}

export function getModelsByBrand(brandName: string): CarModel[] {
  return getAllModels().filter((model) => model.brand === brandName);
}

export function getModelBySlugs(
  brandSlugParam: string,
  modelSlugParam: string
): CarModel | null {
  const brandName = getBrandBySlug(brandSlugParam);
  if (!brandName) return null;
  return (
    getModelsByBrand(brandName).find(
      (model) => modelSlug(model.nombre) === modelSlugParam
    ) ?? null
  );
}

export function getTotalModelCount(): number {
  return getAllModels().length;
}

export function getTotalBrandCount(): number {
  return getBrandNames().length;
}
