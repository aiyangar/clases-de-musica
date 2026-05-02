export type ChapterStatus = 'available' | 'mockup';

export type ChapterMeta = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  topics: string[];
  status: ChapterStatus;
  accent: 'cyan' | 'magenta' | 'electric';
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
  },
  {
    id: 'cap-2',
    number: 'II',
    title: 'Notas y Escalas',
    tagline: 'El Alfabeto Arcano',
    description:
      'Las siete notas, sus alteraciones y cómo se ordenan en escalas mayor y menor para crear sensaciones distintas.',
    topics: [
      'Las 7 notas naturales',
      'Sostenidos y bemoles',
      'Escala mayor vs. menor',
      'Tonalidad y centro tonal',
    ],
    status: 'mockup',
    accent: 'magenta',
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
