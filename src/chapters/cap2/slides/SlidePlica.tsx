import NoteSymbol from '../visualizations/NoteSymbol';

export default function SlidePlica() {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2 className="heading-2 self-start" data-text="La plica">
        <span>La plica</span>
      </h2>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          La <strong>plica</strong> es la <em>línea vertical</em> que sale de la
          cabeza de la nota. Indica de qué lado se dibuja: cambia según la
          posición de la nota en el pentagrama.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
        <RuleCard
          title="Plica hacia arriba"
          subtitle="por la derecha"
          rule="Cuando la nota está por debajo de la 3ª línea"
          direction="up"
          color="#00ffff"
        />
        <RuleCard
          title="Plica hacia abajo"
          subtitle="por la izquierda"
          rule="Cuando la nota está por encima de la 3ª línea"
          direction="down"
          color="#ff00ff"
        />
      </div>

      <p className="font-rajdhani text-2xl text-clear/80 text-center mt-2">
        Sobre la <em className="text-electric text-glow-electric not-italic font-bold">3ª línea</em>: por
        convención, plica hacia abajo.
      </p>
    </div>
  );
}

type RuleCardProps = {
  title: string;
  subtitle: string;
  rule: string;
  direction: 'up' | 'down';
  color: string;
};

function RuleCard({ title, subtitle, rule, direction, color }: RuleCardProps) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center gap-4 backdrop-blur-md"
      style={{
        background: 'rgba(15, 0, 35, 0.55)',
        border: `2px solid ${color}66`,
        boxShadow: `0 0 24px ${color}33`,
      }}
    >
      <div className="flex items-center gap-6">
        <NoteSymbol kind="negra" direction={direction} color={color} size={90} />
        <NoteSymbol kind="corchea" direction={direction} color={color} size={90} />
        <NoteSymbol kind="semicorchea" direction={direction} color={color} size={90} />
      </div>

      <div className="text-center">
        <div
          className="font-orbitron text-2xl md:text-3xl tracking-[0.15em] uppercase"
          style={{ color, textShadow: `0 0 14px ${color}` }}
        >
          {title}
        </div>
        <div className="font-rajdhani text-xl md:text-2xl text-clear/85 mt-1">
          {subtitle}
        </div>
      </div>

      <p className="font-rajdhani text-lg md:text-xl text-clear/80 text-center mt-1">
        {rule}
      </p>
    </div>
  );
}
