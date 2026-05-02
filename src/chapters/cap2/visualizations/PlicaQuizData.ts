export type Direction = 'up' | 'down';

export type Question = {
  id: string;
  staffPosition: number;
  correct: Direction;
};

export const ALL_PLICA_QUESTIONS: Question[] = [
  { id: 'q1', staffPosition: 1, correct: 'down' },
  { id: 'q2', staffPosition: 9, correct: 'up' },
  { id: 'q3', staffPosition: 3, correct: 'down' },
  { id: 'q4', staffPosition: 7, correct: 'up' },
  { id: 'q5', staffPosition: 0, correct: 'down' },
  { id: 'q6', staffPosition: 10, correct: 'up' },
];
