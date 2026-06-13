import { describe, it, expect } from 'vitest';
import {
  SOL_QUESTIONS,
  FA_QUESTIONS,
  NOTE_NAMES,
} from '../visualizations/LedgerNoteQuizData';

describe('LedgerNoteQuiz data', () => {
  const all = [...SOL_QUESTIONS, ...FA_QUESTIONS];

  it('has 4 treble + 4 bass questions', () => {
    expect(SOL_QUESTIONS).toHaveLength(4);
    expect(FA_QUESTIONS).toHaveLength(4);
  });

  it('every correct answer is a valid note name', () => {
    for (const q of all) expect(NOTE_NAMES).toContain(q.correct);
  });

  it('every note sits on a ledger line (even step beyond the staff)', () => {
    for (const q of all) {
      const beyond = q.step < 0 || q.step > 8;
      expect(beyond).toBe(true);
      expect(q.step % 2 === 0).toBe(true);
    }
  });

  it('has unique ids', () => {
    const ids = all.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
