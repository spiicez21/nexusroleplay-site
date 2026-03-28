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

    // Reveal animations for sections
    const reveals = gsap.utils.toArray('.reveal-hero, .fade-up')
    reveals.forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
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
        <a href="#top" className="logo glusp">
          <img src="/Logo/logo.svg" alt="NEXUS RP" />
          <span>NEXUS CITY</span>
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
          <header className="hero">
            <div className="hero-content reveal-hero">
              <h1 className="hero-title glusp">
                NEXUS<br/><span className="outline">CITY</span>
              </h1>
              <p className="hero-subtitle">
                A hyper-realistic roleplay ecosystem engineered for serious immersion. 
                Experience a city that reacts to every decision you make.
              </p>
              <div className="hero-actions">
                <a href="#join" className="btn">APPLY NOW</a>
                <a href="#about" className="btn btn-ghost">THE VISION</a>
              </div>
            </div>
          </header>
        </GTASection>

        {/* MANIFESTO SECTION */}
        <GTASection 
          id="about" 
          bgImage="/Assets/KM/BG-km.png" 
          actorImage="/Assets/KM/km.png"
        >
          <section className="manifesto">
            <span className="section-tag glusp">01 // MANIFESTO</span>
            <h2 className="manifesto-title giant-text fade-up">
              FORGE YOUR NAME IN AN <br/>UNFORGIVING METROPOLIS.<br/> 
              EVERY DECISION ECHOES.
            </h2>
          </section>
        </GTASection>

        {/* SYSTEMS / ARCHITECTURE SECTION */}
        <GTASection 
          id="systems" 
          bgImage="/Assets/AJ/BG-aj.png" 
          actorImage="/Assets/AJ/aj.png"
        >
          <section className="bento-section">
            <span className="section-tag glusp">02 // ARCHITECTURE</span>
            <div className="bento-grid">
              <div className="bento-card span-2 fade-up">
                <span className="b-tag">CORE ENGINE</span>
                <h3>Optimized Framework V2</h3>
                <p>Custom-built Lua back-end designed for high-tickrate performance. Zero desync, buttery smooth 60+ FPS environments even in high-stress scenarios.</p>
              </div>
              <div className="bento-card fade-up" style={{ transitionDelay: '0.1s' }}>
                <span className="b-tag">ECONOMY</span>
                <h3>Dynamic Markets</h3>
                <p>Player-driven supply chains. Every commodity is tracked, ensuring a living, breathing financial ecosystem.</p>
              </div>
              <div className="bento-card fade-up">
                <span className="b-tag">HOUSING</span>
                <h3>Asset Control</h3>
                <p>Claim properties with deep customization. Fully interactable interiors and security systems.</p>
              </div>
              <div className="bento-card span-2 fade-up" style={{ transitionDelay: '0.1s' }}>
                <span className="b-tag">WARFARE</span>
                <h3>Territorial Hierarchy</h3>
                <p>Influence mapped algorithmically. Conflict dictates not just power, but supply lines and local police presence across the map.</p>
              </div>
            </div>
          </section>
        </GTASection>

        {/* SOCIETY / FACTIONS SECTION */}
        <GTASection 
          id="society" 
          bgImage="/Assets/VJ/BG-vj.png" 
          actorImage="/Assets/VJ/vj.png"
        >
          <section className="factions">
            <span className="section-tag glusp">03 // SOCIETY</span>
            <div className="faction-list">
              {[
                { num: '01', name: 'L.S. Police Dept', desc: 'Enforce order with military-grade tech and a full judicial back-end.' },
                { num: '02', name: 'Emergency Services', desc: 'Critical response teams utilizing advanced medical triage systems.' },
                { num: '03', name: 'The Syndicates', desc: 'Organized hierarchies running weapon and narcotic logistics chains.' },
                { num: '04', name: 'Civilian Sector', desc: 'The backbone of the city. Corporate empires and underworld legends.' }
              ].map((f, i) => (
                <div key={i} className="faction-item fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="f-num">{f.num}</span>
                  <span className="f-name">{f.name}</span>
                  <p className="f-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </GTASection>

        {/* ONBOARDING / JOIN SECTION */}
        <GTASection 
          id="join" 
          bgImage="/Assets/RJ/BG-rj.png" 
          actorImage="/Assets/RJ/rj.png"
        >
          <section className="join">
            <div className="join-card fade-up">
              <span className="section-tag glusp" style={{ marginBottom: '1rem', opacity: 1 }}>04 // ONBOARDING</span>
              <h3 className="glusp">READY TO INITIALIZE?</h3>
              <p className="hero-subtitle" style={{ margin: '0 auto 4rem', fontSize: '1.2rem' }}>
                Complete the validation protocol and join the most immersive serious roleplay community in Los Santos.
              </p>
              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <a href="#" className="btn btn-large">INITIATE CONNECTION</a>
              </div>
            </div>
          </section>
        </GTASection>
      </main>

      <footer className="footer">
        <div className="footer-top fade-up">
          <h2 className="giant-logo glusp outline">NEXUS</h2>
        </div>
        <div className="footer-bottom fade-up">
          <span>© {new Date().getFullYear()} NEXUS RP </span>
          <span>REDLINE CORE /// V2.4</span>
          <span className="red-text">DEATH HAS CONSEQUENCES</span>
        </div>
      </footer>
    </div>
  )
}

export default App
