import {
  CHAPTER_ACCENT_HEX,
  findLevel,
  type ChapterMeta,
} from '@/chapters/registry';

export type CardGradientStops = {
  levelHex: string;
  chapterHex: string;
};

export function chapterGradientStops(chapter: ChapterMeta): CardGradientStops {
  const level = findLevel(chapter.level);
  if (!level) {
    throw new Error(`Unknown level: ${chapter.level}`);
  }
  return {
    levelHex: level.accentHex,
    chapterHex: CHAPTER_ACCENT_HEX[chapter.accent],
  };
}

export function chapterCardGradient(chapter: ChapterMeta): string {
  const { levelHex, chapterHex } = chapterGradientStops(chapter);
  return `linear-gradient(45deg, ${levelHex} 0%, ${chapterHex} 100%)`;
}

export function chapterAccentHex(chapter: ChapterMeta): string {
  return CHAPTER_ACCENT_HEX[chapter.accent];
}
