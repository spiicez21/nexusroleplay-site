import GTASection from '../GTASection'
import societyData from '../../data/society.json'

const Society = () => {
  return (
    <GTASection 
      id="society" 
      bgImage={societyData.assets.bg} 
      actorImage={societyData.assets.actor}
      loading="eager"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <section className="factions">
            <span className="section-tag glusp fade-up" style={{ marginBottom: '2.5rem' }}>{societyData.tag}</span>
            <div className="faction-list">
              {societyData.factions.map((f, i) => (
                <div key={i} className="faction-item fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="f-num glusp fw-slim">{f.num} / FACTION</span>
                  <span className="f-name glusp fw-bold">{f.name}</span>
                  <p className="f-desc fw-slim">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Society
