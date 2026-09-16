import type { CarModel } from '@/lib/models';
import { getAllModels } from '@/lib/models';
import overridesData from '@/data/efficiency-overrides.json';

export type PowertrainKind = 'bev' | 'hev' | 'phev' | 'nafta' | 'diesel';

export type SegmentSize = 'compacto' | 'mediano' | 'grande';

export interface EfficiencyOverride {
  batteryKwh?: number;
  rangeKm?: number;
  rangeKmEv?: number;
  kwhPer100km?: number;
  lPer100kmHybrid?: number;
  lPer100km?: number;
  source?: string;
}

export interface ModelEfficiency {
  kind: PowertrainKind;
  segment: SegmentSize;
  lPer100km?: number;
  kwhPer100km?: number;
  batteryKwh?: number;
  estimated: boolean;
  source: string;
}

const overrides = overridesData as Record<string, EfficiencyOverride>;

export const DEFAULT_PRICES = {
  naftaPerLiter: 2050,
  dieselPerLiter: 1950,
  kwh: 232,
  annualKm: 15000,
  phevEvPercent: 60,
  years: 5,
} as const;

const NAFTA_BY_SEGMENT: Record<SegmentSize, number> = {
  compacto: 8.0,
  mediano: 9.5,
  grande: 11.0,
};

const DIESEL_BY_SEGMENT: Record<SegmentSize, number> = {
  compacto: 7.0,
  mediano: 7.5,
  grande: 9.0,
};

const HEV_BY_SEGMENT: Record<SegmentSize, number> = {
  compacto: 5.5,
  mediano: 5.8,
  grande: 6.5,
};

const BEV_BY_SEGMENT: Record<SegmentSize, number> = {
  compacto: 15.0,
  mediano: 17.0,
  grande: 18.5,
};

const PHEV_KWH = 18.5;
const PHEV_L_HYBRID = 6.0;

export function classifyPowertrain(combustible: string): PowertrainKind {
  const c = combustible.toLowerCase();
  if (c.includes('enchufable') || c.includes('phev') || c.includes('dm-i') || c.includes('dm i')) {
    return 'phev';
  }
  if (c.includes('100%') || (c.includes('eléct') && !c.includes('híbr') && !c.includes('hibr'))) {
    return 'bev';
  }
  if (c.includes('híbr') || c.includes('hibr')) {
    return 'hev';
  }
  if (c.includes('diés') || c.includes('dies')) {
    return 'diesel';
  }
  return 'nafta';
}

export function classifySegment(categoria: string): SegmentSize {
  const c = categoria.toLowerCase();
  if (
    c.includes('grande') ||
    c.includes('7 plaza') ||
    c.includes('pick') ||
    c.includes('camion') ||
    c.includes('camión') ||
    c.includes('deportivo')
  ) {
    return 'grande';
  }
  if (c.includes('compacto') || c.includes('hatch') || c.includes('urbano')) {
    return 'compacto';
  }
  return 'mediano';
}

export function isElectrified(model: CarModel): boolean {
  const kind = classifyPowertrain(model.combustible);
  return kind === 'bev' || kind === 'hev' || kind === 'phev';
}

export function isCombustion(model: CarModel): boolean {
  const kind = classifyPowertrain(model.combustible);
  return kind === 'nafta' || kind === 'diesel';
}

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

/** Suggest a combustion peer in a similar category/segment. */
export function suggestCombustionPeer(electrified: CarModel): CarModel | null {
  const segment = classifySegment(electrified.categoria);
  const combustion = getCombustionModels();
  const sameCategory = combustion.filter(
    (m) =>
      classifySegment(m.categoria) === segment &&
      (m.categoria.toLowerCase().includes('suv') ===
        electrified.categoria.toLowerCase().includes('suv') ||
        m.categoria.toLowerCase().includes('hatch') ===
          electrified.categoria.toLowerCase().includes('hatch') ||
        m.categoria.toLowerCase().includes('sedán') ===
          electrified.categoria.toLowerCase().includes('sedán') ||
        m.categoria.toLowerCase().includes('sedan') ===
          electrified.categoria.toLowerCase().includes('sedan'))
  );
  if (sameCategory.length) return sameCategory[0];
  const sameSegment = combustion.filter(
    (m) => classifySegment(m.categoria) === segment
  );
  return sameSegment[0] ?? combustion[0] ?? null;
}

export function parseBatteryKwh(text: string): number | undefined {
  const match = text.match(/(\d+[.,]?\d*)\s*kwh/i);
  if (!match) return undefined;
  return Number(match[1].replace(',', '.'));
}

export function parseRangeKm(text: string): number | undefined {
  const match = text.match(/(\d+)\s*km/i);
  if (!match) return undefined;
  return Number(match[1]);
}

