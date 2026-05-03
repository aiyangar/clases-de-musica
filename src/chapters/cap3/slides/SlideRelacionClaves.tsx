import Pentagrama from '@/components/music/Pentagrama';

export default function SlideRelacionClaves() {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center">
      <h2 className="heading-2" data-text="Relación entre claves">
        <span>Relación entre claves</span>
      </h2>
      <div className="flex-1 flex flex-col items-center justify-center gap-1">
        <div className="text-cyan">
          <Pentagrama
            clef="sol"
            notes={[{ step: -2, label: 'Do central', highlight: true }]}
            width={720}
          />
        </div>
        <div className="text-magenta">
          <Pentagrama
            clef="fa"
            notes={[{ step: 10, label: 'Do central', highlight: true }]}
            width={720}
          />
        </div>
      </div>
      <p className="body-text text-center max-w-4xl">
        El <strong>Do central</strong> es el puente entre ambas claves —
        está justo <em>una línea adicional</em> debajo del pentagrama de Sol
        y <em>una arriba</em> del de Fa.
      </p>
    </div>
  );
}
