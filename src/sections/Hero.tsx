import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type Lenis from 'lenis';
import HeroParticlesCanvas from '../components/HeroParticlesCanvas';
import HeroFloatingIcons from '../components/HeroFloatingIcons';

interface HeroProps {
  lenisRef: React.RefObject<Lenis | null>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    const titleChars = titleRef.current?.querySelectorAll('.title-char');
    if (titleChars) {
      tl.fromTo(
        titleChars,
        { opacity: 0, y: 80, rotateX: -85 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.04,
          ease: 'power4.out',
        },
        '-=0.45'
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.55'
    );

    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleScrollClick = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#about', { duration: 1.5 });
    }
  };

  const titleText = 'ALEXANDER';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* GSAP Canvas Particles (autonomous lifecycle, no mouse interaction) */}
      <HeroParticlesCanvas />

      {/* CSS Floating Stack Icons (autonomous lifecycle, no mouse interaction) */}
      <HeroFloatingIcons />

      {/* Subtle central vignette & glow for clean readability */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '680px',
          height: '460px',
          background:
            'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.78) 0%, rgba(176, 224, 230, 0.04) 48%, transparent 75%)',
          zIndex: 5,
        }}
      />

      {/* Minimalist Main Content */}
      <div className="relative z-10 text-center px-4">
        <p
          ref={welcomeRef}
          className="font-body text-xs sm:text-sm uppercase tracking-[0.38em] mb-4"
          style={{ color: 'rgba(176, 224, 230, 0.8)', opacity: 0 }}
        >
          Hello, I am
        </p>

        <h1
          ref={titleRef}
          className="font-display font-bold tracking-tight leading-none"
          style={{
            fontSize: 'clamp(3rem, 11.5vw, 9.5rem)',
            perspective: '1000px',
          }}
        >
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="title-char inline-block"
              style={{
                color: '#ffffff',
                textShadow: '0 0 60px rgba(176, 224, 230, 0.22)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-body mt-5 sm:mt-6 tracking-[0.28em] uppercase text-xs sm:text-sm lg:text-base font-medium"
          style={{
            color: 'rgba(255, 255, 255, 0.72)',
            opacity: 0,
          }}
        >
          Full-Stack Developer
        </p>
      </div>

      {/* Minimal Scroll Indicator */}
      <button
        type="button"
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        aria-label="Ir a la sección Sobre mí"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 cursor-pointer bg-transparent border-0 p-2"
        style={{ opacity: 0 }}
      >
        <div
          className="w-6 h-10 rounded-full border flex items-start justify-center p-1.5 transition-colors duration-300 hover:border-[#B0E0E6]"
          style={{ borderColor: 'rgba(176, 224, 230, 0.35)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              backgroundColor: '#B0E0E6',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </button>
    </section>
  );
}
