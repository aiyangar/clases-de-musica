import HarmonyWaves from '../visualizations/HarmonyWaves';

export default function SlideArmonia() {
  return (
    <div className="flex-1 flex flex-col gap-8 justify-center">
      <h2 className="heading-2 self-start" data-text="Armonía">
        <span>Armonía</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div className="flex flex-col gap-6">
          <div className="def-box">
            <span className="def-symbol" aria-hidden="true">◈</span>
            <p className="body-text">
              Es la combinación de <strong>varios sonidos a la vez</strong>.
              Cuando se apilan tres o más notas: nace un <em>acorde</em>.
            </p>
          </div>

          <p className="body-text">
            Bajo, acordes y melodía corriendo en <em>paralelo</em> son lo que
            hace que un beat de reguetón te golpee en el pecho.
          </p>
        </div>

        <HarmonyWaves />
      </div>
    </div>
  );
}
