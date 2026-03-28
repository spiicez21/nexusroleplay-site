import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import galleryData from '../../data/gallery.json'

const Gallery = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<gsap.core.Timeline | null>(null)

  // Infinite Scroll Loop
  useGSAP(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    
    loopRef.current = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" }
    })

    loopRef.current.to(track, {
      xPercent: -50,
      duration: 30,
    })
  }, { scope: trackRef })

  const handleMouseEnter = () => {
    gsap.to(loopRef.current, { timeScale: 0.2, duration: 1 })
  }

  const handleMouseLeave = () => {
    gsap.to(loopRef.current, { timeScale: 1, duration: 1 })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(card.querySelector('img'), {
      x: x * 50,
      y: y * 50,
      duration: 0.6,
      ease: "power2.out"
    })
  }

  const handleItemMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
  }

  // Double the items for seamless looping
  const displayItems = [...galleryData.items, ...galleryData.items]

  return (
    <section className="gallery-section">
      <div 
        className="gallery-track" 
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayItems.map((item, i) => (
          <div 
            key={i} 
            className="gallery-item"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleItemMouseLeave}
          >
            <div className="gallery-img-wrapper">
              <img src={`/Assets/Gallery/${item.img}`} alt={item.title} loading="eager" />
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
    </section>
  )
}

export default Gallery
