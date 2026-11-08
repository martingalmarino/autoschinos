import type { CarModel } from '@/lib/catalog';
import { isCombustion, isElectrified } from '@/lib/efficiency';
import { getAllModels } from '@/lib/models';

export function getElectrifiedModels(): CarModel[] {
  return getAllModels()
    .filter(isElectrified)
    .sort(
      (a, b) =>
        a.brand.localeCompare(b.brand, 'es') ||
        a.nombre.localeCompare(b.nombre, 'es')
    );
}

export function getCombustionModels(): CarModel[] {
  return getAllModels()
    .filter(isCombustion)
    .sort(
      (a, b) =>
        a.brand.localeCompare(b.brand, 'es') ||
        a.nombre.localeCompare(b.nombre, 'es')
    );
}
