// ✦ Line-art illustrations for the 22 Major Arcana ✦
// Drawn in a 100 × 120 box, in the spirit of the classic Rider–Waite scenes.
// Strokes use currentColor (gold); classes in tarot.css set the fills:
//   .f = soft gold fill   .s = solid gold   .c = cream   .d = dashed line

/* ---------- small helpers ---------- */
const starPoints = (cx, cy, R, r, n = 4, rot = -90) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const rad = i % 2 ? r : R;
    const a = ((rot + (i * 180) / n) * Math.PI) / 180;
    return `${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const Star = ({ x, y, R = 3, r, n = 4, rot, className = "s" }) => (
  <polygon className={className} points={starPoints(x, y, R, r ?? R * 0.4, n, rot)} />
);

const Rays = ({ x, y, r1, r2, n = 12, offset = 0 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const a = ((i * 360) / n + offset) * (Math.PI / 180);
      return (
        <line key={i}
          x1={x + r1 * Math.cos(a)} y1={y + r1 * Math.sin(a)}
          x2={x + r2 * Math.cos(a)} y2={y + r2 * Math.sin(a)} />
      );
    })}
  </g>
);

// A robed figure: head at (x, y), robe flaring down to `foot`
const Figure = ({ x, y, foot = 100, spread = 12, head = 5 }) => (
  <g>
    <path className="f" d={`M${x - 6} ${y + head + 2} L${x - spread} ${foot} L${x + spread} ${foot} L${x + 6} ${y + head + 2} Z`} />
    <circle className="c" cx={x} cy={y} r={head} />
  </g>
);

const Lemniscate = ({ x, y, w = 8 }) => (
  <path d={`M${x} ${y} c${-w * 0.25} ${-w * 0.6} ${-w} ${-w * 0.6} ${-w} 0 c0 ${w * 0.6} ${w * 0.75} ${w * 0.6} ${w} 0 c${w * 0.25} ${-w * 0.6} ${w} ${-w * 0.6} ${w} 0 c0 ${w * 0.6} ${-w * 0.75} ${w * 0.6} ${-w} 0`} />
);

const Ground = ({ y = 104 }) => <line x1="4" y1={y} x2="96" y2={y} />;

/* ---------- the 22 scenes ---------- */
const scenes = {
  // 0 — The Fool: a wanderer at the cliff's edge, sun overhead, little dog at heel
  "0": (
    <>
      <circle className="f" cx="22" cy="20" r="8" />
      <Rays x={22} y={20} r1={11} r2={15} n={12} />
      <path d="M70 104 L82 84 L96 98" />
      <path className="f" d="M4 92 L68 92 L72 120 L4 120 Z" />
      <Figure x={46} y={48} foot={90} spread={11} />
      <line x1="52" y1="58" x2="66" y2="40" />
      <circle className="f" cx="68" cy="37" r="4" />
      <line x1="41" y1="60" x2="33" y2="64" />
      <circle className="s" cx="32" cy="64" r="2" />
      <ellipse className="c" cx="26" cy="87" rx="5" ry="3" />
      <circle className="c" cx="31" cy="83" r="2.5" />
    </>
  ),
  // I — The Magician: wand raised, infinity above, the four suits on the table
  "I": (
    <>
      <Lemniscate x={50} y={14} w={7} />
      <Figure x={50} y={28} foot={78} spread={11} />
      <line x1="55" y1="38" x2="64" y2="22" />
      <line className="thick" x1="64" y1="16" x2="64" y2="26" />
      <line x1="45" y1="40" x2="36" y2="54" />
      <rect className="f" x="18" y="78" width="64" height="5" />
      <line x1="22" y1="83" x2="22" y2="104" /><line x1="78" y1="83" x2="78" y2="104" />
      <path className="s" d="M24 70 h9 l-1.5 8 h-6 Z" />
      <circle cx="43" cy="74" r="3.6" /><Star x={43} y={74} R={2.6} n={5} />
      <line x1="56" y1="64" x2="56" y2="78" /><line x1="52.5" y1="67" x2="59.5" y2="67" />
      <line className="thick" x1="68" y1="66" x2="72" y2="78" />
      <circle className="f" cx="14" cy="12" r="3" /><circle className="f" cx="86" cy="12" r="3" />
    </>
  ),
  // II — The High Priestess: between the pillars, crescent at her feet
  "II": (
    <>
      <rect className="f strong" x="12" y="26" width="12" height="78" />
      <rect x="76" y="26" width="12" height="78" />
      <rect className="s" x="10" y="21" width="16" height="5" />
      <rect className="s" x="74" y="21" width="16" height="5" />
      <text x="18" y="56" className="lbl">B</text>
      <text x="82" y="56" className="lbl">J</text>
      <circle className="f" cx="34" cy="40" r="2" /><circle className="f" cx="66" cy="40" r="2" />
      <circle className="f" cx="32" cy="70" r="2" /><circle className="f" cx="68" cy="70" r="2" />
      <Figure x={50} y={36} foot={98} spread={14} />
      <circle className="s" cx="50" cy="27" r="2.6" />
      <path d="M43 25 Q50 33 57 25" />
      <line x1="50" y1="50" x2="50" y2="58" /><line x1="46" y1="54" x2="54" y2="54" />
      <rect className="c" x="44" y="62" width="12" height="7" rx="2" />
      <path className="s" d="M38 104 A12 6 0 0 0 62 104 A12 3.5 0 0 1 38 104 Z" />
    </>
  ),
  // III — The Empress: crowned with stars, wheat at her feet, Venus shield
  "III": (
    <>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (Math.PI * (i + 0.5)) / 12;
        return <circle key={i} className="s" cx={50 - 11 * Math.cos(a)} cy={30 - 11 * Math.sin(a)} r="1.1" />;
      })}
      <path d="M70 20 q4 10 0 20 q-4 10 0 20" className="d" />
      <path d="M78 18 q4 10 0 20 q-4 10 0 20" className="d" />
      <Figure x={50} y={32} foot={100} spread={20} />
      <line x1="42" y1="48" x2="34" y2="30" /><circle className="s" cx="33" cy="27" r="2.6" />
      <circle className="f" cx="72" cy="84" r="8" />
      <circle cx="72" cy="82" r="2.6" /><line x1="72" y1="84.6" x2="72" y2="89" /><line x1="69.6" y1="87" x2="74.4" y2="87" />
      {[12, 18, 24].map((x) => (
        <g key={x}>
          <line x1={x} y1="104" x2={x} y2="78" />
          {[80, 85, 90].map((y) => <ellipse key={y} className="s" cx={x} cy={y} rx="1.3" ry="2.4" />)}
        </g>
      ))}
    </>
  ),
  // IV — The Emperor: stone throne with rams, mountains behind, ankh sceptre
  "IV": (
    <>
      <path d="M4 70 L18 46 L32 62 L48 38 L62 56 L80 40 L96 64" />
      <rect className="f" x="27" y="46" width="46" height="58" />
      <circle cx="30" cy="48" r="4.5" /><circle cx="30" cy="48" r="2" />
      <circle cx="70" cy="48" r="4.5" /><circle cx="70" cy="48" r="2" />
      <Figure x={50} y={40} foot={100} spread={13} />
      <path className="s" d="M45 35 L46 29 L48 33 L50 28 L52 33 L54 29 L55 35 Z" />
      <path d="M47 44 Q50 50 53 44" />
      <ellipse cx="66" cy="38" rx="2.5" ry="3.5" />
      <line x1="66" y1="41.5" x2="66" y2="62" /><line x1="62.5" y1="44.5" x2="69.5" y2="44.5" />
      <circle className="s" cx="35" cy="62" r="3.5" />
    </>
  ),
  // V — The Hierophant: triple crown, blessing hand, crossed keys
  "V": (
    <>
      <rect x="10" y="30" width="10" height="74" /><rect x="80" y="30" width="10" height="74" />
      <path className="s" d="M44 34 h12 l-1 -5 h-10 Z" />
      <path className="s" d="M45 28 h10 l-1 -5 h-8 Z" />
      <path className="s" d="M46 22 h8 l-2 -5 h-4 Z" />
      <line x1="50" y1="17" x2="50" y2="12" /><line x1="48" y1="14" x2="52" y2="14" />
      <Figure x={50} y={40} foot={98} spread={16} />
      <line x1="44" y1="52" x2="36" y2="42" /><line x1="36" y1="42" x2="35" y2="37" /><line x1="36" y1="42" x2="38" y2="37" />
      <line x1="64" y1="40" x2="64" y2="100" />
      <line x1="62" y1="42" x2="66" y2="42" /><line x1="61" y1="46" x2="67" y2="46" /><line x1="60" y1="50" x2="68" y2="50" />
      <line x1="40" y1="114" x2="60" y2="104" /><line x1="40" y1="104" x2="60" y2="114" />
      <circle className="s" cx="40" cy="104" r="2" /><circle className="s" cx="60" cy="104" r="2" />
    </>
  ),
  // VI — The Lovers: two figures beneath an angel and the sun
  "VI": (
    <>
      <circle className="f" cx="50" cy="12" r="6" />
      <Rays x={50} y={12} r1={8} r2={11} n={12} />
      <path className="f" d="M46 32 Q30 20 22 36 Q36 32 46 38 Z" />
      <path className="f" d="M54 32 Q70 20 78 36 Q64 32 54 38 Z" />
      <path className="f" d="M46 32 L44 50 L56 50 L54 32 Z" />
      <circle className="c" cx="50" cy="28" r="4" />
      <path className="d" d="M30 54 q5 -5 10 0 q5 -5 10 0 q5 -5 10 0 q5 -5 10 0" />
      <path d="M38 104 L50 80 L62 104" />
      <Figure x={28} y={66} foot={104} spread={9} head={4.5} />
      <Figure x={72} y={66} foot={104} spread={9} head={4.5} />
      <line x1="12" y1="104" x2="12" y2="70" />
      {[72, 78, 84, 90].map((y) => <Star key={y} x={12} y={y} R={2.2} n={4} />)}
      <line x1="88" y1="104" x2="88" y2="70" /><circle className="f" cx="88" cy="68" r="6" />
      <path d="M86 98 q4 -4 0 -8 q-4 -4 0 -8" />
    </>
  ),
  // VII — The Chariot: starry canopy, the charioteer, two sphinxes
  "VII": (
    <>
      <rect x="10" y="44" width="6" height="16" /><rect x="18" y="40" width="7" height="20" />
      <rect x="75" y="40" width="7" height="20" /><rect x="84" y="44" width="6" height="16" />
      <rect className="f" x="26" y="22" width="48" height="6" />
      {[32, 42, 52, 62].map((x) => <Star key={x} x={x + 2} y={25} R={1.8} n={4} />)}
      <line x1="28" y1="28" x2="28" y2="62" /><line x1="72" y1="28" x2="72" y2="62" />
      <path className="f" d="M44 45 L42 62 L58 62 L56 45 Z" />
      <circle className="c" cx="50" cy="39" r="5" />
      <Star x={50} y={32} R={2.6} n={8} />
      <line x1="57" y1="48" x2="64" y2="38" />
      <rect className="f" x="24" y="62" width="52" height="22" />
      <circle cx="50" cy="73" r="5" /><path d="M42 73 h16" />
      <path className="s" d="M12 104 Q14 94 22 94 L36 96 L38 104 Z" /><circle className="s" cx="22" cy="90" r="4" />
      <path d="M88 104 Q86 94 78 94 L64 96 L62 104 Z" /><circle className="c" cx="78" cy="90" r="4" />
    </>
  ),
  // VIII — Strength: a gentle hand closing the lion's jaw
  "VIII": (
    <>
      <path d="M60 50 L74 34 L88 46" />
      <Lemniscate x={38} y={16} w={7} />
      <Figure x={38} y={28} foot={100} spread={13} />
      {[30, 34, 38, 42, 46].map((x) => <circle key={x} className="s" cx={x} cy="42" r="1.2" />)}
      <path className="f" d="M50 100 Q50 74 70 72 L86 74 Q94 82 90 100 Z" />
      <circle className="f strong" cx="56" cy="74" r="10" />
      <circle className="c" cx="56" cy="74" r="5.5" />
      <path d="M90 86 Q99 80 96 70" /><circle className="s" cx="96" cy="69" r="1.6" />
      <line x1="43" y1="52" x2="52" y2="68" />
    </>
  ),
  // IX — The Hermit: alone on the peak, lantern holding a six-pointed star
  "IX": (
    <>
      <path className="f" d="M4 104 L30 80 L48 92 L70 66 L96 104 Z" />
      <circle className="f" cx="34" cy="58" r="13" />
      <path className="f strong" d="M58 26 Q49 26 47 38 L40 100 L72 100 L66 38 Q65 26 58 26 Z" />
      <path d="M52 36 Q58 30 64 36" />
      <path d="M55 42 l1 8 M59 42 l0 9 M62 42 l-1 8" />
      <line x1="72" y1="38" x2="77" y2="104" />
      <line x1="48" y1="50" x2="36" y2="54" />
      <rect className="c" x="30" y="54" width="9" height="10" rx="1" />
      <Star x={34.5} y={59} R={3} r={1.6} n={6} />
    </>
  ),
  // X — Wheel of Fortune: the turning wheel, sphinx atop, winged creatures in the clouds
  "X": (
    <>
      <circle className="f" cx="50" cy="60" r="30" />
      <circle cx="50" cy="60" r="20" />
      <circle className="s" cx="50" cy="60" r="5" />
      <Rays x={50} y={60} r1={5} r2={20} n={8} />
      <text x="50" y="37.5" className="lbl">T</text>
      <text x="73" y="62" className="lbl">A</text>
      <text x="50" y="86" className="lbl">R</text>
      <text x="27" y="62" className="lbl">O</text>
      <path className="s" d="M44 30 L50 20 L56 30 Z" />
      <line x1="53" y1="24" x2="58" y2="14" />
      <path d="M16 40 Q22 50 16 60 Q10 70 16 80" />
      {[[12, 12], [88, 12], [12, 108], [88, 108]].map(([x, y]) => (
        <g key={`${x}${y}`}><circle className="f" cx={x} cy={y} r="6" /><circle className="c" cx={x} cy={y} r="2.4" /></g>
      ))}
    </>
  ),
  // XI — Justice: sword upright, scales balanced, between the pillars
  "XI": (
    <>
      <rect x="10" y="28" width="9" height="76" /><rect x="81" y="28" width="9" height="76" />
      <path className="d" d="M19 30 Q50 40 81 30" />
      <Figure x={50} y={38} foot={100} spread={15} />
      <rect className="s" x="46" y="28" width="8" height="5" />
      <line className="thick" x1="64" y1="14" x2="64" y2="60" />
      <line x1="60" y1="54" x2="68" y2="54" />
      <line x1="44" y1="52" x2="36" y2="50" />
      <line x1="24" y1="50" x2="44" y2="50" /><line x1="34" y1="44" x2="34" y2="50" />
      <line x1="24" y1="50" x2="21" y2="60" /><line x1="24" y1="50" x2="27" y2="60" />
      <line x1="44" y1="50" x2="41" y2="60" /><line x1="44" y1="50" x2="47" y2="60" />
      <path className="s" d="M20 60 h8 a4 3 0 0 1 -8 0 Z" />
      <path className="s" d="M40 60 h8 a4 3 0 0 1 -8 0 Z" />
    </>
  ),
  // XII — The Hanged Man: suspended from the living tree, halo glowing
  "XII": (
    <>
      <line className="thick" x1="18" y1="14" x2="82" y2="14" />
      <line className="thick" x1="24" y1="14" x2="24" y2="104" />
      <line className="thick" x1="76" y1="14" x2="76" y2="104" />
      {[30, 44, 56, 70].map((x) => <ellipse key={x} className="s" cx={x} cy="11" rx="2.2" ry="1.3" />)}
      <line x1="50" y1="14" x2="50" y2="22" />
      <line x1="50" y1="22" x2="50" y2="52" />
      <path d="M50 30 L60 38 L50 46" />
      <path className="f" d="M43 52 L57 52 L59 80 L41 80 Z" />
      <path d="M43 60 L36 74 L44 78 M57 60 L64 74 L56 78" />
      <circle className="f strong" cx="50" cy="88" r="10" />
      <circle className="c" cx="50" cy="88" r="5" />
    </>
  ),
  // XIII — Death: the white-rose banner, sun rising between two towers
  "XIII": (
    <>
      <path d="M4 92 Q30 88 52 92 T96 90" className="d" />
      <rect className="f" x="66" y="68" width="8" height="22" /><rect className="f" x="82" y="64" width="8" height="26" />
      <path className="s" d="M71 90 A7 7 0 0 1 85 90 Z" />
      <Rays x={78} y={90} r1={9} r2={13} n={10} offset={-9} />
      <line className="thick" x1="30" y1="104" x2="30" y2="18" />
      <path className="f strong" d="M30 20 L62 25 L60 50 L30 45 Z" />
      <Star x={45} y={34} R={6} r={3} n={5} className="c" />
      <circle className="s" cx="45" cy="34" r="1.8" />
      <path className="s" d="M46 104 L47 98 L50 101 L53 96 L56 101 L59 98 L60 104 Z" />
    </>
  ),
  // XIV — Temperance: the angel pours between two cups, a path toward the dawn
  "XIV": (
    <>
      <circle className="f" cx="50" cy="22" r="9" />
      <path className="f" d="M45 30 Q24 22 16 44 Q32 36 45 40 Z" />
      <path className="f" d="M55 30 Q76 22 84 44 Q68 36 55 40 Z" />
      <Figure x={50} y={22} foot={94} spread={13} />
      <path className="s" d="M47 40 L53 40 L50 45 Z" />
      <path className="s" d="M30 48 h9 l-1.5 7 h-6 Z" />
      <path className="s" d="M60 62 h9 l-1.5 7 h-6 Z" />
      <path className="d" d="M37 52 Q52 50 62 64" />
      <ellipse className="f" cx="28" cy="104" rx="18" ry="4" />
      <path d="M64 104 Q74 92 86 74" />
      <circle className="s" cx="88" cy="66" r="4" />
      <Rays x={88} y={66} r1={6} r2={9} n={10} />
    </>
  ),
  // XV — The Devil: bat wings, inverted star, the loosely chained pair
  "XV": (
    <>
      <Star x={50} y={12} R={7} r={2.8} n={5} rot={90} className="c" />
      <path className="f" d="M44 36 Q24 20 8 34 Q18 38 16 46 Q26 42 28 50 Q36 44 44 46 Z" />
      <path className="f" d="M56 36 Q76 20 92 34 Q82 38 84 46 Q74 42 72 50 Q64 44 56 46 Z" />
      <path className="f strong" d="M44 36 L42 64 L58 64 L56 36 Z" />
      <circle className="c" cx="50" cy="30" r="6" />
      <path d="M45 26 Q41 18 45 13" /><path d="M55 26 Q59 18 55 13" />
      <line x1="56" y1="40" x2="64" y2="30" />
      <rect className="s" x="38" y="64" width="24" height="9" />
      <path className="d" d="M40 73 L28 82" /><path className="d" d="M60 73 L72 82" />
      <Figure x={26} y={84} foot={104} spread={7} head={4} />
      <Figure x={74} y={84} foot={104} spread={7} head={4} />
      <path d="M20 100 q-6 -2 -6 -8" /><path d="M80 100 q6 -2 6 -8" />
    </>
  ),
  // XVI — The Tower: lightning strikes, the crown flies off
  "XVI": (
    <>
      <path className="f" d="M22 104 Q28 90 38 88 L62 88 Q72 92 78 104 Z" />
      <rect className="f strong" x="40" y="36" width="20" height="52" />
      <rect className="c" x="47" y="48" width="6" height="8" rx="3" />
      <rect className="c" x="44" y="64" width="4" height="6" /><rect className="c" x="52" y="64" width="4" height="6" />
      <path d="M40 36 v-4 h4 v4 M48 36 v-4 h4 v4 M56 36 v-4 h4 v4" />
      <path className="s" transform="rotate(28 64 22)" d="M58 26 L59 19 L62 23 L64 17 L66 23 L69 19 L70 26 Z" />
      <path className="s" d="M92 4 L72 24 L80 26 L60 42 L74 28 L66 26 Z" />
      <circle className="c" cx="24" cy="62" r="3.5" /><path d="M24 58 l-6 -8 M24 58 l6 -8 M24 66 l-3 8 M24 66 l3 8" />
      <circle className="c" cx="78" cy="72" r="3.5" /><path d="M78 68 l-6 -8 M78 68 l6 -8 M78 76 l-3 8 M78 76 l3 8" />
      {[[30, 30], [70, 50], [34, 80], [86, 44], [16, 44]].map(([x, y]) => <Star key={`${x}${y}`} x={x} y={y} R={2} n={4} />)}
    </>
  ),
  // XVII — The Star: one great star, seven small, water poured onto land and into the pool
  "XVII": (
    <>
      <Star x={50} y={22} R={13} r={5} n={8} />
      {[[16, 12], [84, 12], [14, 34], [86, 34], [28, 44], [72, 44], [50, 4]].map(([x, y]) => (
        <Star key={`${x}${y}`} x={x} y={y} R={3.2} r={1.3} n={8} />
      ))}
      <line x1="84" y1="98" x2="84" y2="70" /><circle className="f" cx="84" cy="64" r="7" />
      <path d="M4 96 Q20 88 40 94" />
      <ellipse className="f" cx="62" cy="102" rx="30" ry="6" />
      <path className="f" d="M38 66 Q34 80 30 92 L46 94 L50 82 L46 66 Z" />
      <circle className="c" cx="42" cy="60" r="4.8" />
      <path className="s" d="M22 72 h7 l-1 6 h-5 Z" />
      <path className="d" d="M24 78 Q20 86 18 92" />
      <path className="s" d="M54 74 h7 l-1 6 h-5 Z" />
      <path className="d" d="M58 80 Q62 90 62 98" />
    </>
  ),
  // XVIII — The Moon: the face in the moon, two towers, dog and wolf, the crayfish in the pool
  "XVIII": (
    <>
      <circle className="f" cx="50" cy="24" r="13" />
      <path className="s" d="M50 11 A13 13 0 1 0 50 37 A9 13 0 1 1 50 11 Z" />
      <Rays x={50} y={24} r1={15} r2={19} n={16} offset={11} />
      {[[36, 46], [50, 50], [64, 46]].map(([x, y]) => <path key={x} className="s" d={`M${x} ${y} q2 3 0 5 q-2 -2 0 -5`} />)}
      <rect className="f" x="8" y="52" width="11" height="36" /><path className="s" d="M7 52 L13.5 44 L20 52 Z" />
      <rect className="f" x="81" y="52" width="11" height="36" /><path className="s" d="M80 52 L86.5 44 L93 52 Z" />
      <path className="d" d="M50 98 Q38 88 52 80 Q64 72 50 60" />
      <circle className="c" cx="30" cy="84" r="4" /><path d="M30 80 l-2 -4 M32 80 l2 -4 M26 84 l-4 -2" />
      <circle className="s" cx="70" cy="84" r="4" /><path d="M68 80 l-2 -4 M70 80 l2 -4 M74 84 l4 -2" />
      <ellipse className="f" cx="50" cy="106" rx="34" ry="6" />
      <ellipse className="s" cx="50" cy="104" rx="4" ry="2" />
      <path d="M46 103 l-3 -3 M54 103 l3 -3" />
    </>
  ),
  // XIX — The Sun: a smiling sun, sunflowers over the wall, the child on a white horse
  "XIX": (
    <>
      <circle className="f strong" cx="50" cy="32" r="15" />
      <Rays x={50} y={32} r1={18} r2={28} n={16} />
      <circle className="s" cx="45" cy="29" r="1.3" /><circle className="s" cx="55" cy="29" r="1.3" />
      <path d="M44 36 Q50 41 56 36" />
      <rect x="4" y="76" width="92" height="10" />
      <path d="M4 81 h92 M20 76 v5 M40 76 v5 M60 76 v5 M80 76 v5 M30 81 v5 M50 81 v5 M70 81 v5" />
      {[14, 30, 70, 86].map((x) => (
        <g key={x}>
          <line x1={x} y1="76" x2={x} y2="66" />
          <circle className="f" cx={x} cy="63" r="5" /><circle className="s" cx={x} cy="63" r="2.4" />
        </g>
      ))}
      <ellipse className="c" cx="50" cy="96" rx="14" ry="5.5" />
      <path className="c" d="M62 94 L70 86 L72 90 L66 98 Z" />
      <path d="M40 100 v6 M46 100 v6 M56 100 v6 M60 100 v6" />
      <circle className="s" cx="50" cy="83" r="3.5" />
      <path d="M50 86 l-7 -5 M50 86 l7 -5" />
      <path className="d" d="M57 81 Q68 72 80 76" />
    </>
  ),
  // XX — Judgement: the angel's trumpet calls, figures rise
  "XX": (
    <>
      <path className="f" d="M46 18 Q30 6 20 18 Q34 18 46 24 Z" />
      <path className="f" d="M54 18 Q70 6 80 18 Q66 18 54 24 Z" />
      <circle className="c" cx="50" cy="14" r="4.5" />
      <line className="thick" x1="54" y1="20" x2="68" y2="32" />
      <path className="s" d="M66 30 L74 30 L70 36 Z" />
      <rect className="f" x="68" y="34" width="10" height="9" />
      <line x1="73" y1="35" x2="73" y2="42" /><line x1="69.5" y1="38.5" x2="76.5" y2="38.5" />
      <path className="d" d="M8 48 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0" />
      <path d="M4 74 L20 58 L34 70 M66 70 L80 58 L96 74" />
      {[28, 50, 72].map((x, i) => (
        <g key={x}>
          <rect className="f" x={x - 9} y={i === 1 ? 96 : 92} width="18" height="8" />
          <circle className="c" cx={x} cy={i === 1 ? 80 : 76} r="3.6" />
          <path d={`M${x} ${i === 1 ? 84 : 80} v10 M${x} ${i === 1 ? 86 : 82} l-6 -9 M${x} ${i === 1 ? 86 : 82} l6 -9`} />
        </g>
      ))}
    </>
  ),
  // XXI — The World: the dancer inside the laurel wreath, the four living creatures at the corners
  "XXI": (
    <>
      <ellipse className="wreath" cx="50" cy="60" rx="24" ry="36" />
      <path className="s" d="M46 22 L54 26 L46 26 L54 22 Z" />
      <path className="s" d="M46 94 L54 98 L46 98 L54 94 Z" />
      <path className="d" d="M42 52 Q56 56 52 70 Q48 80 58 84" />
      <path className="f" d="M46 49 L44 70 L56 70 L54 49 Z" />
      <circle className="c" cx="50" cy="44" r="4" />
      <path d="M46 70 L52 84 M54 70 L48 80 L52 82" />
      <line x1="45" y1="54" x2="38" y2="62" /><line x1="38" y1="58" x2="38" y2="68" />
      <line x1="55" y1="54" x2="62" y2="48" /><line x1="62" y1="43" x2="62" y2="53" />
      {[[12, 12], [88, 12], [12, 108], [88, 108]].map(([x, y]) => (
        <g key={`${x}${y}`}><circle className="f" cx={x} cy={y} r="7" /><Star x={x} y={y} R={3} n={4} /></g>
      ))}
    </>
  ),
};

export default function TarotArt({ numeral }) {
  return (
    <svg className="tart" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Ground />
      {scenes[numeral]}
    </svg>
  );
}
