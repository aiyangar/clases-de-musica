// Cap IV — Códigos del Compás: shared domain types and pure helpers

export type TimeSig = '2/4' | '3/4' | '4/4' | '6/8';

// Figures used in cap4 exercises (all standard figures, no garrapatea)
export type Cap4Figure =
  | 'redonda'
  | 'blanca'
  | 'negra'
  | 'corchea'
  | 'semicorchea'
  | 'fusa'
  | 'semifusa';

export type FigureItem = {
  figure: Cap4Figure;
  // true = rest (silencio), false = note (sonido)
  isRest: boolean;
};

// Exercise: count how many beats fit in a given measure
export type BarsExercise = {
  kind: 'bars';
  timeSig: TimeSig;
  items: FigureItem[];
};

// Exercise: drag/select figures to fill a measure exactly
export type BuildExercise = {
  kind: 'build';
  timeSig: TimeSig;
  // figures available to pick from
  pool: Cap4Figure[];
};

// One slot in a complete-the-measure exercise (may be pre-filled or blank)
export type CompleteSlot =
  | { type: 'given'; item: FigureItem }
  | { type: 'blank'; answer: FigureItem };

export type CompleteMeasure = {
  timeSig: TimeSig;
  slots: CompleteSlot[];
};

// Exercise: fill in the blanks to make each measure add up correctly
export type CompleteExercise = {
  kind: 'complete';
  measures: CompleteMeasure[];
};

export type ExerciseKind = BarsExercise | BuildExercise | CompleteExercise;

// Beat values in quarter-note units (negra = 1)
export const TIME_SIG_VALUE: Record<TimeSig, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
  '6/8': 3, // 6 eighth-notes = 3 quarter-note beats
};

export const FIGURE_VALUE: Record<Cap4Figure, number> = {
  redonda: 4,
  blanca: 2,
  negra: 1,
  corchea: 0.5,
  semicorchea: 0.25,
  fusa: 0.125,
  semifusa: 0.0625,
};

export function itemValue(item: FigureItem): number {
  return FIGURE_VALUE[item.figure];
}
