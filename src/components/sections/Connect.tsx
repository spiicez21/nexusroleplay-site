import { useState, useEffect } from 'react'
import connectData from '../../data/connect.json'
import gsap from 'gsap'
import './Connect.css'

const LOG_POOL = [
  '> ENCRYPTING_PACKETS...',
  '> NODE_CITY_GATEWAY_ACTIVE',
  '> SYNCING_REPLICANT_DATA...',
  '> SECURE_NODE_ESTABLISHED',
  '> UPTIME_642_HOURS_STABLE',
  '> AUTH_TOKEN_REFRESHED',
  '> PACKET_LOSS: 0.000%',
]

const NODES = [
  { label: 'CITYSITE-01',      color: '#e62222' },
  { label: 'GATEWAY-AUTH',     color: '#27c93f' },
  { label: 'ASSET-NODE-03',    color: '#27c93f' },
  { label: 'NEXUS-REPLICANT',  color: '#ffbd2e' },
]

export default function Connect() {
  const [copied, setCopied] = useState(false)
  const [logs, setLogs] = useState(LOG_POOL.slice(0, 4))

  useEffect(() => {
    const id = setInterval(() => {
      const entry = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)]
      setLogs(prev => [...prev.slice(-4), entry])
    }, 3800)
    return () => clearInterval(id)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(connectData.ip)
    setCopied(true)
    gsap.timeline()
      .to('.terminal__copied', { opacity: 1, y: -4, duration: 0.3 })
      .to('.terminal__copied', { opacity: 0, y: -8, duration: 0.3, delay: 1.4 })
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="connect" className="connect">
      <div className="terminal fade-up">

        {/* Title bar */}
        <div className="terminal__bar">
          <div className="terminal__dot terminal__dot--red" />
          <div className="terminal__dot terminal__dot--yellow" />
          <div className="terminal__dot terminal__dot--green" />
          <span className="terminal__bar-title glusp">NEXUS_SECURE_TUNNEL — V0.6</span>
        </div>

        <div className="terminal__body">

          {/* IP Section */}
          <div className="terminal__main" onClick={handleCopy}>
            <div className="terminal__label glusp">DIRECT_IP_PROTOCOL</div>
            <div className="terminal__ip glusp fw-700">{connectData.ip}</div>
            <div className="terminal__hint glusp">
              {copied ? '✓ STRING_REPLICATED' : 'CLICK_TO_COPY'}
            </div>
            <div className="terminal__copied glusp fw-700">PROTOCOL_COPIED</div>
            <div className="terminal__scanner" />
          </div>

          {/* Sidebar */}
          <div className="terminal__sidebar">
            <div className="terminal__sidebar-section">
              <div className="terminal__label glusp">NODE_STATUS</div>
              <div className="terminal__status-grid">
                {NODES.map((n, i) => (
                  <div key={i} className="status-row glusp">
                    <span className="status-row-dot" style={{ background: n.color, boxShadow: `0 0 6px ${n.color}` }} />
                    {n.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="terminal__sidebar-section">
              <div className="terminal__label glusp">SYSTEM_LOGS</div>
              <div className="terminal__logs">
                {logs.map((l, i) => (
                  <div key={i} className="terminal__log-line glusp">{l}</div>
                ))}
              </div>
            </div>

            <div className="terminal__sidebar-section">
              <div className="terminal__label glusp">COORDS_LOCK</div>
              <div className="terminal__coords glusp fw-700">
                52.234.12 // 0.6N<br />
                -1.423.82 // 0.8E
              </div>
            </div>
          </div>
        </div>

        <div className="terminal__footer glusp">
          <span>U_TIME: 642:12:05</span>
          <span>LAT: 4ms</span>
          <span>SRV: NEXUS_INTERNAL</span>
        </div>
      </div>
    </section>
  )
}
