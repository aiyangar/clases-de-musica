/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#050015',
        magenta: '#ff00ff',
        cyan: '#00ffff',
        electric: '#ffff00',
        clear: '#e0f7ff',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'system-ui', 'sans-serif'],
        rajdhani: ['Rajdhani', 'system-ui', 'sans-serif'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glitchText: {
          '0%, 90%, 100%': { transform: 'translate(0, 0)' },
          '92%': { transform: 'translate(-2px, 1px)' },
          '94%': { transform: 'translate(2px, -1px)' },
          '96%': { transform: 'translate(-1px, -2px)' },
          '98%': { transform: 'translate(1px, 2px)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px currentColor)' },
          '50%': { filter: 'drop-shadow(0 0 28px currentColor)' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        gridShift: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '50px 50px, 50px 50px' },
        },
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        gradientShift: 'gradientShift 6s ease infinite',
        glitchText: 'glitchText 5s steps(1) infinite',
        glowPulse: 'glowPulse 2.4s ease-in-out infinite',
        flicker: 'flicker 4s linear infinite',
        scan: 'scan 7s linear infinite',
        gridShift: 'gridShift 12s linear infinite',
        slowSpin: 'slowSpin 30s linear infinite',
        pulseGlow: 'pulseGlow 2.6s ease-in-out infinite',
        floatY: 'floatY 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
