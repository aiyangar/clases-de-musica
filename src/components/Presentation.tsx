import ChapterPlayer from './ChapterPlayer';
import SlidePortada from './slides/SlidePortada';
import SlideMusica from './slides/SlideMusica';
import SlideAltura from './slides/SlideAltura';
import SlideIntensidad from './slides/SlideIntensidad';
import SlideTimbre from './slides/SlideTimbre';
import SlideMelodia from './slides/SlideMelodia';
import SlideArmonia from './slides/SlideArmonia';
import SlideRitmo from './slides/SlideRitmo';

const SLIDES = [
  SlidePortada,
  SlideMusica,
  SlideAltura,
  SlideIntensidad,
  SlideTimbre,
  SlideMelodia,
  SlideArmonia,
  SlideRitmo,
];

type Props = {
  onExit?: () => void;
};

export default function Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
