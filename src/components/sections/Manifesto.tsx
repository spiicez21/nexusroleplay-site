import GTASection from '../GTASection'
import manifestData from '../../data/manifesto.json'

const Manifesto = () => {
  return (
    <GTASection 
      id="about" 
      bgImage={manifestData.assets.bg} 
      actorImage={manifestData.assets.actor}
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <div className="manifesto-bg-text glusp">{manifestData.bgText}</div>
          <section className="manifesto">
            <div className="manifesto-header fade-up">
              <span className="section-tag glusp">{manifestData.tag}</span>
              <div className="data-stamp">{manifestData.status}</div>
            </div>
            
            <h2 className="manifesto-title glusp fade-up">
              {manifestData.title.white}<br/>
              <span className="red">{manifestData.title.red}</span> {manifestData.title.end}<br/> 
            </h2>

            <div className="manifesto-text-block fade-up">
              <p>{manifestData.text}</p>
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Manifesto
