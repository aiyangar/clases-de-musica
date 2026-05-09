import type { ComponentType } from 'react';
import Cap1Presentation from '@/chapters/cap1/Cap1Presentation';
import Cap2Presentation from '@/chapters/cap2/Cap2Presentation';
import Cap3Presentation from '@/chapters/cap3/Cap3Presentation';
import Cap4Presentation from '@/chapters/cap4/Cap4Presentation';

export type LevelId = 'principiante' | 'intermedio' | 'avanzado';

export type ChapterAccent =
  | 'cyan'
  | 'magenta'
  | 'electric'
  | 'orange'
  | 'lime'
  | 'violet'
  | 'coral'
  | 'mint';

export type ChapterStatus = 'available' | 'mockup';

export type ChapterPresentationProps = {
  onExit?: () => void;
};

export type LevelMeta = {
  id: LevelId;
  label: string;
  order: number;
  accentHex: string;
};

export type ChapterMeta = {
  id: string;
  level: LevelId;
  number: string;
  title: string;
  tagline: string;
  description: string;
  topics: string[];
  status: ChapterStatus;
  accent: ChapterAccent;
  presentation?: ComponentType<ChapterPresentationProps>;
};

export const LEVELS: readonly LevelMeta[] = [
  { id: 'principiante', label: 'Principiante', order: 1, accentHex: '#1f9bff' },
  { id: 'intermedio',   label: 'Intermedio',   order: 2, accentHex: '#ffb700' },
  { id: 'avanzado',     label: 'Avanzado',     order: 3, accentHex: '#ff0044' },
];

export const CHAPTER_ACCENT_HEX: Record<ChapterAccent, string> = {
  cyan:    '#00ffff',
  magenta: '#ff00ff',
  electric: '#ffff00',
  orange:  '#ff9933',
  lime:    '#84ff00',
  violet:  '#b14fff',
  coral:   '#ff5577',
  mint:    '#00ff9d',
};

