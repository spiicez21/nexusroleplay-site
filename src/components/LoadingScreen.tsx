import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { getAssetManifest, preloadImage } from '../utils/assetLoader'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const assets = getAssetManifest()
    let loadedCount = 0

    const loadAssets = async () => {
      if (assets.length === 0) {
        setAssetsLoaded(true)
        setProgress(100)
        return
      }

      for (const asset of assets) {
        await preloadImage(asset)
        loadedCount++
        setProgress(Math.round((loadedCount / assets.length) * 100))
      }
      setAssetsLoaded(true)
    }

    loadAssets()
  }, [])

  useGSAP(() => {
    // Initial siren loop
    const sirenTl = gsap.timeline({ repeat: -1 })
    sirenTl.to('.red-siren', { opacity: 0.1, duration: 0.1, yoyo: true, repeat: 1 })
           .to('.blue-siren', { opacity: 0.1, duration: 0.1, yoyo: true, repeat: 1 }, "+=0.1")

    // Exit animation when loaded
    if (assetsLoaded) {
      sirenTl.kill()
      
      const exitTl = gsap.timeline({
        onComplete: () => onComplete()
      })

      exitTl.to('.progress-container', { opacity: 0, duration: 0.3 })
            .to(logoRef.current, {
              filter: 'drop-shadow(0 0 30px rgba(230, 34, 34, 1))',
              duration: 0.5
            })
            .to(logoRef.current, {
              scale: 200,
              duration: 1.5,
              ease: 'expo.in'
            })
            .to(containerRef.current, {
              opacity: 0,
              duration: 0.5
            }, "-=0.2")
    }

    // Smooth progress bar update
    gsap.to(progressLineRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power2.out"
    })
  }, { scope: containerRef, dependencies: [assetsLoaded, progress] })

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="siren-overlay red-siren" />
      <div className="siren-overlay blue-siren" />
      
      <div className="loading-content">
        <div ref={logoRef} className="loading-logo glusp">NEXUS CITY</div>
        
        <div className="progress-container">
          <div className="progress-track">
            <div ref={progressLineRef} className="progress-bar" />
          </div>
          <div className="progress-text clash">{progress}%</div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
