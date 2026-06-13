import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap5 from './slides/SlidePortadaCap5';

const SLIDES = [
  SlidePortadaCap5,
];

type Props = {
  onExit?: () => void;
};

export default function Cap5Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
