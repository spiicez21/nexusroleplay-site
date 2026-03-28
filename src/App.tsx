import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useGSAP(() => {
    // Custom cursor mapping
    const cursor = cursorRef.current;
    if (cursor) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

      const onMove = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
      window.addEventListener("mousemove", onMove);
      
      const hoverTargets = document.querySelectorAll('a, button, .hover-target');
      hoverTargets.forEach((t) => {
        t.addEventListener('mouseenter', () => 
          gsap.to(cursor, { scale: 3.5, backgroundColor: 'rgba(230, 34, 34, 0.4)', backdropFilter: 'blur(4px)', duration: 0.3 })
        );
        t.addEventListener('mouseleave', () => 
          gsap.to(cursor, { scale: 1, backgroundColor: 'var(--red-accent)', backdropFilter: 'none', duration: 0.3 })
        );
      });
    }

    // Reveal animation once loading is done
    if (!isLoading) {
      const tl = gsap.timeline()
      tl.from('.reveal-hero', { 
        y: 40, 
        opacity: 0, 
        duration: 1.5, 
        ease: 'power4.out', 
        stagger: 0.15,
        delay: 0.2 // Slight delay to sync with logo zoom finish
      })
    }

    // Scroll trigger fade-ups
    gsap.utils.toArray('.fade-up').forEach((elem: any) => {
      gsap.from(elem, {
        scrollTrigger: { trigger: elem, start: 'top 85%' },
        y: 40, 
        opacity: 0, 
        duration: 1.2, 
        ease: 'power3.out'
      })
    })

    // Infinite marquee
    gsap.to('.marquee-inner', {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1
    })

    return () => {
      window.removeEventListener("mousemove", () => {});
    }
  }, { scope: appRef })

  return (
    <div ref={appRef} className="app-container">
      <div className="cursor" ref={cursorRef} />
      <div className="noise" />

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* NAVIGATION */}
      <nav className="nav reveal-hero">
        <a href="#top" className="logo glusp hover-target">
          <img src="/Logo/logo.svg" alt="NEXUS RP" />
          <span>NEXUS</span>
        </a>
        <div className="nav-links glusp">
          <a href="#about" className="hover-target">Project</a>
          <a href="#systems" className="hover-target">Architecture</a>
          <a href="#society" className="hover-target">Society</a>
          <a href="#join" className="hover-target" style={{ color: 'var(--red-accent)' }}>Initiate</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero" id="top">
          <div className="hero-content">
            <h1 className="glusp hero-title reveal-hero">REDLINE<br/><span className="outline">CITY</span></h1>
            <p className="hero-subtitle reveal-hero">
              A meticulously engineered MTA:SA environment emphasizing hyper-realistic economy, serious immersion, and brutal consequence. Welcome to the new standard.
            </p>
            <div className="hero-actions reveal-hero">
              <a href="#join" className="btn hover-target glusp">ENTER THE CITY</a>
              <a href="#about" className="btn btn-ghost hover-target glusp">READ MANIFESTO</a>
            </div>
          </div>
        </section>

        {/* STATUS MARQUEE */}
        <div className="marquee">
          <div className="marquee-inner glusp">
            <span>PING: 14MS (EU)</span><span className="dot"></span>
            <span>SLOTS: 150</span><span className="dot"></span>
            <span>ECONOMY: PLAYER DRIVEN</span><span className="dot"></span>
            <span>WHITELIST: OPEN</span><span className="dot"></span>
            <span>PING: 14MS (EU)</span><span className="dot"></span>
            <span>SLOTS: 150</span><span className="dot"></span>
            <span>ECONOMY: PLAYER DRIVEN</span><span className="dot"></span>
            <span>WHITELIST: OPEN</span><span className="dot"></span>
            <span>PING: 14MS (EU)</span><span className="dot"></span>
            <span>SLOTS: 150</span><span className="dot"></span>
            <span>ECONOMY: PLAYER DRIVEN</span><span className="dot"></span>
            <span>WHITELIST: OPEN</span><span className="dot"></span>
          </div>
        </div>

        {/* MANIFESTO */}
        <section className="manifesto fade-up" id="about">
          <div className="section-header">
            <span className="glusp">01 // Setting</span>
            <span className="glusp">[ The Manifesto ]</span>
          </div>
          <h2 className="glusp giant-text">
            FORGE YOUR NAME IN AN UNFORGIVING METROPOLIS. <br/>
            EVERY DECISION ECHOES. NO SCRIPTS WILL SAVE YOU.
          </h2>
        </section>

        {/* MODULAR BENTO GRID (ARCHITECTURE) */}
        <section className="bento-section fade-up" id="systems">
          <div className="section-header">
            <span className="glusp">02 // Core Systems</span>
            <span className="glusp">[ Architecture ]</span>
          </div>
          <div className="bento-grid">
            <div className="bento-card span-2 hover-target">
              <div className="b-tag glusp">001 - Economy</div>
              <h3 className="glusp">Dynamic Supply Chain</h3>
              <p>The streets adapt to you. Establish legal corporate empires, rig the underground black market, or play the margins. Money talks, but power acts permanently.</p>
            </div>
            <div className="bento-card hover-target">
              <div className="b-tag glusp">002 - Tech</div>
              <h3 className="glusp">Optimized Core V2</h3>
              <p>Custom-built Lua framework tailored for high fidelity. Zero desync, buttery 60+ FPS environments even in heavy scenarios.</p>
            </div>
            <div className="bento-card hover-target img-card outline-style">
               <h3 className="glusp center-text">BESPOKE MAPPING</h3>
            </div>
            <div className="bento-card hover-target">
              <div className="b-tag glusp">003 - Real Estate</div>
              <h3 className="glusp">Asset Control</h3>
              <p>Claim dynamic housing. Fully furnish layouts, install security, or run a safehouse.</p>
            </div>
            <div className="bento-card span-2 hover-target">
              <div className="b-tag glusp">004 - Warfare</div>
              <h3 className="glusp">Territorial Hierarchy</h3>
              <p>Turf control mapped algorithmically. Engage in high-stakes conflict dictating not just influence, but supply lines and local police presence across the map.</p>
            </div>
          </div>
        </section>

        {/* FACTION SOCIETY LIST */}
        <section className="factions fade-up" id="society">
           <div className="section-header">
            <span className="glusp">03 // Society</span>
            <span className="glusp">[ The Factions ]</span>
          </div>
          <div className="faction-list">
            <div className="faction-item hover-target">
              <div className="f-num glusp">01</div>
              <div className="f-name glusp">L.S. Police Dept</div>
              <div className="f-desc">Enforce the law with integrated MDC and pursuit tech. Limitless escalation.</div>
            </div>
            <div className="faction-item hover-target">
              <div className="f-num glusp">02</div>
              <div className="f-name glusp">Medical Services</div>
              <div className="f-desc">Keep the city alive. Advanced triage and dynamic surgical modules.</div>
            </div>
            <div className="faction-item hover-target">
              <div className="f-num glusp">03</div>
              <div className="f-name glusp">The Syndicates</div>
              <div className="f-desc">Organized crime syndicates running weapon and narcotic logistics chains.</div>
            </div>
            <div className="faction-item hover-target">
              <div className="f-num glusp">04</div>
              <div className="f-name glusp">Civilian Sector</div>
              <div className="f-desc">Clubs, bars, underground mechanic shops—the lifeblood of Los Santos.</div>
            </div>
          </div>
        </section>

        {/* JOIN STEPS */}
        <section className="join fade-up" id="join">
          <div className="section-header">
            <span className="glusp">04 // Onboarding</span>
            <span className="glusp">[ Entry Protocol ]</span>
          </div>
          <div className="steps-container">
             <div className="step-card hover-target">
                <div className="step-header">
                  <span className="glusp step-num">01.</span>
                  <span className="glusp tech-tag">[ Discord ]</span>
                </div>
                <h4 className="glusp">Link Identity</h4>
                <p>Join our secure Discord infrastructure to read the overarching server manifesto and sync your profile.</p>
             </div>
             <div className="step-card hover-target">
                <div className="step-header">
                  <span className="glusp step-num">02.</span>
                  <span className="glusp tech-tag">[ Eval ]</span>
                </div>
                <h4 className="glusp">Validation</h4>
                <p>Submit a concise background check. Ensure your lore aligns with our strict redline standards.</p>
             </div>
             <div className="step-card hover-target">
                <div className="step-header">
                  <span className="glusp step-num">03.</span>
                  <span className="glusp tech-tag">[ Connect ]</span>
                </div>
                <h4 className="glusp">Arrival</h4>
                <p>Slot securely into the city. Wake up at Unity Station and begin navigating your consequence.</p>
             </div>
          </div>
          <div className="join-action mt-4">
             <a href="#" className="btn-large glusp hover-target">INITIALIZE CONNECTION</a>
          </div>
        </section>
      </main>

      <footer className="footer fade-up">
        <div className="footer-top">
           <h2 className="glusp giant-logo outline">NEXUS</h2>
        </div>
        <div className="footer-bottom glusp">
           <span>© {new Date().getFullYear()} NEXUS RP </span>
           <span>REDLINE CORE /// V2.4</span>
           <span className="red-text">DEATH HAS CONSEQUENCES</span>
        </div>
      </footer>
    </div>
  )
}
