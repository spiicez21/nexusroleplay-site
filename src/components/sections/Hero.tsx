import GTASection from '../GTASection'
import heroData from '../../data/hero.json'

const Hero = () => {
  return (
    <GTASection 
      id="top" 
      bgImage={heroData.assets.bg} 
      actorImage={heroData.assets.actor}
    >
      <div className="gta-overlay">
        <div className="gta-column-left reveal-hero">
          <header className="hero-content">
            <h1 className="hero-title glusp">
              {heroData.title.main}<br/><span className="outline">{heroData.title.outline}</span>
            </h1>
            <p className="hero-subtitle">
              {heroData.subtitle}
            </p>
            <div className="hero-actions">
              {heroData.actions.map((action, i) => (
                <a 
                  key={i} 
                  href={action.href} 
                  className={`btn ${action.primary ? '' : 'btn-ghost'}`}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </header>
        </div>
      </div>
    </GTASection>
  )
}

export default Hero
