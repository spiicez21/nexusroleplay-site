import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Layout Components
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/sections/Navbar'
import Footer from './components/sections/Footer'

// Section Modules
import Hero from './components/sections/Hero'
import Manifesto from './components/sections/Manifesto'
import Architecture from './components/sections/Architecture'
import Gallery from './components/sections/Gallery'
import Society from './components/sections/Society'
import Join from './components/sections/Join'

import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const appRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      })
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])

  useGSAP(() => {
    if (isLoading) return

    const reveals = gsap.utils.toArray('.reveal-hero, .fade-up')
    reveals.forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      )
    })
  }, { scope: appRef, dependencies: [isLoading] })

  return (
    <div ref={appRef} className="app-container">
      <div className="cursor" ref={cursorRef} />
      <div className="noise" />

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar />

      <main>
        <Hero />
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

export default App
