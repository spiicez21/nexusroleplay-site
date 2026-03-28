import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Initial Appearance
    tl.set('.loading-content', { opacity: 1 })
      .from(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
      })
      .from(textRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=0.8")
      .from('.progress-container', {
        width: 0,
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut'
      }, "-=0.5");

    // Police Siren Animation
    const sirenTl = gsap.timeline({ repeat: -1 });
    sirenTl.to('.siren-red', { opacity: 0.4, duration: 0.05 }) // Increased from 0.15
           .to('.siren-red', { opacity: 0, duration: 0.05 })
           .to('.siren-red', { opacity: 0.4, duration: 0.05 })
           .to('.siren-red', { opacity: 0, duration: 0.5 })
           .to('.siren-blue', { opacity: 0.4, duration: 0.05 }) // Increased from 0.15
           .to('.siren-blue', { opacity: 0, duration: 0.05 })
           .to('.siren-blue', { opacity: 0.4, duration: 0.05 })
           .to('.siren-blue', { opacity: 0, duration: 0.5 });

    // Progress Simulation
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 3, 
      delay: 0.2,
      ease: "power1.inOut",
      onUpdate: () => setProgress(Math.floor(progressObj.value)),
      onComplete: () => {
        // Stop sirens immediately
        sirenTl.kill();

        // The cinematic transition
        const exitTl = gsap.timeline({
          onComplete: () => {
            onComplete();
          }
        });

        // Instant background blackout
        exitTl.set(containerRef.current, { backgroundColor: '#000' })
              .to('.sirens', { opacity: 0, duration: 0.1 }, 0);

        exitTl.to([textRef.current, '.progress-container', '.progress-percentage'], {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(logoRef.current, {
          // Intense Red Filter
          filter: 'brightness(0) invert(21%) sepia(100%) saturate(7413%) hue-rotate(359deg) brightness(94%) contrast(117%)',
          duration: 0.2,
          ease: 'power1.inOut'
        })
        .to(logoRef.current, {
          scale: 200, // Massive zoom
          duration: 1.2, 
          ease: 'expo.in',
          force3D: true,
          transformOrigin: 'center center'
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.4
        }, "-=0.2");
      }
    });

    // Animate progress bar visual
    gsap.to(progressLineRef.current, {
      width: "100%",
      duration: 3,
      delay: 0.2,
      ease: "power1.inOut"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="sirens">
        <div className="siren siren-red"></div>
        <div className="siren siren-blue"></div>
      </div>
      <div className="loading-content">
        <div className="logo-wrapper">
            <img ref={logoRef} src="/Logo/logo.svg" alt="Nexus Logo" className="loading-logo" />
        </div>
        <h2 ref={textRef} className="loading-text glusp">
          Nexus City Roleplay
        </h2>
        <div className="progress-container">
          <div ref={progressLineRef} className="progress-line"></div>
        </div>
        <div className="progress-percentage glusp">{progress}%</div>
      </div>
    </div>
  );
}
