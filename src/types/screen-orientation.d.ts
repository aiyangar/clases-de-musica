export {};
declare global {
  interface ScreenOrientation {
    lock?: (
      orientation:
        | 'landscape'
        | 'portrait'
        | 'any'
        | 'natural'
        | 'landscape-primary'
        | 'landscape-secondary'
        | 'portrait-primary'
        | 'portrait-secondary'
    ) => Promise<void>;
    unlock?: () => void;
  }
  interface Element {
    webkitRequestFullscreen?: () => Promise<void>;
  }
  interface Document {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void>;
  }
}
