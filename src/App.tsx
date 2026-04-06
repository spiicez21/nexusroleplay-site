import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import Connect from './components/sections/Connect'
import Manifesto from './components/sections/Manifesto'
import Architecture from './components/sections/Architecture'
import Gallery from './components/sections/Gallery'
import Society from './components/sections/Society'
import Join from './components/sections/Join'
import Footer from './components/sections/Footer'

import './App.css'
import './index.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const appRef      = useRef<HTMLDivElement>(null)
  const dotRef      = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  /* ── Custom cursor ── */
  useGSAP(() => {
    if ('ontouchstart' in window) return

    const setDotX      = gsap.quickSetter(dotRef.current,      'x', 'px')
    const setDotY      = gsap.quickSetter(dotRef.current,      'y', 'px')
    const setFollowerX = gsap.quickSetter(followerRef.current, 'x', 'px')
    const setFollowerY = gsap.quickSetter(followerRef.current, 'y', 'px')

    const onMove = (e: MouseEvent) => {
      setDotX(e.clientX); setDotY(e.clientY)
      gsap.to({}, { duration: 0.12, onUpdate: () => { setFollowerX(e.clientX); setFollowerY(e.clientY) } })
      gsap.to([dotRef.current, followerRef.current], { opacity: 1, duration: 0.3 })
    }

    const onEnter = () => gsap.to(followerRef.current, { scale: 2.8, duration: 0.3 })
    const onLeave = () => gsap.to(followerRef.current, { scale: 1,   duration: 0.3 })

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .gallery__item').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.querySelectorAll('a, button, .gallery__item').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, { scope: appRef, dependencies: [isLoading] })

  /* ── Scroll animations ── */
  useGSAP(() => {
    if (isLoading) return

    // Fade-up text elements
    gsap.utils.toArray<Element>('.fade-up').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Fade-in (no translate)
    gsap.utils.toArray<Element>('.fade-in').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Character rise — clip-path reveal from bottom
    gsap.utils.toArray<Element>('.char-rise').forEach(el => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: appRef, dependencies: [isLoading] })

  return (
    <div ref={appRef} className="app-container">
      <div className="cursor-dot"      ref={dotRef} />
      <div className="cursor-follower" ref={followerRef} />
      <div className="noise" />

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar />

      <main>
        <Hero />
        <Connect />
        <Manifesto />
        <Architecture />
        <Gallery />
        <Society />
        <Join />
      </main>

      <Footer />
    </div>
  )
}
