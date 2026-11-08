import React from 'react';
import Link from 'next/link';
import type { CarModel } from '@/lib/catalog';
import { modelPath } from '@/lib/catalog';
import { publicCategory, publicFuel } from '@/lib/technical/editorial';

interface ModelCardProps {
  model: CarModel;
}

export default function ModelCard({ model }: ModelCardProps) {
  const categoria = publicCategory(model);
  const meta = [publicFuel(model), model.transmision].filter(Boolean);
  const precios = model.preciosPublicos ?? [];

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-bold text-gray-800">{model.brand}</span>
        {categoria && (
          <span className="text-xs font-medium text-gray-500">{categoria}</span>
        )}
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
        {meta.length > 0 && (
          <p className="text-sm text-gray-600 mb-3">{meta.join(' · ')}</p>
        )}
        <div className="flex justify-between items-start gap-2">
          {precios.length > 0 && (
            <div className="text-sm font-bold text-primary-500 flex-1 break-words">
              {precios.map((price) => (
                <span key={`${price.version}-${price.amount}`} className="block">
                  {price.amount} · {price.version}
                </span>
              ))}
              <span className="block text-xs font-medium text-gray-500 mt-1">
                {precios[0].note}
              </span>
            </div>
          )}
          <Link
            href={modelPath(model)}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors ml-auto"
          >
            Ver ficha
          </Link>
        </div>
      </div>
    </article>
  );
}
