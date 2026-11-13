import { projects } from "../data/content.js";
import SectionHeader from "./SectionHeader.jsx";
import ProjectPreview from "./ProjectPreview.jsx";
import { ArrowUpRight, Code } from "./Icons.jsx";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default function Houses() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Selected explorations"
          title="The Houses"
          note="Each project lives in its own house of the zodiac: mobile, full-stack, machine learning and design work, each with its own character."
        />
        <div className="houses__meta">
          <span className="micro gold">Design & development · {projects.length} projects</span>
          <span className="micro">Built in teams, in class and on the job</span>
        </div>

        <div className="houses">
          {projects.map((p, i) => (
            <article className="card house" key={p.name}>
              <div className="house__top">
                <span className="micro">House {NUMERALS[i]}</span>
                <span className="house__glyph" aria-hidden="true">{p.glyph}</span>
              </div>
              <ProjectPreview project={p} />
              <div className="house__body">
                <h3 className="house__name">{p.name}</h3>
                <p className="body-sm">{p.desc}</p>
                <ul className="tags">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                {(p.demo || p.source) && (
                  <div className="house__links">
                    {p.demo && <a href={p.demo} className="gold" target="_blank" rel="noreferrer">Live Demo <ArrowUpRight /></a>}
                    {p.source && <a href={p.source} target="_blank" rel="noreferrer">Source <Code /></a>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
