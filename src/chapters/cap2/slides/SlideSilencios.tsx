import RestSymbol from '@/components/music/RestSymbol';
import type { FigureKind } from '@/components/music/NoteSymbol';

type Row = {
  kind: FigureKind;
  name: string;
  pulses: string;
};

const FIRST_HALF: Row[] = [
  { kind: 'redonda', name: 'de redonda', pulses: '4' },
  { kind: 'blanca', name: 'de blanca', pulses: '2' },
  { kind: 'negra', name: 'de negra', pulses: '1' },
  { kind: 'corchea', name: 'de corchea', pulses: '½' },
];

const SECOND_HALF: Row[] = [
  { kind: 'semicorchea', name: 'de semicorchea', pulses: '¼' },
  { kind: 'fusa', name: 'de fusa', pulses: '⅛' },
  { kind: 'semifusa', name: 'de semifusa', pulses: '¹⁄₁₆' },
  { kind: 'garrapatea', name: 'de garrapatea', pulses: '¹⁄₃₂' },
];

type Props = {
  part: 1 | 2;
};

export default function SlideSilencios({ part }: Props) {
  const rows = part === 1 ? FIRST_HALF : SECOND_HALF;
  const subtitle =
    part === 1
      ? 'El silencio también se mide. Cada figura tiene su silencio gemelo de igual duración.'
      : 'A más banderines, más breve es el silencio.';

  return (
    <div className="flex-1 flex flex-col gap-8 justify-center">
      <h2
        className="heading-2 self-start"
        data-text={`Los silencios · ${part}/2`}
      >
        <span>{`Los silencios · ${part}/2`}</span>
      </h2>

      <p className="font-rajdhani text-[56px] leading-snug text-clear/85">{subtitle}</p>

      <div className="grid grid-cols-4 gap-6 mt-2">
        {rows.map((r) => (
          <RestCard key={r.kind} row={r} />
        ))}
      </div>
    </div>
  );
}

function RestCard({ row }: { row: Row }) {
  return (
    <div
      className="rounded-2xl px-4 py-6 flex flex-col items-center justify-between gap-3 backdrop-blur-md"
      style={{
        background: 'rgba(15, 0, 35, 0.55)',
        border: '2px solid rgba(255, 0, 255, 0.5)',
        boxShadow: '0 0 26px rgba(255, 0, 255, 0.22)',
        minHeight: 'clamp(180px, 36vh, 320px)',
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <RestSymbol
          kind={row.kind}
          color="#ff00ff"
          size="clamp(56px, 11vh, 110px)"
        />
      </div>
      <div className="text-center">
        <div className="font-orbitron text-[40px] tracking-[0.18em] text-clear">
          Silencio
        </div>
        <div className="font-rajdhani text-[30px] text-clear/85 -mt-1">
          {row.name}
        </div>
        <div className="font-orbitron text-3xl md:text-4xl text-electric text-glow-electric mt-2">
          {row.pulses}
        </div>
        <div className="font-rajdhani text-[26px] tracking-widest uppercase text-clear/65">
          pulsos
        </div>
      </div>
    </div>
  );
}
