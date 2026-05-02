import type { ComponentType } from 'react';
import Presentation from '@/components/Presentation';
import Cap2Presentation from '@/chapters/cap2/Cap2Presentation';

export type ChapterStatus = 'available' | 'mockup';

export type ChapterPresentationProps = {
  onExit?: () => void;
};

export type ChapterMeta = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  topics: string[];
  status: ChapterStatus;
  accent: 'cyan' | 'magenta' | 'electric';
  presentation?: ComponentType<ChapterPresentationProps>;
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'cap-1',
    number: 'I',
    title: 'Teoría Básica',
    tagline: 'Códigos del Sonido',
    description:
      'Los cimientos: qué es la música y las cuatro cualidades del sonido. De ahí salen melodía, armonía y ritmo.',
    topics: [
      '¿Qué es la música?',
      'Altura, intensidad, timbre',
      'Melodía, armonía y ritmo',
    ],
    status: 'available',
    accent: 'cyan',
    presentation: Presentation,
  },
  {
    id: 'cap-2',
    number: 'II',
    title: 'Figuras y Valores',
    tagline: 'Códigos del Tiempo',
    description:
      'Las ocho figuras musicales con sus silencios, cómo se relacionan en duración y la regla de la plica.',
    topics: [
      'Las 8 figuras (sonidos y silencios)',
      'Equivalencias de duración',
      'Regla de la plica',
      'Ejercicio interactivo',
    ],
    status: 'available',
    accent: 'magenta',
    presentation: Cap2Presentation,
  },
  {
    id: 'cap-3',
    number: 'III',
    title: 'Acordes y Progresiones',
    tagline: 'Geometría del Sentimiento',
    description:
      'Cómo se apilan las notas en acordes y por qué ciertas secuencias hacen llorar al estadio entero.',
    topics: [
      'Tríadas mayor y menor',
      'Inversiones',
      'Progresión I–V–vi–IV',
      'Tensión y resolución',
    ],
    status: 'mockup',
    accent: 'electric',
  },
];

export function findChapter(id: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.id === id);
}
