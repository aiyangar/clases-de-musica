import type { ComponentType } from 'react';
import Cap1Presentation from '@/chapters/cap1/Cap1Presentation';
import Cap2Presentation from '@/chapters/cap2/Cap2Presentation';
import Cap3Presentation from '@/chapters/cap3/Cap3Presentation';
import Cap4Presentation from '@/chapters/cap4/Cap4Presentation';

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
  accent: 'cyan' | 'magenta' | 'electric' | 'orange' | 'lime' | 'violet' | 'coral' | 'mint';
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
    presentation: Cap1Presentation,
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
    title: 'Signos Musicales',
    tagline: 'Códigos del Pentagrama',
    description:
      'El lenguaje escrito de la música: pentagrama, claves, notas y compás. Aprender a leer el mapa antes de tocarlo.',
    topics: [
      'Notación y entonación',
      'Pentagrama: líneas y espacios',
      'Claves de Sol, Fa y Do',
      'Compás y líneas divisorias',
    ],
    status: 'available',
    accent: 'electric',
    presentation: Cap3Presentation,
  },
  {
    id: 'cap-4',
    number: 'IV',
    title: 'Construcción de Compases',
    tagline: 'Códigos del Compás',
    description:
      'Práctica activa: colocar barras divisorias, construir compases desde cero y completar compases en 24 ejercicios.',
    topics: [
      'Barras divisorias',
      'Construir compases',
      'Completar compases',
      '24 ejercicios interactivos',
    ],
    status: 'available',
    accent: 'orange',
    presentation: Cap4Presentation,
  },
  {
    id: 'cap-5',
    number: 'V',
    title: 'Líneas Adicionales',
    tagline: 'Códigos del Registro',
    description:
      'Cuando una nota se sale del pentagrama: líneas adicionales superiores e inferiores para extender el registro hacia el agudo o el grave.',
    topics: [
      'Líneas adicionales superiores',
      'Líneas adicionales inferiores',
      'Conteo y lectura',
    ],
    status: 'mockup',
    accent: 'lime',
  },
  {
    id: 'cap-6',
    number: 'VI',
    title: 'El Tiempo',
    tagline: 'Códigos del Pulso',
    description:
      'Cifra de compás, valores del numerador y denominador, y cómo el pulso organiza el tiempo musical en compases simples y compuestos.',
    topics: [
      'Cifra de compás',
      'Compás simple y compuesto',
      'Pulso y subdivisión',
    ],
    status: 'mockup',
    accent: 'violet',
  },
  {
    id: 'cap-7',
    number: 'VII',
    title: 'Formas de Alargar el Sonido',
    tagline: 'Códigos de la Prolongación',
    description:
      'Recursos para extender la duración de una nota: ligadura de prolongación, puntillo, doble puntillo y calderón.',
    topics: [
      'Ligadura de prolongación',
      'Puntillo y doble puntillo',
      'Calderón',
    ],
    status: 'mockup',
    accent: 'coral',
  },
  {
    id: 'cap-8',
    number: 'VIII',
    title: 'Principales Abreviaturas',
    tagline: 'Códigos de la Repetición',
    description:
      'Símbolos para repetir secciones y dirigir la lectura: barras de repetición, casillas, da capo, dal segno y coda.',
    topics: [
      'Barras de repetición',
      'Casillas (1ª y 2ª)',
      'Da capo, dal segno y coda',
    ],
    status: 'mockup',
    accent: 'mint',
  },
];

export function findChapter(id: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.id === id);
}
