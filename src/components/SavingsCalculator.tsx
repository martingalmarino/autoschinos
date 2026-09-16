'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CarModel } from '@/lib/models';
import { modelPath } from '@/lib/models';
import {
  DEFAULT_PRICES,
  computeSavings,
  formatArs,
  resolveEfficiency,
  suggestCombustionPeer,
} from '@/lib/efficiency';

interface SavingsCalculatorProps {
  electrifiedModels: CarModel[];
  combustionModels: CarModel[];
}

export default function SavingsCalculator({
  electrifiedModels,
  combustionModels,
}: SavingsCalculatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialEvId =
    searchParams.get('modelo') || electrifiedModels[0]?.id || '';
  const initialEv =
    electrifiedModels.find((m) => m.id === initialEvId) || electrifiedModels[0];

  const [evId, setEvId] = useState(initialEv?.id || '');
  const [iceId, setIceId] = useState(() => {
    const fromUrl = searchParams.get('vs');
    if (fromUrl && combustionModels.some((m) => m.id === fromUrl)) return fromUrl;
    const peer = initialEv ? suggestCombustionPeer(initialEv) : null;
    return peer?.id || combustionModels[0]?.id || '';
  });
  const [annualKm, setAnnualKm] = useState(
    Number(searchParams.get('km')) || DEFAULT_PRICES.annualKm
  );
  const [nafta, setNafta] = useState(
    Number(searchParams.get('nafta')) || DEFAULT_PRICES.naftaPerLiter
  );
  const [diesel, setDiesel] = useState(
    Number(searchParams.get('diesel')) || DEFAULT_PRICES.dieselPerLiter
  );
  const [kwh, setKwh] = useState(
    Number(searchParams.get('kwh')) || DEFAULT_PRICES.kwh
  );
  const [phevPct, setPhevPct] = useState(
    Number(searchParams.get('evpct')) || DEFAULT_PRICES.phevEvPercent
  );
  const [years, setYears] = useState(
    Number(searchParams.get('anos')) || DEFAULT_PRICES.years
  );

  const evModel = electrifiedModels.find((m) => m.id === evId) || electrifiedModels[0];
  const iceModel =
    combustionModels.find((m) => m.id === iceId) || combustionModels[0];

  const evEfficiency = evModel ? resolveEfficiency(evModel) : null;
  const showPhev = evEfficiency?.kind === 'phev';

  // When EV changes, suggest a new combustion peer if current is empty
  useEffect(() => {
    if (!evModel) return;
    const peer = suggestCombustionPeer(evModel);
    if (peer && !combustionModels.find((m) => m.id === iceId)) {
      setIceId(peer.id);
    }
  }, [evModel, iceId, combustionModels]);

  const result = useMemo(() => {
    if (!evModel || !iceModel) return null;
    return computeSavings(evModel, iceModel, {
      annualKm,
      naftaPerLiter: nafta,
      dieselPerLiter: diesel,
      kwhPrice: kwh,
      phevEvPercent: phevPct,
      years,
    });
  }, [evModel, iceModel, annualKm, nafta, diesel, kwh, phevPct, years]);

  const shareUrl = () => {
    const params = new URLSearchParams();
    if (evId) params.set('modelo', evId);
    if (iceId) params.set('vs', iceId);
    params.set('km', String(annualKm));
    params.set('nafta', String(nafta));
    params.set('diesel', String(diesel));
    params.set('kwh', String(kwh));
    params.set('evpct', String(phevPct));
    params.set('anos', String(years));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const t = setTimeout(shareUrl, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evId, iceId, annualKm, nafta, diesel, kwh, phevPct, years]);

  const brandsEv = [...new Set(electrifiedModels.map((m) => m.brand))].sort(
    (a, b) => a.localeCompare(b, 'es')
  );
  const [evBrand, setEvBrand] = useState(evModel?.brand || brandsEv[0] || '');
  const evModelsOfBrand = electrifiedModels.filter((m) => m.brand === evBrand);

  const brandsIce = [...new Set(combustionModels.map((m) => m.brand))].sort(
    (a, b) => a.localeCompare(b, 'es')
  );
  const [iceBrand, setIceBrand] = useState(iceModel?.brand || brandsIce[0] || '');
  const iceModelsOfBrand = combustionModels.filter((m) => m.brand === iceBrand);

  useEffect(() => {
    if (evModel && evModel.brand !== evBrand) setEvBrand(evModel.brand);
  }, [evModel, evBrand]);

  useEffect(() => {
    if (iceModel && iceModel.brand !== iceBrand) setIceBrand(iceModel.brand);
  }, [iceModel, iceBrand]);

  if (!evModel || !iceModel || !result) {
    return (
      <p className="text-center text-gray-600 py-12">
        No hay suficientes modelos en el catálogo para calcular.
      </p>
    );
  }

  const positive = result.annualSavings >= 0;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Electrified selector */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Modelo electrificado
          </h2>
          <Field label="Marca">
            <select
              className="input"
              value={evBrand}
              onChange={(e) => {
                const brand = e.target.value;
                setEvBrand(brand);
                const first = electrifiedModels.find((m) => m.brand === brand);
                if (first) {
                  setEvId(first.id);
                  const peer = suggestCombustionPeer(first);
                  if (peer) {
                    setIceId(peer.id);
                    setIceBrand(peer.brand);
                  }
                }
              }}
            >
              {brandsEv.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Modelo">
            <select
              className="input"
              value={evId}
              onChange={(e) => {
                const id = e.target.value;
                setEvId(id);
                const m = electrifiedModels.find((x) => x.id === id);
                if (m) {
                  const peer = suggestCombustionPeer(m);
                  if (peer) {
                    setIceId(peer.id);
                    setIceBrand(peer.brand);
                  }
                }
              }}
            >
              {evModelsOfBrand.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.combustible})
                </option>
              ))}
            </select>
          </Field>
          <ModelSummary model={evModel} />
        </div>

        {/* Combustion selector */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Comparar contra (combustión)
          </h2>
          <Field label="Marca">
            <select
              className="input"
              value={iceBrand}
              onChange={(e) => {
                const brand = e.target.value;
                setIceBrand(brand);
                const first = combustionModels.find((m) => m.brand === brand);
                if (first) setIceId(first.id);
              }}
            >
              {brandsIce.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Modelo">
            <select
              className="input"
              value={iceId}
              onChange={(e) => setIceId(e.target.value)}
            >
              {iceModelsOfBrand.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.combustible})
                </option>
              ))}
            </select>
          </Field>
          <ModelSummary model={iceModel} />
        </div>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Tus parámetros</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NumberField
            label="Kilómetros por año"
            value={annualKm}
            min={1000}
            max={100000}
            step={500}
            onChange={setAnnualKm}
          />
          <NumberField
            label="Precio nafta ($/L)"
            value={nafta}
            min={500}
            max={10000}
            step={50}
            onChange={setNafta}
          />
          <NumberField
            label="Precio diésel ($/L)"
            value={diesel}
            min={500}
            max={10000}
            step={50}
            onChange={setDiesel}
          />
          <NumberField
            label="Precio energía ($/kWh)"
            value={kwh}
            min={50}
            max={2000}
            step={10}
            onChange={setKwh}
            hint="Default AMBA referencial: $232/kWh"
          />
          {showPhev ? (
            <NumberField
              label="% uso en modo eléctrico"
              value={phevPct}
              min={0}
              max={100}
              step={5}
              onChange={setPhevPct}
            />
          ) : null}
          <Field label="Horizonte de proyección">
            <select
              className="input"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            >
              <option value={1}>1 año</option>
              <option value={3}>3 años</option>
              <option value={5}>5 años</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Results */}
      <div
        className={`rounded-2xl p-8 text-white shadow-xl ${
          positive
            ? 'bg-gradient-to-br from-emerald-600 to-teal-700'
            : 'bg-gradient-to-br from-slate-700 to-slate-900'
        }`}
      >
        <p className="text-sm uppercase tracking-wide opacity-90 mb-2">
          {positive ? 'Ahorro estimado anual' : 'Costo extra estimado anual'}
        </p>
        <p className="text-4xl md:text-5xl font-bold mb-2">
          {formatArs(Math.abs(result.annualSavings))}
        </p>
        <p className="text-lg opacity-95 mb-6">
          ≈ {formatArs(Math.abs(result.monthlySavings))} / mes ·{' '}
          {formatArs(Math.abs(result.cumulativeSavings))} en {result.years}{' '}
          {result.years === 1 ? 'año' : 'años'}
        </p>
        <p className="text-sm opacity-90">
          Comparando {evModel.brand} {evModel.nombre} vs {iceModel.brand}{' '}
          {iceModel.nombre} · {annualKm.toLocaleString('es-AR')} km/año
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CostCard
          title={`${evModel.brand} ${evModel.nombre}`}
          cost={result.electrified.annualCost}
          perKm={result.electrified.costPerKm}
          fuelLabel={result.electrified.fuelLabel}
          estimated={result.electrified.efficiency.estimated}
          source={result.electrified.efficiency.source}
          href={modelPath(evModel)}
        />
        <CostCard
          title={`${iceModel.brand} ${iceModel.nombre}`}
          cost={result.combustion.annualCost}
          perKm={result.combustion.costPerKm}
          fuelLabel={result.combustion.fuelLabel}
          estimated={result.combustion.efficiency.estimated}
          source={result.combustion.efficiency.source}
          href={modelPath(iceModel)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Proyección acumulada
        </h3>
        <div className="space-y-3">
          {[1, 3, 5].map((y) => {
            const val = result.annualSavings * y;
            const width = Math.min(
              100,
              (Math.abs(val) / Math.max(Math.abs(result.annualSavings * 5), 1)) *
                100
            );
            return (
              <div key={y}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">
                    {y} {y === 1 ? 'año' : 'años'}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatArs(val)}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      val >= 0 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <details className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-sm text-gray-700">
        <summary className="font-semibold cursor-pointer text-gray-900">
          ¿Cómo se calcula?
        </summary>
        <div className="mt-3 space-y-2 leading-relaxed">
          <p>
            El costo anual se estima con kilómetros × consumo × precio de
            energía o combustible. En PHEV se mezcla el % eléctrico con el
            tramo nafta.
          </p>
          <p>
            Cuando el catálogo no publica L/100 km o kWh/100 km usamos
            promedios por segmento (marcados como <em>estimado</em>). Podés
            ajustar nafta, diésel y kWh a tu tarifa real.
          </p>
          <p>
            No incluye patente, seguro, mantenimiento ni precio de compra: solo
            costo de uso energético/combustible (comparable a la calculadora
            BYD, pero multi-marca y con modelos reales del catálogo).
          </p>
        </div>
      </details>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={modelPath(evModel)} className="btn-primary text-center">
          Ver ficha {evModel.nombre}
        </Link>
        <Link href="/catalogo" className="btn-secondary text-center">
          Explorar catálogo
        </Link>
        <Link href="/contacto" className="btn-secondary text-center">
          Contacto
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  hint,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  hint?: string;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        className="input"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
    </Field>
  );
}

function ModelSummary({ model }: { model: CarModel }) {
  const eff = resolveEfficiency(model);
  return (
    <div className="flex gap-4 items-center pt-2 border-t border-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={model.imagen}
        alt={`${model.brand} ${model.nombre}`}
        className="w-24 h-16 object-cover rounded-lg bg-gray-100"
      />
      <div className="text-sm">
        <p className="font-semibold text-gray-900">
          {model.brand} {model.nombre}
        </p>
        <p className="text-gray-600">{model.categoria}</p>
        <p className="text-gray-500 mt-1">
          {eff.estimated ? (
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full mr-1">
              estimado
            </span>
          ) : (
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded-full mr-1">
              ficha
            </span>
          )}
          <span className="text-xs">{eff.source}</span>
        </p>
      </div>
    </div>
  );
}

function CostCard({
  title,
  cost,
  perKm,
  fuelLabel,
  estimated,
  source,
  href,
}: {
  title: string;
  cost: number;
  perKm: number;
  fuelLabel: string;
  estimated: boolean;
  source: string;
  href: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary-600 mb-1">
        {formatArs(cost)}
        <span className="text-sm font-medium text-gray-500"> / año</span>
      </p>
      <p className="text-sm text-gray-600 mb-3">
        {formatArs(perKm)} / km · {fuelLabel}
      </p>
      <p className="text-xs text-gray-500 mb-4">
        {estimated ? 'Dato estimado · ' : 'Dato de referencia · '}
        {source}
      </p>
      <Link href={href} className="text-primary-600 text-sm font-semibold underline">
        Ver ficha técnica →
      </Link>
    </div>
  );
}
