import type { CompleteExercise, FigureItem } from '@/chapters/cap4/types';

const N = (step = 4): FigureItem => ({ kind: 'figure', figure: 'negra', step });
const B = (step = 4): FigureItem => ({ kind: 'figure', figure: 'blanca', step });
const C = (step = 4): FigureItem => ({ kind: 'figure', figure: 'corchea', step });
const R = (step = 4): FigureItem => ({ kind: 'figure', figure: 'redonda', step });

function fixed(item: FigureItem) {
  return { kind: 'fixed', item } as const;
}
function blank(expected: FigureItem) {
  return { kind: 'blank', expected } as const;
}

export const COMPLETE_EXERCISES: CompleteExercise[] = [
  {
    id: 'complete-1',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [fixed(B(4)), blank(B(4))] },
      { slots: [fixed(N(3)), blank(N(4)), fixed(N(5)), fixed(N(4))] },
      { slots: [blank(R(4))] },
      { slots: [fixed(N(2)), fixed(N(3)), blank(N(4)), fixed(N(5))] },
      { slots: [fixed(B(4)), blank(B(4))] },
    ],
  },
  {
    id: 'complete-2',
    timeSig: '3/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [fixed(B(4)), blank(N(4))] },
      { slots: [blank(N(3)), fixed(N(4)), fixed(N(5))] },
      { slots: [blank(N(2)), blank(N(4)), fixed(N(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), fixed(C(6)), blank(N(4))] },
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4))] },
    ],
  },
  {
    id: 'complete-3',
    timeSig: '2/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), blank(C(6))] },
      { slots: [fixed(N(2)), blank(N(6))] },
      { slots: [blank(N(4)), fixed(N(4))] },
      { slots: [blank(N(3)), blank(N(5))] },
    ],
  },
  {
    id: 'complete-4',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(B(4)), fixed(N(4)), blank(N(4))] },
      { slots: [blank(N(4)), fixed(N(4)), fixed(N(4)), fixed(N(4))] },
      { slots: [fixed(B(3)), blank(B(5))] },
      { slots: [blank(R(4))] },
      { slots: [fixed(N(2)), fixed(C(3)), fixed(C(4)), blank(N(5)), fixed(N(6))] },
      { slots: [blank(B(4)), fixed(B(4))] },
    ],
  },
  {
    id: 'complete-5',
    timeSig: '3/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4)), fixed(N(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(N(5)), blank(N(4))] },
      { slots: [fixed(N(4)), blank(B(5))] },
      { slots: [blank(N(2)), blank(N(4)), blank(N(6))] },
      { slots: [fixed(N(4)), blank(N(4)), fixed(N(4))] },
    ],
  },
  {
    id: 'complete-6',
    timeSig: '2/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), blank(N(5))] },
      { slots: [blank(N(2)), fixed(N(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), blank(C(6))] },
      { slots: [blank(B(4))] },
    ],
  },
  {
    id: 'complete-7',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), fixed(N(4)), blank(N(4))] },
      { slots: [fixed(B(4)), blank(B(4))] },
      { slots: [blank(N(2)), fixed(N(4)), fixed(N(5)), fixed(N(6))] },
      { slots: [fixed(N(4)), blank(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(N(5)), blank(N(4)), fixed(N(6))] },
      { slots: [blank(R(4))] },
    ],
  },
  {
    id: 'complete-8',
    timeSig: '3/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4)), fixed(N(4))] },
      { slots: [fixed(N(3)), blank(N(4)), blank(N(5))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), fixed(C(6)), blank(N(4))] },
      { slots: [blank(B(4)), fixed(N(4))] },
      { slots: [blank(N(2)), blank(N(4)), fixed(N(6))] },
    ],
  },
  {
    id: 'complete-9',
    timeSig: '2/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(C(3)), blank(C(4)), fixed(C(5)), fixed(C(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), blank(N(5))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(N(4)), blank(N(4))] },
    ],
  },
  {
    id: 'complete-10',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(B(4)), blank(B(4))] },
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [blank(N(2)), fixed(N(4)), fixed(N(5)), fixed(N(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(N(5)), fixed(N(6)), blank(N(4))] },
      { slots: [blank(R(4))] },
      { slots: [fixed(B(4)), fixed(N(3)), blank(N(5))] },
    ],
  },
];
