import NoteSymbol from '../visualizations/NoteSymbol';
import type { FigureKind } from '../visualizations/NoteSymbol';

type Row = {
  kind: FigureKind;
  count: number;
};

const ROWS: Row[] = [
  { kind: 'redonda', count: 1 },
  { kind: 'blanca', count: 2 },
  { kind: 'negra', count: 4 },
  { kind: 'corchea', count: 8 },
  { kind: 'semicorchea', count: 16 },
];

export default function SlideEquivalencia() {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2 className="heading-2 self-start" data-text="Equivalencias">
        <span>Equivalencias</span>
      </h2>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Una <strong>redonda</strong> dura igual que <strong>2 blancas</strong>,
          <strong> 4 negras</strong>, <strong>8 corcheas</strong> o{' '}
          <strong>16 semicorcheas</strong>. Mismo tiempo, distinto detalle.
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {ROWS.map((r) => (
          <EquivRow key={r.kind} row={r} />
        ))}
      </div>
    </div>
  );
}

function EquivRow({ row }: { row: Row }) {
  return (
    <div className="flex items-center gap-6">
      <div
        className="font-orbitron text-2xl tracking-[0.2em] text-cyan text-glow-cyan w-12 text-right"
      >
        {row.count}×
      </div>
      <div className="flex items-center gap-2 flex-wrap flex-1">
        {Array.from({ length: row.count }, (_, i) => (
          <NoteSymbol
            key={i}
            kind={row.kind}
            color="#00ffff"
            size={row.count > 8 ? 36 : row.count > 4 ? 44 : 56}
          />
        ))}
      </div>
    </div>
  );
}
