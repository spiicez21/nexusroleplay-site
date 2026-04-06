import manifestData from '../../data/manifesto.json'
import './Manifesto.css'

export default function Manifesto() {
  return (
    <section className="manifesto" id="about">
      {/* BG spans full section */}
      <div className="manifesto__bg" style={{ backgroundImage: `url("${manifestData.assets.bg}")` }} />
      <div className="manifesto__gradient" />

      {/* Character at left edge */}
      <img
        src={manifestData.assets.actor}
        alt="Nexus Character"
        className="manifesto__character char-rise"
        loading="lazy"
      />

      {/* Text card pushed to the right */}
      <div className="manifesto__content">
        <div className="manifesto__card fade-up">
          <span className="manifesto__tag">{manifestData.tag}</span>

          <h2 className="manifesto__title glusp">
            <span className="fw-700">{manifestData.title.white}</span>
            <span className="fw-700" style={{ color: 'var(--c-red)' }}> {manifestData.title.red} </span>
            <span className="manifesto__title-outline fw-700">{manifestData.title.end}</span>
          </h2>

          <p className="manifesto__body fw-300">
            {manifestData.text}
          </p>

          <div className="manifesto__badge glusp fw-700">
            {manifestData.status}
          </div>
        </div>
      </div>
    </section>
  )
}
