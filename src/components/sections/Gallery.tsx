import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Gallery = () => {
  const [items] = useState([
    { img: 'gallery_1.png', tag: 'DUSK', title: 'Downtown Vibe', coord: '34.0522° N' },
    { img: 'gallery_2.png', tag: 'GOLDEN', title: 'Skyline Overlook', coord: '118.2437° W' },
    { img: 'gallery_3.png', tag: 'GRIT', title: 'Alleyway Flow', coord: '8.4412° S' },
    { img: 'gallery_4.png', tag: 'ELITE', title: 'Modern Heights', coord: '2.3119° E' }
  ])

  const trackRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<gsap.core.Timeline | null>(null)

  // Infinite Scroll Loop
  useGSAP(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const itemsCount = items.length
    
    // Create the loop
    loopRef.current = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" }
    })

    loopRef.current.to(track, {
      xPercent: -50, // Move half the width (since we doubled items)
      duration: 30, // Slow cinematic crawl
    })
  }, { scope: trackRef })

  const handleMouseEnter = () => {
    gsap.to(loopRef.current, { timeScale: 0.2, duration: 1 }) // Slow down on hover
  }

  const handleMouseLeave = () => {
    gsap.to(loopRef.current, { timeScale: 1, duration: 1 }) // Resume speed
  }

  // Internal Parallax
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
  const displayItems = [...items, ...items]

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
    </section>
  )
}

export default Gallery
