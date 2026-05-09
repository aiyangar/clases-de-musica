export type TimeSig = '2/4' | '3/4' | '4/4';

export type Cap4Figure = 'redonda' | 'blanca' | 'negra' | 'corchea';

export type FigureItem =
  | { kind: 'figure'; figure: Cap4Figure; step: number }
  | { kind: 'rest'; rest: Cap4Figure };

export type BarsExercise = {
  id: string;
  timeSig: TimeSig;
  items: FigureItem[];
  expectedBarsAfter: number[];
};

export type BuildExercise = {
  id: string;
  timeSig: TimeSig;
  required: FigureItem[];
  distractors?: FigureItem[];
};

export type CompleteSlot =
  | { kind: 'fixed'; item: FigureItem }
  | { kind: 'blank'; expected: FigureItem };

export type CompleteMeasure = { slots: CompleteSlot[] };

export type CompleteExercise = {
  id: string;
  timeSig: TimeSig;
  measures: CompleteMeasure[];
};

export type ExerciseKind = 'bars' | 'build' | 'complete';

// In quarter-note units, so 4/4 = 4, 3/4 = 3, 2/4 = 2.
export const TIME_SIG_VALUE: Record<TimeSig, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
};

export const FIGURE_VALUE: Record<Cap4Figure, number> = {
  redonda: 4,
  blanca: 2,
  negra: 1,
  corchea: 0.5,
};

export function itemValue(item: FigureItem): number {
  return FIGURE_VALUE[item.kind === 'figure' ? item.figure : item.rest];
}
