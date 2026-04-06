import heroData from '../../data/hero.json'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* BG spans full section */}
      <div className="hero__bg" style={{ backgroundImage: `url("${heroData.assets.bg}")` }} />
      <div className="hero__gradient" />

      {/* Character at right edge */}
      <img
        src={heroData.assets.actor}
        alt="Nexus City Character"
        className="hero__character char-rise"
        loading="eager"
      />

      {/* Text card over the left of the scene */}
      <div className="hero__content">
        <div className="hero__card">
          <div className="hero__status fade-in">
            <span className="hero__status-dot" />
            SYSTEM ONLINE — CA-01
          </div>

          <h1 className="hero__title glusp fade-up">
            <span className="fw-700">{heroData.title.main}</span>
            <span className="hero__title-outline fw-700">{heroData.title.outline}</span>
          </h1>

          <p className="hero__sub fw-300 fade-up">
            {heroData.subtitle}
          </p>

          <div className="hero__actions fade-up">
            <a href="#join"  className="btn-primary glusp fw-700">ENTER CITY</a>
            <a href="https://www.youtube.com/watch?v=MANRM91OSI4" target="_blank" rel="noreferrer" className="btn-ghost glusp fw-700">WATCH TRAILER</a>
          </div>

          <div className="hero__scroll fade-in">
            <div className="hero__scroll-line" />
            SCROLL
          </div>
        </div>
      </div>
    </section>
  )
}
