import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { Cap4Figure, FigureItem } from '@/chapters/cap4/types';

const ORANGE = '#ff9933';
const ORANGE_DIM = 'rgba(255, 153, 51, 0.45)';

const FIGURES: Cap4Figure[] = ['redonda', 'blanca', 'negra', 'corchea'];

export type PaletteSelection =
  | { kind: 'figure'; figure: Cap4Figure }
  | { kind: 'rest'; rest: Cap4Figure }
  | { kind: 'bar' };

export type FlatPoolProps = {
  items: FigureItem[];
  usedIndices: Set<number>;
  selectedIndex: number | null;
  onSelectIndex: (index: number) => void;
};

type Props = {
  selected: PaletteSelection | null;
  onSelect: (sel: PaletteSelection) => void;
  showBarTool?: boolean;
  showFigureTools?: boolean;
  flatPool?: FlatPoolProps;
};

export default function Palette({
  selected,
  onSelect,
  showBarTool = false,
  showFigureTools = true,
  flatPool,
}: Props) {
  return (
    <div
      className="flex flex-row flex-wrap gap-4 p-4 rounded-2xl border-2 backdrop-blur-md"
      style={{
        background: 'rgba(15, 0, 35, 0.55)',
        borderColor: ORANGE_DIM,
        boxShadow: '0 0 18px rgba(255, 153, 51, 0.25)',
      }}
    >
      {showBarTool && (
        <PaletteButton
          label="Barra"
          isSelected={selected?.kind === 'bar'}
          disabled={false}
          onClick={() => onSelect({ kind: 'bar' })}
        >
          <span
            style={{
              display: 'inline-block',
              width: 4,
              height: 60,
              background: ORANGE,
              boxShadow: `0 0 8px ${ORANGE}`,
            }}
          />
        </PaletteButton>
      )}

      {showFigureTools && flatPool
        ? flatPool.items.map((item, idx) => {
            const isUsed = flatPool.usedIndices.has(idx);
            const isSel = !isUsed && flatPool.selectedIndex === idx;
            const label = item.kind === 'figure' ? item.figure : `silencio ${item.rest}`;
            return (
              <PaletteButton
                key={`flat-${idx}`}
                label={label}
                isSelected={isSel}
                disabled={isUsed}
                onClick={() => !isUsed && flatPool.onSelectIndex(idx)}
              >
                {item.kind === 'figure' ? (
                  <NoteSymbol kind={item.figure} direction="up" size={64} color={ORANGE} />
                ) : (
                  <RestSymbol kind={item.rest} size={48} color={ORANGE} />
                )}
              </PaletteButton>
            );
          })
        : null}

      {showFigureTools && !flatPool && (
        <>
          {FIGURES.map((f) => {
            const isSel =
              selected?.kind === 'figure' && selected.figure === f;
            return (
              <PaletteButton
                key={`fig-${f}`}
                label={f}
                isSelected={isSel}
                disabled={false}
                onClick={() => onSelect({ kind: 'figure', figure: f })}
              >
                <NoteSymbol kind={f} direction="up" size={64} color={ORANGE} />
              </PaletteButton>
            );
          })}
          {FIGURES.map((f) => {
            const isSel = selected?.kind === 'rest' && selected.rest === f;
            return (
              <PaletteButton
                key={`rest-${f}`}
                label={`silencio ${f}`}
                isSelected={isSel}
                disabled={false}
                onClick={() => onSelect({ kind: 'rest', rest: f })}
              >
                <RestSymbol kind={f} size={48} color={ORANGE} />
              </PaletteButton>
            );
          })}
        </>
      )}
    </div>
  );
}

function PaletteButton({
  label,
  isSelected,
  disabled,
  onClick,
  children,
}: {
  label: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center rounded-xl border-2 transition-colors disabled:cursor-not-allowed"
      style={{
        width: 88,
        height: 88,
        borderColor: isSelected ? ORANGE : 'rgba(255, 153, 51, 0.35)',
        background: isSelected
          ? 'rgba(255, 153, 51, 0.15)'
          : 'rgba(5, 0, 21, 0.55)',
        boxShadow: isSelected ? `0 0 18px ${ORANGE}` : 'none',
        opacity: disabled ? 0.3 : 1,
      }}
    >
      {children}
    </button>
  );
}
