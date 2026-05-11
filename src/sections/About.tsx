import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '2+', label: 'Año de Experiencia' },
  { value: '13+', label: 'Proyectos Completados' },
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
              Transformo ideas
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #B0E0E6 0%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                en experiencias,
              </span>
              digitales.
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

          {/* Right column - Hacker Terminal Card */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div ref={textRef} className="relative w-full max-w-2xl mt-8 lg:mt-0 z-10" data-cursor-hover>

              {/* The Hacker Terminal */}
              <div
                className="hacker-terminal relative rounded-lg overflow-hidden border w-full"
                style={{
                  borderColor: 'rgba(0, 255, 65, 0.15)',
                  backgroundColor: '#0a0a0a',
                  boxShadow: '0 0 40px rgba(0, 255, 65, 0.07), 0 0 80px rgba(0, 255, 65, 0.03), 0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(0, 255, 65, 0.1)',
                  opacity: 0, // for GSAP
                }}
              >
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.015) 2px, rgba(0, 255, 65, 0.015) 4px)',
                  }}
                />
                {/* CRT flicker overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                  }}
                />

                {/* Terminal Header */}
                <div
                  className="flex items-center px-4 py-2.5 border-b"
                  style={{
                    borderColor: 'rgba(0, 255, 65, 0.1)',
                    backgroundColor: 'rgba(0, 255, 65, 0.03)',
                  }}
                >
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56', boxShadow: '0 0 6px rgba(255, 95, 86, 0.5)' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e', boxShadow: '0 0 6px rgba(255, 189, 46, 0.5)' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f', boxShadow: '0 0 6px rgba(39, 201, 63, 0.5)' }} />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(0, 255, 65, 0.5)' }}>
                      ⌘ root@alexander
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(0, 255, 65, 0.3)' }}>—</span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(0, 255, 65, 0.35)' }}>
                      ~/portfolio/config.ts
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00ff41', animation: 'terminalPulse 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(0, 255, 65, 0.6)' }} />
                    <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(0, 255, 65, 0.4)' }}>live</span>
                  </div>
                </div>

                {/* Tab Bar */}
                <div className="flex border-b" style={{ borderColor: 'rgba(0, 255, 65, 0.06)', backgroundColor: 'rgba(0, 255, 65, 0.01)' }}>
                  <div className="px-4 py-1.5 font-mono text-[10px] tracking-wider border-b-2" style={{ color: 'rgba(0, 255, 65, 0.7)', borderColor: '#00ff41' }}>
                    config.ts
                  </div>
                  <div className="px-4 py-1.5 font-mono text-[10px] tracking-wider" style={{ color: 'rgba(0, 255, 65, 0.2)' }}>
                    skills.ts
                  </div>
                  <div className="px-4 py-1.5 font-mono text-[10px] tracking-wider" style={{ color: 'rgba(0, 255, 65, 0.2)' }}>
                    deploy.sh
                  </div>
                </div>

                {/* Terminal Body with line numbers */}
                <div className="relative p-0 font-mono text-[12px] sm:text-[13px] md:text-sm overflow-x-auto" style={{ backgroundColor: '#0a0a0a' }}>
                  {/* Terminal prompt header */}
                  <div className="px-4 pt-4 pb-2 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0, 255, 65, 0.05)' }}>
                    <span style={{ color: '#00ff41' }}>❯</span>
                    <span style={{ color: 'rgba(0, 255, 65, 0.5)' }}>cat</span>
                    <span style={{ color: 'rgba(0, 255, 65, 0.7)' }}>developer.config</span>
                    <span
                      className="inline-block w-2 h-4 ml-1"
                      style={{
                        backgroundColor: '#00ff41',
                        animation: 'cursorBlink 1s step-end infinite',
                        boxShadow: '0 0 8px rgba(0, 255, 65, 0.5)',
                      }}
                    />
                  </div>

                  {/* Code lines with line numbers */}
                  <div className="flex">
                    {/* Line numbers gutter */}
                    <div className="flex flex-col py-3 pl-3 pr-0 text-right select-none" style={{ minWidth: '44px', borderRight: '1px solid rgba(0, 255, 65, 0.06)' }}>
                      {Array.from({ length: 11 }, (_, i) => (
                        <div key={i} className="leading-7 font-mono text-[11px]" style={{ color: 'rgba(0, 255, 65, 0.2)' }}>
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Code content */}
                    <div className="flex flex-col py-3 pl-4 pr-6">
                      {/* Line 1 - comment */}
                      <div className="leading-7">
                        <span style={{ color: 'rgba(0, 255, 65, 0.25)' }}>{'// '}⚡ Developer Profile Module</span>
                      </div>
                      {/* Line 2 - import */}
                      <div className="leading-7">
                        <span style={{ color: '#ff79c6' }}>import</span> <span style={{ color: '#00ff41' }}>{'{'}</span> <span style={{ color: '#bd93f9' }}>Developer</span> <span style={{ color: '#00ff41' }}>{'}'}</span> <span style={{ color: '#ff79c6' }}>from</span> <span style={{ color: '#f1fa8c' }}>'@core/types'</span><span style={{ color: '#6272a4' }}>;</span>
                      </div>
                      {/* Line 3 - empty */}
                      <div className="leading-7">&nbsp;</div>
                      {/* Line 4 - const declaration */}
                      <div className="leading-7">
                        <span style={{ color: '#ff79c6' }}>export const</span> <span style={{ color: '#50fa7b' }}>dev</span><span style={{ color: '#6272a4' }}>:</span> <span style={{ color: '#bd93f9' }}>Developer</span> <span style={{ color: '#ff79c6' }}>=</span> <span style={{ color: '#f8f8f2' }}>{'{'}</span>
                      </div>
                      {/* Line 5 - nombre */}
                      <div className="leading-7 pl-6">
                        <span style={{ color: '#8be9fd' }}>nombre</span><span style={{ color: '#6272a4' }}>:</span> <span style={{ color: '#f1fa8c' }}>"Alexander"</span><span style={{ color: '#6272a4' }}>,</span>
                      </div>
                      {/* Line 6 - edad */}
                      <div className="leading-7 pl-6">
                        <span style={{ color: '#8be9fd' }}>edad</span><span style={{ color: '#6272a4' }}>:</span> <span style={{ color: '#bd93f9' }}>18</span><span style={{ color: '#6272a4' }}>,</span>
                      </div>
                      {/* Line 7 - rol */}
                      <div className="leading-7 pl-6">
                        <span style={{ color: '#8be9fd' }}>rol</span><span style={{ color: '#6272a4' }}>:</span> <span style={{ color: '#f1fa8c' }}>"Frontend Developer"</span><span style={{ color: '#6272a4' }}>,</span>
                      </div>
                      {/* Line 8 - stack */}
                      <div className="leading-7 pl-6">
                        <span style={{ color: '#8be9fd' }}>stack</span><span style={{ color: '#6272a4' }}>:</span> <span style={{ color: '#f8f8f2' }}>[</span><span style={{ color: '#f1fa8c' }}>"React"</span><span style={{ color: '#6272a4' }}>,</span> <span style={{ color: '#f1fa8c' }}>"TS"</span><span style={{ color: '#6272a4' }}>,</span> <span style={{ color: '#f1fa8c' }}>"Vite"</span><span style={{ color: '#f8f8f2' }}>]</span><span style={{ color: '#6272a4' }}>,</span>
                      </div>
                      {/* Line 9 - status */}
                      <div className="leading-7 pl-6">
                        <span style={{ color: '#8be9fd' }}>status</span><span style={{ color: '#6272a4' }}>:</span> <span style={{ color: '#50fa7b' }}>true</span>
                      </div>
                      {/* Line 10 - close bracket */}
                      <div className="leading-7">
                        <span style={{ color: '#f8f8f2' }}>{'}'}</span><span style={{ color: '#6272a4' }}>;</span>
                      </div>
                      {/* Line 11 - empty with cursor */}
                      <div className="leading-7">
                        <span style={{ color: '#00ff41' }}>❯</span>
                        <span
                          className="inline-block w-2 h-4 ml-1 align-middle"
                          style={{
                            backgroundColor: '#00ff41',
                            animation: 'cursorBlink 1s step-end infinite',
                            boxShadow: '0 0 6px rgba(0, 255, 65, 0.4)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terminal Status Bar */}
                <div
                  className="flex items-center justify-between px-4 py-1.5 border-t font-mono text-[9px] tracking-wider uppercase"
                  style={{
                    borderColor: 'rgba(0, 255, 65, 0.08)',
                    backgroundColor: 'rgba(0, 255, 65, 0.03)',
                    color: 'rgba(0, 255, 65, 0.35)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span style={{ color: '#50fa7b' }}>●</span> NORMAL
                    </span>
                    <span>UTF-8</span>
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Ln 11, Col 1</span>
                    <span>Spaces: 2</span>
                    <span className="flex items-center gap-1">
                      <span style={{ color: '#50fa7b' }}>⬤</span> CONNECTED
                    </span>
                  </div>
                </div>
              </div>

              {/* Hacker Badges */}
              <div
                className="absolute -top-3 -right-1 sm:-top-5 sm:-right-5 md:-top-6 md:-right-6 px-3 py-1.5 rounded-md border flex items-center gap-2 z-20 pointer-events-none"
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.95)',
                  borderColor: 'rgba(0, 255, 65, 0.25)',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.1)',
                  backdropFilter: 'blur(8px)',
                  opacity: 0, // for GSAP
                }}
              >
                <span className="font-mono text-[10px]" style={{ color: '#50fa7b' }}>▸</span>
                <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase" style={{ color: '#00ff41' }}>React 18</span>
              </div>

              <div
                className="absolute -bottom-3 -left-1 sm:-bottom-5 sm:-left-5 md:-bottom-6 md:-left-6 px-3 py-1.5 rounded-md border flex items-center gap-2 z-20 pointer-events-none"
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.95)',
                  borderColor: 'rgba(0, 255, 65, 0.25)',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.1)',
                  backdropFilter: 'blur(8px)',
                  opacity: 0, // for GSAP
                }}
              >
                <span className="font-mono text-[10px]" style={{ color: '#50fa7b' }}>▸</span>
                <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase" style={{ color: '#00ff41' }}>Always Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
