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
      // Filtro por marca específica
      const marcaMatch = !filters.marca || model.brand.toLowerCase() === filters.marca.toLowerCase();
      
      // Filtro por búsqueda general (busca en marca y modelo)
      const searchMatch = !filters.search || 
        model.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        model.nombre.toLowerCase().includes(filters.search.toLowerCase());
      
      // Otros filtros
      const combustibleMatch = !filters.combustible || model.combustible.includes(filters.combustible);
      const transmisionMatch = !filters.transmision || model.transmision.includes(filters.transmision);
      const segmentoMatch = !filters.segmento || model.categoria.includes(filters.segmento);
      
      return marcaMatch && searchMatch && combustibleMatch && transmisionMatch && segmentoMatch;
    });
  };

  return {
    allModels,
    getModelsByBrand,
    getFilteredModels
  };
};
