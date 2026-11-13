// A tiny illustrated "screen" for each project card.
// Swap for a real screenshot by giving the project `preview.image` in content.js.

const Hills = () => (
  <div className="pv-hills">
    <span className="sun" />
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 40 L0 22 Q20 6 40 20 T80 16 T100 20 L100 40Z" fill="#9AA592" />
      <path d="M0 40 L0 30 Q30 18 55 30 T100 28 L100 40Z" fill="#6F7E6B" />
    </svg>
  </div>
);

function Body({ kind }) {
  switch (kind) {
    case "tasks":
      return (
        <div className="pv-split">
          <ul className="pv-list">
            {["Build something thoughtful", "A little time to learn", "Make room for focus"].map((t, i) => (
              <li key={t}><span className={`chk ${i === 0 ? "on" : ""}`} />{t}</li>
            ))}
          </ul>
          <div className="pv-note">Make room<br />for focus.</div>
        </div>
      );
    case "shop":
      return (
        <div className="pv-shop">
          <span className="vase" /><span className="frame" /><span className="bowl" />
        </div>
      );
    case "landscape":
      return <Hills />;
    case "weather":
      return (
        <div className="pv-weather">
          <span className="temp">24°</span><span className="orb" />
        </div>
      );
    case "palette":
      return (
        <div className="pv-palette">
          {["#404756", "#8A8AAB", "#B8B0CC", "#D4C1BC", "#ECE1CF"].map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </div>
      );
    case "events":
      return (
        <ul className="pv-events">
          {[["12", "A creative morning"], ["15", "Meet, make & mingle"], ["18", "An evening of ideas"]].map(([d, t]) => (
            <li key={d}><b>{d}</b>{t}</li>
          ))}
        </ul>
      );
    case "player":
      return (
        <div className="pv-player"><span className="disc" /><span className="bars" /></div>
      );
    case "system":
      return (
        <div className="pv-system">
          <div className="btns"><span className="b1" /><span className="b2" /></div>
          <span className="blob" />
        </div>
      );
    case "gallery":
      return (
        <div className="pv-gallery">
          {[0, 1, 2].map((i) => <div key={i}><Hills /></div>)}
        </div>
      );
    case "timer":
      return <div className="pv-timer"><span>05:00</span></div>;
    default:
      return null;
  }
}

export default function ProjectPreview({ project }) {
  const { preview, name } = project;
  if (preview.image) {
    return <img className="preview__img" src={preview.image} alt={`${name} screenshot`} />;
  }
  return (
    <div className="preview" style={{ background: preview.bg }} aria-hidden="true">
      <div className="preview__window">
        <div className="preview__bar">
          <b>{name.toLowerCase()}</b>
          <span>Discover</span><span>About</span>
        </div>
        <p className="preview__headline">{preview.headline}</p>
        <Body kind={preview.kind} />
      </div>
    </div>
  );
}
