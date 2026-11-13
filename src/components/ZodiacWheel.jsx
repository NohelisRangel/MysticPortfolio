// The hero "birth chart": concentric rings, 12 house divisions, zodiac glyphs,
// a slowly rotating outer ring and a glowing four-point star at the centre.
// "\uFE0E" asks the browser for the thin text version of each sign, not the emoji.
const GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((g) => g + "\uFE0E");
const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const polar = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [200 + r * Math.cos(a), 200 + r * Math.sin(a)];
};

export default function ZodiacWheel() {
  return (
    <div className="wheel">
      <svg viewBox="0 0 400 400" role="img" aria-label="Zodiac wheel illustration">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8C36A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E8C36A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Rotating outer ring: ticks + glyphs */}
        <g className="wheel__spin">
          <circle cx="200" cy="200" r="190" className="ln faint" />
          <circle cx="200" cy="200" r="178" className="ln" />
          {Array.from({ length: 72 }, (_, i) => {
            const [x1, y1] = polar(178, i * 5);
            const [x2, y2] = polar(i % 6 === 0 ? 170 : 174, i * 5);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="ln faint" />;
          })}
          {GLYPHS.map((g, i) => {
            const [x, y] = polar(155, i * 30 + 15);
            return (
              <text key={g} x={x} y={y} className="glyph" textAnchor="middle" dominantBaseline="central">
                {g}
              </text>
            );
          })}
        </g>

        {/* Static inner chart */}
        <circle cx="200" cy="200" r="135" className="ln" />
        <circle cx="200" cy="200" r="95" className="ln faint" />
        <circle cx="200" cy="200" r="48" className="ln" />
        {Array.from({ length: 12 }, (_, i) => {
          const [x1, y1] = polar(48, i * 30);
          const [x2, y2] = polar(135, i * 30);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="ln faint" />;
        })}
        {NUMERALS.map((n, i) => {
          const [x, y] = polar(115, i * 30 + 15);
          return (
            <text key={n} x={x} y={y} className="numeral" textAnchor="middle" dominantBaseline="central">
              {n}
            </text>
          );
        })}

        {/* Aspect lines across the chart */}
        <polygon
          points={[0, 120, 240].map((d) => polar(95, d + 20).join(",")).join(" ")}
          className="ln faint"
        />

        <circle cx="200" cy="200" r="60" fill="url(#glow)" />
        <path
          className="wheel__star"
          d="M200 172 L205 195 L228 200 L205 205 L200 228 L195 205 L172 200 L195 195 Z"
        />
      </svg>
      <p className="wheel__caption">Design · Code · Cosmos</p>
    </div>
  );
}
