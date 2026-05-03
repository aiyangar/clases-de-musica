import ClefSymbol from '@/components/music/ClefSymbol';
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideClaveDeFa() {
  return (
    <div className="flex-1 flex flex-col gap-6 items-center">
      <h2 className="heading-2" data-text="Clave de Fa">
        <span>Clave de Fa</span>
      </h2>
      <div className="flex items-center gap-10 flex-1">
        <div className="text-magenta">
          <ClefSymbol clef="fa" size={180} />
        </div>
        <div className="text-magenta">
          <Pentagrama
            clef="fa"
            notes={[{ step: 6, label: 'Fa', highlight: true }]}
            highlightLines={[4]}
            width={620}
          />
        </div>
      </div>
      <p className="body-text text-center max-w-4xl">
        Sus dos puntos rodean la <strong>4ª línea</strong>, fijando ahí la
        nota <em>Fa</em>.
      </p>
    </div>
  );
}
