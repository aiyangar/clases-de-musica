type Props = {
  onClick: () => void;
};

export default function BackToDashboardButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Regresar al dashboard"
      className="fixed top-5 left-5 z-40 font-orbitron text-sm tracking-[0.3em] uppercase px-5 py-2.5 rounded-full border-2 border-cyan/60 text-cyan bg-base/60 backdrop-blur-md transition-all hover:border-magenta hover:text-magenta hover:shadow-[0_0_24px_rgba(255,0,255,0.7)]"
      style={{ textShadow: '0 0 10px currentColor', boxShadow: '0 0 16px rgba(0,255,255,0.4)' }}
    >
      ↩ Dashboard
    </button>
  );
}
