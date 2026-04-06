import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './BusinessPage.css'

export default function BusinessPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    
    tl.fromTo('.bp-header', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.bp-title span',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' },
      '-=0.5'
    )
    .fromTo('.bp-tag',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
      '-=0.8'
    )
    .fromTo('.bp-footer',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.3'
    )
  }, { scope: containerRef })

  return (
    <div className="business-page" ref={containerRef}>
      {/* Background Grid Accent */}
      <div className="bp-grid-overlay" />
      
      <div className="bp-container">
        <header className="bp-header">
          <div className="bp-id glusp fw-700">PROTOCOL::HUB</div>
          <div className="bp-status">
            <span className="bp-status-dot pulse" />
            <span className="glusp">INITIALIZING_NEXUS_SYSTEMS</span>
          </div>
        </header>

        <main className="bp-main">
          <div className="bp-tag glusp fw-700">BUSINESS SECTOR 04</div>
          <h1 className="bp-title glusp fw-900">
            <span>COMING</span>
            <span className="bp-title--outline">SOON</span>
          </h1>
          <div className="bp-description">
            <p className="fade-in">
              The Nexus Business Protocol is currently undergoing secure initialization. 
              Advanced commerce systems, proprietary logistics networks, and 
              specialized department hubs are being calibrated for peak operational capacity.
            </p>
          </div>
        </main>

        <footer className="bp-footer">
          <Link to="/" className="bp-back-btn glusp fw-700">
            <span className="btn-line" />
            RETURN TO CITY HUB
          </Link>
          <div className="bp-info-text monospace">
            TERMINAL_ID: NX-BUS-882 // ENCRYPTION: AES-256 // CLASSIFICATION: PROPRIETARY
          </div>
        </footer>
      </div>
    </div>
  )
}
