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
            <h1 className="hero-title glusp">
              {heroData.title.main}<br/><span className="outline">{heroData.title.outline}</span>
            </h1>
            <p className="hero-subtitle">
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
          </header>
        </div>
      </div>
    </GTASection>
  )
}

export default Hero
