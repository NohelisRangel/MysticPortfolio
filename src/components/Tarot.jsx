import { useEffect, useRef, useState } from "react";
import { MAJOR_ARCANA } from "../data/tarot.js";
import TarotArt from "./TarotArt.jsx";
import "../tarot.css";

/* ✦ Tweak the wheel here ✦ (colours and sizes live in src/tarot.css) */
const CARD_STEP = 5;          // degrees between neighbouring cards
const EDGE_ZONE = 0.22;       // outer share of the width (each side) that spins the wheel on hover
const EDGE_SPEED = 40;        // max spin speed at the very edge, in degrees per second
const REVERSED_CHANCE = 0.35; // odds a card is drawn reversed
const LIFT_MS = 340;          // keep in sync with --lift-ms in tarot.css
const FLIP_MS = 520;          // keep in sync with --flip-ms in tarot.css
const FLIP_DELAY = 180;       // flip starts while the card is still rising
const PIVOT = 3.8;            // keep in sync with --pivot in tarot.css (380% = 3.8)

const COUNT = MAJOR_ARCANA.length; // all 22 cards
const LOOP = COUNT * CARD_STEP;    // one full turn of the wheel, in degrees

// Fisher–Yates shuffle
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle the whole deck and give each card an orientation
const dealHand = () =>
  shuffle(MAJOR_ARCANA).map((card) => ({ card, reversed: Math.random() < REVERSED_CHANCE }));

// Where card i sits on the wheel for a given spin. Wraps around, so the deck
// loops forever; the wrap happens far off-screen where nobody can see it.
const angleFor = (i, spin) => {
  const a = (i * CARD_STEP + spin + LOOP / 2) % LOOP;
  return (a < 0 ? a + LOOP : a) - LOOP / 2;
};

// One tiny tile of film grain, generated once and shared by every card
let grainURL = null;
function getGrain() {
  if (grainURL) return grainURL;
  const c = document.createElement("canvas");
  c.width = c.height = 96;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(96, 96);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 16; // very faint
  }
  ctx.putImageData(img, 0, 0);
  grainURL = `url(${c.toDataURL()})`;
  return grainURL;
}

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Card back art (identical on every card) ---------- */
function ConstellationLines() {
  // Dashed "constellation" paths in a 100 × 175 box, with a dot at each end
  const paths = [
    { d: "M18 14 C 12 32, 40 36, 60 22 S 90 8, 86 16", ends: [[18, 14], [86, 16]] },
    { d: "M8 62 C 30 40, 72 50, 62 76 S 30 102, 54 114", ends: [[8, 62], [54, 114]] },
    { d: "M94 44 C 70 72, 98 100, 72 130", ends: [[94, 44], [72, 130]] },
    { d: "M28 96 C 16 122, 44 140, 22 166", ends: [[28, 96], [22, 166]] },
    { d: "M40 160 C 58 140, 76 168, 92 152", ends: [[40, 160], [92, 152]] },
  ];
  return (
    <svg className="tcard__lines" viewBox="0 0 100 175" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {paths.map((p, i) => (
        <g key={i}>
          <path d={p.d} vectorEffect="non-scaling-stroke" />
          {p.ends.map(([x, y], j) => <circle key={j} cx={x} cy={y} r="0.9" />)}
        </g>
      ))}
    </svg>
  );
}

const SPARKLE_PATH =
  "M12 0 C12.8 7.5 16.5 11.2 24 12 C16.5 12.8 12.8 16.5 12 24 C11.2 16.5 7.5 12.8 0 12 C7.5 11.2 11.2 7.5 12 0 Z";

function Sparkle({ className = "tcard__sparkle" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={SPARKLE_PATH} />
    </svg>
  );
}

