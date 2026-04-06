import archData from '../../data/architecture.json'
import './Architecture.css'

const extraCards = [
  { tag: 'SCRIPTING',   title: 'Lua Core Engine',     desc: 'Optimised Lua execution with zero-latency event handling across all server threads.' },
  { tag: 'ANTI-CHEAT',  title: 'Neural Shield',        desc: 'Multi-layer detection with real-time behavioural analysis and server-side telemetry.' },
  { tag: 'BANKING',     title: 'Unified Economy',       desc: 'Full fiscal simulation — taxes, interest rates, market volatility, institutional banking.' },
  { tag: 'DISPATCH',    title: 'Live Dispatch System',  desc: 'Seamless CAD integration with priority queuing for all emergency units.' },
]

const all = [...archData.cards, ...extraCards]

export default function Architecture() {
  return (
    <section className="architecture" id="systems">
      <div className="architecture__header">
        <div>
          <span className="architecture__tag fade-up">{archData.tag}</span>
          <h2 className="architecture__title glusp fade-up">
            SYSTEM
            <span className="architecture__title-outline">ARCHITECTURE</span>
          </h2>
        </div>
        <p className="architecture__subtitle fw-300 fade-up">
          Every subsystem purpose-built for high-density city operations at scale.
        </p>
      </div>

      <div className="architecture__grid">
        {all.map((c, i) => (
          <div key={i} className="architecture__card fade-up">
            <span className="architecture__card-num">
              {c.tag} / {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="architecture__card-title glusp">{c.title}</h3>
            <p  className="architecture__card-desc fw-300">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
