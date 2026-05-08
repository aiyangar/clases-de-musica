import { describe, it, expect } from 'vitest';
import { BARS_EXERCISES } from '@/chapters/cap4/data/bars';
import { BUILD_EXERCISES } from '@/chapters/cap4/data/build';
import { COMPLETE_EXERCISES } from '@/chapters/cap4/data/complete';
import {
  TIME_SIG_VALUE,
  itemValue,
  type CompleteSlot,
} from '@/chapters/cap4/types';

describe('BARS_EXERCISES', () => {
  it('has exactly 4 exercises', () => {
    expect(BARS_EXERCISES).toHaveLength(4);
  });

  it('every measure produced by expectedBarsAfter sums to the time signature', () => {
    for (const ex of BARS_EXERCISES) {
      const cuts = [...ex.expectedBarsAfter, ex.items.length - 1].sort(
        (a, b) => a - b,
      );
      const target = TIME_SIG_VALUE[ex.timeSig];
      let start = 0;
      for (const cut of cuts) {
        const measure = ex.items.slice(start, cut + 1);
        const sum = measure.reduce((s, it) => s + itemValue(it), 0);
        expect(sum, `${ex.id}: measure starting at ${start}`).toBe(target);
        start = cut + 1;
      }
    }
  });
});

describe('BUILD_EXERCISES', () => {
  it('has exactly 10 exercises', () => {
    expect(BUILD_EXERCISES).toHaveLength(10);
  });

  it('every required list sums to the time signature', () => {
    for (const ex of BUILD_EXERCISES) {
      const sum = ex.required.reduce((s, it) => s + itemValue(it), 0);
      expect(sum, ex.id).toBe(TIME_SIG_VALUE[ex.timeSig]);
    }
  });
});

describe('COMPLETE_EXERCISES', () => {
  it('has exactly 10 exercises', () => {
    expect(COMPLETE_EXERCISES).toHaveLength(10);
  });

  it('every exercise has 6 measures', () => {
    for (const ex of COMPLETE_EXERCISES) {
      expect(ex.measures, ex.id).toHaveLength(6);
    }
  });

  it('every measure (fixed + expected of blanks) sums to the time signature', () => {
    for (const ex of COMPLETE_EXERCISES) {
      const target = TIME_SIG_VALUE[ex.timeSig];
      ex.measures.forEach((measure, mIdx) => {
        const sum = measure.slots.reduce((s, slot: CompleteSlot) => {
          const item = slot.kind === 'fixed' ? slot.item : slot.expected;
          return s + itemValue(item);
        }, 0);
        expect(sum, `${ex.id} measure ${mIdx}`).toBe(target);
      });
    }
  });

  it('every measure has at least one blank', () => {
    for (const ex of COMPLETE_EXERCISES) {
      ex.measures.forEach((measure, mIdx) => {
        const hasBlank = measure.slots.some((s) => s.kind === 'blank');
        expect(hasBlank, `${ex.id} measure ${mIdx}`).toBe(true);
      });
    }
  });
});
