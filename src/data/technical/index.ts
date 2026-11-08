import { baicSheets } from './baic';
import { bydSheets } from './byd';
import { changanSheets } from './changan';
import { cherySheets } from './chery';
import { dfskSheets } from './dfsk';
import { dongfengSheets } from './dongfeng';
import { fawSheets } from './faw';
import { fotonSheets } from './foton';
import { geelySheets } from './geely';
import { gwmSheets } from './gwm';
import { jacSheets } from './jac';
import { lifanSheets } from './lifan';
import { mgSheets } from './mg';
import type { ModelSheet } from '@/lib/technical/types';

export const technicalSheets: ModelSheet[] = [
  ...cherySheets,
  ...geelySheets,
  ...dfskSheets,
  ...jacSheets,
  ...gwmSheets,
  ...baicSheets,
  ...fotonSheets,
  ...changanSheets,
  ...mgSheets,
  ...fawSheets,
  ...dongfengSheets,
  ...bydSheets,
  ...lifanSheets,
];

const byId = new Map(technicalSheets.map((sheet) => [sheet.id, sheet]));

export function getSheet(id: string): ModelSheet | undefined {
  return byId.get(id);
}

export function getAllSheets(): ModelSheet[] {
  return technicalSheets;
}
