import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortada from './slides/SlidePortada';
import SlideMusica from './slides/SlideMusica';
import SlideAltura from './slides/SlideAltura';
import SlideAltura2 from './slides/SlideAltura2';
import SlideIntensidad from './slides/SlideIntensidad';
import SlideIntensidad2 from './slides/SlideIntensidad2';
import SlideTimbre from './slides/SlideTimbre';
import SlideMelodia from './slides/SlideMelodia';
import SlideArmonia from './slides/SlideArmonia';
import SlideRitmo from './slides/SlideRitmo';

const SLIDES = [
  SlidePortada,
  SlideMusica,
  SlideAltura,
  SlideAltura2,
  SlideIntensidad,
  SlideIntensidad2,
  SlideTimbre,
  SlideMelodia,
  SlideArmonia,
  SlideRitmo,
];

type Props = {
  onExit?: () => void;
};

export default function Cap1Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
