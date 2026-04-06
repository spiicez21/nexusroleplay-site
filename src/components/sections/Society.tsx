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
            {societyData.factions.map((f, i) => (
              <div key={i} className="society__item fade-up">
                <span className="society__num">{f.num} /</span>
                <div>
                  <div className="society__name glusp fw-700">{f.name}</div>
                  <div className="society__desc fw-300">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
