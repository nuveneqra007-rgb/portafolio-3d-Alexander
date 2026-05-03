import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleCanvas from '../components/ParticleCanvas';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 }); // Wait for preloader

    // Title animation
    const titleChars = titleRef.current?.querySelectorAll('.title-char');
    if (titleChars) {
      tl.fromTo(
        titleChars,
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: 'power4.out',
        }
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.3'
    );

    // Decorative elements
    tl.fromTo(
      decorRef.current?.children || [],
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.8'
    );

    return () => { tl.kill(); };
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
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(176, 224, 230, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Decorative elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-[15%] left-[10%] w-16 h-16 border-l-2 border-t-2" style={{ borderColor: 'rgba(176, 224, 230, 0.2)' }} />
        <div className="absolute top-[15%] right-[10%] w-16 h-16 border-r-2 border-t-2" style={{ borderColor: 'rgba(176, 224, 230, 0.2)' }} />
        <div className="absolute bottom-[15%] left-[10%] w-16 h-16 border-l-2 border-b-2" style={{ borderColor: 'rgba(176, 224, 230, 0.2)' }} />
        <div className="absolute bottom-[15%] right-[10%] w-16 h-16 border-r-2 border-b-2" style={{ borderColor: 'rgba(176, 224, 230, 0.2)' }} />

        {/* Floating orbs */}
        <div
          className="absolute top-[20%] right-[20%] w-2 h-2 rounded-full animate-float"
          style={{ backgroundColor: '#B0E0E6', boxShadow: '0 0 20px rgba(176, 224, 230, 0.5)' }}
        />
        <div
          className="absolute bottom-[25%] left-[15%] w-3 h-3 rounded-full animate-float"
          style={{
            backgroundColor: '#B0E0E6',
            boxShadow: '0 0 30px rgba(176, 224, 230, 0.4)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute top-[60%] right-[15%] w-1.5 h-1.5 rounded-full animate-float"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Eyebrow text */}
        <div
          className="font-body text-xs uppercase tracking-[0.4em] mb-6"
          style={{ color: 'rgba(176, 224, 230, 0.7)' }}
        >
          Portfolio De
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display font-bold tracking-tight leading-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            perspective: '1000px',
          }}
        >
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="title-char inline-block"
              style={{
                color: '#ffffff',
                textShadow: '0 0 60px rgba(176, 224, 230, 0.2)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body mt-6 lg:mt-8 tracking-[0.2em] uppercase"
          style={{
            fontSize: 'clamp(0.75rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.6)',
            opacity: 0,
          }}
        >
          Frontend Developer
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {['TypeScript', 'CSS', 'JavaScript', 'React', 'React + Vite'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 text-xs font-body uppercase tracking-wider border"
              style={{
                borderColor: 'rgba(176, 224, 230, 0.15)',
                color: 'rgba(176, 224, 230, 0.7)',
                backgroundColor: 'rgba(176, 224, 230, 0.03)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        onClick={handleScrollClick}
        style={{ opacity: 0 }}
        data-cursor-hover
      >
        <span
          className="font-body text-[10px] uppercase tracking-[0.3em]"
          style={{ color: 'rgba(255, 255, 255, 0.4)' }}
        >
          Scroll to explore
        </span>
        <div
          className="w-6 h-10 rounded-full border flex items-start justify-center p-1.5"
          style={{ borderColor: 'rgba(176, 224, 230, 0.3)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              backgroundColor: '#B0E0E6',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Side text */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        <span
          className="font-body text-[10px] uppercase tracking-[0.3em]"
          style={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          Based in Worldwide • Available for freelance
        </span>
      </div>

      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        <span
          className="font-body text-[10px] uppercase tracking-[0.3em]"
          style={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          Scroll to discover
        </span>
      </div>
    </section>
  );
}
