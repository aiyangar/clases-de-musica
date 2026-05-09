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

function itemsEqual(a: FigureItem, b: FigureItem): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'figure' && b.kind === 'figure') {
    return a.figure === b.figure && a.step === b.step;
  }
  if (a.kind === 'rest' && b.kind === 'rest') {
    return a.rest === b.rest;
  }
  return false;
}

export function validateComplete(
  ex: CompleteExercise,
  filled: Map<string, FigureItem>,
): boolean {
  for (let mIdx = 0; mIdx < ex.measures.length; mIdx++) {
    const measure = ex.measures[mIdx];
    for (let sIdx = 0; sIdx < measure.slots.length; sIdx++) {
      const slot = measure.slots[sIdx];
      if (slot.kind !== 'blank') continue;
      const key = `${mIdx}:${sIdx}`;
      const userItem = filled.get(key);
      if (!userItem) return false;
      if (!itemsEqual(userItem, slot.expected)) return false;
    }
  }
  return true;
}
