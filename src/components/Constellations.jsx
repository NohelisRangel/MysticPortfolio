import { constellations } from "../data/content.js";
import SectionHeader from "./SectionHeader.jsx";

function Constellation({ group }) {
  return (
    <div className="constellation">
      <div className="constellation__head">
        <h3>{group.name}</h3>
        <span className="micro">{group.caption}</span>
      </div>
      <div className="constellation__sky">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {group.lines.map(([a, b], i) => (
            <line
              key={i}
              x1={group.stars[a].x} y1={group.stars[a].y}
              x2={group.stars[b].x} y2={group.stars[b].y}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <ul>
          {group.stars.map((s) => (
            <li key={s.label} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <span className="star" />
              <span className="star__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Constellations() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="The skills that connect"
          title="Constellations"
          note="Different disciplines. One connected practice. The technologies and tools in my orbit."
        />
        <div className="constellations">
          {constellations.map((g) => <Constellation key={g.name} group={g} />)}
        </div>
      </div>
    </section>
  );
}
