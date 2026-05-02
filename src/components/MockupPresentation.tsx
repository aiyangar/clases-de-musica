import { motion } from 'framer-motion';
import Background from './Background';
import SlideFrame from './SlideFrame';
import type { ChapterMeta } from '@/chapters/registry';

const ACCENT_HEX: Record<ChapterMeta['accent'], string> = {
  cyan: '#00ffff',
  magenta: '#ff00ff',
  electric: '#ffff00',
};

type Props = {
  chapter: ChapterMeta;
};

export default function MockupPresentation({ chapter }: Props) {
  const accent = ACCENT_HEX[chapter.accent];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />

      <main className="relative z-10 h-full w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="w-full flex items-center justify-center"
        >
          <SlideFrame>
            <div className="flex-1 flex flex-col gap-10 justify-center items-center text-center">
              <span
                className="font-orbitron text-3xl tracking-[0.4em]"
                style={{ color: accent, textShadow: `0 0 14px ${accent}` }}
              >
                CAPÍTULO {chapter.number}
              </span>

              <h1
                className="heading-1"
                style={{ color: '#e0f7ff', textShadow: `0 0 24px ${accent}` }}
              >
                {chapter.title}
              </h1>

              <span
                className="tagline animate-flicker"
                style={{ color: accent, textShadow: `0 0 12px ${accent}` }}
              >
                {chapter.tagline}
              </span>

              <div
                className="font-orbitron text-3xl md:text-4xl tracking-[0.4em] mt-4 px-8 py-3 rounded-full border-2"
                style={{
                  color: '#ffff00',
                  borderColor: '#ffff00aa',
                  background: '#ffff0011',
                  textShadow: '0 0 14px #ffff00',
                  boxShadow: '0 0 24px #ffff0055',
                  animation: 'pulseGlow 2.4s ease-in-out infinite',
                }}
              >
                ◈ EN CONSTRUCCIÓN
              </div>

              <p className="subtitle max-w-[1300px] mt-2">
                {chapter.description}
              </p>

              <div className="def-box max-w-[1300px] w-full mt-4">
                <span className="def-symbol" aria-hidden="true">◈</span>
                <p className="font-orbitron text-2xl tracking-[0.25em] uppercase mb-6" style={{ color: accent }}>
                  Lo que viene
                </p>
                <ul className="flex flex-col gap-4 items-start max-w-[900px] mx-auto">
                  {chapter.topics.map((t) => (
                    <li
                      key={t}
                      className="font-rajdhani text-2xl md:text-3xl text-clear/90 flex items-center gap-4"
                    >
                      <span style={{ color: accent, textShadow: `0 0 10px ${accent}` }}>◆</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SlideFrame>
        </motion.div>
      </main>
    </div>
  );
}
