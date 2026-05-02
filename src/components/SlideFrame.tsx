import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SlideFrame({ children, className = '' }: Props) {
  return (
    <div
      className={`neon-frame relative w-[92vw] max-w-[1800px] h-[82vh] mx-auto overflow-hidden flex ${className}`}
    >
      <span className="hud-corner tl" aria-hidden="true" />
      <span className="hud-corner tr" aria-hidden="true" />
      <span className="hud-corner bl" aria-hidden="true" />
      <span className="hud-corner br" aria-hidden="true" />

      <ArcaneSymbols />

      <div className="relative z-10 flex-1 flex flex-col p-12 lg:p-16 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function ArcaneSymbols() {
  return (
    <>
      <svg
        className="arcane-symbol"
        style={{ top: '8%', right: '6%', width: 140, height: 140 }}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <polygon
          points="50,5 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38"
          fill="none"
          stroke="#00ffff"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#ff00ff" strokeWidth="0.8" />
      </svg>
      <svg
        className="arcane-symbol"
        style={{ bottom: '6%', left: '4%', width: 110, height: 110 }}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <polygon
          points="50,12 88,50 50,88 12,50"
          fill="none"
          stroke="#ffff00"
          strokeWidth="1.2"
        />
        <polygon
          points="50,28 72,50 50,72 28,50"
          fill="none"
          stroke="#ff00ff"
          strokeWidth="0.8"
        />
      </svg>
      <svg
        className="arcane-symbol"
        style={{ top: '52%', left: '3%', width: 90, height: 90 }}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <polygon
          points="50,90 8,18 92,18"
          fill="none"
          stroke="#00ffff"
          strokeWidth="1"
        />
        <circle cx="50" cy="55" r="22" fill="none" stroke="#ff00ff" strokeWidth="0.8" />
      </svg>
    </>
  );
}
