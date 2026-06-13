import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap5 from './slides/SlidePortadaCap5';
import SlideQueSon from './slides/SlideQueSon';
import SlideConteo from './slides/SlideConteo';
import SlideEscalaDescendente from './slides/SlideEscalaDescendente';
import SlideEscalaAscendente from './slides/SlideEscalaAscendente';
import SlideEscalaAscendente2 from './slides/SlideEscalaAscendente2';
import SlideEscalaFa from './slides/SlideEscalaFa';
import SlideEscalaFa2 from './slides/SlideEscalaFa2';

const SLIDES = [
  SlidePortadaCap5,
  SlideQueSon,
  SlideConteo,
  SlideEscalaDescendente,
  SlideEscalaAscendente,
  SlideEscalaAscendente2,
  SlideEscalaFa,
  SlideEscalaFa2,
];

type Props = {
  onExit?: () => void;
};

export default function Cap5Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
