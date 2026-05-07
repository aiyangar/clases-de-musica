import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useViewportOrientation } from '@/hooks/useViewportOrientation';

export const STAGE_WIDTH = 1180;
export const STAGE_HEIGHT = 820;

export type SlideStageProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
  rotateOnPortrait?: boolean;
};

type StageTransform = { scale: number; rotated: boolean };

function computeStageTransform(
  rect: { width: number; height: number },
  stage: { width: number; height: number },
  shouldRotate: boolean,
): StageTransform {
  if (shouldRotate) {
    const k = Math.min(rect.height / stage.width, rect.width / stage.height);
    return { scale: k, rotated: true };
  }
  return {
    scale: Math.min(rect.width / stage.width, rect.height / stage.height),
    rotated: false,
  };
}

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
      const { scale, rotated } = computeStageTransform(
        { width: rect.width, height: rect.height },
        { width, height },
        shouldRotate,
      );
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
          width,
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
