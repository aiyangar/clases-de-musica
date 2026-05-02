import NoteSymbol from '../visualizations/NoteSymbol';
import type { FigureKind } from '../visualizations/NoteSymbol';

type Row = {
  kind: FigureKind;
  count: number;
};

const FIRST: Row[] = [
  { kind: 'redonda', count: 1 },
  { kind: 'blanca', count: 2 },
  { kind: 'negra', count: 4 },
];

const SECOND: Row[] = [
  { kind: 'corchea', count: 8 },
  { kind: 'semicorchea', count: 16 },
];

type Props = {
  part: 1 | 2;
};

export default function SlideEquivalencia({ part }: Props) {
  const rows = part === 1 ? FIRST : SECOND;
  const intro =
    part === 1
      ? 'Una redonda dura igual que dos blancas, o cuatro negras.'
      : 'La misma redonda son ocho corcheas, o dieciséis semicorcheas.';

  return (
    <div className="flex-1 flex flex-col gap-8 justify-center">
      <h2
        className="heading-2 self-start"
        data-text={`Equivalencias · ${part}/2`}
      >
        <span>{`Equivalencias · ${part}/2`}</span>
      </h2>

      <div className="def-box max-w-[1700px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">{intro}</p>
      </div>

      <div className="flex flex-col gap-6 mt-2">
        {rows.map((r) => (
          <EquivRow key={r.kind} row={r} />
        ))}
      </div>
    </div>
  );
}

function EquivRow({ row }: { row: Row }) {
  const noteSize =
    row.count > 8
      ? 'clamp(28px, 5.5vh, 56px)'
      : row.count > 4
        ? 'clamp(34px, 6.5vh, 64px)'
        : 'clamp(44px, 8vh, 80px)';
  return (
    <div className="flex items-center gap-8">
      <div className="font-orbitron text-3xl tracking-[0.2em] text-cyan text-glow-cyan w-20 text-right">
        {row.count}×
      </div>
      <div className="flex items-center gap-2 flex-wrap flex-1">
        {Array.from({ length: row.count }, (_, i) => (
          <NoteSymbol key={i} kind={row.kind} color="#00ffff" size={noteSize} />
        ))}
      </div>
    </div>
  );
}
