import { profile, aboutIntro, facets } from "../data/content.js";
import SectionHeader from "./SectionHeader.jsx";
import { Sun, Moon, Rising, Spark } from "./Icons.jsx";

const icons = { sun: Sun, moon: Moon, rising: Rising };

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeader index="01" eyebrow="A little about me" title="Sun, Moon & Rising" note={aboutIntro} />

        <div className="about">
          <figure className="portrait">
            <div className="portrait__orbit">
              <span className="portrait__planet"><Spark size={10} /></span>
              <div className="portrait__img">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} />
                ) : (
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="40" r="17" />
                    <path d="M18 92c4-20 18-30 32-30s28 10 32 30z" />
                  </svg>
                )}
              </div>
            </div>
            {!profile.photo && <figcaption className="micro">Your portrait here</figcaption>}
          </figure>

          <div className="facets">
            {facets.map((f) => {
              const Icon = icons[f.key];
              return (
                <article className="card facet" key={f.key}>
                  <div className="facet__top">
                    <span className="gold"><Icon /></span>
                    <span className="facet__label">{f.label}</span>
                  </div>
                  <p className="micro">{f.eyebrow}</p>
                  <h3 className="facet__title">{f.title}</h3>
                  <p className="body-sm">{f.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
