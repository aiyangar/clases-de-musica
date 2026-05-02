import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap3 from './slides/SlidePortadaCap3';
import SlideNotacionEntonacion from './slides/SlideNotacionEntonacion';
import SlideCatalogoSignos from './slides/SlideCatalogoSignos';
import SlidePentagramaLineas from './slides/SlidePentagramaLineas';
import SlidePentagramaEspacios from './slides/SlidePentagramaEspacios';
import SlideLineasAdicionales from './slides/SlideLineasAdicionales';
import SlideQueEsClave from './slides/SlideQueEsClave';
import SlideClaveDeSol from './slides/SlideClaveDeSol';
import SlideNotasSolLineas from './slides/SlideNotasSolLineas';
import SlideNotasSolEspacios from './slides/SlideNotasSolEspacios';
import SlideClaveDeFa from './slides/SlideClaveDeFa';
import SlideNotasFaLineas from './slides/SlideNotasFaLineas';
import SlideNotasFaEspacios from './slides/SlideNotasFaEspacios';
import SlideClaveDeDo from './slides/SlideClaveDeDo';
import SlideRelacionClaves from './slides/SlideRelacionClaves';
import SlideCompas from './slides/SlideCompas';
import SlideBarras from './slides/SlideBarras';
import SlideCierreCap3 from './slides/SlideCierreCap3';

const SLIDES = [
  SlidePortadaCap3,
  SlideNotacionEntonacion,
  SlideCatalogoSignos,
  SlidePentagramaLineas,
  SlidePentagramaEspacios,
  SlideLineasAdicionales,
  SlideQueEsClave,
  SlideClaveDeSol,
  SlideNotasSolLineas,
  SlideNotasSolEspacios,
  SlideClaveDeFa,
  SlideNotasFaLineas,
  SlideNotasFaEspacios,
  SlideClaveDeDo,
  SlideRelacionClaves,
  SlideCompas,
  SlideBarras,
  SlideCierreCap3,
];

type Props = {
  onExit?: () => void;
};

export default function Cap3Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
