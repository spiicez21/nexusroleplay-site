import societyData from '../../data/society.json'
import './Society.css'

export default function Society() {
  return (
    <section className="society" id="society">
      {/* BG spans full section */}
      <div className="society__bg" style={{ backgroundImage: `url("${societyData.assets.bg}")` }} />
      <div className="society__gradient" />

      {/* Character at right edge */}
      <img
        src={societyData.assets.actor}
        alt="Society Character"
        className="society__character char-rise"
        loading="lazy"
      />

      {/* Text card on the left */}
      <div className="society__content">
        <div className="society__card fade-up">
          <span className="society__tag">{societyData.tag}</span>

          <h2 className="society__title glusp">
            <span className="fw-700">THE</span>
            <span className="society__title-outline fw-700">SOCIETY</span>
          </h2>

          <div className="society__list">
            {societyData.categories.map((cat, i) => (
              <div key={i} className="society__item fade-up" style={{ display: 'block' }}>
                <div className="society__name glusp fw-700" style={{ color: 'var(--c-red)', marginBottom: '0.8rem', letterSpacing: '0.1em' }}>
                  {cat.title}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
                  {cat.items.map((item, j) => (
                    <div key={j} className="society__desc fw-300" style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem',
                      borderLeft: '2px solid rgba(255,255,255,0.1)', color: 'var(--c-text)'
                    }}>
                      <span style={{ fontSize: '0.7rem', opacity: 0.5, color: 'var(--c-red)' }}>//</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
