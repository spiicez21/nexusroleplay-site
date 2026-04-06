import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import Navbar from '../sections/Navbar'
import './FactionPage.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function FactionPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(false)
      window.scrollTo(0, 0)
      setActiveTab('overview')
      
      try {
        // Dynamic import based on ID
        const module = await import(`../../data/factions/${id?.toLowerCase()}.json`)
        setData(module.default)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load faction data:', err)
        setError(true)
        setIsLoading(false)
      }
    }

    if (id) {
      loadData()
    }
  }, [id])

  useGSAP(() => {
    if (isLoading || !data) return

    // Clear previous triggers
    ScrollTrigger.getAll().forEach(t => t.kill())

    // Hero Parallax
    gsap.to('.faction-hero__bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.faction-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // Content reveals
    const elements = gsap.utils.toArray('.fp-reveal')
    elements.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    ScrollTrigger.refresh()
  }, { scope: pageRef, dependencies: [isLoading, data, activeTab] })

  if (isLoading) {
    return (
      <div className="faction-page faction-page--loading">
        <Navbar />
        <div className="faction-loading-screen">
          <div className="faction-loader">
            <div className="loader-bar" />
            <span className="glusp fw-700">ENCRYPTING DATA...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="faction-page__not-found">
        <Navbar />
        <div className="error-container">
          <div className="error-glitch" data-text="DATA CORRUPTED">DATA CORRUPTED</div>
          <p className="fw-300">The requested transmission file for [{id?.toUpperCase()}] could not be retrieved from the central nexus.</p>
          <Link to="/" className="btn-secondary glusp fw-700">RETURN TO HUB</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="faction-page" ref={pageRef} style={{ '--faction-theme': data.assets.theme } as any}>
      <Navbar />

      {/* Hero Header */}
      <section className="faction-hero">
        <div className="faction-hero__bg" style={{ backgroundImage: `url("${data.assets.bg}")` }} />
        <div className="faction-hero__overlay" />
        <div className="faction-hero__content">
          <div className="faction-hero__tag-wrapper fp-reveal">
            <span className="faction-hero__tag glusp fw-700">{data.type}</span>
            <div className="faction-hero__line" />
          </div>
          <h1 className="faction-hero__title glusp fw-700 fp-reveal">
            {data.name}
          </h1>
          <div className="faction-hero__scroll-indicator fp-reveal">
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* Internal Nav */}
      <nav className="faction-nav-wrapper sticky-nav">
        <div className="faction-nav glusp fw-700">
          {['overview', 'roles', 'rules'].map((tab) => (
            <button 
              key={tab}
              className={`faction-nav__btn ${activeTab === tab ? 'active' : ''}`} 
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'roles' ? 'CHAIN OF COMMAND' : tab === 'rules' ? 'PROCEDURE' : 'OVERVIEW'}
            </button>
          ))}
          {data.codes && (
            <button 
              className={`faction-nav__btn ${activeTab === 'codes' ? 'active' : ''}`} 
              onClick={() => setActiveTab('codes')}
            >
              COMMS
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Pane */}
      <section className="faction-content">
        <div className="faction-content__container" key={activeTab}>

          {activeTab === 'overview' && (
            <div className="overview-bento">
              <div className="bento-item bento-item--main fp-reveal">
                <h3 className="glusp fw-700 bento-title">THE DIRECTIVE</h3>
                <div className="bento-content">
                  <div className="bento-block">
                    <h4 className="glusp fw-700">MISSION</h4>
                    <p>{data.mission}</p>
                  </div>
                  <div className="bento-block">
                    <h4 className="glusp fw-700">VISION</h4>
                    <p>{data.vision}</p>
                  </div>
                </div>
              </div>
              <div className="bento-item bento-item--side fp-reveal">
                <div className="stats-header">
                  <span className="glusp fw-700">SYSTEM STATUS</span>
                  <div className="status-dot pulse" />
                </div>
                <div className="stats-list">
                  <div className="stat-entry">
                    <span className="stat-label fw-700">FACTION ID</span>
                    <span className="stat-value">{data.id?.toUpperCase()}</span>
                  </div>
                  <div className="stat-entry">
                    <span className="stat-label fw-700">CLEARANCE</span>
                    <span className="stat-value">LEVEL 4</span>
                  </div>
                  <div className="stat-entry">
                    <span className="stat-label fw-700">UPTIME</span>
                    <span className="stat-value">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="roles-layout">
              <div className="section-header fp-reveal">
                <h3 className="glusp fw-700 faction__section-title">DIVISION AUTHORITY</h3>
              </div>
              
              <div className="roles-categories">
                {Array.from(new Set(data.roles.map((r: any) => r.category || 'Department Hierarchy'))).map((cat: any) => (
                  <div key={cat} className="role-category-group fp-reveal">
                    <div className="category-header-minimal">
                      <span className="category-label glusp fw-700">{cat}</span>
                      <div className="category-line" />
                    </div>
                    <div className="roles-matrix">
                      {data.roles.filter((r: any) => (r.category || 'Department Hierarchy') === cat).map((r: any, i: number) => (
                        <div 
                          key={i} 
                          className={`faction__role-item tier-${r.tier || 3} fp-reveal`}
                          title={r.desc}
                        >
                          <div className="role-item__rank glusp fw-700">
                            {r.name.split(' (')[1]?.replace(')', '') || `L-${i + 1}`}
                          </div>
                          <div className="role-item__content">
                            <h4 className="glusp fw-700">{r.name.split(' (')[0]}</h4>
                            <span className="role-item__desc fw-300">{r.desc}</span>
                          </div>
                          {r.tier === 1 && <div className="role-item__tier-dot tier-1-glow" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="rules-layout">
              <div className="section-header fp-reveal">
                <h3 className="glusp fw-700 faction__section-title">STANDARD OPERATING PROCEDURE</h3>
              </div>
              <div className="rules-grid">
                {data.rules.map((section: any, idx: number) => (
                  <div key={idx} className={`rules-block ${idx % 2 !== 0 ? 'rules-block--alt' : ''} fp-reveal`}>
                    <div className="rules-block__header">
                      <div className="header-icon" />
                      <h4 className="glusp fw-700">{section.title}</h4>
                    </div>
                    <ul className="rules-list">
                      {section.points.map((p: string, pIdx: number) => (
                        <li key={pIdx}>
                          <span className="rule-number">{(pIdx + 1).toString().padStart(2, '0')}</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'codes' && data.codes && (
            <div className="codes-terminal fp-reveal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span /> <span /> <span />
                </div>
                <div className="terminal-title glusp fw-700">FACTION_COMMS_LOCAL.sh</div>
              </div>
              <div className="terminal-content">
                <div className="codes-grid">
                  {data.codes.map((c: any, i: number) => (
                    <div key={i} className="terminal-code-item">
                      <span className="code-key glow-text">{c.code}</span>
                      <span className="code-separator">::</span>
                      <span className="code-value">{c.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}

