type Props = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Navigation({ current, total, onPrev, onNext }: Props) {
  const progress = ((current + 1) / total) * 100;

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-1.5 z-30 bg-black/40"
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background:
              'linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
            backgroundSize: '300% 100%',
            animation: 'gradientShift 6s ease infinite',
            boxShadow: '0 0 18px rgba(255, 0, 255, 0.7)',
          }}
        />
      </div>

      <div className="fixed bottom-6 inset-x-0 z-30 flex items-center justify-center gap-6 px-6">
        <button
          type="button"
          className="nav-btn"
          onClick={onPrev}
          disabled={current === 0}
          aria-label="Slide anterior"
        >
          ‹
        </button>
        <span className="counter" aria-live="polite">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="nav-btn"
          onClick={onNext}
          disabled={current === total - 1}
          aria-label="Siguiente slide"
        >
          ›
        </button>
      </div>
    </>
  );
}
