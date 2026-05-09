import type { FigureKind } from './NoteSymbol';

/**
 * Shared utilities for rendering figures and rests on a staff. Any pentagrama
 * can use these helpers to size and position glyphs without re-deriving the
 * geometry by hand.
 *
 * Conventions
 *   `lineY(i)` returns the SVG y of staff line index i, where i=0 is the
 *   topmost line and i=4 is the bottom. (Music's "line 1 from bottom" maps
 *   to lineY(4).)
 */

/**
 * Empirical fraction of a stem-up note SVG taken up between its top and the
 * note head. Used to align note heads with target staff lines.
 */
const HEAD_FROM_NOTE_TOP = 0.857;

/**
 * Default target line for a stem-up note: the 2nd line from the bottom
 * (G in treble clef), which is index 3 under the lineY-from-top convention.
 */
export const DEFAULT_NOTE_TARGET_LINE = 3;

/**
 * y for a foreignObject that holds a vertically-centered NoteSymbol so the
 * note head lands on the target staff line.
 */
export function placedNoteY(
  lineY: (i: number) => number,
  containerHeight: number,
  noteSize: number,
  targetLineIndex: number = DEFAULT_NOTE_TARGET_LINE,
): number {
  const headOffsetInContainer =
    (containerHeight - noteSize) / 2 + HEAD_FROM_NOTE_TOP * noteSize;
  return lineY(targetLineIndex) - headOffsetInContainer;
}

/**
 * Multiplier applied to the base rest size by figure type. Whole and half
 * rests render at 2x because their SVG visuals are small relative to their
 * bounding boxes; eighth and smaller rests render at 0.5x because their
 * SVGs are tall and otherwise dominate the staff.
 */
export const REST_SIZE_MULTIPLIER: Partial<Record<FigureKind, number>> = {
  redonda: 2,
  blanca: 2,
  corchea: 0.5,
  semicorchea: 0.5,
  fusa: 0.5,
  semifusa: 0.5,
  garrapatea: 0.5,
};

export function restSize(rest: FigureKind, baseSize: number): number {
  return baseSize * (REST_SIZE_MULTIPLIER[rest] ?? 1);
}

/**
 * Anchor staff line for each rest type, expressed as a lineY index
 * (0 = top, 4 = bottom). The whole rest hangs from line 4 from the bottom
 * (lineY index 1); other rests are referenced to the middle line.
 */
const REST_ANCHOR_LINE: Record<FigureKind, number> = {
  redonda: 1,
  blanca: 2,
  negra: 2,
  corchea: 2,
  semicorchea: 2,
  fusa: 2,
  semifusa: 2,
  garrapatea: 2,
};

/**
 * Per-rest fine offset (px) of the container center relative to the anchor
 * line, calibrated visually against the music SVG glyphs.
 *  +N → container center N px below anchor (rest hangs)
 *  -N → container center N px above anchor (rest sits)
 */
const REST_ANCHOR_OFFSET: Record<FigureKind, number> = {
  redonda: 7,
  blanca: -7,
  negra: 0,
  corchea: 0,
  semicorchea: 0,
  fusa: 0,
  semifusa: 0,
  garrapatea: 0,
};

/**
 * y for a foreignObject that holds a vertically-centered RestSymbol so it
 * lands on its idiomatic staff position.
 */
export function placedRestY(
  rest: FigureKind,
  lineY: (i: number) => number,
  containerHeight: number,
): number {
  const anchor = REST_ANCHOR_LINE[rest];
  const offset = REST_ANCHOR_OFFSET[rest];
  return lineY(anchor) + offset - containerHeight / 2;
}
