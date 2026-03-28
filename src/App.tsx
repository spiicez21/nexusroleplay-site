import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import LoadingScreen from './components/LoadingScreen'
import GTASection from './components/GTASection'
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const appRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      })
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])

  useGSAP(() => {
    if (isLoading) return

    const reveals = gsap.utils.toArray('.reveal-hero, .fade-up')
    reveals.forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      )
    })
  }, { scope: appRef, dependencies: [isLoading] })

  return (
    <div ref={appRef} className="app-container">
      <div className="cursor" ref={cursorRef} />
      <div className="noise" />

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* NAVIGATION */}
      <nav className="nav reveal-hero">
        <a href="#top" className="logo">
          <img src="/Logo/logo.svg" alt="NEXUS RP" />
          <span className="glusp">NEXUS CITY</span>
        </a>
        <div className="nav-links">
          <a href="#about">Project</a>
          <a href="#systems">Systems</a>
          <a href="#society">Society</a>
          <a href="#join" style={{ color: 'var(--red-accent)' }}>Initiate</a>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <GTASection 
          id="top" 
          bgImage="/Assets/VK/BG-vk.png" 
          actorImage="/Assets/VK/vk.png"
        >
          <div className="gta-overlay">
            <div className="gta-column-left reveal-hero">
              <header className="hero-content">
                <h1 className="hero-title glusp">
                  NEXUS<br/><span className="outline">CITY</span>
                </h1>
                <p className="hero-subtitle">
                  A hyper-realistic roleplay ecosystem engineered for serious immersion. 
                  Experience a city that reacts to every decision you make.
                </p>
                <div className="hero-actions">
                  <a href="#join" className="btn">ENTER CITY</a>
                  <a href="#about" className="btn btn-ghost">VISION</a>
                </div>
              </header>
            </div>
          </div>
        </GTASection>

        {/* MANIFESTO SECTION */}
        <GTASection 
          id="about" 
          bgImage="/Assets/KM/BG-km.png" 
          actorImage="/Assets/KM/km.png"
        >
          <div className="gta-overlay">
            <div className="gta-column-left">
              <div className="manifesto-bg-text glusp">VISION</div>
              <section className="manifesto">
                <div className="manifesto-header fade-up">
                  <span className="section-tag">01 // MANIFESTO</span>
                  <div className="data-stamp">SYSTEM: ACTIVE</div>
                </div>
                
                <h2 className="manifesto-title glusp fade-up">
                  FORGE YOUR<br/>
                  <span className="red">LEGACY</span> HERE.<br/> 
                </h2>

                <div className="manifesto-text-block fade-up">
                  <p>
                    Nexus City is a high-performance environment built for 
                    pure storytelling and brutal consequence. 
                    No scripts. No noise. Only pure RP.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </GTASection>

        {/* SYSTEMS SECTION */}
        <GTASection 
          id="systems" 
          bgImage="/Assets/AJ/BG-aj.png" 
          actorImage="/Assets/AJ/aj.png"
        >
          <div className="gta-overlay">
            <div className="gta-column-left">
              <section className="bento-section">
                <span className="section-tag glusp fade-up" style={{ marginBottom: '3rem' }}>02 // ARCHITECTURE</span>
                <div className="bento-grid">
                  <div className="bento-card fade-up">
                    <span className="b-tag">ENGINE</span>
                    <h3>High-Tickrate Core</h3>
                    <p>Custom Lua back-end optimized for zero desync and buttery smooth physics.</p>
                  </div>
                  <div className="bento-card fade-up">
                    <span className="b-tag">ECONOMY</span>
                    <h3>Player Markets</h3>
                    <p>Every commodity is tracked in a living, breathing financial ecosystem.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </GTASection>

        {/* SOCIETY SECTION */}
        <GTASection 
          id="society" 
          bgImage="/Assets/VJ/BG-vj.png" 
          actorImage="/Assets/VJ/vj.png"
        >
          <div className="gta-overlay">
            <div className="gta-column-left">
              <section className="factions">
                <span className="section-tag glusp fade-up" style={{ marginBottom: '3rem' }}>03 // SOCIETY</span>
                <div className="faction-list">
                  {[
                    { num: '01', name: 'L.S.P.D.', desc: 'Enforce order with military-grade tech and a full judicial back-end.' },
                    { num: '02', name: 'U.M.S.', desc: 'Critical response teams utilizing advanced medical triage systems.' },
                    { num: '03', name: 'Syndicates', desc: 'Organized hierarchies running weapon and narcotic logistics chains.' }
                  ].map((f, i) => (
                    <div key={i} className="faction-item fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                      <span className="f-num glusp">{f.num} /</span>
                      <span className="f-name glusp">{f.name}</span>
                      <p className="f-desc">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </GTASection>

        {/* JOIN SECTION */}
        <GTASection 
          id="join" 
          bgImage="/Assets/RJ/BG-rj.png" 
          actorImage="/Assets/RJ/rj.png"
        >
          <div className="gta-overlay">
            <div className="gta-column-left">
              <section className="join">
                <div className="join-card fade-up">
                  <span className="section-tag glusp" style={{ marginBottom: '1.5rem' }}>04 // ONBOARDING</span>
                  <h3 className="glusp">INITIALIZE?</h3>
                  <p>Complete the validation protocol and join the elite roleplay community.</p>
                  <a href="#" className="btn btn-large">APPLY NOW</a>
                </div>
              </section>
            </div>
          </div>
        </GTASection>
      </main>

      <footer className="footer">
        <div className="footer-bottom fade-up">
          <span>© {new Date().getFullYear()} NEXUS CITY RP </span>
          <span>SYSTEM V2.4 /// <span className="red-text">DEATH HAS CONSEQUENCES</span></span>
        </div>
      </footer>
    </div>
  )
}

export default App
