import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './Background';
import { CHAPTERS } from '@/chapters/registry';
import type { ChapterMeta } from '@/chapters/registry';

const ACCENT_HEX: Record<ChapterMeta['accent'], string> = {
  cyan: '#00ffff',
  magenta: '#ff00ff',
  electric: '#ffff00',
};

const PAGE_SIZE = 3;

type Props = {
  onSelect: (id: string) => void;
};

export default function Dashboard({ onSelect }: Props) {
  const pages = useMemo(() => chunk(CHAPTERS, PAGE_SIZE), []);
  const totalPages = pages.length;
  const [page, setPage] = useState(0);
  const showPager = totalPages > 1;
  const currentChapters = pages[page] ?? [];

  useEffect(() => {
    if (!showPager) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setPage((p) => Math.min(p + 1, totalPages - 1));
      } else if (e.key === 'ArrowLeft') {
        setPage((p) => Math.max(p - 1, 0));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showPager, totalPages]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />

      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 py-8">
        <header className="text-center mb-8">
          <span className="font-orbitron text-2xl md:text-3xl tracking-[0.4em] text-cyan text-glow-cyan block mb-4">
            ARCHIVO MAESTRO
          </span>
          <h1 className="heading-1 text-clear text-glow-cyan">
            Clases de Música
          </h1>
          <p className="tagline mt-4 animate-flicker">Selecciona el capítulo</p>
        </header>

        <div className="relative w-full max-w-[1700px] flex items-center justify-center">
          {showPager && (
            <PagerArrow
              direction="left"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              hidden={page === 0}
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full px-16"
            >
              {currentChapters.map((chapter, i) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  index={i}
                  onSelect={() => onSelect(chapter.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {showPager && (
            <PagerArrow
              direction="right"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              hidden={page === totalPages - 1}
            />
          )}
        </div>

        {showPager && (
          <div className="flex items-center gap-3 mt-8" role="tablist" aria-label="Paginación de capítulos">
            {pages.map((_, i) => (
              <PagerDot
                key={i}
                active={i === page}
                onClick={() => setPage(i)}
                index={i}
              />
            ))}
          </div>
        )}

        <footer className="mt-8 text-center font-orbitron tracking-[0.3em] text-clear/50 text-sm">
          v0.1 · CYBERPUNK MAGIC SCIENTIFIC EDITION
        </footer>
      </main>
    </div>
  );
}

type CardProps = {
  chapter: ChapterMeta;
  index: number;
  onSelect: () => void;
};

function ChapterCard({ chapter, index, onSelect }: CardProps) {
  const accent = ACCENT_HEX[chapter.accent];
  const isLive = chapter.status === 'available';

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.08 + index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative text-left rounded-3xl p-7 overflow-hidden bg-base/60 backdrop-blur-md cursor-pointer transition-shadow"
      style={{
        border: `2px solid ${accent}55`,
        boxShadow: `0 0 36px ${accent}33`,
      }}
      aria-label={`Abrir capítulo ${chapter.number}: ${chapter.title}`}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 80% 0%, ${accent}55 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <span
            className="font-orbitron text-base tracking-[0.3em]"
            style={{ color: accent, textShadow: `0 0 14px ${accent}` }}
          >
            CAPÍTULO {chapter.number}
          </span>
          <StatusBadge live={isLive} />
        </div>

        <h2
          className="font-orbitron font-extrabold text-3xl md:text-4xl leading-[0.95] uppercase"
          style={{ color: '#e0f7ff', textShadow: `0 0 18px ${accent}` }}
        >
          {chapter.title}
        </h2>

        <span
          className="font-cinzel text-base md:text-lg tracking-[0.18em] uppercase"
          style={{ color: accent, textShadow: `0 0 10px ${accent}` }}
        >
          {chapter.tagline}
        </span>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span
            className="font-orbitron text-sm tracking-[0.3em] uppercase"
            style={{ color: accent }}
          >
            {isLive ? '▶ Iniciar' : '◈ Vista previa'}
          </span>
          <span
            className="font-orbitron text-xs tracking-[0.3em] text-clear/40"
            aria-hidden="true"
          >
            #{chapter.id.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function StatusBadge({ live }: { live: boolean }) {
  if (live) {
    return (
      <span
        className="font-orbitron text-xs tracking-[0.3em] px-3 py-1 rounded-full border"
        style={{
          color: '#22ff66',
          borderColor: '#22ff6688',
          background: '#22ff6611',
          textShadow: '0 0 10px #22ff66',
          boxShadow: '0 0 14px #22ff6644',
        }}
      >
        ● LIVE
      </span>
    );
  }
  return (
    <span
      className="font-orbitron text-xs tracking-[0.3em] px-3 py-1 rounded-full border"
      style={{
        color: '#ffff00',
        borderColor: '#ffff0088',
        background: '#ffff0011',
        textShadow: '0 0 10px #ffff00',
        boxShadow: '0 0 14px #ffff0044',
      }}
    >
      ◈ COMING SOON
    </span>
  );
}

type PagerArrowProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  hidden: boolean;
};

function PagerArrow({ direction, onClick, hidden }: PagerArrowProps) {
  const isLeft = direction === 'left';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? 'Página anterior' : 'Página siguiente'}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className="absolute top-1/2 -translate-y-1/2 z-20 grid place-items-center w-16 h-16 rounded-full font-orbitron text-3xl transition-opacity"
      style={{
        left: isLeft ? '0' : 'auto',
        right: isLeft ? 'auto' : '0',
        color: '#00ffff',
        textShadow: '0 0 14px #00ffff',
        border: '2px solid #00ffff66',
        background: 'rgba(0, 0, 0, 0.35)',
        boxShadow: '0 0 18px #00ffff33',
        backdropFilter: 'blur(6px)',
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    >
      {isLeft ? '‹' : '›'}
    </button>
  );
}

type PagerDotProps = {
  active: boolean;
  onClick: () => void;
  index: number;
};

function PagerDot({ active, onClick, index }: PagerDotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-label={`Ir a página ${index + 1}`}
      className="rounded-full transition-all"
      style={{
        width: active ? '28px' : '12px',
        height: '12px',
        background: active ? '#00ffff' : 'transparent',
        border: '2px solid #00ffff',
        boxShadow: active ? '0 0 14px #00ffff' : 'none',
      }}
    />
  );
}

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}
