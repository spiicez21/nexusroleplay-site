import { useState } from 'react'
import connectData from '../../data/connect.json'
import gsap from 'gsap'
import StatusIndicator from '../ui/StatusIndicator'

const Connect = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(connectData.ip)
    setCopied(true)
    
    const tl = gsap.timeline()
    tl.to(".copy-feedback", { opacity: 1, y: -5, duration: 0.3 })
      .to(".copy-feedback", { opacity: 0, y: -10, duration: 0.3, delay: 1.5 })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="connect" className="connect-section">
      <div className="connect-card fade-up">
        <div className="connect-info">
          <StatusIndicator label={connectData.tag} />
          <h2 className="glusp fw-bold">{connectData.title}</h2>
          <p className="connect-sub fw-slim">{connectData.subtitle}</p>
        </div>

        <div className="ip-container" onClick={handleCopy}>
          <div className="ip-block">
            <span className="section-tag glusp" style={{ marginBottom: '0.5rem' }}>TERMINAL ADDRESS</span>
            <span className="glusp ip-text fw-bold">{connectData.ip}</span>
          </div>
          
          <div className="copy-btn-overlay">
            <span className="glusp fw-slim">{copied ? '✓ REPLICATED' : 'CLICK TO COPY ADDRESS'}</span>
          </div>

          <div className="copy-feedback glusp fw-bold">NETWORK STRING COPIED</div>
          <div className="ip-scanner" />
        </div>
      </div>
    </section>
  )
}

export default Connect

