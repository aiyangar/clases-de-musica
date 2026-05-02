import ParticleCanvas from './ParticleCanvas';

export default function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden scanlines">
      <div className="neon-grid" />
      <div className="corner-glow tl" />
      <div className="corner-glow br" />
      <ParticleCanvas />
    </div>
  );
}
