import { describe, it, expect } from 'vitest';
import { fitViewBox } from '../Pentagrama';

describe('fitViewBox', () => {
  it('returns the default 0..320 range when no notes', () => {
    expect(fitViewBox([])).toEqual({ y: 0, height: 320 });
  });

  it('keeps the default range for notes inside the staff', () => {
    // steps 0..8 are the five staff lines (treble Mi4..Fa5)
    expect(fitViewBox([0, 4, 8])).toEqual({ y: 0, height: 320 });
  });

  it('expands upward for high ledger notes (negative y top)', () => {
    const vb = fitViewBox([19]); // Do7, 5th upper ledger line
    expect(vb.y).toBeLessThan(0);
    expect(vb.height).toBeGreaterThan(320);
  });

  it('expands downward for low ledger notes (y stays 0, taller)', () => {
    const vb = fitViewBox([-7]); // Mi3, below 3rd lower ledger line
    expect(vb.y).toBe(0);
    expect(vb.height).toBeGreaterThan(320);
  });
});
