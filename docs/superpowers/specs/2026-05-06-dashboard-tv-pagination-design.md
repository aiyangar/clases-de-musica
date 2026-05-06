# Dashboard TV Pagination — Design

**Date:** 2026-05-06
**Branch:** `feature/dashboard-tv-pagination`
**Scope:** `src/components/Dashboard.tsx` only.

## Problem

Dashboard chapter cards are too tall to fit on a 1080p TV without scrolling. There is no pagination, so the layout will not scale beyond 3 chapters.

## Goals

1. Cards fit on a 1080p TV (1920×1080) without vertical scroll.
2. When `CHAPTERS.length > 3`, allow the user to advance through pages of 3 cards each.
3. Keyboard-friendly (TV remotes / keyboards).

## Non-goals

- Touch / swipe gestures.
- Looping pagination.
- Changes to `registry.ts`, routing, or any chapter content.
- Applying the 1180×820 base canvas rule to the dashboard (out of scope).

## Card layout (compact)

Drop the description and topics list. Keep:

- Header row: `CAPÍTULO {number}` + status badge
- Title: chapter `title`
- Tagline: chapter `tagline`
- Footer row: `▶ INICIAR` / `◈ VISTA PREVIA` + `#CAP-N`

Sizing changes:

| Element | Before | After |
|---|---|---|
| Card padding | `p-10` | `p-7` |
| Header label | `text-xl` | `text-base` |
| Title | `text-4xl md:text-5xl` | `text-3xl md:text-4xl` |
| Tagline | `text-xl md:text-2xl` | `text-base md:text-lg` |
| Inner gap | `gap-5` | `gap-3` |
| Footer label | `text-base` | `text-sm` |

Target card height: ~340–380px (down from ~640px).

## Pagination

- 3 cards per page; total pages = `Math.ceil(CHAPTERS.length / 3)`.
- `‹` / `›` arrows positioned outside the grid (left/right). Cyber styling: cyan stroke + glow, ~64px hit area.
- First page hides `‹`. Last page hides `›`. No looping.
- Pagination dots below the grid, one per page; active dot is filled with cyan glow, inactive is dim outline.
- If there is only one page, neither arrows nor dots render.
- Keyboard: `ArrowLeft` decrements page, `ArrowRight` increments page. Listener attached only when `totalPages > 1`. Bounded by `[0, totalPages-1]`.

## State

```ts
const [page, setPage] = useState(0);
const pages = useMemo(
  () => chunk(CHAPTERS, 3),
  []
);
const totalPages = pages.length;
```

`chunk(arr, size)` is a small local helper inside `Dashboard.tsx` (no external dep).

## Animation

`AnimatePresence mode="wait"` wraps the grid keyed by `page`. Existing per-card stagger via `index * 0.12` is preserved on enter. Cards fade out before the next page fades in.

## Layout (1080p)

| Region | Approx height |
|---|---|
| Header (title + tagline) | ~180px |
| Card grid | ~380px |
| Dots | ~40px |
| Footer | ~60px |
| Margins | ~120px |
| **Total** | **~780px** |

Comfortably under 1080. The `overflow-y-auto` on `<main>` is removed.

## Acceptance criteria

- [ ] In a 1920×1080 viewport, the dashboard fits with no scrollbar.
- [ ] With 3 chapters, no arrows or dots render.
- [ ] With ≥4 chapters (manual test by adding a 4th to `CHAPTERS`), arrows + dots render and paginate correctly.
- [ ] First page: `‹` hidden. Last page: `›` hidden.
- [ ] Arrow keys move pages and respect bounds.
- [ ] Card content reduced to header / title / tagline / footer (no description, no topics list).
- [ ] `tsc --noEmit` passes.
- [ ] `pnpm build` passes.
