import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useViewportOrientation } from '@/hooks/useViewportOrientation';
import { computeStageTransform, STAGE_WIDTH, STAGE_HEIGHT } from './stageTransform';

export { STAGE_WIDTH, STAGE_HEIGHT };

export type SlideStageProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
  rotateOnPortrait?: boolean;
};

export default function SlideStage({
  children,
  width = STAGE_WIDTH,
  height = STAGE_HEIGHT,
  className,
  rotateOnPortrait = true,
}: SlideStageProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { orientation, isTouchDevice } = useViewportOrientation();

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const recompute = () => {
      const rect = outer.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const shouldRotate = rotateOnPortrait && orientation === 'portrait' && isTouchDevice;
      const { scale, logicalWidth, rotated } = computeStageTransform(
        { width: rect.width, height: rect.height },
        { width, height },
        shouldRotate,
      );
      inner.style.setProperty('--stage-width', `${logicalWidth}px`);
      inner.style.setProperty('--stage-scale', String(scale));
      inner.style.setProperty('--stage-rotate', rotated ? '-90deg' : '0deg');
    };

    recompute();

    const observer = new ResizeObserver(recompute);
    observer.observe(outer);
    window.addEventListener('resize', recompute);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, [width, height, orientation, isTouchDevice, rotateOnPortrait]);

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
          width: `var(--stage-width, ${width}px)`,
          height,
          flex: '0 0 auto',
          transformOrigin: 'center center',
          transform: 'rotate(var(--stage-rotate, 0deg)) scale(var(--stage-scale, 1))',
        }}
      >
        {children}
      </div>
    </div>
  );
}
