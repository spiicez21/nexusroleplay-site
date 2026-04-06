import GTASection from '../GTASection'
import heroData from '../../data/hero.json'
import Button from '../ui/Button'
import StatusIndicator from '../ui/StatusIndicator'

const Hero = () => {
  return (
    <GTASection 
      id="hero" 
      bgImage={heroData.assets.bg} 
      actorImage={heroData.assets.actor}
      loading="eager"
    >
      <div className="gta-overlay">
        <div className="gta-column-left reveal-hero">
          <header className="hero-content">
            <StatusIndicator label="SYSTEM ONLINE | CA-01" className="fade-up" />
            
            <h1 className="hero-title glusp fade-up">
              <span className="fw-bold">{heroData.title.main}</span><br/>
              <span className="outline fw-bold">{heroData.title.outline}</span>
            </h1>

            <div className="hero-description-block fade-up">
              <p className="hero-subtitle fw-slim">
                {heroData.subtitle}
              </p>
              
              <div className="hero-actions">
                {heroData.actions.map((action, i) => (
                  <Button 
                    key={i} 
                    href={action.href} 
                    variant={action.primary ? 'primary' : 'ghost'}
                    size="large"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </header>
        </div>
        
        <div className="hero-scroll-indicator fw-slim fade-in">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line" />
        </div>
      </div>
    </GTASection>
  )
}

export default Hero

