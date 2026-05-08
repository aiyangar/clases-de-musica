import type { BuildExercise, FigureItem } from '@/chapters/cap4/types';

const N = (step = 4): FigureItem => ({ kind: 'figure', figure: 'negra', step });
const B = (step = 4): FigureItem => ({ kind: 'figure', figure: 'blanca', step });
const C = (step = 4): FigureItem => ({ kind: 'figure', figure: 'corchea', step });
const restC: FigureItem = { kind: 'rest', rest: 'corchea' };

export const BUILD_EXERCISES: BuildExercise[] = [
  {
    id: 'build-1',
    timeSig: '3/4',
    required: [N(4), C(3), C(5), C(2), C(6)],
  },
  {
    id: 'build-2',
    timeSig: '4/4',
    required: [B(4), C(3), C(4), C(5), C(6)],
  },
  {
    id: 'build-3',
    timeSig: '4/4',
    required: [N(2), N(6), C(3), C(4), C(5), C(7)],
  },
  {
    id: 'build-4',
    timeSig: '3/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7)],
  },
  {
    id: 'build-5',
    timeSig: '4/4',
    required: [N(3), N(5), C(2), C(4), C(6), C(7)],
  },
  {
    id: 'build-6',
    timeSig: '4/4',
    required: [N(4), C(2), C(3), C(5), C(6), restC, restC],
  },
  {
    id: 'build-7',
    timeSig: '4/4',
    required: [N(3), C(2), C(4), C(5), C(7), restC, restC],
  },
  {
    id: 'build-8',
    timeSig: '4/4',
    required: [N(5), C(3), C(4), C(5), C(6), restC, restC],
  },
  {
    id: 'build-9',
    timeSig: '4/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7), C(8), C(1)],
  },
  {
    id: 'build-10',
    timeSig: '4/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7), restC, restC],
  },
];
