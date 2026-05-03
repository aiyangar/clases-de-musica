import ClefSymbol from '@/components/music/ClefSymbol';
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideClaveDeSol() {
  return (
    <div className="flex-1 flex flex-col gap-6 items-center">
      <h2 className="heading-2" data-text="Clave de Sol">
        <span>Clave de Sol</span>
      </h2>
      <div className="flex items-center gap-10 flex-1">
        <div className="text-cyan">
          <ClefSymbol clef="sol" size={180} />
        </div>
        <div className="text-cyan">
          <Pentagrama
            clef="sol"
            notes={[{ step: 2, label: 'Sol', highlight: true }]}
            highlightLines={[2]}
            width={620}
          />
        </div>
      </div>
      <p className="body-text text-center max-w-4xl">
        Se enrosca en la <strong>2ª línea</strong>, fijando ahí la nota
        <em> Sol</em>.
      </p>
    </div>
  );
}
