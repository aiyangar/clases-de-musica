import type { ReactNode } from 'react';
import ClefSymbol from '@/components/music/ClefSymbol';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import TimeSignature from '@/components/music/TimeSignature';
import BarLine from '@/components/music/BarLine';

type Item = { name: string; render: () => ReactNode };

const ITEMS: Item[] = [
  { name: 'Claves',                 render: () => <ClefSymbol clef="sol" size={48} /> },
  { name: 'Notas',                  render: () => <NoteSymbol kind="negra" color="#00ffff" size={48} /> },
  { name: 'Silencios',              render: () => <RestSymbol kind="negra" color="#ff00ff" size={48} /> },
  { name: 'Alteraciones',           render: () => <span className="font-music" style={{ fontSize: 48, color: '#ffff00', textShadow: '0 0 12px #ffff00' }}>♯ ♭ ♮</span> },
  { name: 'Indicación de compás',   render: () => <TimeSignature numerator={4} denominator={4} size={48} color="#00ffff" /> },
  { name: 'Líneas divisorias',      render: () => <BarLine variant="single" height={56} color="#00ffff" /> },
  { name: 'Líneas adicionales',     render: () => <span className="font-music" style={{ fontSize: 48, color: '#00ffff' }}>𝄖</span> },
  { name: 'Barra de compás',        render: () => <BarLine variant="double" height={56} color="#ff00ff" /> },
  { name: 'Barra final',            render: () => <BarLine variant="final" height={56} color="#ffff00" /> },
];

export default function SlideCatalogoSignos() {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <h2 className="heading-2 text-center" data-text="Signos musicales">
        <span>Signos musicales</span>
      </h2>
      <div className="flex-1 grid grid-cols-5 gap-4" style={{ gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
        {ITEMS.map((item) => (
          <div key={item.name} className="timbre-card flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center" style={{ minHeight: 64 }}>
              {item.render()}
            </div>
            <span className="timbre-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
