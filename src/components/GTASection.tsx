import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface GTASectionProps {
  children: ReactNode;
  bgImage: string;
  actorImage: string;
  id?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export default function GTASection({ children, bgImage, actorImage, id, className, loading = 'lazy' }: GTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = section.getBoundingClientRect();
      
      // Calculate normalized mouse coordinates (-1 to 1)
      const x = ((clientX - left) / width - 0.5) * 2;
      const y = ((clientY - top) / height - 0.5) * 2;

      // Parallax Background (Moves slightly in opposite direction)
      gsap.to(bgRef.current, {
        x: -x * 20,
        y: -y * 20,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Parallax Actor (Moves significantly towards mouse with 3D rotation)
      gsap.to(actorRef.current, {
        x: x * 40,
        y: y * 40,
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to([bgRef.current, actorRef.current], {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power2.out'
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id={id} className={`gta-section ${className || ''}`}>
      {/* Background layer */}
      <div 
        ref={bgRef} 
        className="gta-bg" 
        style={{ backgroundImage: `url("${bgImage}")` }} 
      />
      
      {/* Editorial Mask */}
      <div className="gta-bg-mask" />
      
      {/* Actor layer */}
      <img 
        ref={actorRef} 
        src={actorImage} 
        alt="Actor" 
        className="gta-actor-professional" 
        loading={loading}
      />

      {/* Isolation Wrapper */}
      <div className="content-isolation">
        {children}
      </div>
    </section>
  );
}
