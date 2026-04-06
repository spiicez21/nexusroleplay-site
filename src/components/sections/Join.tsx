import GTASection from '../GTASection'
import joinData from '../../data/join.json'

const Join = () => {
  return (
    <GTASection 
      id="join" 
      bgImage={joinData.assets.bg} 
      actorImage={joinData.assets.actor}
      loading="eager"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <section className="join">
            <div className="join-card fade-up">
              <span className="section-tag glusp fw-slim" style={{ marginBottom: '1rem' }}>{joinData.tag}</span>
              <h3 className="glusp fw-bold">{joinData.title}</h3>
              <p className="fw-slim">{joinData.text}</p>
              <a href={joinData.action.href} className="btn btn-large glusp fw-bold">{joinData.action.label}</a>
            </div>
          </section>
        </div>
      </div>
    </GTASection>
  )
}

export default Join
