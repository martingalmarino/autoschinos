import modelsData from '@/data/models.json';

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
  especificaciones: {
    motor: string;
    potencia: string;
    traccion: string;
    capacidad_tanque: string;
    peso: string;
  };
  caracteristicas: string[];
  brand: string;
}

export interface BrandInfo {
  name: string;
  slug: string;
  modelCount: number;
}

type RawModelsData = Record<
  string,
  {
    marca: string;
    modelos: Omit<CarModel, 'brand'>[];
  }
>;

const data = modelsData as RawModelsData;

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

export function getAllModels(): CarModel[] {
  const models: CarModel[] = [];
  Object.entries(data).forEach(([brandName, brandData]) => {
    brandData.modelos.forEach((modelo) => {
      models.push({ ...modelo, brand: brandName });
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

export interface ModelFilters {
  marca?: string;
  search?: string;
  modelo?: string;
  combustible?: string;
  transmision?: string;
  segmento?: string;
}

export function filterModels(
  models: CarModel[],
  filters: ModelFilters
): CarModel[] {
  return models.filter((model) => {
    const marcaMatch =
      !filters.marca ||
      model.brand.toLowerCase() === filters.marca.toLowerCase();

    const searchMatch =
      !filters.search ||
      model.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
      model.nombre.toLowerCase().includes(filters.search.toLowerCase());

    const modeloMatch =
      !filters.modelo ||
      model.nombre.toLowerCase() === filters.modelo.toLowerCase() ||
      modelSlug(model.nombre) === slugify(filters.modelo);

    const combustibleMatch =
      !filters.combustible ||
      model.combustible.includes(filters.combustible);

    const transmisionMatch =
      !filters.transmision ||
      model.transmision.includes(filters.transmision);

    const segmentoMatch =
      !filters.segmento || model.categoria.includes(filters.segmento);

    return (
      marcaMatch &&
      searchMatch &&
      modeloMatch &&
      combustibleMatch &&
      transmisionMatch &&
      segmentoMatch
    );
  });
}

export type SortOption = 'precio' | 'recientes' | 'marca-asc' | 'marca-desc';

export function sortModels(
  models: CarModel[],
  sort: SortOption = 'marca-asc'
): CarModel[] {
  const copy = [...models];
  switch (sort) {
    case 'recientes':
      return copy.sort((a, b) => Number(b.año) - Number(a.año));
    case 'marca-desc':
      return copy.sort(
        (a, b) =>
          b.brand.localeCompare(a.brand, 'es') ||
          a.nombre.localeCompare(b.nombre, 'es')
      );
    case 'precio':
      return copy.sort((a, b) => {
        const pa = Number(a.precio.replace(/[^\d]/g, '')) || 0;
        const pb = Number(b.precio.replace(/[^\d]/g, '')) || 0;
        return pa - pb;
      });
    case 'marca-asc':
    default:
      return copy.sort(
        (a, b) =>
          a.brand.localeCompare(b.brand, 'es') ||
          a.nombre.localeCompare(b.nombre, 'es')
      );
  }
}

export function modelPath(model: CarModel): string {
  return `/marcas/${brandSlug(model.brand)}/${modelSlug(model.nombre)}`;
}

export function brandPath(brandName: string): string {
  return `/marcas/${brandSlug(brandName)}`;
}

export const CARS_PER_PAGE = 9;

export function getTotalModelCount(): number {
  return getAllModels().length;
}

export function getTotalBrandCount(): number {
  return getBrandNames().length;
}
