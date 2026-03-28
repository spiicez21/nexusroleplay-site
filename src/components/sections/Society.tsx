import GTASection from '../GTASection'

const Society = () => {
  const factions = [
    { num: '01', name: 'L.S.P.D.', desc: 'Enforce order with military-grade tech and a full judicial back-end.' },
    { num: '02', name: 'U.M.S.', desc: 'Critical response teams utilizing advanced medical triage systems.' },
    { num: '03', name: 'Syndicates', desc: 'Organized hierarchies running weapon and narcotic logistics chains.' }
  ]

  return (
    <GTASection 
      id="society" 
      bgImage="/Assets/VJ/BG-vj.png" 
      actorImage="/Assets/VJ/vj.png"
    >
      <div className="gta-overlay">
        <div className="gta-column-left">
          <section className="factions">
            <span className="section-tag glusp fade-up" style={{ marginBottom: '2.5rem' }}>03 / SOCIETY</span>
            <div className="faction-list">
              {factions.map((f, i) => (
                <div key={i} className="faction-item fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="f-num glusp">{f.num} / FACTION</span>
                  <span className="f-name glusp">{f.name}</span>
                  <p className="f-desc">{f.desc}</p>
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
