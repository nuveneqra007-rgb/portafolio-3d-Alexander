import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParticleState {
  x: number;
  y: number;
  radius: number;
  scale: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  timeline?: gsap.core.Timeline;
}

const PARTICLE_COUNT = 36;
const PARTICLE_COLORS = [
  '176, 224, 230', // #B0E0E6
  '255, 255, 255', // #FFFFFF
  '138, 210, 224', // soft cyan
];

export default function HeroParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isUnmounted = false;

    const updateSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    const particles: ParticleState[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1.2 + Math.random() * 1.9,
      scale: prefersReducedMotion ? 1 : 0.4,
      alpha: prefersReducedMotion ? 0.25 : 0,
      maxAlpha: 0.18 + Math.random() * 0.28,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));

    const launchCycle = (p: ParticleState, initialDelay = 0) => {
      if (isUnmounted) return;

      p.x = width * (0.04 + Math.random() * 0.92);
      p.y = height * (0.04 + Math.random() * 0.92);
      p.radius = 1.2 + Math.random() * 1.9;
      p.maxAlpha = 0.18 + Math.random() * 0.28;
      p.alpha = 0;
      p.scale = 0.4;
      p.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

      const totalDuration = 5.5 + Math.random() * 4.5;
      const fadeInDuration = totalDuration * 0.25;
      const fadeOutDuration = totalDuration * 0.28;
      const driftX = (Math.random() - 0.5) * 90;
      const driftY = (Math.random() - 0.5) * 80 - 15;

      p.timeline?.kill();

      const tl = gsap.timeline({
        delay: initialDelay,
        onComplete: () => {
          launchCycle(p, Math.random() * 0.6);
        },
      });

      // Gentle continuous float across the whole lifecycle
      tl.to(
        p,
        {
          x: p.x + driftX,
          y: p.y + driftY,
          duration: totalDuration,
          ease: 'sine.inOut',
        },
        0
      );

      // Fade in from nothing
      tl.to(
        p,
        {
          alpha: p.maxAlpha,
          scale: 1,
          duration: fadeInDuration,
          ease: 'sine.out',
        },
        0
      );

      // Fade out to nothing
      tl.to(
        p,
        {
          alpha: 0,
          scale: 0.45,
          duration: fadeOutDuration,
          ease: 'sine.in',
        },
        totalDuration - fadeOutDuration
      );

      p.timeline = tl;
    };

    if (!prefersReducedMotion) {
      particles.forEach((p, idx) => {
        const staggeredDelay = (idx / PARTICLE_COUNT) * 4.5 + Math.random() * 0.8;
        launchCycle(p, staggeredDelay);
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0.005) continue;

        const r = p.radius * p.scale;

        // Soft outer halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.18})`;
        ctx.fill();

        // Crisp particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      gsap.ticker.add(render);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateSize();
        if (prefersReducedMotion) {
          render();
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isUnmounted = true;
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(render);
      particles.forEach((p) => p.timeline?.kill());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
