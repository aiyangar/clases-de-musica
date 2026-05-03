import { useLayoutEffect, useRef, type ReactNode } from 'react';

export const STAGE_WIDTH = 1180;
export const STAGE_HEIGHT = 820;

export type SlideStageProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
};

export default function SlideStage({
  children,
  width = STAGE_WIDTH,
  height = STAGE_HEIGHT,
  className,
}: SlideStageProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const recompute = () => {
      const rect = outer.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const k = Math.min(rect.width / width, rect.height / height);
      inner.style.setProperty('--stage-scale', String(k));
    };

    recompute();

    const observer = new ResizeObserver(recompute);
    observer.observe(outer);
    window.addEventListener('resize', recompute);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, [width, height]);

  return (
    <div
      ref={outerRef}
      className="relative flex items-center justify-center w-full h-full overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div
        ref={innerRef}
        className={className}
        style={{
          width,
          height,
          flex: '0 0 auto',
          transformOrigin: 'center center',
          transform: 'scale(var(--stage-scale, 1))',
        }}
      >
        {children}
      </div>
    </div>
  );
}
