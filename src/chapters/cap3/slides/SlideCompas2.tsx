import TimeSignature from '@/components/music/TimeSignature';

export default function SlideCompas2() {
  return (
    <div className="flex-1 flex flex-col gap-10 items-center justify-center">
      <h2 className="heading-2" data-text="El compás">
        <span>El compás</span>
      </h2>
      <div className="text-cyan">
        <TimeSignature numerator={4} denominator={4} size={140} color="#00ffff" />
      </div>
      <p className="body-text text-center max-w-4xl">
        <strong>Numerador</strong> = cuántos tiempos. <strong>Denominador</strong>{' '}
        = qué figura vale un tiempo.
      </p>
    </div>
  );
}
