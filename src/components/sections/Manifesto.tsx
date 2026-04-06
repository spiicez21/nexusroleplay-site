import GTASection from '../GTASection'
import manifestData from '../../data/manifesto.json'

const Manifesto = () => {
  return (
    <GTASection 
      id="about" 
      bgImage={manifestData.assets.bg} 
      actorImage={manifestData.assets.actor}
      loading="eager"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <div className="manifesto-bg-text glusp">{manifestData.bgText}</div>
          
          <section className="manifesto">
            <div className="manifesto-header fade-up">
              <span className="section-tag glusp">{manifestData.tag}</span>
              <div className="data-stamp fw-slim">{manifestData.status}</div>
            </div>
            
            <h2 className="manifesto-title glusp fade-up">
              <span className="fw-bold">{manifestData.title.white}</span><br/>
              <span className="red fw-bold">{manifestData.title.red}</span> <span className="fw-bold">{manifestData.title.end}</span>
            </h2>

            <div className="manifesto-text-block fade-up">
              <p className="fw-slim">{manifestData.text}</p>
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Manifesto

