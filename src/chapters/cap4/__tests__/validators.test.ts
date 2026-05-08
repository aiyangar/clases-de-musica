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

  it('returns true when placed multiset equals required', () => {
    expect(validateBuild(ex, [blanca(), negra(), negra()])).toBe(true);
  });

  it('counts duplicates correctly', () => {
    expect(validateBuild(ex, [negra(), negra(), negra()])).toBe(false);
  });

  it('returns false when placed has fewer items', () => {
    expect(validateBuild(ex, [negra(), negra()])).toBe(false);
  });

  it('returns false when placed has more items', () => {
    expect(validateBuild(ex, [negra(), negra(), blanca(), corchea()])).toBe(false);
  });

  it('treats figure and rest of the same value as different', () => {
    expect(validateBuild(ex, [negra(), restNegra, blanca()])).toBe(false);
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

  it('returns true when every blank has the expected item', () => {
    const filled = new Map<string, FigureItem>([['0:1', negra()]]);
    expect(validateComplete(ex, filled)).toBe(true);
  });

  it('returns false when a blank is missing', () => {
    const filled = new Map<string, FigureItem>();
    expect(validateComplete(ex, filled)).toBe(false);
  });

  it('returns false when a blank has the wrong item', () => {
    const filled = new Map<string, FigureItem>([['0:1', blanca()]]);
    expect(validateComplete(ex, filled)).toBe(false);
  });
});
