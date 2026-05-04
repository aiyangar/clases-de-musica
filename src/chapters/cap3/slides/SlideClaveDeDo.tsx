import ClefSymbol from '@/components/music/ClefSymbol';
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideClaveDeDo() {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center">
      <h2 className="heading-2" data-text="Clave de Do">
        <span>Clave de Do</span>
      </h2>
      <div className="text-electric">
        <ClefSymbol clef="do" size={140} />
      </div>
      <div className="grid grid-cols-2 gap-8 w-full flex-1 items-center max-w-5xl">
        <div className="flex flex-col items-center gap-2 text-electric">
          <Pentagrama clef="do" clefLine={3} highlightLines={[3]} width={460} />
          <span className="body-text opacity-70">en 3ª línea (contralto)</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-electric">
          <Pentagrama clef="do" clefLine={4} highlightLines={[4]} width={460} />
          <span className="body-text opacity-70">en 4ª línea (tenor)</span>
        </div>
      </div>
      <p className="body-text text-center max-w-4xl">
        Es <strong>móvil</strong>: la línea donde se posa marca el
        <em> Do central</em>.
      </p>
    </div>
  );
}
