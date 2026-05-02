import type { FigureKind } from './NoteSymbol';

export type { FigureKind };

export type ClefKind = 'sol' | 'fa' | 'do';
export type BarLineVariant = 'single' | 'double' | 'final' | 'repeat';

/**
 * Vertical position on the staff, expressed as a "staff step".
 *  0  = 1st line (bottom)
 *  1  = 1st space
 *  2  = 2nd line
 *  ...
 *  8  = 5th line (top)
 *  9  = 1st space above the staff
 *  10 = 1st ledger line above
 * -1  = 1st space below the staff
 * -2  = 1st ledger line below
 */
export type StaffStep = number;

export type StaffNote = {
  step: StaffStep;
  figure?: FigureKind;
  label?: string;
  highlight?: boolean;
  color?: string;
};
