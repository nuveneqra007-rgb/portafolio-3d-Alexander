import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AParticleFormation from '../components/AParticleFormation';

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
      {/* Epic Particle Formation */}
      <AParticleFormation />

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
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[
            {
              name: 'TypeScript',
              color: '#3178C6',
              icon: (
                <svg viewBox="0 0 128 128" width="20" height="20">
                  <path fill="#3178C6" d="M22.67 47h99.67v73.67H22.67z"/>
                  <path fill="#fff" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23.04 23.04 0 0180.4 109a27.68 27.68 0 01-3.87-5.24c.2-.15 1-.68 1.8-1.18l5.25-3.06 2.14-1.24a15.39 15.39 0 002.36 3.08c3.35 3.37 7.94 4.28 11.42 2.29a5.09 5.09 0 001.07-7.57c-1.12-1.32-3.26-2.52-8.58-4.73-6.1-2.54-8.71-4.07-11.15-6.57a17.85 17.85 0 01-3.64-6.5 30.54 30.54 0 01-.42-8.07 14.46 14.46 0 017.57-11.67c3-1.76 6.28-2.57 10.84-2.57a21.69 21.69 0 0110.18 2.28zM73.55 64.68h9.41v36.42H73.55z"/>
                  <path fill="#fff" d="M49.36 65.21c3.07-.06 6.14 0 9.21 0v-8.54h30.82v8.54H69v36.42H59.57V65.21z"/>
                </svg>
              ),
            },
            {
              name: 'JavaScript',
              color: '#F7DF1E',
              icon: (
                <svg viewBox="0 0 128 128" width="20" height="20">
                  <path fill="#F7DF1E" d="M2 1h124v124H2z"/>
                  <path d="M116.95 96.4a16.38 16.38 0 00-8-12.73c-3.92-2.28-8.36-3.2-12.61-4.52-2.48-.77-5.17-1.6-6.88-3.73a7.26 7.26 0 01.38-9 8.43 8.43 0 018.77-2.57c3.4 1 5.72 4 6.63 7.28 4.23-2.74 4.23-2.74 7.15-4.68a60.63 60.63 0 00-3-4.57 16 16 0 00-11.26-6.4c-5-.52-10.36.16-14.44 3.23a15.07 15.07 0 00-5.89 15c1.18 4.82 5 8.07 9.3 10.15 5.37 2.48 11.17 3.07 16.47 5.74a7.86 7.86 0 013.6 4.18c1.17 3.78-.4 8.17-3.84 10.18-4.36 2.4-10.17 1.82-14-1.37a14 14 0 01-4.15-6.15c-3.76 2.17-3.76 2.17-7.55 4.35a22.9 22.9 0 005 6.86c6.86 6.3 18.87 7.2 26.53 2.46 4.13-2.73 6.88-7.46 7.14-12.4l.45.49zM66.42 68.36c-2.23-5.13-5.83-9.55-11.53-11.3-4.73-1.34-10.3-.87-14.05 2.63a14.78 14.78 0 00-4 12.56c.7 3.94 3.17 7.17 6.37 9.32 4.7 3.1 10.27 4.08 15.15 6.7a8.84 8.84 0 014.34 5.25c1 3.68-.73 7.9-4.17 9.65-4.17 2-9.47 1.35-13-1.66A14.15 14.15 0 0141 95.3c-3.83 2.23-3.83 2.23-7.67 4.46a24 24 0 005.76 7.55c7.44 6.25 19.75 7 27.58 1.4 3.66-2.77 5.87-7.17 6-11.78.28-6.5-2.73-12.2-8.56-15.1-4.72-2.65-10.16-3.48-14.8-6.27a8.06 8.06 0 01-3.26-4.05c-.77-3.22 1.3-6.87 4.43-7.83 3.88-1.3 7.87.2 10.15 3.4a24 24 0 001.86 2.62z"/>
                </svg>
              ),
            },
            {
              name: 'React',
              color: '#61DAFB',
              icon: (
                <svg viewBox="0 0 128 128" width="20" height="20">
                  <g fill="#61DAFB">
                    <circle cx="64" cy="64" r="11.4"/>
                    <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2 2.3-4.1 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.1 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2-2.3 4.1-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"/>
                  </g>
                </svg>
              ),
            },
            {
              name: 'Vite',
              color: '#BD34FE',
              icon: (
                <svg viewBox="0 0 128 128" width="20" height="20">
                  <defs><linearGradient id="vite-a" x1="6" y1="33" x2="235" y2="344" gradientUnits="userSpaceOnUse" gradientTransform="scale(.25)"><stop offset="0" stopColor="#41D1FF"/><stop offset="1" stopColor="#BD34FE"/></linearGradient><linearGradient id="vite-b" x1="194.65" y1="8.82" x2="236.08" y2="292.99" gradientUnits="userSpaceOnUse" gradientTransform="scale(.25)"><stop offset="0" stopColor="#FFBD4F"/><stop offset="1" stopColor="#FF9640"/></linearGradient></defs>
                  <path d="M124.77 19.15 67.18 115.57a3.68 3.68 0 0 1-6.4-.04L3.12 19.14a3.68 3.68 0 0 1 3.78-5.36l57.73 10.07a3.72 3.72 0 0 0 1.27 0l56.63-10.06a3.68 3.68 0 0 1 4.24 5.36z" fill="url(#vite-a)"/>
                  <path d="M91.46 1.36 48.58 9.88a1.84 1.84 0 0 0-1.46 1.7l-2.62 44.16a1.84 1.84 0 0 0 2.24 1.9l12.38-2.86a1.84 1.84 0 0 1 2.2 2.16l-3.67 18a1.84 1.84 0 0 0 2.3 2.13l7.65-2.34a1.84 1.84 0 0 1 2.29 2.13L64.3 100.3c-.43 2.16 2.33 3.33 3.6 1.53l.85-1.2 23.56-47a1.84 1.84 0 0 0-1.97-2.63l-12.88 2.32a1.84 1.84 0 0 1-2.12-2.25l7.68-33.87a1.84 1.84 0 0 0-2.12-2.25l-.16.03z" fill="url(#vite-b)"/>
                </svg>
              ),
            },
            {
              name: 'CSS3',
              color: '#1572B6',
              icon: (
                <svg viewBox="0 0 128 128" width="20" height="20">
                  <path fill="#1572B6" d="M18.81 95.03L8.62 4h110.76l-10.2 90.96L64.01 124z"/>
                  <path fill="#33A9DC" d="M64 112.9l36.95-10.24L109 13.4H64z"/>
                  <path fill="#fff" d="M64 51.07h18.68l1.33-14.7H64V22.4h34.22L97.88 26l-3.49 38.07H64zm0 41.17l-.07.02-15.72-4.25-.99-11.31H33.1l1.96 22 28.87 8.02.07-.02z"/>
                  <path fill="#EBEBEB" d="M64 51.07v14h-17.3l-1.43-14H64zm0-28.67v13.97H30.62l-.42-4.48-.87-9.49H64z"/>
                </svg>
              ),
            },
          ].map((tech) => (
            <div
              key={tech.name}
              className="group relative flex items-center gap-2.5 px-5 py-2.5 font-body text-xs uppercase tracking-wider cursor-default overflow-hidden"
              style={{
                border: '1px solid rgba(176, 224, 230, 0.12)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.75)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = `${tech.color}55`;
                el.style.backgroundColor = `${tech.color}10`;
                el.style.boxShadow = `0 0 25px ${tech.color}20, 0 0 50px ${tech.color}10, inset 0 0 25px ${tech.color}08`;
                el.style.transform = 'translateY(-3px) scale(1.05)';
                el.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(176, 224, 230, 0.12)';
                el.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0) scale(1)';
                el.style.color = 'rgba(255, 255, 255, 0.75)';
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(105deg, transparent 40%, ${tech.color}15 45%, ${tech.color}25 50%, ${tech.color}15 55%, transparent 60%)`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite linear',
                  transition: 'opacity 0.4s ease',
                }}
              />
              <span className="relative z-10 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.2))' }}>
                {tech.icon}
              </span>
              <span className="relative z-10">{tech.name}</span>
            </div>
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
