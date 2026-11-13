import { experience, profile } from "../data/content.js";
import { ArrowUpRight } from "./Icons.jsx";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container experience">
        <div className="experience__intro">
          <p className="eyebrow"><span className="eyebrow__num">04</span> <span className="rule" /> The journey so far</p>
          <h2 className="section-title">Experience</h2>
          <p className="body-sm">An evolving orbit of learning, designing, and building with intention.</p>
          <a href={profile.resume} className="link-gold" target="_blank" rel="noreferrer">View résumé <ArrowUpRight /></a>
        </div>

        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.title} className="timeline__item">
              <span className="timeline__planet" aria-hidden="true" />
              <div className="timeline__head">
                <h3>{e.title}</h3>
                <span className="micro gold">{e.dates}</span>
              </div>
              <p className="micro">{e.org}</p>
              <p className="body-sm">{e.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
