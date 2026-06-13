import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap4 from './slides/SlidePortadaCap4';
import SlideRecapCompas from './slides/SlideRecapCompas';
import SlideRecapCompas2 from './slides/SlideRecapCompas2';
import SlideEjercicioBarras from './slides/SlideEjercicioBarras';
import SlideEjercicioConstruir from './slides/SlideEjercicioConstruir';
import SlideEjercicioCompletar from './slides/SlideEjercicioCompletar';
import SlideCierreCap4 from './slides/SlideCierreCap4';

const SLIDES = [
  SlidePortadaCap4,
  SlideRecapCompas,
  SlideRecapCompas2,
  SlideEjercicioBarras,
  () => <SlideEjercicioConstruir part={1} />,
  () => <SlideEjercicioConstruir part={2} />,
  () => <SlideEjercicioCompletar part={1} />,
  () => <SlideEjercicioCompletar part={2} />,
  SlideCierreCap4,
];

type Props = {
  onExit?: () => void;
};

export default function Cap4Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
