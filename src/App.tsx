import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Divider from "./components/Divider";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Hero />
      <main id="main" tabIndex={-1}>
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