export const CHAPTERS: readonly ChapterMeta[] = [
  {
    id: 'principiante-cap-1',
    level: 'principiante',
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
    id: 'principiante-cap-2',
    level: 'principiante',
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
    id: 'principiante-cap-3',
    level: 'principiante',
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
    id: 'principiante-cap-4',
    level: 'principiante',
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
    id: 'principiante-cap-5',
    level: 'principiante',
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
    id: 'principiante-cap-6',
    level: 'principiante',
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
    id: 'principiante-cap-7',
    level: 'principiante',
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
    id: 'principiante-cap-8',
    level: 'principiante',
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
  {
    id: 'intermedio-cap-1',
    level: 'intermedio',
    number: 'I',
    title: 'Compases Compuestos',
    tagline: 'Códigos del Pulso Ternario',
    description:
      'Compases donde el pulso se subdivide en tres: 6/8, 9/8, 12/8 y la diferencia con los compases simples.',
    topics: [
      'Compás simple vs compuesto',
      '6/8, 9/8 y 12/8',
      'Pulso y subdivisión ternaria',
    ],
    status: 'mockup',
    accent: 'cyan',
  },
  {
    id: 'intermedio-cap-2',
    level: 'intermedio',
    number: 'II',
    title: 'Expresión Musical',
    tagline: 'Códigos del Carácter',
    description:
      'Dinámicas, articulaciones, agógica y matices: los signos que transforman las notas en interpretación.',
    topics: [
      'Dinámicas (p, f, mf...)',
      'Articulaciones',
      'Matices y agógica',
    ],
    status: 'mockup',
    accent: 'violet',
  },
  {
    id: 'intermedio-cap-3',
    level: 'intermedio',
    number: 'III',
    title: 'Intervalos',
    tagline: 'Códigos de la Distancia',
    description:
      'Distancia entre dos notas: cómo se cuentan, se nombran y se clasifican en mayores, menores, justos, aumentados y disminuidos.',
    topics: [
      'Conteo de intervalos',
      'Mayores, menores, justos',
      'Aumentados y disminuidos',
    ],
    status: 'mockup',
    accent: 'magenta',
  },
  {
    id: 'intermedio-cap-4',
    level: 'intermedio',
    number: 'IV',
    title: 'Escalas',
    tagline: 'Códigos del Camino',
    description:
      'Construcción de escalas mayores y menores: tonos, semitonos y patrones que definen cada modo.',
    topics: [
      'Escalas mayores',
      'Escalas menores',
      'Tonos y semitonos',
    ],
    status: 'mockup',
    accent: 'mint',
  },
  {
    id: 'intermedio-cap-5',
    level: 'intermedio',
    number: 'V',
    title: 'Armaduras',
    tagline: 'Códigos de la Tonalidad',
    description:
      'Sostenidos y bemoles al inicio del pentagrama: cómo se leen, qué tonalidad indican y el círculo de quintas.',
    topics: [
      'Sostenidos al inicio',
      'Bemoles al inicio',
      'Círculo de quintas',
    ],
    status: 'mockup',
    accent: 'coral',
  },
  {
    id: 'avanzado-cap-1',
    level: 'avanzado',
    number: 'I',
    title: 'Tonalidades y Armaduras',
    tagline: 'Códigos del Reino',
    description:
      'Caligrafía precisa de las armaduras, manuscritos históricos, atajos para identificar tonalidades mayores y reconocer tu propia tonalidad.',
    topics: [
      'Caligrafía de las Armaduras',
      'Manuscrito Medieval',
      'Trucos para Tonalidades Mayores',
      'Cuál es mi Tonalidad',
    ],
    status: 'mockup',
    accent: 'cyan',
  },
  {
    id: 'avanzado-cap-2',
    level: 'avanzado',
    number: 'II',
    title: 'Escalas y Tonalidades',
    tagline: 'Códigos del Mapa',
    description:
      'Escalas mayores y menores en profundidad, su relación con las tonalidades, notas enarmónicas y los pares de relativos y homónimos.',
    topics: [
      'Escalas Mayores y Menores',
      'Escalas y Tonalidades',
      'Notas Enarmónicas',
      'Relativos Mayores y Menores',
      'Tonalidades Homónimas y Relativas',
    ],
    status: 'mockup',
    accent: 'electric',
  },
  {
    id: 'avanzado-cap-3',
    level: 'avanzado',
    number: 'III',
    title: 'Intervalos',
    tagline: 'Códigos de la Distancia Avanzada',
    description:
      'Identificación rápida y construcción de intervalos en ambas direcciones: mayores, menores, justos, aumentados y disminuidos.',
    topics: [
      'Identificación de Intervalos',
      'Intervalos Mayores y Justos',
      'Intervalos Menores',
    ],
    status: 'mockup',
    accent: 'magenta',
  },
  {
    id: 'avanzado-cap-4',
    level: 'avanzado',
    number: 'IV',
    title: 'Grados y Acordes Diatónicos',
    tagline: 'Códigos de la Función',
    description:
      'Los grados de la escala, construcción de acordes mayores y menores, y el armado completo de los acordes mayores en una tonalidad mayor.',
    topics: [
      'Los Grados de la Escala',
      'Acordes Mayores y Menores',
      'Acordes Mayores en Tonalidades Mayores',
    ],
    status: 'mockup',
    accent: 'mint',
  },
  {
    id: 'avanzado-cap-5',
    level: 'avanzado',
    number: 'V',
    title: 'Acordes Disminuidos y Séptima Dominante',
    tagline: 'Códigos de la Tensión',
    description:
      'Acordes disminuidos, los menores y disminuidos en una tonalidad mayor, y el rol del acorde de séptima dominante como motor armónico.',
    topics: [
      'Acordes Disminuidos',
      'Acordes Menores y Disminuidos en Tonalidad Mayor',
      'Acorde de Séptima Dominante',
    ],
    status: 'mockup',
    accent: 'violet',
  },
  {
    id: 'avanzado-cap-6',
    level: 'avanzado',
    number: 'VI',
    title: 'Armonía Funcional',
    tagline: 'Códigos del Movimiento',
    description:
      'Función de cada acorde, cadencias, lógica de la armonía funcional y diferencias con la armonía no funcional.',
    topics: [
      'Función del Acorde',
      'Cadencias',
      'Armonía Funcional',
      'Armonía No Funcional',
    ],
    status: 'mockup',
    accent: 'lime',
  },
  {
    id: 'avanzado-cap-7',
    level: 'avanzado',
    number: 'VII',
    title: 'Compases de Amalgama y Escalas Modernas',
    tagline: 'Códigos del Vanguardismo',
    description:
      'Compases irregulares de amalgama, escalas pentatónicas, escala de tonos enteros y aproximación a la música dodecafónica.',
    topics: [
      'Compases de Amalgama',
      'Escalas Pentatónicas',
      'Escala de Tonos',
      'Música Dodecafónica',
    ],
    status: 'mockup',
    accent: 'orange',
  },
  {
    id: 'avanzado-cap-8',
    level: 'avanzado',
    number: 'VIII',
    title: 'El Blues',
    tagline: 'Códigos del Lamento',
    description:
      'Estructura del blues clásico y su evolución con acordes de séptima.',
    topics: [
      'El Blues',
      'El Blues con Acordes de Séptima',
    ],
    status: 'mockup',
    accent: 'coral',
  },
];

export function findChapter(id: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export function findLevel(id: string): LevelMeta | undefined {
  return LEVELS.find((l) => l.id === id);
}

export function chaptersByLevel(level: LevelId): ChapterMeta[] {
  return CHAPTERS.filter((c) => c.level === level);
}

export function isLevelId(value: string): value is LevelId {
  return value === 'principiante' || value === 'intermedio' || value === 'avanzado';
}