export function resolveEfficiency(model: CarModel): ModelEfficiency {
  const kind = classifyPowertrain(model.combustible);
  const segment = classifySegment(model.categoria);
  const override = overrides[model.id];
  const parsedBattery = parseBatteryKwh(model.especificaciones.capacidad_tanque);
  const parsedRange =
    parseRangeKm(model.descripcion) ??
    (override?.rangeKm ?? override?.rangeKmEv);

  if (kind === 'bev') {
    let kwhPer100 =
      override?.kwhPer100km ??
      (override?.batteryKwh && (override.rangeKm || parsedRange)
        ? (100 * (override.batteryKwh || parsedBattery || 0)) /
          (override.rangeKm || parsedRange || 1)
        : undefined) ??
      (parsedBattery && parsedRange
        ? (100 * parsedBattery) / parsedRange
        : undefined);

    const estimated = !override?.kwhPer100km;
    if (!kwhPer100) kwhPer100 = BEV_BY_SEGMENT[segment];

    return {
      kind,
      segment,
      kwhPer100km: round1(kwhPer100),
      batteryKwh: override?.batteryKwh ?? parsedBattery,
      estimated,
      source:
        override?.source ||
        (estimated
          ? `Estimado segmento ${segment} (BEV)`
          : 'Override de ficha'),
    };
  }

  if (kind === 'hev') {
    const lPer100 = override?.lPer100kmHybrid ?? HEV_BY_SEGMENT[segment];
    return {
      kind,
      segment,
      lPer100km: round1(lPer100),
      estimated: !override?.lPer100kmHybrid,
      source:
        override?.source ||
        `Estimado segmento ${segment} (HEV)`,
    };
  }

  if (kind === 'phev') {
    return {
      kind,
      segment,
      kwhPer100km: round1(override?.kwhPer100km ?? PHEV_KWH),
      lPer100km: round1(override?.lPer100kmHybrid ?? PHEV_L_HYBRID),
      batteryKwh: override?.batteryKwh ?? parsedBattery,
      estimated: !override?.kwhPer100km || !override?.lPer100kmHybrid,
      source: override?.source || `Estimado PHEV segmento ${segment}`,
    };
  }

  if (kind === 'diesel') {
    const lPer100 = override?.lPer100km ?? DIESEL_BY_SEGMENT[segment];
    return {
      kind,
      segment,
      lPer100km: round1(lPer100),
      estimated: !override?.lPer100km,
      source: override?.source || `Estimado segmento ${segment} (diésel)`,
    };
  }

  const lPer100 = override?.lPer100km ?? NAFTA_BY_SEGMENT[segment];
  return {
    kind: 'nafta',
    segment,
    lPer100km: round1(lPer100),
    estimated: !override?.lPer100km,
    source: override?.source || `Estimado segmento ${segment} (nafta)`,
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export interface CalculatorInputs {
  annualKm: number;
  naftaPerLiter: number;
  dieselPerLiter: number;
  kwhPrice: number;
  /** 0–100, only for PHEV */
  phevEvPercent: number;
  years: number;
}

export interface VehicleAnnualCost {
  model: CarModel;
  efficiency: ModelEfficiency;
  annualCost: number;
  costPerKm: number;
  fuelLabel: string;
}

export interface SavingsResult {
  electrified: VehicleAnnualCost;
  combustion: VehicleAnnualCost;
  annualSavings: number;
  monthlySavings: number;
  cumulativeSavings: number;
  years: number;
}

export function computeAnnualCost(
  model: CarModel,
  inputs: CalculatorInputs
): VehicleAnnualCost {
  const efficiency = resolveEfficiency(model);
  const D = Math.max(0, inputs.annualKm);
  let annualCost = 0;
  let fuelLabel = '';

  if (efficiency.kind === 'bev') {
    const kwh = efficiency.kwhPer100km ?? BEV_BY_SEGMENT[efficiency.segment];
    annualCost = D * (kwh / 100) * inputs.kwhPrice;
    fuelLabel = `${kwh} kWh/100 km`;
  } else if (efficiency.kind === 'hev') {
    const l = efficiency.lPer100km ?? HEV_BY_SEGMENT[efficiency.segment];
    annualCost = D * (l / 100) * inputs.naftaPerLiter;
    fuelLabel = `${l} L/100 km (híbrido)`;
  } else if (efficiency.kind === 'phev') {
    const pct = Math.min(100, Math.max(0, inputs.phevEvPercent)) / 100;
    const kwh = efficiency.kwhPer100km ?? PHEV_KWH;
    const l = efficiency.lPer100km ?? PHEV_L_HYBRID;
    const evKm = D * pct;
    const iceKm = D * (1 - pct);
    annualCost =
      evKm * (kwh / 100) * inputs.kwhPrice +
      iceKm * (l / 100) * inputs.naftaPerLiter;
    fuelLabel = `${Math.round(pct * 100)}% EV (${kwh} kWh/100) + nafta (${l} L/100)`;
  } else if (efficiency.kind === 'diesel') {
    const l = efficiency.lPer100km ?? DIESEL_BY_SEGMENT[efficiency.segment];
    annualCost = D * (l / 100) * inputs.dieselPerLiter;
    fuelLabel = `${l} L/100 km (diésel)`;
  } else {
    const l = efficiency.lPer100km ?? NAFTA_BY_SEGMENT[efficiency.segment];
    annualCost = D * (l / 100) * inputs.naftaPerLiter;
    fuelLabel = `${l} L/100 km (nafta)`;
  }

  return {
    model,
    efficiency,
    annualCost: Math.round(annualCost),
    costPerKm: D > 0 ? annualCost / D : 0,
    fuelLabel,
  };
}

export function computeSavings(
  electrifiedModel: CarModel,
  combustionModel: CarModel,
  inputs: CalculatorInputs
): SavingsResult {
  const electrified = computeAnnualCost(electrifiedModel, inputs);
  const combustion = computeAnnualCost(combustionModel, inputs);
  const annualSavings = combustion.annualCost - electrified.annualCost;
  const years = Math.max(1, inputs.years);

  return {
    electrified,
    combustion,
    annualSavings: Math.round(annualSavings),
    monthlySavings: Math.round(annualSavings / 12),
    cumulativeSavings: Math.round(annualSavings * years),
    years,
  };
}

export function formatArs(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);
}
