import NoteSymbol from '../visualizations/NoteSymbol';
import type { FigureKind } from '../visualizations/NoteSymbol';

type Row = {
  kind: FigureKind;
  name: string;
  pulses: string;
};

const ROWS: Row[] = [
  { kind: 'redonda', name: 'Redonda', pulses: '4' },
  { kind: 'blanca', name: 'Blanca', pulses: '2' },
  { kind: 'negra', name: 'Negra', pulses: '1' },
  { kind: 'corchea', name: 'Corchea', pulses: '½' },
  { kind: 'semicorchea', name: 'Semicorchea', pulses: '¼' },
  { kind: 'fusa', name: 'Fusa', pulses: '⅛' },
  { kind: 'semifusa', name: 'Semifusa', pulses: '¹⁄₁₆' },
  { kind: 'garrapatea', name: 'Garrapatea', pulses: '¹⁄₃₂' },
];

export default function SlideFiguras() {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2 className="heading-2 self-start" data-text="Las 8 figuras">
        <span>Las 8 figuras</span>
      </h2>

      <p className="font-rajdhani text-3xl text-clear/85 mb-2">
        De más larga a más corta. Cada una dura{' '}
        <em className="text-electric text-glow-electric not-italic font-bold">la mitad</em>{' '}
        que la anterior.
      </p>

      <div className="grid grid-cols-4 gap-4">
        {ROWS.map((r) => (
          <FigureCard key={r.kind} row={r} />
        ))}
      </div>
    </div>
  );
}

function FigureCard({ row }: { row: Row }) {
  return (
    <div
      className="rounded-2xl px-3 py-4 flex flex-col items-center justify-between gap-2 backdrop-blur-md"
      style={{
        background: 'rgba(15, 0, 35, 0.55)',
        border: '2px solid rgba(0, 255, 255, 0.45)',
        boxShadow: '0 0 22px rgba(0, 255, 255, 0.2)',
        minHeight: 240,
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <NoteSymbol kind={row.kind} color="#00ffff" size={70} />
      </div>
      <div className="text-center">
        <div className="font-orbitron text-base md:text-lg tracking-[0.18em] text-clear">
          {row.name}
        </div>
        <div className="font-orbitron text-2xl md:text-3xl text-electric text-glow-electric mt-1">
          {row.pulses}
        </div>
        <div className="font-rajdhani text-xs md:text-sm tracking-widest uppercase text-clear/60">
          pulsos
        </div>
      </div>
    </div>
  );
}
