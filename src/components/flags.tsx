// Banderas en SVG para el selector de idioma. No usamos emojis (🇺🇸 🇵🇾) porque
// Windows no los dibuja: muestra las letras "US" y "PY".
// Son decorativas (aria-hidden): el enlace ya tiene su aria-label.

type FlagProps = { className?: string };

const flagClass = "h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-white/20";

// Paraguay: franjas roja, blanca y azul, con el escudo (simplificado) al centro.
export function FlagPY({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 20 12" aria-hidden="true" className={className ?? flagClass}>
      <rect width="20" height="4" fill="#D52B1E" />
      <rect y="4" width="20" height="4" fill="#FFFFFF" />
      <rect y="8" width="20" height="4" fill="#0038A8" />
      <circle cx="10" cy="6" r="1.5" fill="none" stroke="#3A7D2C" strokeWidth="0.5" />
      <circle cx="10" cy="6" r="0.6" fill="#F4C300" />
    </svg>
  );
}

// Estados Unidos: 13 franjas y el cantón azul (las estrellas, simplificadas en puntos).
export function FlagUS({ className }: FlagProps) {
  const stripeHeight = 12 / 13;
  return (
    <svg viewBox="0 0 20 12" aria-hidden="true" className={className ?? flagClass}>
      <rect width="20" height="12" fill="#FFFFFF" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * stripeHeight} width="20" height={stripeHeight} fill="#B22234" />
      ))}
      <rect width="8" height={7 * stripeHeight} fill="#3C3B6E" />
      {[1.3, 3.3, 5.3].flatMap((y) =>
        [1.2, 2.9, 4.6, 6.3].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.35" fill="#FFFFFF" />),
      )}
    </svg>
  );
}
