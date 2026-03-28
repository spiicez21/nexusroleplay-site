import GTASection from '../GTASection'
import archData from '../../data/architecture.json'

const Architecture = () => {
  return (
    <GTASection 
      id="systems" 
      bgImage={archData.assets.bg} 
      actorImage={archData.assets.actor}
      loading="lazy"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <section className="bento-section">
            <span className="section-tag glusp fade-up" style={{ marginBottom: '2.5rem' }}>{archData.tag}</span>
            <div className="bento-grid">
              {archData.cards.map((card, i) => (
                <div key={i} className="bento-card fade-up">
                  <span className="b-tag">{card.tag}</span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Architecture