/* ---------- Card face: classic tarot layout, always shown right side up ---------- */
function CardFront({ card, reversed }) {
  return (
    <span className="tfront">
      {["tl", "tr", "bl", "br"].map((c) => <Sparkle key={c} className={`tfront__corner tfront__corner--${c}`} />)}
      <span className="tfront__num">{card.numeral}</span>
      <span className="tfront__window">
        <TarotArt numeral={card.numeral} />
      </span>
      <span className="tfront__banner">
        <span className="tfront__name">{card.name}</span>
      </span>
      {reversed && <span className="tfront__rev">↺ Reversed</span>}
    </span>
  );
}

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={dir === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} />
  </svg>
);

/* ---------- The picker ---------- */
export default function Tarot() {
  const [hand, setHand] = useState(dealHand);     // reshuffled on every page load
  const [selected, setSelected] = useState(null); // index of the lifted card
  const [face, setFace] = useState(null);         // index whose face is rendered
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);        // blocks clicks mid-animation

  const sectionRef = useRef(null);
  const skyRef = useRef(null);
  const againRef = useRef(null);
  const slotRefs = useRef([]);
  const cardRefs = useRef([]);
  const timers = useRef([]);

  // Wheel motion lives in refs (not React state) so spinning never re-renders
  const motion = useRef({
    spin: -((COUNT - 1) * CARD_STEP) / 2, // start with the deck centred
    edgeV: 0,      // deg/ms from hovering near an edge
    inertia: 0,    // deg/ms left over after a swipe
    target: null,  // spin value to glide to (keyboard / arrow buttons)
    drag: null,    // active pointer drag
    raf: 0,
    last: 0,
    locked: false, // true while a card is drawn
    suppressClick: false,
  });

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  // Write every card's position straight to the DOM (cheap: transform only)
  const place = () => {
    const m = motion.current;
    for (let i = 0; i < COUNT; i++) {
      const el = slotRefs.current[i];
      if (!el) continue;
      const a = angleFor(i, m.spin);
      el.style.transform = `rotate(${a.toFixed(3)}deg)`;
      // left-to-right stacking (1–111), always under the horizon (150); the drawn card goes on top (200)
      el.style.zIndex = el.dataset.top ? 200 : Math.round(a + LOOP / 2) + 1;
    }
  };

  const tick = (now) => {
    const m = motion.current;
    const dt = m.last ? Math.min(now - m.last, 50) : 16;
    m.last = now;
    let moving = false;
    if (!m.locked && !m.drag) {
      if (m.edgeV) {
        m.spin += m.edgeV * dt;
        m.target = null;
        moving = true;
      } else if (m.inertia) {
        m.spin += m.inertia * dt;
        m.inertia *= Math.exp(-dt / 320);
        if (Math.abs(m.inertia) < 0.002) m.inertia = 0;
        moving = true;
      } else if (m.target !== null) {
        const d = m.target - m.spin;
        m.spin += d * Math.min(1, dt / 110);
        if (Math.abs(d) < 0.02) { m.spin = m.target; m.target = null; }
        moving = true;
      }
    }
    place();
    if (moving) m.raf = requestAnimationFrame(tick);
    else { m.raf = 0; m.last = 0; }
  };

  const wake = () => {
    const m = motion.current;
    if (!m.raf) m.raf = requestAnimationFrame(tick);
  };

  useEffect(() => {
    sectionRef.current?.style.setProperty("--t-grain", getGrain()); // shared grain texture
    place();
    const m = motion.current;
    return () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(m.raf);
    };
  }, []);

  // Re-place after React renders (e.g. after a reshuffle)
  useEffect(() => { place(); });

  /* ----- Spin controls ----- */
  const degPerPx = () => {
    const h = slotRefs.current[0]?.offsetHeight || 300;
    return 180 / Math.PI / (h * PIVOT);
  };

  // Glide so card i sits in the centre
  const centreOn = (i) => {
    const m = motion.current;
    m.target = m.spin - angleFor(i, m.spin);
    m.inertia = m.edgeV = 0;
    if (reducedMotion()) { m.spin = m.target; m.target = null; }
    wake();
  };

  const nudge = (dir) => {
    const m = motion.current;
    if (m.locked) return;
    const base = m.target ?? Math.round(m.spin / CARD_STEP) * CARD_STEP;
    m.target = base + dir * CARD_STEP * 2;
    m.inertia = m.edgeV = 0;
    if (reducedMotion()) { m.spin = m.target; m.target = null; }
    wake();
  };

  const onPointerMove = (e) => {
    const m = motion.current;
    if (m.locked) return;
    const d = m.drag;
    if (d && e.pointerId === d.id) {
      const dx = e.clientX - d.lastX;
      if (!d.active && Math.abs(e.clientX - d.startX) > 6) {
        d.active = true;
        skyRef.current?.setPointerCapture?.(e.pointerId);
      }
      if (d.active) {
        const dt = Math.max(e.timeStamp - d.lastT, 1);
        m.spin += dx * d.k;
        d.v = (dx * d.k) / dt;
        place();
      }
      d.lastX = e.clientX;
      d.lastT = e.timeStamp;
      return;
    }
    // Mouse hover near an edge spins the wheel (faster the closer you get)
    if (e.pointerType !== "mouse" || reducedMotion()) return;
    const r = skyRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    let v = 0;
    if (x < EDGE_ZONE) v = (EDGE_ZONE - x) / EDGE_ZONE;
    else if (x > 1 - EDGE_ZONE) v = -(x - (1 - EDGE_ZONE)) / EDGE_ZONE;
    m.edgeV = (Math.sign(v) * v * v * EDGE_SPEED) / 1000; // ease in: gentle near the zone, fast at the edge
    if (m.edgeV) wake();
  };

  const onPointerDown = (e) => {
    const m = motion.current;
    if (m.locked || (e.pointerType === "mouse" && e.button !== 0)) return;
    m.drag = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, lastT: e.timeStamp, v: 0, k: degPerPx(), active: false };
    m.inertia = 0;
    m.target = null;
  };

  const endDrag = (e) => {
    const m = motion.current;
    const d = m.drag;
    if (!d || e.pointerId !== d.id) return;
    m.drag = null;
    if (d.active) {
      m.suppressClick = true; // a swipe shouldn't also draw a card
      setTimeout(() => (m.suppressClick = false), 0);
      if (!reducedMotion()) m.inertia = Math.max(-0.4, Math.min(0.4, d.v));
      wake();
    }
  };

  const onPointerLeave = () => {
    motion.current.edgeV = 0;
  };

  /* ----- Drawing ----- */
  const pick = (i) => {
    const m = motion.current;
    if (busy || selected !== null || m.suppressClick) return;
    const rm = reducedMotion();
    // Freeze the wheel and remember this card's angle so it can swing to the centre
    m.locked = true;
    m.edgeV = m.inertia = 0;
    m.target = null;
    const slot = slotRefs.current[i];
    slot.style.setProperty("--angle", `${angleFor(i, m.spin)}deg`);
    slot.dataset.top = "1";
    place();
    setBusy(true);
    setSelected(i);
    setFace(i);
    later(() => setRevealed(true), rm ? 120 : FLIP_DELAY);
    later(() => {
      setBusy(false);
      againRef.current?.focus({ preventScroll: true });
    }, rm ? 400 : FLIP_DELAY + FLIP_MS);
  };

  const drawAgain = () => {
    if (busy) return;
    const rm = reducedMotion();
    const was = selected;
    setBusy(true);
    setRevealed(false);                                  // flip face-down…
    later(() => setSelected(null), rm ? 300 : 200);      // …and drop back while it turns
    later(() => {
      const m = motion.current;
      const slot = slotRefs.current[was];
      if (slot) delete slot.dataset.top;
      setHand(dealHand());                               // fresh shuffle (backs look identical)
      setFace(null);
      setBusy(false);
      m.locked = false;
      cardRefs.current[was]?.focus({ preventScroll: true });
    }, rm ? 450 : Math.max(FLIP_MS, 200 + LIFT_MS) + 40);
  };

  // Keyboard: arrow keys move between cards; focusing a card spins it to the centre
  const onKeyDown = (e) => {
    if (selected !== null) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const i = cardRefs.current.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + COUNT) % COUNT;
    cardRefs.current[next]?.focus({ preventScroll: true });
  };
  const onCardFocus = (i, e) => {
    if (selected === null && e.target.matches(":focus-visible")) centreOn(i);
  };

  const drawn = face !== null ? hand[face] : null;
  const spin0 = motion.current.spin;

  return (
    <section
      ref={sectionRef}
      id="tarot"
      className={`tarot ${selected !== null ? "has-selection" : ""}`}
      aria-labelledby="tarot-title"
    >
      <h2 id="tarot-title" className="tarot__title">Tap a card for tarot</h2>

      <div
        className="tarot__sky"
        ref={skyRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={onPointerLeave}
        onKeyDown={onKeyDown}
      >
        <div className="tarot__stage" role="group" aria-label={`Wheel of ${COUNT} face-down tarot cards. Use the arrow keys to move between cards.`}>
          {hand.map((h, i) => {
            const isSel = selected === i;
            const isOpen = isSel && revealed;
            return (
              <div
                key={i}
                className="tslot"
                ref={(el) => (slotRefs.current[i] = el)}
                style={{ transform: `rotate(${angleFor(i, spin0)}deg)` }}
              >
                <button
                  ref={(el) => (cardRefs.current[i] = el)}
                  type="button"
                  className={`tcard ${isSel ? "is-selected" : ""} ${isOpen ? "is-revealed" : ""}`}
                  onClick={() => pick(i)}
                  onFocus={(e) => onCardFocus(i, e)}
                  disabled={selected !== null && !isSel}
                  aria-label={
                    isOpen
                      ? `${h.card.name}, ${h.reversed ? "reversed" : "upright"}`
                      : `Face-down tarot card ${i + 1} of ${COUNT}. Draw this card.`
                  }
                >
                  <span className="tcard__inner">
                    <span className="tcard__face tcard__back">
                      <span className="tcard__aurora" />
                      <ConstellationLines />
                      <span className="tcard__aura" />
                      <Sparkle />
                      <span className="tcard__grain" />
                    </span>
                    <span className="tcard__face tcard__front">
                      {face === i && <CardFront card={h.card} reversed={h.reversed} />}
                      <span className="tcard__grain" />
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <div className="tarot__horizon" aria-hidden="true" />
        <button type="button" className="tarot__spin tarot__spin--left" onClick={() => nudge(1)}
          aria-label="Bring in cards from the left" disabled={selected !== null}>
          <Chevron dir="left" />
        </button>
        <button type="button" className="tarot__spin tarot__spin--right" onClick={() => nudge(-1)}
          aria-label="Bring in cards from the right" disabled={selected !== null}>
          <Chevron dir="right" />
        </button>
      </div>

      {/* The reading */}
      <div className="tarot__reading" aria-live="polite">
        {drawn && revealed ? (
          <>
            <p className="tarot__meta">
              {drawn.card.numeral} · <span className="glyph">{drawn.card.glyph}{"︎"}</span> ·{" "}
              {drawn.reversed ? "Reversed" : "Upright"}
            </p>
            <h3 className="tarot__name">{drawn.card.name}</h3>
            <p className="tarot__fun">“{drawn.card.fun}”</p>
            <p className="tarot__meaning">
              {drawn.reversed && <strong>Reversed: </strong>}
              {drawn.reversed ? drawn.card.reversed : drawn.card.upright}
            </p>
            <button ref={againRef} type="button" className="btn btn--ghost tarot__again" onClick={drawAgain}>
              Draw again
            </button>
          </>
        ) : (
          <p className="tarot__hint">
            {selected === null
              ? "All 22 Major Arcana, shuffled just for you. Hover near the edges or swipe to spin the deck."
              : "The stars are deciding…"}
          </p>
        )}
      </div>
    </section>
  );
}
