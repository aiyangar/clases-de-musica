import { describe, it, expect } from 'vitest';
import {
  computeStageTransform,
  STAGE_WIDTH,
  STAGE_HEIGHT,
} from '@/components/stageTransform';

const stage = { width: STAGE_WIDTH, height: STAGE_HEIGHT };

describe('computeStageTransform — landscape', () => {
  it('16:9 wide regime: rendered width is 90% of vw and height fills vh', () => {
    const rect = { width: 1920, height: 1080 };
    const { scale, logicalWidth, rotated } = computeStageTransform(rect, stage, false);

    expect(rotated).toBe(false);
    expect(logicalWidth).toBeGreaterThan(STAGE_WIDTH); // not floored
    expect(logicalWidth * scale).toBeCloseTo(0.9 * rect.width, 1); // rendered width = 90%
    expect(STAGE_HEIGHT * scale).toBeCloseTo(rect.height, 1); // height fills
  });

  it('ultrawide 21:9: still 90% width, height fills, width not floored', () => {
    const rect = { width: 3440, height: 1440 };
    const { scale, logicalWidth } = computeStageTransform(rect, stage, false);

    expect(logicalWidth).toBeGreaterThan(STAGE_WIDTH);
    expect(logicalWidth * scale).toBeCloseTo(0.9 * rect.width, 1);
    expect(STAGE_HEIGHT * scale).toBeCloseTo(rect.height, 1);
  });

  it('4:3 floor regime: logical width is floored at 1180, width stays 90%, height letterboxes', () => {
    const rect = { width: 1024, height: 768 };
    const { scale, logicalWidth } = computeStageTransform(rect, stage, false);

    expect(logicalWidth).toBe(STAGE_WIDTH); // floored
    expect(logicalWidth * scale).toBeCloseTo(0.9 * rect.width, 1); // still 90% width
    expect(STAGE_HEIGHT * scale).toBeLessThan(rect.height); // vertical bars, no overflow
  });
});

describe('computeStageTransform — rotated (portrait/touch)', () => {
  it('portrait phone: on-screen width (logical height axis) is 90% of vw, long axis fills vh', () => {
    const rect = { width: 390, height: 844 };
    const { scale, logicalWidth, rotated } = computeStageTransform(rect, stage, true);

    expect(rotated).toBe(true);
    // After -90deg the fixed logical height (820) becomes the on-screen width.
    expect(STAGE_HEIGHT * scale).toBeCloseTo(0.9 * rect.width, 1);
    // The logical width axis becomes the long (vertical) axis and fills vh.
    expect(logicalWidth * scale).toBeCloseTo(rect.height, 1);
    expect(logicalWidth).toBeGreaterThan(STAGE_WIDTH);
  });

  it('squarish portrait floor regime: logical width floors at 1180, long axis fills, on-screen width drops below 90%', () => {
    const rect = { width: 300, height: 300 };
    const { scale, logicalWidth } = computeStageTransform(rect, stage, true);

    expect(logicalWidth).toBe(STAGE_WIDTH); // floored
    expect(logicalWidth * scale).toBeCloseTo(rect.height, 1); // long axis still fills
    expect(STAGE_HEIGHT * scale).toBeLessThan(0.9 * rect.width); // width below 90% (floored)
  });
});

describe('computeStageTransform — degenerate input', () => {
  it('zero-sized rect returns a finite, benign transform (no Infinity)', () => {
    const { scale, logicalWidth, rotated } = computeStageTransform(
      { width: 0, height: 0 },
      stage,
      false,
    );
    expect(scale).toBe(0);
    expect(logicalWidth).toBe(STAGE_WIDTH);
    expect(rotated).toBe(false);
    expect(Number.isFinite(logicalWidth)).toBe(true);
  });
});
