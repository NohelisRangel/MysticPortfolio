import { useState } from "react";
import { profile } from "../data/content.js";
import { Spark } from "./Icons.jsx";

const links = ["About", "Skills", "Projects", "Experience", "Tarot", "Contact"];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="nav__logo">
          <span className="gold"><Spark size={14} /></span> {profile.initials}
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
        </nav>

        <span className="nav__status">
          <span className="dot" /> Open to opportunities
        </span>

        <button
          className="nav__toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
