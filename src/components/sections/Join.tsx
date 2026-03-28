import GTASection from '../GTASection'

const Join = () => {
  return (
    <GTASection 
      id="join" 
      bgImage="/Assets/RJ/BG-rj.png" 
      actorImage="/Assets/RJ/rj.png"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <section className="join">
            <div className="join-card fade-up">
              <span className="section-tag glusp" style={{ marginBottom: '1rem' }}>04 / ONBOARDING</span>
              <h3 className="glusp">INITIALIZE?</h3>
              <p>Complete the validation protocol and join the elite roleplay community.</p>
              <a href="#" className="btn btn-large">APPLY NOW</a>
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Join
