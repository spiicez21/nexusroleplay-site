import { useState, useEffect } from 'react'
import connectData from '../../data/connect.json'
import gsap from 'gsap'
import StatusIndicator from '../ui/StatusIndicator'

const Connect = () => {
  const [copied, setCopied] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "SECURE_PROTOCOL_INITIATED",
    "HANDSHAKE_NODE_52.234.12... OK",
    "ESTABLISHING_TLS_TUNNEL... DONE",
    "BYPASSING_GATEWAY_V3... SUCCESS"
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const logEntries = [
        "ENCRYPTING_PACKETS...",
        "NODE_CITY_GATEWAY_ACTIVE",
        "SYNCING_REPLICANT_DATA...",
        "SECURE_NODE_ESTABLISHED",
        "UPTIME_642_HOURS_STABLE"
      ]
      const randomLog = logEntries[Math.floor(Math.random() * logEntries.length)]
      setLogs(prev => [...prev.slice(-4), `> ${randomLog}`])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(connectData.ip)
    setCopied(true)
    
    const tl = gsap.timeline()
    tl.to(".copy-feedback", { opacity: 1, y: -5, duration: 0.3 })
      .to(".copy-feedback", { opacity: 0, y: -10, duration: 0.3, delay: 1.5 })

    setTimeout(() => setCopied(false), 2000)
  }

  const nodes = [
    { label: "CITYSITE-01", color: "#e62222" },
    { label: "GATEWAY-AUTH", color: "#00ff00" },
    { label: "ASSET-NODE-03", color: "#00ff00" },
    { label: "NEXUS-REPLICANT", color: "#ffaa00" }
  ]

  return (
    <section id="connect" className="connect-section">
      <div className="terminal-container fade-up">
        <div className="terminal-header">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
          <span className="terminal-title glusp fw-slim">NEXUS_SECURE_TUNNEL_0.6</span>
        </div>

        <div className="terminal-content">
          {/* Main IP Section */}
          <div className="terminal-main" onClick={handleCopy}>
            <div className="terminal-label glusp fw-slim">DIRECT_IP_PROTOCOL</div>
            <div className="terminal-ip glusp fw-bold">{connectData.ip}</div>
            <div className="copy-hint glusp fw-slim">
              {copied ? '✓ STRING_REPLICATED' : 'CLICK_TO_ENCRYPT_COPY'}
            </div>
            <div className="copy-feedback glusp fw-bold">PROTOCOL_COPIED</div>
            <div className="terminal-scanner" />
          </div>

          {/* Sidebar / Metadata */}
          <div className="terminal-sidebar">
            <div className="sidebar-section">
              <div className="terminal-label glusp fw-slim">NODE_STATUS</div>
              <div className="status-grid">
                {nodes.map((node, i) => (
                  <StatusIndicator 
                    key={i} 
                    label={node.label} 
                    pulseColor={node.color} 
                    className="sidebar-status" 
                  />
                ))}
              </div>
            </div>

            <div className="sidebar-section logs-section">
              <div className="terminal-label glusp fw-slim">SYSTEM_LOGS</div>
              <div className="terminal-logs">
                {logs.map((log, i) => (
                  <div key={i} className="log-line glusp fw-slim">{log}</div>
                ))}
              </div>
            </div>

            <div className="sidebar-section coords-section">
              <div className="terminal-label glusp fw-slim">COORDS_LOCK</div>
              <div className="coords-display glusp fw-bold">
                52.234.12 // 0.6N<br/>
                -1.423.82 // 0.8E
              </div>
            </div>
          </div>
        </div>

        <div className="terminal-footer glusp fw-slim">
          <span>U_TIME: 642:12:05</span>
          <span>LAT: 4ms</span>
          <span>SRV: NEXUS_INTERNAL</span>
        </div>
      </div>
    </section>
  )
}

export default Connect


