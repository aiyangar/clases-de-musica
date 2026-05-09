import type {
  BarsExercise,
  BuildExercise,
  CompleteExercise,
  FigureItem,
} from '@/chapters/cap4/types';
import { TIME_SIG_VALUE, itemValue } from '@/chapters/cap4/types';

export function validateBars(ex: BarsExercise, userBars: number[]): boolean {
  const a = [...userBars].sort((x, y) => x - y);
  const b = [...ex.expectedBarsAfter].sort((x, y) => x - y);
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

export function validateBuild(ex: BuildExercise, placed: FigureItem[]): boolean {
  if (placed.length !== ex.required.length) return false;
  const sum = placed.reduce((s, item) => s + itemValue(item), 0);
  return sum === TIME_SIG_VALUE[ex.timeSig];
}

export function validateComplete(
  ex: CompleteExercise,
  filled: Map<string, FigureItem>,
): boolean {
  const target = TIME_SIG_VALUE[ex.timeSig];
  for (let mIdx = 0; mIdx < ex.measures.length; mIdx++) {
    const measure = ex.measures[mIdx];
    let sum = 0;
    for (let sIdx = 0; sIdx < measure.slots.length; sIdx++) {
      const slot = measure.slots[sIdx];
      if (slot.kind === 'fixed') {
        sum += itemValue(slot.item);
        continue;
      }
      const userItem = filled.get(`${mIdx}:${sIdx}`);
      if (!userItem) return false;
      sum += itemValue(userItem);
    }
    if (sum !== target) return false;
  }
  return true;
}
