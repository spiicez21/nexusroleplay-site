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
          <h2 className="glusp">{connectData.title}</h2>
          <p className="connect-sub">{connectData.subtitle}</p>
        </div>

        <div className="ip-container" onClick={handleCopy}>
          <div className="ip-block">
            <span className="glusp ip-text">{connectData.ip}</span>
          </div>
          
          <div className="copy-btn-overlay">
            <span className="glusp">{copied ? '✓ COPIED' : 'COPY TO CLIPBOARD'}</span>
          </div>

          <div className="copy-feedback glusp">SERVER ADDRESS REPLICATED</div>
          <div className="ip-scanner" />
        </div>
      </div>
    </section>
  )
}

export default Connect
