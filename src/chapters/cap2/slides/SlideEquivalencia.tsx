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
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2
        className="heading-2 self-start"
        data-text={`Equivalencias · ${part}/2`}
      >
        <span>{`Equivalencias · ${part}/2`}</span>
      </h2>

      <p className="font-rajdhani text-3xl text-clear/85 max-w-[1700px]">
        {intro}
      </p>

      <div className="flex flex-col gap-4 mt-2">
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
      ? 'clamp(24px, 4.5vh, 46px)'
      : row.count > 4
        ? 'clamp(30px, 5.5vh, 54px)'
        : 'clamp(38px, 7vh, 70px)';
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
