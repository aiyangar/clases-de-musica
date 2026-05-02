import { useEffect } from 'react';

type Handlers = {
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
  onEscape?: () => void;
};

export function useKeyboardNav({ onNext, onPrev, onFirst, onLast, onEscape }: Handlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        case 'Home':
          e.preventDefault();
          onFirst();
          break;
        case 'End':
          e.preventDefault();
          onLast();
          break;
        case 'Escape':
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext, onPrev, onFirst, onLast, onEscape]);
}
