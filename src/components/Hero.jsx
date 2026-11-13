import { profile } from "../data/content.js";
import ZodiacWheel from "./ZodiacWheel.jsx";
import { Arrow, ArrowDown } from "./Icons.jsx";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__text reveal">
          <p className="eyebrow"><span className="rule" /> The birth chart</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">{profile.role}</p>
          <p className="hero__tagline">{profile.tagline}</p>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--gold">View Projects <Arrow /></a>
            <a href="#contact" className="btn btn--ghost">Contact Me <Arrow /></a>
          </div>
        </div>
        <ZodiacWheel />
      </div>

      <div className="container hero__foot">
        <a href="#about" className="micro"><ArrowDown /> Explore my universe</a>
        <span className="micro">A personal orbit of design & development</span>
      </div>
    </section>
  );
}
