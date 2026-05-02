import FrequencyBars from '../visualizations/FrequencyBars';

export default function SlideAltura() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Altura">
        <span>Altura</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="def-box">
            <span className="def-symbol" aria-hidden="true">◈</span>
            <p className="body-text">
              Es la cualidad que distingue un sonido <strong>grave</strong> de
              uno <em>agudo</em>.
            </p>
          </div>

          <p className="body-text">
            Depende de la <strong>frecuencia</strong>: cuántas veces vibra una
            onda por segundo. Más vibraciones, sonido más agudo.
          </p>

          <p className="body-text">
            Voz <em>grave</em>: Billie Eilish susurrando. Voz <em>aguda</em>:
            Ariana Grande en el silbato.
          </p>
        </div>

        <FrequencyBars />
      </div>
    </div>
  );
}
