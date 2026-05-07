import { useCallback, useEffect, useState } from 'react';

export type OrientationLockSupport =
  | 'supported'
  | 'unsupported'
  | 'requires-fullscreen';

export type OrientationLockState = {
  support: OrientationLockSupport;
  locked: boolean;
  lastError: string | null;
};

export type OrientationLockApi = OrientationLockState & {
  requestLandscape: (opts?: { withFullscreen?: boolean }) => Promise<boolean>;
  release: () => void;
};

function detectSupport(): OrientationLockSupport {
  if (typeof window === 'undefined' || typeof screen === 'undefined') return 'unsupported';
  if (typeof screen.orientation?.lock === 'function') return 'supported';
  return 'unsupported';
}

export function useOrientationLock(): OrientationLockApi {
  const [state, setState] = useState<OrientationLockState>(() => ({
    support: detectSupport(),
    locked: false,
    lastError: null,
  }));

  const release = useCallback(() => {
    if (screen.orientation?.unlock) {
      screen.orientation.unlock();
    }
    setState((prev) => ({ ...prev, locked: false }));
  }, []);

  const requestLandscape = useCallback(
    async ({ withFullscreen = false } = {}): Promise<boolean> => {
      if (state.support === 'unsupported') {
        setState((prev) => ({ ...prev, lastError: 'unsupported' }));
        return false;
      }

      if (withFullscreen && !document.fullscreenElement && !document.webkitFullscreenElement) {
        const el = document.documentElement;
        const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
        if (req) {
          try {
            await req();
          } catch {
            // proceed to attempt lock regardless
          }
        }
      }

      try {
        await screen.orientation.lock!('landscape');
        setState((prev) => ({ ...prev, locked: true, lastError: null }));
        return true;
      } catch (error) {
        const isFullscreenRequired =
          error instanceof Error &&
          (error.name === 'SecurityError' || error.message.toLowerCase().includes('fullscreen'));

        setState((prev) => ({
          ...prev,
          support: isFullscreenRequired ? 'requires-fullscreen' : prev.support,
          locked: false,
          lastError: String(error),
        }));
        return false;
      }
    },
    [state.support]
  );

  useEffect(() => {
    const onFullscreenChange = () => {
      const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isFullscreen) {
        setState((prev) => (prev.locked ? { ...prev, locked: false } : prev));
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      release();
    };
    // release is stable (useCallback with no deps that change), safe to include
  }, [release]);

  return { ...state, requestLandscape, release };
}
