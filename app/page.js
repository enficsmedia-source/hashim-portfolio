import Nav from "../components/Nav";
import Services from "../components/Services";
import Deck from "../components/Deck";
import Contact from "../components/Contact";
import { CV_URL, SKILLS, TOOLS, SERVICES, EXPERIENCE, FAQ } from "../lib/content";

const bg = (k) => ({ "--img": `var(--bg-${k})` });
const Chips = ({ items, cls = "" }) => <div className="chips">{items.map((x) => <span key={x} className={`chip ${cls}`}>{x}</span>)}</div>;

export default function Home() {
  return (
    <>
      <Nav />
      <header className="hero" id="home">
        <div className="bg" />
        <div className="heroTxt">
          <div>
            <h1>Muhammed Hashim Pullat</h1>
            <p>Videographer &amp; Video Editor from Vengara, Kerala.</p>
          </div>
          <div className="row">
            <a className="btn" href="#work">Watch my work</a>
            <a className="btn ghost" href="#services">Start a project</a>
            <a className="btn ghost" href={CV_URL || "#contact"} {...(CV_URL ? { download: true } : {})}>Download CV</a>
          </div>
        </div>
      </header>

      <section id="about" className="sec" style={bg("about")}>
        <div className="wrap about">
          <div className="photo" role="img" aria-label="Hashim editing in his studio" />
          <div>
            <h2>Self-taught. Shoot to final cut.</h2>
            <p>I started with an iPhone and a lot of curiosity, then spent nearly two years editing in CapCut. I saved up for a laptop and taught myself After Effects, Premiere Pro, DaVinci Resolve and Final Cut Pro.</p>
            <p>Today I handle everything from shooting to delivery, and I shape a fresh visual style for each project instead of repeating one look. My goal: a recognisable style of my own and work that stands out.</p>
            <div className="facts">
              <div>4+<small>years creating</small></div>
              <div>5<small>featured projects</small></div>
              <div>2025<small>Higher Secondary, Al Ihsan HSS</small></div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="sec skills" style={bg("skills")}>
        <div className="wrap">
          <h2>Skills &amp; expertise</h2>
          <Chips items={SKILLS} />
          <div className="tools"><h3>Software</h3><Chips items={TOOLS} cls="tool" /></div>
          <div className="skills"><h3>Specialisations</h3><Chips items={SERVICES.map((s) => s[0])} /></div>
        </div>
      </section>

      <Services />
      <Deck />

      <section id="experience" className="sec" style={bg("experience")}>
        <div className="wrap">
          <h2>Experience</h2>
          <div className="tl">
            {EXPERIENCE.map((e) => (
              <article key={e.title}>
                <h3>{e.title}</h3><small>{e.when}</small>
                {e.text && <p className="sub">{e.text}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="sec" style={bg("faq")}>
        <div className="wrap">
          <h2>FAQ</h2>
          {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </section>

      <Contact />

      <footer>
        <div className="wrap"><span>© 2026 Muhammed Hashim Pullat</span><span>Vengara, Malappuram, Kerala, India</span></div>
      </footer>
    </>
  );
}
