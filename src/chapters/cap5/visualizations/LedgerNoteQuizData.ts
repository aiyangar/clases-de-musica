export type NoteName = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si';

export type LedgerQuestion = {
  id: string;
  clef: 'sol' | 'fa';
  step: number; // ledger-line position; treble step0=Mi4, bass step0=Sol2
  correct: NoteName;
};

export const NOTE_NAMES: NoteName[] = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

// Treble (clave de Sol): lower & upper ledger lines
export const SOL_QUESTIONS: LedgerQuestion[] = [
  { id: 'sol-1', clef: 'sol', step: -2, correct: 'Do' }, // Do4, 1st lower ledger
  { id: 'sol-2', clef: 'sol', step: -4, correct: 'La' }, // La3, 2nd lower ledger
  { id: 'sol-3', clef: 'sol', step: 10, correct: 'La' }, // La5, 1st upper ledger
  { id: 'sol-4', clef: 'sol', step: 12, correct: 'Do' }, // Do6, 2nd upper ledger
];

// Bass (clave de Fa): upper & lower ledger lines
export const FA_QUESTIONS: LedgerQuestion[] = [
  { id: 'fa-1', clef: 'fa', step: 10, correct: 'Do' }, // Do4, 1st upper ledger
  { id: 'fa-2', clef: 'fa', step: 12, correct: 'Mi' }, // Mi4, 2nd upper ledger
  { id: 'fa-3', clef: 'fa', step: -2, correct: 'Mi' }, // Mi2, 1st lower ledger
  { id: 'fa-4', clef: 'fa', step: -4, correct: 'Do' }, // Do2, 2nd lower ledger
];
