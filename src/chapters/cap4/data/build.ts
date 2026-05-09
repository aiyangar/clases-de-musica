import type { BuildExercise, FigureItem } from '@/chapters/cap4/types';

const N = (step = 4): FigureItem => ({ kind: 'figure', figure: 'negra', step });
const B = (step = 4): FigureItem => ({ kind: 'figure', figure: 'blanca', step });
const C = (step = 4): FigureItem => ({ kind: 'figure', figure: 'corchea', step });
const R = (step = 4): FigureItem => ({ kind: 'figure', figure: 'redonda', step });
const restN: FigureItem = { kind: 'rest', rest: 'negra' };
const restC: FigureItem = { kind: 'rest', rest: 'corchea' };
const restB: FigureItem = { kind: 'rest', rest: 'blanca' };

export const BUILD_EXERCISES: BuildExercise[] = [
  {
    id: 'build-1',
    timeSig: '3/4',
    required: [N(4), C(3), C(5), C(2), C(6)],
    distractors: [B(4), restN],
  },
  {
    id: 'build-2',
    timeSig: '4/4',
    required: [B(4), C(3), C(4), C(5), C(6)],
    distractors: [N(4), restC],
  },
  {
    id: 'build-3',
    timeSig: '4/4',
    required: [N(2), N(6), C(3), C(4), C(5), C(7)],
    distractors: [B(4), restC],
  },
  {
    id: 'build-4',
    timeSig: '3/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7)],
    distractors: [N(4), B(4)],
  },
  {
    id: 'build-5',
    timeSig: '4/4',
    required: [N(3), N(5), C(2), C(4), C(6), C(7)],
    distractors: [B(4), restN],
  },
  {
    id: 'build-6',
    timeSig: '4/4',
    required: [N(4), C(2), C(3), C(5), C(6), restC, restC],
    distractors: [B(4), N(3)],
  },
  {
    id: 'build-7',
    timeSig: '4/4',
    required: [N(3), C(2), C(4), C(5), C(7), restC, restC],
    distractors: [B(4), restN],
  },
  {
    id: 'build-8',
    timeSig: '4/4',
    required: [N(5), C(3), C(4), C(5), C(6), restC, restC],
    distractors: [R(4), N(4)],
  },
  {
    id: 'build-9',
    timeSig: '4/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7), C(8), C(1)],
    distractors: [N(4), B(4), restC],
  },
  {
    id: 'build-10',
    timeSig: '4/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7), restC, restC],
    distractors: [N(4), restB],
  },
];
