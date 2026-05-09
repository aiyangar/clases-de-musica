import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { Cap4Figure } from '@/chapters/cap4/types';

const ORANGE = '#ff9933';
const ORANGE_DIM = 'rgba(255, 153, 51, 0.45)';

const FIGURES: Cap4Figure[] = ['redonda', 'blanca', 'negra', 'corchea'];

export type PaletteSelection =
  | { kind: 'figure'; figure: Cap4Figure }
  | { kind: 'rest'; rest: Cap4Figure }
  | { kind: 'bar' };

export type PoolEntry = {
  selection: Exclude<PaletteSelection, { kind: 'bar' }>;
  remaining: number;
  total: number;
};

type Props = {
  selected: PaletteSelection | null;
  onSelect: (sel: PaletteSelection) => void;
  showBarTool?: boolean;
  showFigureTools?: boolean;
  pool?: PoolEntry[];
};

export default function Palette({
  selected,
  onSelect,
  showBarTool = false,
  showFigureTools = true,
  pool,
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

      {showFigureTools && pool
        ? pool.map((entry) => {
            const sel = entry.selection;
            const isSel = isSameSelection(selected, sel);
            const disabled = entry.remaining <= 0;
            const label = sel.kind === 'figure' ? sel.figure : `silencio ${sel.rest}`;
            return (
              <PaletteButton
                key={poolKey(entry)}
                label={label}
                isSelected={isSel}
                disabled={disabled}
                onClick={() => !disabled && onSelect(sel)}
                badge={`${entry.remaining}/${entry.total}`}
              >
                {sel.kind === 'figure' ? (
                  <NoteSymbol kind={sel.figure} direction="up" size={64} color={ORANGE} />
                ) : (
                  <RestSymbol kind={sel.rest} size={48} color={ORANGE} />
                )}
              </PaletteButton>
            );
          })
        : null}

      {showFigureTools && !pool && (
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

function poolKey(entry: PoolEntry): string {
  const sel = entry.selection;
  return sel.kind === 'figure' ? `fig-${sel.figure}` : `rest-${sel.rest}`;
}

function isSameSelection(
  a: PaletteSelection | null,
  b: PaletteSelection,
): boolean {
  if (!a || a.kind !== b.kind) return false;
  if (a.kind === 'figure' && b.kind === 'figure') return a.figure === b.figure;
  if (a.kind === 'rest' && b.kind === 'rest') return a.rest === b.rest;
  return false;
}

function PaletteButton({
  label,
  isSelected,
  disabled,
  onClick,
  children,
  badge,
}: {
  label: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="relative flex items-center justify-center rounded-xl border-2 transition-colors disabled:cursor-not-allowed"
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
      {badge && (
        <span
          className="absolute font-orbitron text-xs tracking-[0.15em]"
          style={{
            top: 4,
            right: 6,
            color: ORANGE,
            textShadow: `0 0 6px ${ORANGE}`,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
