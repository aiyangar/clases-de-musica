import type { BarsExercise, FigureItem } from '@/chapters/cap4/types';

const N = (step = 4): FigureItem => ({ kind: 'figure', figure: 'negra', step });
const B = (step = 4): FigureItem => ({ kind: 'figure', figure: 'blanca', step });
const C = (step = 4): FigureItem => ({ kind: 'figure', figure: 'corchea', step });
const R = (step = 4): FigureItem => ({ kind: 'figure', figure: 'redonda', step });

export const BARS_EXERCISES: BarsExercise[] = [
  {
    id: 'bars-1',
    timeSig: '4/4',
    items: [N(4), N(4), N(4), N(4), N(4), N(4), N(4), N(4)],
    expectedBarsAfter: [3],
  },
  {
    id: 'bars-2',
    timeSig: '3/4',
    items: [N(3), N(4), N(5), B(4), N(4), N(3), N(4), N(5), B(4), N(4)],
    expectedBarsAfter: [2, 4, 7],
  },
  {
    id: 'bars-3',
    timeSig: '2/4',
    items: [N(4), N(4), B(4), N(4), N(4), C(4), C(4), C(4), C(4), N(4), N(4), B(4)],
    expectedBarsAfter: [1, 2, 4, 8, 10],
  },
  {
    id: 'bars-4',
    timeSig: '4/4',
    items: [B(3), B(5), N(4), N(4), N(4), N(4), R(4), C(4), C(4), C(4), C(4), N(4), N(4)],
    expectedBarsAfter: [1, 5, 6],
  },
];
