import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap5 from './slides/SlidePortadaCap5';
import SlideQueSon from './slides/SlideQueSon';
import SlideConteo from './slides/SlideConteo';

const SLIDES = [
  SlidePortadaCap5,
  SlideQueSon,
  SlideConteo,
];

type Props = {
  onExit?: () => void;
};

export default function Cap5Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
