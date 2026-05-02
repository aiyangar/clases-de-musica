import NoteSymbol from '../visualizations/NoteSymbol';
import type { FigureKind } from '../visualizations/NoteSymbol';

type Row = {
  kind: FigureKind;
  name: string;
  pulses: string;
};

const FIRST_HALF: Row[] = [
  { kind: 'redonda', name: 'Redonda', pulses: '4' },
  { kind: 'blanca', name: 'Blanca', pulses: '2' },
  { kind: 'negra', name: 'Negra', pulses: '1' },
  { kind: 'corchea', name: 'Corchea', pulses: '½' },
];

const SECOND_HALF: Row[] = [
  { kind: 'semicorchea', name: 'Semicorchea', pulses: '¼' },
  { kind: 'fusa', name: 'Fusa', pulses: '⅛' },
  { kind: 'semifusa', name: 'Semifusa', pulses: '¹⁄₁₆' },
  { kind: 'garrapatea', name: 'Garrapatea', pulses: '¹⁄₃₂' },
];

type Props = {
  part: 1 | 2;
};

export default function SlideFiguras({ part }: Props) {
  const rows = part === 1 ? FIRST_HALF : SECOND_HALF;
  const subtitle =
    part === 1
      ? 'De más larga a más corta. Cada figura dura la mitad que la anterior.'
      : 'Se siguen dividiendo. La garrapatea dura ³² veces menos que una redonda.';

  return (
    <div className="flex-1 flex flex-col gap-8 justify-center">
      <h2
        className="heading-2 self-start"
        data-text={`Las figuras · ${part}/2`}
      >
        <span>{`Las figuras · ${part}/2`}</span>
      </h2>

      <p className="font-rajdhani text-3xl text-clear/85">{subtitle}</p>

      <div className="grid grid-cols-4 gap-6 mt-2">
        {rows.map((r) => (
          <FigureCard key={r.kind} row={r} />
        ))}
      </div>
    </div>
  );
}

function FigureCard({ row }: { row: Row }) {
  return (
    <div
      className="rounded-2xl px-4 py-6 flex flex-col items-center justify-between gap-3 backdrop-blur-md"
      style={{
        background: 'rgba(15, 0, 35, 0.55)',
        border: '2px solid rgba(0, 255, 255, 0.5)',
        boxShadow: '0 0 26px rgba(0, 255, 255, 0.22)',
        minHeight: 280,
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <NoteSymbol kind={row.kind} color="#00ffff" size={100} />
      </div>
      <div className="text-center">
        <div className="font-orbitron text-xl md:text-2xl tracking-[0.18em] text-clear">
          {row.name}
        </div>
        <div className="font-orbitron text-3xl md:text-4xl text-electric text-glow-electric mt-2">
          {row.pulses}
        </div>
        <div className="font-rajdhani text-base md:text-lg tracking-widest uppercase text-clear/65">
          pulsos
        </div>
      </div>
    </div>
  );
}
