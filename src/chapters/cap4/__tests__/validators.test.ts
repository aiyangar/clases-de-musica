import { describe, it, expect } from 'vitest';
import {
  validateBars,
  validateBuild,
  validateComplete,
} from '@/chapters/cap4/exercises/validators';
import type {
  BarsExercise,
  BuildExercise,
  CompleteExercise,
  FigureItem,
} from '@/chapters/cap4/types';

const negra = (step = 4): FigureItem => ({
  kind: 'figure',
  figure: 'negra',
  step,
});
const blanca = (step = 4): FigureItem => ({
  kind: 'figure',
  figure: 'blanca',
  step,
});
const corchea = (step = 4): FigureItem => ({
  kind: 'figure',
  figure: 'corchea',
  step,
});
const restNegra: FigureItem = { kind: 'rest', rest: 'negra' };

describe('validateBars', () => {
  const ex: BarsExercise = {
    id: 'bars-test',
    timeSig: '4/4',
    items: [negra(), negra(), negra(), negra(), negra(), negra(), negra(), negra()],
    expectedBarsAfter: [3],
  };

  it('returns true when bars match exactly', () => {
    expect(validateBars(ex, [3])).toBe(true);
  });

  it('returns true regardless of order', () => {
    const ex2: BarsExercise = { ...ex, expectedBarsAfter: [3, 5] };
    expect(validateBars(ex2, [5, 3])).toBe(true);
  });

  it('returns false when missing a bar', () => {
    expect(validateBars(ex, [])).toBe(false);
  });

  it('returns false when an extra bar is added', () => {
    expect(validateBars(ex, [3, 5])).toBe(false);
  });
});

describe('validateBuild', () => {
  const ex: BuildExercise = {
    id: 'build-test',
    timeSig: '4/4',
    required: [negra(), negra(), blanca()],
  };

  it('returns true when placed exact required multiset', () => {
    expect(validateBuild(ex, [blanca(), negra(), negra()])).toBe(true);
  });

  it('returns false when placed sums to less than the indicator', () => {
    expect(validateBuild(ex, [negra(), negra(), negra()])).toBe(false);
  });

  it('returns false when placed has fewer items than required.length', () => {
    expect(validateBuild(ex, [negra(), negra()])).toBe(false);
  });

  it('returns false when placed has more items than required.length', () => {
    expect(validateBuild(ex, [negra(), negra(), blanca(), corchea()])).toBe(false);
  });

  it('accepts a rest of equal value as a substitute for a figure', () => {
    // open validation: same count, same sum (1 + 1 + 2 = 4)
    expect(validateBuild(ex, [negra(), restNegra, blanca()])).toBe(true);
  });

  it('accepts any combination that matches count and sum', () => {
    // ex.required = [N, N, B] → 3 items, sum 4 → any 3 items summing to 4
    expect(validateBuild(ex, [blanca(), blanca(), corchea()])).toBe(false); // 4.5
    expect(validateBuild(ex, [blanca(), negra(), restNegra])).toBe(true);   // 4
  });
});

describe('validateComplete', () => {
  const ex: CompleteExercise = {
    id: 'complete-test',
    timeSig: '4/4',
    measures: [
      {
        slots: [
          { kind: 'fixed', item: negra() },
          { kind: 'blank', expected: negra() },
          { kind: 'fixed', item: blanca() },
        ],
      },
    ],
  };

  it('returns true when every measure sums to the target with the expected fill', () => {
    // measure: N (1) + blank + B (2) = target 4 → blank must contribute 1
    const filled = new Map<string, FigureItem>([['0:1', negra()]]);
    expect(validateComplete(ex, filled)).toBe(true);
  });

  it('accepts a rest of equal value as a fill (open validation)', () => {
    const filled = new Map<string, FigureItem>([['0:1', restNegra]]);
    expect(validateComplete(ex, filled)).toBe(true);
  });

  it('returns false when a blank is missing', () => {
    const filled = new Map<string, FigureItem>();
    expect(validateComplete(ex, filled)).toBe(false);
  });

  it('returns false when a fill changes the measure sum', () => {
    // blanca (2) instead of negra (1): sum becomes 5, not 4
    const filled = new Map<string, FigureItem>([['0:1', blanca()]]);
    expect(validateComplete(ex, filled)).toBe(false);
  });
});
