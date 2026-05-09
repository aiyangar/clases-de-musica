# Clases de Música

Presentaciones interactivas en React sobre **teoría musical** para
adolescentes, con estética **Cyberpunk Mágico Científico**. SPA optimizada
para visualización en TV grande / iPad Air landscape.

El proyecto está estructurado como un **archivo maestro** con 3 cursos —
Principiante, Intermedio y Avanzado — y 21 capítulos en total. Cada
capítulo es una presentación independiente; algunos tienen contenido
completo y otros viven como mockups *coming soon*.

## Estructura de cursos

| Curso | Nivel | Caps | Color del nivel |
|-------|-------|------|-----------------|
| 1 | Principiante | 8 (I–VIII) | azure `#1f9bff` |
| 2 | Intermedio | 5 (I–V) | gold `#ffb700` |
| 3 | Avanzado | 8 (I–VIII) | crimson `#ff0044` |

Las cards del dashboard usan un **gradiente bicolor a 45°** desde el
color del nivel (bottom-left) hasta el color del capítulo (top-right).
Cambiar de tab re-tematiza el header y los controles del pager.

### Capítulos disponibles (con presentación completa)

- **Principiante I** — Teoría Básica · *Códigos del Sonido*
- **Principiante II** — Figuras y Valores · *Códigos del Tiempo*
- **Principiante III** — Signos Musicales · *Códigos del Pentagrama*
- **Principiante IV** — Construcción de Compases · *Códigos del Compás*

El resto (Principiante V–VIII, Intermedio I–V, Avanzado I–VIII) vive como
placeholder con tagline, descripción y los temas que vendrán.

## Stack

- React 19 + Vite 8 + TypeScript estricto
- Tailwind CSS 3 (utilitarios + tokens neón custom)
- Framer Motion 12 (transiciones entre slides)
- Canvas 2D (sistema de partículas + red de circuitos en `Background`)
- Vitest 4 (tests unitarios de validators y datasets)
- pnpm como package manager

## Empezar

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:5173/`.

### Otros comandos

```bash
pnpm build         # build de producción a dist/
pnpm preview       # sirve el build localmente
pnpm lint          # ESLint
pnpm test          # Vitest una pasada
pnpm test:watch    # Vitest watch
```

## Routing

Hash routing manual sin librería externa. El formato es
`#/<level>-cap-<N>`:

- `#/` → dashboard
- `#/principiante-cap-1` → Cap I del nivel Principiante
- `#/intermedio-cap-3` → Cap III del nivel Intermedio
- `#/avanzado-cap-8` → Cap VIII del nivel Avanzado

URLs viejas tipo `#/cap-1` caen al dashboard.

## Navegación dentro de un capítulo

- `→` o `Espacio` → siguiente slide
- `←` → slide anterior
- `Home` → primer slide
- `End` → último slide
- `Esc` → volver al dashboard
- También botones `‹ ›` con contador en pantalla

## Rendering

Todo el proyecto se renderiza sobre un **canvas fijo de 1180×820 px**
(iPad Air landscape) y se escala al viewport con `transform: scale()`
desde `SlideStage`. La tipografía usa píxeles absolutos sobre ese canvas;
no hay media queries de tipografía. La regla es: si algo no cabe, se
divide en *parts*, no se reduce la letra ni se introduce scroll.

## Estructura del repo

```
src/
├── chapters/
│   ├── registry.ts          (LEVELS, CHAPTERS, CHAPTER_ACCENT_HEX, helpers)
│   ├── gradient.ts          (chapterCardGradient 45° level→chapter)
│   ├── cap1/                (Cap I Principiante — Teoría Básica)
│   ├── cap2/                (Cap II Principiante — Figuras y Valores)
│   ├── cap3/                (Cap III Principiante — Signos Musicales)
│   └── cap4/                (Cap IV Principiante — Construcción de Compases)
├── components/
│   ├── Dashboard.tsx        (selector de nivel + grid bicolor + pager)
│   ├── MockupPresentation.tsx (placeholder unificado para caps en mockup)
│   ├── ChapterPlayer.tsx    (navegación de slides dentro de un cap)
│   ├── SlideStage.tsx       (canvas fijo 1180×820, scale-to-fit)
│   ├── SlideFrame.tsx       (marco neón + HUD + sigilos)
│   ├── Background.tsx       (grid + glows + scanlines)
│   ├── ParticleCanvas.tsx   (partículas con red)
│   ├── Navigation.tsx       (botones + barra de progreso)
│   ├── BackToDashboardButton.tsx
│   └── music/               (Pentagrama, ClefSymbol, NoteSymbol, RestSymbol, BarLine, TimeSignature)
├── hooks/
│   ├── useKeyboardNav.ts
│   ├── useOrientationLock.ts
│   └── useViewportOrientation.ts
├── styles/
│   └── globals.css          (tokens, tipografía TV-large, efectos)
├── types/
├── App.tsx                  (hash routing + view state)
└── main.tsx
```

## Convenciones

- **Sin scroll, sin reducir letra**: el canvas 1180×820 es la unidad. Si
  un slide no cabe, se divide en *parts* (Cap II y IV ya hacen esto).
- **Single source of truth para colores**: `CHAPTER_ACCENT_HEX` y
  `LEVELS[].accentHex` viven solo en `registry.ts`. Ningún componente
  duplica los hex.
- **El gradiente bicolor vive en un helper**: `chapterCardGradient` es la
  única función que conoce el ángulo (45°) y el orden de stops
  (level → chapter).
- **IDs son opacos**: el código no parsea `principiante-cap-3` para
  extraer level/number; usa los campos `level` y `number` del meta.
- Sin `localStorage`: el estado de slide vive solo en memoria.
- Animaciones del canvas usan `requestAnimationFrame` con cleanup en
  `useEffect`.

## Despliegue

Producción desplegada en Vercel desde la rama `main`.
