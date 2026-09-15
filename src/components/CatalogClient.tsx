'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CarModel, SortOption } from '@/lib/models';
import { CARS_PER_PAGE, filterModels, sortModels } from '@/lib/models';
import ModelCard from '@/components/ModelCard';
import Pagination from '@/components/Pagination';

interface CatalogClientProps {
  models: CarModel[];
}

export default function CatalogClient({ models }: CatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      marca: searchParams.get('marca') || '',
      search: searchParams.get('search') || '',
      modelo: searchParams.get('modelo') || '',
      combustible: searchParams.get('combustible') || '',
      transmision: searchParams.get('transmision') || '',
      segmento: searchParams.get('segmento') || '',
    }),
    [searchParams]
  );

  const sort = (searchParams.get('sort') as SortOption) || 'marca-asc';
  const currentPage = Math.max(1, Number(searchParams.get('page') || '1'));

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    if (!('page' in updates)) params.delete('page');
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const filterOptions = useMemo(() => {
    const marcas = [...new Set(models.map((m) => m.brand))].sort((a, b) =>
      a.localeCompare(b, 'es')
    );
    const combustibles = [...new Set(models.map((m) => m.combustible))].sort();
    const transmisiones = [
      ...new Set(
        models.flatMap((m) => m.transmision.split(' / ').map((t) => t.trim()))
      ),
    ].sort();
    const segmentos = [...new Set(models.map((m) => m.categoria))].sort();
    return { marcas, combustibles, transmisiones, segmentos };
  }, [models]);

  const filtered = useMemo(
    () => sortModels(filterModels(models, filters), sort),
    [models, filters, sort]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / CARS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * CARS_PER_PAGE,
    safePage * CARS_PER_PAGE
  );

  const clearFilters = () => {
    router.push('/catalogo');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/4">
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              Limpiar todo
            </button>
          </div>

          {(filters.search || filters.modelo) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {filters.search && (
                <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                  Búsqueda: {filters.search}
                </span>
              )}
              {filters.modelo && (
                <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                  Modelo: {filters.modelo}
                </span>
              )}
            </div>
          )}

          <FilterSelect
            label="Marca"
            value={filters.marca}
            emptyLabel="Todas las marcas"
            options={filterOptions.marcas}
            onChange={(value) => updateParams({ marca: value })}
          />
          <FilterSelect
            label="Combustible"
            value={filters.combustible}
            emptyLabel="Todos"
            options={filterOptions.combustibles}
            onChange={(value) => updateParams({ combustible: value })}
          />
          <FilterSelect
            label="Transmisión"
            value={filters.transmision}
            emptyLabel="Todas"
            options={filterOptions.transmisiones}
            onChange={(value) => updateParams({ transmision: value })}
          />
          <FilterSelect
            label="Segmentos"
            value={filters.segmento}
            emptyLabel="Todos"
            options={filterOptions.segmentos}
            onChange={(value) => updateParams({ segmento: value })}
          />

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{filtered.length} modelos</span>{' '}
              encontrados
            </p>
          </div>
        </div>
      </aside>

      <div className="lg:w-3/4">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Resultados de búsqueda
            </h2>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg inline-block">
              Página {safePage} de {totalPages}
            </span>
          </div>
          <select
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            aria-label="Ordenar resultados"
            value={sort}
            onChange={(e) =>
              updateParams({ sort: e.target.value, page: '' })
            }
          >
            <option value="precio">Ordenar por precio</option>
            <option value="recientes">Más recientes</option>
            <option value="marca-asc">Marca A-Z</option>
            <option value="marca-desc">Marca Z-A</option>
          </select>
        </div>

        {pageItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No encontramos modelos con esos filtros
            </h3>
            <p className="text-gray-600 mb-6">
              Probá limpiar los filtros o explorar el catálogo completo.
            </p>
            <button type="button" onClick={clearFilters} className="btn-primary">
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((car) => (
                <ModelCard key={car.id} model={car} />
              ))}
            </div>
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={(page) =>
                updateParams({ page: page === 1 ? '' : String(page) })
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  emptyLabel,
  options,
  onChange,
}: {
  label: string;
  value: string;
  emptyLabel: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label={`Seleccionar ${label.toLowerCase()}`}
      >
        <option value="">{emptyLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
