import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './Background';
import Navigation from './Navigation';
import SlideFrame from './SlideFrame';
import SlidePortada from './slides/SlidePortada';
import SlideMusica from './slides/SlideMusica';
import SlideAltura from './slides/SlideAltura';
import SlideIntensidad from './slides/SlideIntensidad';
import SlideTimbre from './slides/SlideTimbre';
import SlideMelodia from './slides/SlideMelodia';
import SlideArmonia from './slides/SlideArmonia';
import SlideRitmo from './slides/SlideRitmo';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';

const SLIDES = [
  SlidePortada,
  SlideMusica,
  SlideAltura,
  SlideIntensidad,
  SlideTimbre,
  SlideMelodia,
  SlideArmonia,
  SlideRitmo,
];

const TOTAL = SLIDES.length;

export default function Presentation() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, TOTAL - 1));
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);
  const first = useCallback(() => setIndex(0), []);
  const last = useCallback(() => setIndex(TOTAL - 1), []);

  useKeyboardNav({ onNext: next, onPrev: prev, onFirst: first, onLast: last });

  const Current = SLIDES[index]!;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />

      <main className="relative z-10 h-full w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full flex items-center justify-center"
          >
            <SlideFrame>
              <Current />
            </SlideFrame>
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation current={index} total={TOTAL} onPrev={prev} onNext={next} />
    </div>
  );
}
