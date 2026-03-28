import GTASection from '../GTASection'

const Architecture = () => {
  return (
    <GTASection 
      id="systems" 
      bgImage="/Assets/AJ/BG-aj.png" 
      actorImage="/Assets/AJ/aj.png"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <section className="bento-section">
            <span className="section-tag glusp fade-up" style={{ marginBottom: '2.5rem' }}>02 / ARCHITECTURE</span>
            <div className="bento-grid">
              <div className="bento-card fade-up">
                <span className="b-tag">CORE ENGINE</span>
                <h3>High-Tickrate Core</h3>
                <p>Custom Lua back-end optimized for zero desync and buttery smooth physics.</p>
              </div>
              <div className="bento-card fade-up">
                <span className="b-tag">ECONOMY</span>
                <h3>Player-Led Markets</h3>
                <p>Every commodity is tracked in a living, breathing financial ecosystem.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Architecture
