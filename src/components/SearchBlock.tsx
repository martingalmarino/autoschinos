'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { CarModel } from '@/lib/models';
import { brandSlug, modelSlug } from '@/lib/models';

interface SearchBlockProps {
  models: CarModel[];
}

export default function SearchBlock({ models }: SearchBlockProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ marca: '', modelo: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    marca: false,
    modelo: false,
  });

  const marcas = useMemo(
    () => [...new Set(models.map((m) => m.brand))].sort((a, b) => a.localeCompare(b, 'es')),
    [models]
  );

  const modelos = useMemo(() => {
    const list = formData.marca
      ? models.filter((m) => m.brand === formData.marca).map((m) => m.nombre)
      : models.map((m) => m.nombre);
    return [...new Set(list)].sort((a, b) => a.localeCompare(b, 'es'));
  }, [models, formData.marca]);

  const handleInputChange = (field: 'marca' | 'modelo', value: string) => {
    if (field === 'marca') {
      setFormData({ marca: value, modelo: '' });
    } else {
      setFormData((prev) => ({ ...prev, modelo: value }));
    }
    setIsDropdownOpen((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.marca && formData.modelo) {
      const match = models.find(
        (m) => m.brand === formData.marca && m.nombre === formData.modelo
      );
      if (match) {
        router.push(`/marcas/${brandSlug(match.brand)}/${modelSlug(match.nombre)}`);
        return;
      }
    }

    if (formData.marca && !formData.modelo) {
      router.push(`/catalogo?marca=${encodeURIComponent(formData.marca)}`);
      return;
    }

    if (formData.modelo) {
      router.push(`/catalogo?modelo=${encodeURIComponent(formData.modelo)}`);
      return;
    }

    router.push('/catalogo');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl shadow-2xl p-8 -mt-8 relative z-10 border border-gray-200/50 bg-gradient-to-r from-gray-100 via-gray-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Buscá tu próximo auto
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setIsDropdownOpen((prev) => ({
                        ...prev,
                        marca: !prev.marca,
                        modelo: false,
                      }))
                    }
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left relative"
                  >
                    <span className={formData.marca ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.marca || 'Elegí la marca'}
                    </span>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </button>
                  {isDropdownOpen.marca && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {marcas.map((marca) => (
                        <button
                          key={marca}
                          type="button"
                          onClick={() => handleInputChange('marca', marca)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {marca}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modelo
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setIsDropdownOpen((prev) => ({
                        ...prev,
                        modelo: !prev.modelo,
                        marca: false,
                      }))
                    }
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left relative"
                  >
                    <span className={formData.modelo ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.modelo || 'Elegí el modelo'}
                    </span>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </button>
                  {isDropdownOpen.modelo && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {modelos.map((modelo) => (
                        <button
                          key={modelo}
                          type="button"
                          onClick={() => handleInputChange('modelo', modelo)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {modelo}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <button
                  type="button"
                  onClick={() => router.push('/catalogo')}
                  className="text-primary-500 hover:text-primary-600 font-medium text-left"
                >
                  • Ver todos los vehículos disponibles
                </button>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
