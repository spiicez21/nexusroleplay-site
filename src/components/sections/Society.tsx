import { Link } from 'react-router-dom'
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
                  {cat.items.map((item: any, j: number) => (
                    <Link key={j} to={item.href} className="society__job-link">
                      <div className="society__job-inner">
                        <div className="society__job-prefix">
                          <span className="society__job-slashes">//</span>
                          <span className="society__job-dot" />
                        </div>
                        <span className="society__job-name fw-300">{item.name}</span>
                      </div>
                    </Link>
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
