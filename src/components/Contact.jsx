import { profile } from "../data/content.js";
import { Arrow, ArrowUpRight } from "./Icons.jsx";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div>
          <p className="eyebrow"><span className="eyebrow__num">05</span> <span className="rule" /> Let’s connect</p>
          <h2 className="contact__title">
            Let’s build something <em className="gold">stellar.</em>
          </h2>
          <p className="body-sm">
            Have a role, a project, or an idea in mind? I’d love to hear about it. Good things begin with a conversation.
          </p>
          <a href={`mailto:${profile.email}`} className="btn btn--gold">Say Hello <Arrow /></a>
        </div>

        <aside className="contact__card">
          <p className="micro gold"><span className="dot" /> Open to the right opportunity</p>
          <p className="micro">Reach me at</p>
          <a href={`mailto:${profile.email}`} className="contact__email">
            {profile.email} <ArrowUpRight size={18} />
          </a>
          <div className="contact__links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
            <a href={profile.resume} target="_blank" rel="noreferrer">Résumé <ArrowUpRight /></a>
          </div>
          <p className="micro muted">Based in Waterloo, Ontario, Canada</p>
        </aside>
      </div>
    </section>
  );
}
