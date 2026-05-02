import { motion } from 'framer-motion';
import Background from './Background';
import { CHAPTERS } from '@/chapters/registry';
import type { ChapterMeta } from '@/chapters/registry';

const ACCENT_HEX: Record<ChapterMeta['accent'], string> = {
  cyan: '#00ffff',
  magenta: '#ff00ff',
  electric: '#ffff00',
};

type Props = {
  onSelect: (id: string) => void;
};

export default function Dashboard({ onSelect }: Props) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />

      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <header className="text-center mb-12 mt-8">
          <span className="font-orbitron text-2xl md:text-3xl tracking-[0.4em] text-cyan text-glow-cyan block mb-6">
            ARCHIVO MAESTRO
          </span>
          <h1 className="heading-1 text-clear text-glow-cyan">
            Clases de Música
          </h1>
          <p className="tagline mt-6 animate-flicker">Selecciona el capítulo</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-[1700px]">
          {CHAPTERS.map((chapter, i) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={i}
              onSelect={() => onSelect(chapter.id)}
            />
          ))}
        </div>

        <footer className="mt-12 mb-8 text-center font-orbitron tracking-[0.3em] text-clear/50 text-sm">
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
      transition={{ delay: 0.1 + index * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative text-left rounded-3xl p-10 overflow-hidden bg-base/60 backdrop-blur-md cursor-pointer transition-shadow"
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

      <div className="relative z-10 flex flex-col gap-5 h-full">
        <div className="flex items-center justify-between">
          <span
            className="font-orbitron text-xl tracking-[0.3em]"
            style={{ color: accent, textShadow: `0 0 14px ${accent}` }}
          >
            CAPÍTULO {chapter.number}
          </span>
          <StatusBadge live={isLive} />
        </div>

        <h2
          className="font-orbitron font-extrabold text-4xl md:text-5xl leading-[0.95] uppercase"
          style={{ color: '#e0f7ff', textShadow: `0 0 18px ${accent}` }}
        >
          {chapter.title}
        </h2>

        <span
          className="font-cinzel text-xl md:text-2xl tracking-[0.18em] uppercase"
          style={{ color: accent, textShadow: `0 0 10px ${accent}` }}
        >
          {chapter.tagline}
        </span>

        <p className="font-rajdhani text-xl md:text-2xl leading-snug text-clear/85">
          {chapter.description}
        </p>

        <ul className="flex flex-col gap-2 mt-2">
          {chapter.topics.map((t) => (
            <li
              key={t}
              className="font-rajdhani text-lg md:text-xl text-clear/80 flex items-center gap-3"
            >
              <span style={{ color: accent }}>◆</span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <span
            className="font-orbitron text-base tracking-[0.3em] uppercase"
            style={{ color: accent }}
          >
            {isLive ? '▶ Iniciar' : '◈ Vista previa'}
          </span>
          <span
            className="font-orbitron text-sm tracking-[0.3em] text-clear/40"
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
