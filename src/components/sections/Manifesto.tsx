import GTASection from '../GTASection'

const Manifesto = () => {
  return (
    <GTASection 
      id="about" 
      bgImage="/Assets/KM/BG-km.png" 
      actorImage="/Assets/KM/km.png"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <div className="manifesto-bg-text glusp">VISION</div>
          <section className="manifesto">
            <div className="manifesto-header fade-up">
              <span className="section-tag glusp">01 / MANIFESTO</span>
              <div className="data-stamp">SYSTEM ALPHA ACTIVE</div>
            </div>
            
            <h2 className="manifesto-title glusp fade-up">
              FORGE YOUR<br/>
              <span className="red">LEGACY</span> HERE.<br/> 
            </h2>

            <div className="manifesto-text-block fade-up">
              <p>
                Nexus City is a high-performance environment built for 
                pure storytelling and brutal consequence. 
                No scripts. No noise. Only pure RP.
              </p>
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Manifesto
