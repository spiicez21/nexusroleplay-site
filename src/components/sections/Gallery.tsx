import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import galleryData from '../../data/gallery.json'
import './Gallery.css'

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tlRef    = useRef<gsap.core.Timeline | null>(null)

  useGSAP(() => {
    if (!trackRef.current) return
    tlRef.current = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } })
    tlRef.current.to(trackRef.current, { xPercent: -50, duration: 30 })
  }, { scope: trackRef })

  const slowDown = () => gsap.to(tlRef.current, { timeScale: 0.15, duration: 0.8 })
  const speedUp  = () => gsap.to(tlRef.current, { timeScale: 1,    duration: 0.8 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    gsap.to(e.currentTarget.querySelector('img'), {
      x: x * 35, y: y * 35, duration: 0.55, ease: 'power2.out',
    })
  }

  const handleItemLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), {
      x: 0, y: 0, duration: 0.7, ease: 'power3.out',
    })
  }

  const items = [...galleryData.items, ...galleryData.items]

  return (
    <section className="gallery">
      <div className="gallery__header fade-up">
        <span className="label">GALLERY</span>
        <h2 className="gallery__title glusp">
          <span className="fw-700">INSIDE</span>
          <span className="gallery__title-outline fw-700">THE CITY</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="gallery__track"
        onMouseEnter={slowDown}
        onMouseLeave={speedUp}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="gallery__item"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleItemLeave}
          >
            <div className="gallery__img-wrap">
              <img src={`/Assets/Gallery/${item.img}`} alt={item.title} loading="lazy" />
            </div>
            <div className="gallery__gradient" />
            <div className="gallery__label">
              <span className="gallery__label-tag">{item.tag}</span>
              <div className="gallery__label-title glusp fw-600">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
