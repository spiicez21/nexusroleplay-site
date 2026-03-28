import GTASection from '../GTASection'

const Hero = () => {
  return (
    <GTASection 
      id="top" 
      bgImage="/Assets/VK/BG-vk.png" 
      actorImage="/Assets/VK/vk.png"
    >
      <div className="gta-overlay">
        <div className="gta-column-left reveal-hero">
          <header className="hero-content">
            <h1 className="hero-title glusp">
              NEXUS<br/><span className="outline">CITY</span>
            </h1>
            <p className="hero-subtitle">
              A hyper-realistic roleplay ecosystem engineered for serious immersion. 
              Experience a city that reacts to every decision you make.
            </p>
            <div className="hero-actions">
              <a href="#join" className="btn">ENTER CITY</a>
              <a href="#about" className="btn btn-ghost">THE VISION</a>
            </div>
          </header>
        </div>
      </div>
    </GTASection>
  )
}

export default Hero
