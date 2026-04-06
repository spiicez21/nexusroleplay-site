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
  const [expandedRules, setExpandedRules] = useState<number | null>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(false)
      window.scrollTo(0, 0)
      setActiveTab('overview')
      setExpandedRules(0)
      
      try {
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

    ScrollTrigger.getAll().forEach(t => t.kill())

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

    const elements = gsap.utils.toArray('.fp-reveal')
    elements.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    ScrollTrigger.refresh()
  }, { scope: pageRef, dependencies: [isLoading, data, activeTab, expandedRules] })

  if (isLoading) {
    return (
      <div className="faction-page faction-page--loading">
        <Navbar />
        <div className="faction-loading-screen">
          <div className="faction-loader">
            <div className="loader-bar" />
            <span className="glusp fw-700">INITIALIZING PROTOCOL...</span>
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
              {tab === 'roles' ? 'CHAIN OF COMMAND' : tab === 'rules' ? 'PROTOCOL' : 'OVERVIEW'}
            </button>
          ))}
          {data.codes && (
            <button 
              className={`faction-nav__btn ${activeTab === 'codes' ? 'active' : ''}`} 
              onClick={() => setActiveTab('codes')}
            >
              TRANSMISSIONS
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Pane */}
      <section className="faction-content">
        <div className="faction-content__container" key={activeTab}>

          {activeTab === 'overview' && (
            <div className="overview-minimal">
              <div className="tactical-item tactical-item--main fp-reveal">
                <div className="item-tag glusp fw-700">DIRECTIVE::CORE</div>
                <div className="tactical-content">
                  <div className="directive-block">
                    <span className="protocol-id glusp fw-700">MISSION.SOP</span>
                    <p>{data.mission}</p>
                  </div>
                  <div className="directive-block">
                    <span className="protocol-id glusp fw-700">VISION.SOP</span>
                    <p>{data.vision}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="roles-layout-technical">
              <div className="section-header fp-reveal">
                <h3 className="glusp fw-700 faction__section-title">AUTHORITY::HIERARCHY</h3>
              </div>
              
              <div className="roles-tree">
                {Array.from(new Set(data.roles.map((r: any) => r.category || 'Department Hierarchy'))).map((cat: any) => (
                  <div key={cat} className="role-tree-section fp-reveal">
                    <div className="tree-header">
                      <span className="tree-line" />
                      <h4 className="glusp fw-700">{cat}</h4>
                    </div>
                    <div className="tree-items">
                      {data.roles.filter((r: any) => (r.category || 'Department Hierarchy') === cat).map((r: any, i: number) => (
                        <div key={i} className={`tree-item tier-${r.tier || 3}`}>
                          <div className="tree-item__node">
                            <span className="node-line" />
                            <div className="node-content">
                              <div className="node-rank-code glusp fw-700">{r.name.split(' (')[1]?.replace(')', '') || 'CMD'}</div>
                              <div className="node-main">
                                <h5 className="glusp fw-700">{r.name.split(' (')[0]}</h5>
                                <p className="fw-300">{r.desc}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="rules-layout-accordion">
              <div className="section-header fp-reveal">
                <h3 className="glusp fw-700 faction__section-title">PROTOCOL::SOP</h3>
              </div>
              <div className="accordion-grid">
                {data.rules.map((section: any, idx: number) => (
                  <div key={idx} className={`accordion-section ${expandedRules === idx ? 'expanded' : ''} fp-reveal`}>
                    <button 
                      className="accordion-trigger" 
                      onClick={() => setExpandedRules(expandedRules === idx ? null : idx)}
                    >
                      <span className="protocol-id glusp fw-700">SOP-{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                      <h4 className="glusp fw-700">{section.title}</h4>
                      <div className={`accordion-icon ${expandedRules === idx ? 'active' : ''}`} />
                    </button>
                    <div className="accordion-content">
                      <ul className="protocol-list">
                        {section.points.map((p: string, pIdx: number) => (
                          <li key={pIdx} className="protocol-point">
                            <span className="point-id">{pIdx + 1 < 10 ? `0${pIdx + 1}` : pIdx + 1}</span>
                            <span className="point-text">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

