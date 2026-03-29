import GTASection from '../GTASection'
import archData from '../../data/architecture.json'
import BentoCard from '../ui/BentoCard'

const Architecture = () => {
  return (
    <GTASection 
      id="systems" 
      bgImage={archData.assets.bg} 
      actorImage={archData.assets.actor}
      loading="eager"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <section className="bento-section">
            <span className="section-tag glusp fade-up" style={{ marginBottom: '2.5rem' }}>{archData.tag}</span>
            <div className="bento-grid">
              {archData.cards.map((card, i) => (
                <BentoCard 
                  key={i} 
                  tag={card.tag} 
                  title={card.title} 
                  desc={card.desc} 
                  className="fade-up"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Architecture
