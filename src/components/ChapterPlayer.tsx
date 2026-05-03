import { type ComponentType, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './Background';
import Navigation from './Navigation';
import SlideFrame from './SlideFrame';
import SlideStage from './SlideStage';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';

type Props = {
  slides: Array<ComponentType>;
  onExit?: () => void;
};

export default function ChapterPlayer({ slides, onExit }: Props) {
  const total = slides.length;
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);
  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);
  const first = useCallback(() => setIndex(0), []);
  const last = useCallback(() => setIndex(total - 1), [total]);

  useKeyboardNav({
    onNext: next,
    onPrev: prev,
    onFirst: first,
    onLast: last,
    onEscape: onExit,
  });

  const Current = slides[index]!;

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
            className="w-full h-full flex items-center justify-center"
          >
            <SlideStage>
              <SlideFrame>
                <Current />
              </SlideFrame>
            </SlideStage>
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation current={index} total={total} onPrev={prev} onNext={next} />
    </div>
  );
}
