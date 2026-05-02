type Props = {
  numerator: number;
  denominator: number;
  size?: number | string;
  color?: string;
  className?: string;
};

export default function TimeSignature({
  numerator,
  denominator,
  size = 80,
  color = 'currentColor',
  className,
}: Props) {
  const fontSize = typeof size === 'number' ? `${size}px` : size;
  return (
    <span
      className={`inline-flex flex-col items-center justify-center select-none leading-none ${className ?? ''}`}
      style={{
        fontFamily: "'Orbitron', system-ui, sans-serif",
        fontWeight: 900,
        fontSize,
        color,
        textShadow: `0 0 12px ${color}, 0 0 24px ${color}88`,
      }}
      aria-label={`Compás ${numerator}/${denominator}`}
    >
      <span style={{ lineHeight: 0.95 }}>{numerator}</span>
      <span style={{ lineHeight: 0.95 }}>{denominator}</span>
    </span>
  );
}
