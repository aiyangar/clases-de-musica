import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap2 from './slides/SlidePortadaCap2';
import SlideQueSon from './slides/SlideQueSon';
import SlideSonidoSilencio from './slides/SlideSonidoSilencio';
import SlideFiguras from './slides/SlideFiguras';
import SlideSilencios from './slides/SlideSilencios';
import SlideEquivalencia from './slides/SlideEquivalencia';
import SlidePlicaIntro from './slides/SlidePlicaIntro';
import SlidePlicaArriba from './slides/SlidePlicaArriba';
import SlidePlicaAbajo from './slides/SlidePlicaAbajo';
import SlideEjercicio from './slides/SlideEjercicio';
import SlideCierreCap2 from './slides/SlideCierreCap2';

const SLIDES = [
  SlidePortadaCap2,
  SlideQueSon,
  SlideSonidoSilencio,
  () => <SlideFiguras part={1} />,
  () => <SlideFiguras part={2} />,
  () => <SlideSilencios part={1} />,
  () => <SlideSilencios part={2} />,
  () => <SlideEquivalencia part={1} />,
  () => <SlideEquivalencia part={2} />,
  SlidePlicaIntro,
  SlidePlicaArriba,
  SlidePlicaAbajo,
  () => <SlideEjercicio part={1} />,
  () => <SlideEjercicio part={2} />,
  SlideCierreCap2,
];

type Props = {
  onExit?: () => void;
};

export default function Cap2Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
