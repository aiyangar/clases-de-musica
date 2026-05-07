import { useEffect, useState } from 'react';

export type ViewportOrientation = 'landscape' | 'portrait';

export type ViewportOrientationState = {
  orientation: ViewportOrientation;
  viewportWidth: number;
  viewportHeight: number;
  isTouchDevice: boolean;
};

function readState(): ViewportOrientationState {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    orientation: h > w ? 'portrait' : 'landscape',
    viewportWidth: w,
    viewportHeight: h,
    isTouchDevice: window.matchMedia('(hover: none) and (pointer: coarse)').matches,
  };
}

const SSR_DEFAULT: ViewportOrientationState = {
  orientation: 'landscape',
  viewportWidth: 1180,
  viewportHeight: 820,
  isTouchDevice: false,
};

export function useViewportOrientation(): ViewportOrientationState {
  const [state, setState] = useState<ViewportOrientationState>(() =>
    typeof window === 'undefined' ? SSR_DEFAULT : readState()
  );

  useEffect(() => {
    const onResize = () => setState(readState());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return state;
}
