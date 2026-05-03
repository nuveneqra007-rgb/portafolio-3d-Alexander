import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress
    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.val));
      },
    });

    // Text reveal animation - character by character
    const chars = textRef.current?.querySelectorAll('.char');
    if (chars) {
      tl.fromTo(
        chars,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          stagger: 0.05,
          ease: 'power3.out',
        },
        0.2
      );
    }

    // Exit animation
    tl.to(containerRef.current, {
      clipPath: 'inset(0 0 0 100%)',
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: () => {
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const text = 'DEVELOPER';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#000000',
        clipPath: 'inset(0 0 0 0)',
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(176, 224, 230, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176, 224, 230, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glitch lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: '1px',
              top: `${20 + i * 15}%`,
              background: 'linear-gradient(90deg, transparent, rgba(176, 224, 230, 0.3), transparent)',
              animation: `pulse-glow ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main text */}
      <div
        ref={textRef}
        className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-[0.2em] relative z-10"
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="char inline-block"
            style={{
              color: '#ffffff',
              textShadow: '0 0 40px rgba(176, 224, 230, 0.5)',
            }}
          >
            {char}
          </span>
        ))}
        <span
          className="char inline-block animate-pulse"
          style={{
            color: '#B0E0E6',
            textShadow: '0 0 40px rgba(176, 224, 230, 0.8)',
          }}
        >
          ...
        </span>
      </div>

      {/* Subtitle */}
      <div
        className="mt-8 font-body text-xs uppercase tracking-[0.3em]"
        style={{ color: 'rgba(176, 224, 230, 0.6)' }}
      >
        Initializing Experience
      </div>

      {/* Progress bar */}
      <div className="mt-12 w-64 h-px relative overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${progress}%`,
            backgroundColor: '#B0E0E6',
            boxShadow: '0 0 20px rgba(176, 224, 230, 0.5)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Progress percentage */}
      <div
        className="mt-4 font-display text-sm tabular-nums"
        style={{ color: 'rgba(176, 224, 230, 0.5)' }}
      >
        {progress}%
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t" style={{ borderColor: 'rgba(176, 224, 230, 0.3)' }} />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t" style={{ borderColor: 'rgba(176, 224, 230, 0.3)' }} />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b" style={{ borderColor: 'rgba(176, 224, 230, 0.3)' }} />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b" style={{ borderColor: 'rgba(176, 224, 230, 0.3)' }} />
    </div>
  );
}
