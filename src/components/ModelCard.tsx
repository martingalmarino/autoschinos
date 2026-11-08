import Link from 'next/link';
import type { CarModel } from '@/lib/models';
import { modelPath } from '@/lib/models';

interface ModelCardProps {
  model: CarModel;
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-bold text-gray-800">{model.brand}</span>
        <span className="text-xs font-medium text-gray-500">{model.categoria}</span>
      </div>

      <div className="image-container-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={model.imagen}
          alt={`${model.brand} ${model.nombre}`}
          className="model-image-card"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 uppercase">
          {model.nombre}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {model.año} | {model.combustible} | {model.transmision}
        </p>
        {model.avisoCorto && (
          <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded px-2 py-1 mb-3">
            {model.avisoCorto}
          </p>
        )}
        <div className="flex justify-between items-start gap-2">
          <span className="text-sm font-bold text-primary-500 flex-1 break-words">
            {model.precio}
          </span>
          <Link
            href={modelPath(model)}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
          >
            Ver ficha
          </Link>
        </div>
      </div>
    </article>
  );
}
