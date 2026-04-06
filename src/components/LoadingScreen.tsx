import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { getAssetManifest, preloadImage } from '../utils/assetLoader'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const assets = getAssetManifest()
    let loadedCount = 0

    const loadAssets = async () => {
      if (assets.length === 0) {
        setAssetsLoaded(true)
        return
      }

      for (const asset of assets) {
        await preloadImage(asset)
        loadedCount++
      }
      setAssetsLoaded(true)
    }

    loadAssets()
  }, [])

  useGSAP(() => {
    // Initial siren loop
    const sirenTl = gsap.timeline({ repeat: -1 })
    sirenTl.to('.red-siren', { opacity: 0.2, duration: 0.1, yoyo: true, repeat: 1 })
           .to('.blue-siren', { opacity: 0.2, duration: 0.1, yoyo: true, repeat: 1 }, "+=0.1")

    // Hero Logo Entrance
    gsap.fromTo(logoRef.current, 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" }
    )

    // Exit animation when loaded (with intentional delay)
    if (assetsLoaded) {
      sirenTl.kill()
      
      const exitTl = gsap.timeline({
        delay: 0.8, // Strategic delay for a smoother reveal after 100% load
        onComplete: () => onComplete()
      })

      exitTl.to(logoRef.current, {
              scale: 100,
              filter: 'brightness(3) blur(10px)',
              duration: 1.5,
              ease: 'power2.in'
            })
            .to(containerRef.current, {
              opacity: 0,
              duration: 0.5
            }, "-=0.2")
    }
  }, { scope: containerRef, dependencies: [assetsLoaded] })

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="siren-overlay red-siren" />
      <div className="siren-overlay blue-siren" />
      
      <div className="loading-content">
        <div ref={logoRef} className="loading-logo glusp fw-bold">NEXUS CITY</div>
      </div>
    </div>
  )
}

export default LoadingScreen
