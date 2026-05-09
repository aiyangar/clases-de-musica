/**
 * Compute the y of a foreignObject that holds a vertically-centered NoteSymbol
 * so the note head lands on a target staff line.
 *
 * The note SVGs render with the head near the bottom (stem-up) of their bounding
 * box; HEAD_FROM_NOTE_TOP captures that ratio so the formula scales with both
 * the container height and the note size.
 */

const HEAD_FROM_NOTE_TOP = 0.857;

/**
 * Default target: 2nd line from the bottom (G in treble clef), which in this
 * codebase's lineY convention is index 3 (lineY(0) = top line).
 */
export const DEFAULT_NOTE_TARGET_LINE = 3;

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
