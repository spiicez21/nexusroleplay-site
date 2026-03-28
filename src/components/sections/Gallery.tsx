import { useState } from 'react'
import gsap from 'gsap'

const Gallery = () => {
  const [items] = useState([
    { img: 'gallery_1.png', tag: 'DUSK', title: 'Downtown Vibe', coord: '34.0522° N' },
    { img: 'gallery_2.png', tag: 'GOLDEN', title: 'Skyline Overlook', coord: '118.2437° W' },
    { img: 'gallery_3.png', tag: 'GRIT', title: 'Alleyway Flow', coord: '8.4412° S' },
    { img: 'gallery_4.png', tag: 'ELITE', title: 'Modern Heights', coord: '2.3119° E' }
  ])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(card.querySelector('img'), {
      x: x * 40,
      y: y * 40,
      duration: 0.6,
      ease: "power2.out"
    })

    gsap.to(card, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.6,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out"
    })
  }

  return (
    <section className="gallery-section">
      <div className="gta-overlay">
        <div className="gta-column-left">
          <div className="gallery-header fade-up">
            <span className="section-tag glusp" style={{ marginBottom: '1rem' }}>// CINEMATIC GALLERY</span>
            <div className="scanner-line" />
          </div>
          
          <div className="gallery-grid fade-up">
            {items.map((item, i) => (
              <div 
                key={i} 
                className="gallery-item"
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="gallery-img-wrapper">
                  <img src={`/Assets/Gallery/${item.img}`} alt={item.title} />
                </div>
                <div className="gallery-overlay-gradient" />
                <div className="gallery-label">
                  <div className="g-header">
                    <span className="g-tag">{item.tag}</span>
                    <span className="g-coord">{item.coord}</span>
                  </div>
                  <h4>{item.title}</h4>
                  <div className="g-scan" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
