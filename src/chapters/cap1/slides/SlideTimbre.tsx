type TimbreCard = {
  emoji: string;
  name: string;
  desc: string;
  color: string;
};

const CARDS: TimbreCard[] = [
  { emoji: '🎹', name: 'Piano', desc: 'Cristalino, brillante', color: '#00ffff' },
  { emoji: '🎻', name: 'Violín', desc: 'Cálido, humano', color: '#ff00ff' },
  { emoji: '🎺', name: 'Trompeta', desc: 'Filoso, metálico', color: '#ffff00' },
  { emoji: '🎤', name: 'Voz', desc: 'Único, irrepetible', color: '#ff66ff' },
];

export default function SlideTimbre() {
  return (
    <div className="flex-1 flex flex-col gap-8 justify-center">
      <h2 className="heading-2 self-start" data-text="Timbre">
        <span>Timbre</span>
      </h2>

      <div className="def-box">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          El <strong>"color"</strong> del sonido. La{' '}
          <em>huella personal</em> de cada instrumento o voz: misma nota,
          identidad totalmente distinta.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {CARDS.map((c) => (
          <div
            key={c.name}
            className="timbre-card"
            style={{ color: c.color }}
          >
            <div className="timbre-emoji">{c.emoji}</div>
            <div className="timbre-name" style={{ textShadow: `0 0 14px ${c.color}` }}>
              {c.name}
            </div>
            <div className="timbre-desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
