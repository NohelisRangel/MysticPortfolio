import { profile } from "../data/content.js";
import { Spark } from "./Icons.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="micro"><span className="gold"><Spark size={10} /></span> © {new Date().getFullYear()} {profile.name}</span>
        <span className="micro">Designed with intention. Built with curiosity.</span>
        <a href="#top" className="micro">Back to the stars ↑</a>
      </div>
    </footer>
  );
}
