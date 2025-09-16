import { useState, useEffect } from 'react';
import modelsData from '../data/models.json';

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
  brand: string; // Para compatibilidad con componentes existentes
}

export const useModels = () => {
  const [allModels, setAllModels] = useState<CarModel[]>([]);

  useEffect(() => {
    // Convertir datos JSON a formato compatible
    const models: CarModel[] = [];
    
    Object.entries(modelsData).forEach(([brandName, brandData]) => {
      brandData.modelos.forEach((modelo: any) => {
        models.push({
          ...modelo,
          brand: brandName // Agregar campo brand para compatibilidad
        });
      });
    });

    setAllModels(models);
  }, []);

  const getModelsByBrand = (brand: string) => {
    return allModels.filter(model => model.brand === brand);
  };

  const getFilteredModels = (filters: any) => {
    return allModels.filter(model => {
      return (!filters.marca || model.brand === filters.marca) &&
             (!filters.combustible || model.combustible.includes(filters.combustible)) &&
             (!filters.transmision || model.transmision.includes(filters.transmision)) &&
             (!filters.segmento || model.categoria.includes(filters.segmento));
    });
  };

  return {
    allModels,
    getModelsByBrand,
    getFilteredModels
  };
};
