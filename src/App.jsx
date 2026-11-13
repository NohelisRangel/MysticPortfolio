import Starfield from "./components/Starfield.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Constellations from "./components/Constellations.jsx";
import Houses from "./components/Houses.jsx";
import Experience from "./components/Experience.jsx";
import Tarot from "./components/Tarot.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Starfield />
      <Nav />
      <main>
        <Hero />
        <About />
        <Constellations />
        <Houses />
        <Experience />
        <Tarot />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
