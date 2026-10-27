import { useEffect, useRef } from 'react';

interface MouseState {
  x: number;
  y: number;
  radius: number;
  radiusSq: number;
}

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  density: number;
  ease: number;

  constructor(x: number, y: number, baseX: number, baseY: number) {
    this.x = x;
    this.y = y;
    this.baseX = baseX;
    this.baseY = baseY;
    this.size = Math.random() * 1.5 + 0.5; // Size between 0.5 and 2
    this.density = Math.random() * 40 + 5;
    this.ease = 0.05 + Math.random() * 0.05;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(176, 224, 230, 0.7)';
    // fillRect is exponentially faster than arc() and shadowBlur for 120fps
    ctx.fillRect(this.x, this.y, this.size * 2, this.size * 2);
  }

  update(mouse: MouseState) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distanceSq = dx * dx + dy * dy;

    // Fast square check before expensive Math.sqrt
    if (distanceSq < mouse.radiusSq) {
      const distance = Math.sqrt(distanceSq);
      // Repel from mouse
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;

      this.x -= directionX;
      this.y -= directionY;
    } else {
      // Spring back to base position
      if (this.x !== this.baseX) {
        const dxBase = this.baseX - this.x;
        this.x += dxBase * this.ease;
      }
      if (this.y !== this.baseY) {
        const dyBase = this.baseY - this.y;
        this.y += dyBase * this.ease;
      }
    }
  }
}

export default function AParticleFormation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    const numParticles = 1500; // Optimal balance between density and 120fps

    const mouse: MouseState = {
      x: -1000,
      y: -1000,
      radius: 150, // Interaction radius
      radiusSq: 150 * 150, // Precomputed square
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particlesArray = [];

      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCanvas.width = window.innerWidth;
      offCanvas.height = window.innerHeight;

      // Approximate the clamp(3rem, 12vw, 10rem) font size in pixels
      const vw = window.innerWidth;
      let fontSize = vw * 0.12;
      if (fontSize < 48) fontSize = 48; // 3rem
      if (fontSize > 160) fontSize = 160; // 10rem

      offCtx.fillStyle = 'white';
      offCtx.font = `bold ${fontSize}px sans-serif`;
      if ('letterSpacing' in offCtx) {
        (offCtx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '-0.05em'; // match tracking-tight
      }
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      
      // Draw text exactly in the center, slightly shifted up to match the DOM visual center
      offCtx.fillText('ALEXANDER', offCanvas.width / 2, offCanvas.height / 2);

      const textData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      
      const points: { x: number; y: number }[] = [];
      const step = 4; // Smaller step for more dense sampling on a larger word
      for (let y = 0; y < textData.height; y += step) {
        for (let x = 0; x < textData.width; x += step) {
          const index = (y * textData.width + x) * 4;
          const alpha = textData.data[index + 3];

          if (alpha > 128) {
            points.push({ x, y });
          }
        }
      }

      points.sort(() => Math.random() - 0.5);

      for (let i = 0; i < numParticles; i++) {
        let pt = points[i % points.length];
        if (!pt) {
           pt = { x: canvas.width / 2, y: canvas.height / 2 };
        }
        
        // Distribute start positions in a big sphere/cloud around the canvas
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(canvas.width, canvas.height);
        const startX = canvas.width / 2 + Math.cos(angle) * dist;
        const startY = canvas.height / 2 + Math.sin(angle) * dist;

        particlesArray.push(new Particle(startX, startY, pt.x, pt.y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw(ctx);
        particlesArray[i].update(mouse);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Delay init slightly so it forms after the main text GSAP animation
    const initTimer = setTimeout(() => {
      init();
      animate();
    }, 1000);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
      style={{ zIndex: 1 }}
    />
  );
}
