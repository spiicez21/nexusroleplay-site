import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Layout Components
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/sections/Navbar'
import Footer from './components/sections/Footer'

// Section Modules
import Hero from './components/sections/Hero'
import Connect from './components/sections/Connect'
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
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // QuickSetters for high performance 
    const setDotX = gsap.quickSetter(dotRef.current, "x", "px")
    const setDotY = gsap.quickSetter(dotRef.current, "y", "px")
    const setFollowerX = gsap.quickSetter(followerRef.current, "x", "px")
    const setFollowerY = gsap.quickSetter(followerRef.current, "y", "px")

    const moveCursor = (e: MouseEvent) => {
      // Physical Dot (0 delay)
      setDotX(e.clientX)
      setDotY(e.clientY)
      
      // Delay Follower (0.15s delay)
      gsap.to({}, {
        duration: 0.15,
        onUpdate: () => {
          setFollowerX(e.clientX)
          setFollowerY(e.clientY)
        }
      })

      // Initial Reveal 
      gsap.to([dotRef.current, followerRef.current], { opacity: 1, duration: 0.3 })
    }

    const handleHover = () => {
      gsap.to(followerRef.current, { scale: 3, backgroundColor: "rgba(230, 34, 34, 0.1)", duration: 0.3 })
      gsap.to(dotRef.current, { scale: 1.5, duration: 0.3 })
    }

    const handleUnhover = () => {
      gsap.to(followerRef.current, { scale: 1, backgroundColor: "transparent", duration: 0.3 })
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
    }

    window.addEventListener("mousemove", moveCursor)
    
    // Attach to all interactive elements
    const interactives = document.querySelectorAll('a, button, .gallery-item, .bento-card')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleUnhover)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleUnhover)
      })
    }
  }, { scope: appRef, dependencies: [isLoading] })

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
      <div className="cursor-dot" ref={dotRef} />
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

export default App
