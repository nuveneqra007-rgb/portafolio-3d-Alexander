import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '1+', label: 'Año de Experiencia' },
  { value: '12+', label: 'Proyectos Completados' },
  { value: '100%', label: 'Tasa de Éxito' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Code Card animation
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >


      {/* Background gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0, 0, 139, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span
            className="font-body text-xs uppercase tracking-[0.3em]"
            style={{ color: 'rgba(176, 224, 230, 0.6)' }}
          >
            01
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(176, 224, 230, 0.1)' }} />
          <span
            className="font-body text-xs uppercase tracking-[0.3em]"
            style={{ color: 'rgba(176, 224, 230, 0.6)' }}
          >
            Sobre mí
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left column - Heading */}
          <div className="lg:col-span-5">
            <h2
              ref={headingRef}
              className="font-display font-bold leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#ffffff',
                opacity: 0,
              }}
            >
              Construyo el
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #B0E0E6 0%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                futuro digital,
              </span>
              línea a línea.
            </h2>

            {/* Stats grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4 mt-12"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 border glow-border"
                  style={{
                    borderColor: 'rgba(176, 224, 230, 0.1)',
                    backgroundColor: 'rgba(176, 224, 230, 0.02)',
                    opacity: 0,
                  }}
                >
                  <div
                    className="font-display text-3xl lg:text-4xl font-bold"
                    style={{ color: '#B0E0E6' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-body text-xs mt-2 uppercase tracking-wider"
                    style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Code Card */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div ref={textRef} className="relative w-full max-w-2xl mt-8 lg:mt-0 z-10" data-cursor-hover>
              
              {/* The Card */}
              <div 
                className="relative rounded-xl overflow-hidden border transition-all duration-500 hover:border-[rgba(176,224,230,0.3)] w-full"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  backgroundColor: '#16161e',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  opacity: 0, // for GSAP
                }}
              >
                {/* Window Header */}
                <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: '#1a1a24' }}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 text-center font-mono text-xs text-gray-500 font-semibold tracking-wider">
                    alexander.jsx
                  </div>
                </div>
                
                {/* Window Body */}
                <div className="p-6 md:p-8 font-mono text-[13px] sm:text-sm md:text-base overflow-x-auto">
                  <div className="flex flex-col gap-2.5 min-w-max">
                    <div>
                      <span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#d2a8ff' }}>developer</span> <span style={{ color: '#56b6c2' }}>=</span> <span style={{ color: '#abb2bf' }}>{'{'}</span>
                    </div>
                    <div className="pl-6 md:pl-8">
                      <span style={{ color: '#56b6c2' }}>nombre</span><span style={{ color: '#abb2bf' }}>:</span> <span style={{ color: '#98c379' }}>"Alexander"</span><span style={{ color: '#abb2bf' }}>,</span>
                    </div>
                    <div className="pl-6 md:pl-8">
                      <span style={{ color: '#56b6c2' }}>edad</span><span style={{ color: '#abb2bf' }}>:</span> <span style={{ color: '#d19a66' }}>18</span><span style={{ color: '#abb2bf' }}>,</span>
                    </div>
                    <div className="pl-6 md:pl-8">
                      <span style={{ color: '#56b6c2' }}>rol</span><span style={{ color: '#abb2bf' }}>:</span> <span style={{ color: '#98c379' }}>"Frontend Dev"</span><span style={{ color: '#abb2bf' }}>,</span>
                    </div>
                    <div className="pl-6 md:pl-8">
                      <span style={{ color: '#56b6c2' }}>stack</span><span style={{ color: '#abb2bf' }}>:</span> <span style={{ color: '#abb2bf' }}>[</span>
                    </div>
                    <div className="pl-12 md:pl-16">
                      <span style={{ color: '#98c379' }}>"React"</span><span style={{ color: '#abb2bf' }}>,</span> <span style={{ color: '#98c379' }}>"JS"</span><span style={{ color: '#abb2bf' }}>,</span> <span style={{ color: '#98c379' }}>"CSS"</span>
                    </div>
                    <div className="pl-6 md:pl-8">
                      <span style={{ color: '#abb2bf' }}>]</span><span style={{ color: '#abb2bf' }}>,</span>
                    </div>
                    <div className="pl-6 md:pl-8">
                      <span style={{ color: '#56b6c2' }}>disponible</span><span style={{ color: '#abb2bf' }}>:</span> <span style={{ color: '#e06c75' }}>true</span>
                    </div>
                    <div>
                      <span style={{ color: '#abb2bf' }}>{'}'}</span><span style={{ color: '#abb2bf' }}>;</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div 
                className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 md:-top-8 md:-right-8 px-4 py-2 rounded-full border shadow-xl flex items-center gap-2 z-20 pointer-events-none"
                style={{
                  backgroundColor: '#1e1e2e',
                  borderColor: 'rgba(255, 184, 108, 0.3)',
                  opacity: 0, // for GSAP
                }}
              >
                <span>⚡</span>
                <span className="font-mono text-xs sm:text-sm font-semibold" style={{ color: '#ffb86c' }}>React 18</span>
              </div>
              
              <div 
                className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 md:-bottom-8 md:-left-8 px-4 py-2 rounded-full border shadow-xl flex items-center gap-2 z-20 pointer-events-none"
                style={{
                  backgroundColor: '#1e1e2e',
                  borderColor: 'rgba(130, 170, 255, 0.3)',
                  opacity: 0, // for GSAP
                }}
              >
                <span>🚀</span>
                <span className="font-mono text-xs sm:text-sm font-semibold" style={{ color: '#82aaff' }}>Aprendizaje continuo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
