import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap2 from './slides/SlidePortadaCap2';
import SlideQueSon from './slides/SlideQueSon';
import SlideFiguras from './slides/SlideFiguras';
import SlideSilencios from './slides/SlideSilencios';
import SlideEquivalencia from './slides/SlideEquivalencia';
import SlidePlica from './slides/SlidePlica';
import SlideEjercicio from './slides/SlideEjercicio';
import SlideCierreCap2 from './slides/SlideCierreCap2';

const SLIDES = [
  SlidePortadaCap2,
  SlideQueSon,
  SlideFiguras,
  SlideSilencios,
  SlideEquivalencia,
  SlidePlica,
  SlideEjercicio,
  SlideCierreCap2,
];

type Props = {
  onExit?: () => void;
};

export default function Cap2Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
