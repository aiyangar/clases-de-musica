import BarLine from '@/components/music/BarLine';

const VARIANTS = [
  { variant: 'single' as const,  label: 'Línea divisoria',     sub: 'separa compases',     color: '#00ffff' },
  { variant: 'double' as const,  label: 'Doble barra',         sub: 'cambio de sección',   color: '#ff00ff' },
  { variant: 'final' as const,   label: 'Barra final',         sub: 'fin de la pieza',     color: '#ffff00' },
  { variant: 'repeat' as const,  label: 'Barra de repetición', sub: 'volver al inicio',    color: '#00ffff' },
];

export default function SlideBarras() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Barras y líneas">
        <span>Barras y líneas</span>
      </h2>
      <div className="flex-1 grid grid-cols-4 gap-6 w-full items-stretch">
        {VARIANTS.map((v) => (
          <div key={v.variant} className="timbre-card flex flex-col items-center justify-between gap-3 py-6">
            <div className="flex-1 flex items-center justify-center" style={{ color: v.color }}>
              <BarLine variant={v.variant} height={130} color={v.color} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="timbre-name">{v.label}</span>
              <span className="timbre-desc text-center">{v.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
