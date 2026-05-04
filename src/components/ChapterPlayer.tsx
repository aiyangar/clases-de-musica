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

      <main className="relative z-10 h-full w-full flex items-center justify-center pt-20 pb-32">
        <SlideStage>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <SlideFrame>
                <Current />
              </SlideFrame>
            </motion.div>
          </AnimatePresence>
        </SlideStage>
      </main>

      <Navigation current={index} total={total} onPrev={prev} onNext={next} />
    </div>
  );
}
