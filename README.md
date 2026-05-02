# Códigos del Sonido — Capítulo I

Presentación interactiva en React sobre **teoría musical básica** para
adolescentes, con estética **Cyberpunk Mágico Científico**. SPA optimizada
para visualización en TV grande.

Es la primera entrega de una serie de presentaciones.

## Stack

- React 19 + Vite + TypeScript (modo estricto)
- Tailwind CSS 3 (utilitarios + tokens neón custom)
- Framer Motion (transiciones entre slides)
- Canvas 2D (sistema de partículas con red de circuitos)

## Empezar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/`.

### Otros comandos

```bash
npm run build     # build de producción a dist/
npm run preview   # sirve el build localmente
npm run lint      # ESLint
```

## Navegación

- `→` o `Espacio` → siguiente slide
- `←` → slide anterior
- `Home` → primer slide
- `End` → último slide
- También botones `‹ ›` con contador en pantalla

## Slides (8)

1. **Portada** — Capítulo I, tagline arcana
2. **¿Qué es la música?** — definición + metáfora del código mágico
3. **Altura** — frecuencia, grave vs agudo (Billie / Ariana)
4. **Intensidad** — amplitud, dB, balada vs concierto
5. **Timbre** — color del sonido, 4 tarjetas instrumento
6. **Melodía** — pentagrama animado de 5 líneas
7. **Armonía** — 3 ondas sinusoidales: bajo / acordes / melodía
8. **Ritmo** — pulso, cierre de la matriz musical

## Estructura

```
src/
├── components/
│   ├── Presentation.tsx       (orquestador + Framer Motion)
│   ├── Background.tsx         (grid + glows + scanlines)
│   ├── ParticleCanvas.tsx     (80 partículas con red)
│   ├── SlideFrame.tsx         (marco neón + HUD + sigilos)
│   ├── Navigation.tsx         (botones + barra progreso)
│   ├── slides/                (8 slides)
│   └── visualizations/        (FrequencyBars, VUMeter, Pentagrama, HarmonyWaves, PulseBeat)
├── hooks/
│   └── useKeyboardNav.ts
├── styles/
│   └── globals.css            (tokens, tipografía TV-large, efectos)
├── App.tsx
└── main.tsx
```

## Notas

- Optimizado para **TV/desktop**: tamaños de fuente arrancan en `8.5em` (h1).
  Hay media queries para `≤1024px` y `≤640px`.
- **Sin localStorage**: el estado del slide vive solo en memoria (`useState`).
- Las animaciones del canvas usan `requestAnimationFrame` con cleanup en
  `useEffect`.
