// Pure staff geometry shared by the Pentagrama component and its tests.
// step 0 = bottom staff line; +2 = one line up; odd steps = spaces;
// even steps beyond [0,8] = ledger lines.

export const STAFF_TOP = 110;
export const STAFF_BOTTOM = 210;
export const LINE_GAP = (STAFF_BOTTOM - STAFF_TOP) / 4;
export const VB_WIDTH = 800;
export const VB_HEIGHT = 320;
export const NOTEHEAD_HALF_HEIGHT = 26;
export const NOTE_LABEL_FONT_SIZE = 28;
export const NOTE_LABEL_OFFSET_BELOW_STAFF = 38;

export function stepToY(step: number): number {
  return STAFF_BOTTOM - step * (LINE_GAP / 2);
}

export function labelYFor(step: number): number {
  if (step > 8) return stepToY(step) - NOTEHEAD_HALF_HEIGHT - 14;
  if (step < 0) {
    return Math.max(
      stepToY(step) + NOTEHEAD_HALF_HEIGHT + 24,
      STAFF_BOTTOM + NOTE_LABEL_OFFSET_BELOW_STAFF,
    );
  }
  return STAFF_BOTTOM + NOTE_LABEL_OFFSET_BELOW_STAFF;
}

function noteExtent(step: number): { top: number; bottom: number } {
  const y = stepToY(step);
  const labelY = labelYFor(step);
  const top = Math.min(y - NOTEHEAD_HALF_HEIGHT, labelY - NOTE_LABEL_FONT_SIZE);
  const bottom = Math.max(y + NOTEHEAD_HALF_HEIGHT, labelY + NOTE_LABEL_FONT_SIZE * 0.35);
  return { top, bottom };
}

// Opt-in: expand the viewBox vertically so ledger-line notes + labels fit.
export function fitViewBox(steps: number[]): { y: number; height: number } {
  const PAD = 16;
  let top = 0;
  let bottom = VB_HEIGHT;
  for (const s of steps) {
    const e = noteExtent(s);
    top = Math.min(top, e.top);
    bottom = Math.max(bottom, e.bottom);
  }
  if (top < 0) top -= PAD;
  if (bottom > VB_HEIGHT) bottom += PAD;
  return { y: top, height: bottom - top };
}
