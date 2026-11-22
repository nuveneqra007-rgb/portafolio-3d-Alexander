import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ShieldCheck } from 'lucide-react';

interface CodeToken {
  text: string;
  color: string;
}

const CODE_LINES: CodeToken[][] = [
  [{ text: '// alexander_profile.ts', color: 'rgba(0, 255, 65, 0.42)' }],
  [
    { text: 'export const ', color: '#ff79c6' },
    { text: 'alexander', color: '#00ff41' },
    { text: ' = {', color: '#e2e8f0' },
  ],
  [
    { text: '  role', color: '#7ee8fa' },
    { text: ': ', color: '#94a3b8' },
    { text: '"Full-Stack Developer & Game Dev"', color: '#f1fa8c' },
    { text: ',', color: '#94a3b8' },
  ],
  [
    { text: '  education', color: '#7ee8fa' },
    { text: ': ', color: '#94a3b8' },
    { text: '"Cybersecurity Student"', color: '#f1fa8c' },
    { text: ',', color: '#94a3b8' },
  ],
  [
    { text: '  passions', color: '#7ee8fa' },
    { text: ': [', color: '#94a3b8' },
    { text: '"Clean Code"', color: '#00ff41' },
    { text: ', ', color: '#94a3b8' },
    { text: '"3D Web"', color: '#00ff41' },
    { text: ', ', color: '#94a3b8' },
    { text: '"Ethical Hacking"', color: '#00ff41' },
    { text: '],', color: '#94a3b8' },
  ],
  [
    { text: '  about', color: '#7ee8fa' },
    { text: ':', color: '#94a3b8' },
  ],
  [
    { text: '    "Construyo sistemas Full-Stack, videojuegos 2D/3D y"', color: '#b0e0e6' },
  ],
  [
    { text: '    + " herramientas de ciberseguridad orientadas a código limpio."', color: '#b0e0e6' },
  ],
  [{ text: '};', color: '#e2e8f0' }],
];

const TOTAL_CHARS = CODE_LINES.reduce(
  (acc, line, idx) => acc + line.reduce((s, tok) => s + tok.text.length, 0) + (idx < CODE_LINES.length - 1 ? 1 : 0),
  0
);

function AboutSpaceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || 720;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const stars = Array.from({ length: 34 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.9 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      phase: Math.random() * Math.PI * 2,
      speed: 0.012 + Math.random() * 0.015,
      color: i % 3 === 0 ? '0, 255, 65' : '176, 224, 230',
    }));

    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.x += s.vx;
          s.y += s.vy;
          s.phase += s.speed;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;
        }
        const alpha = prefersReducedMotion ? 0.22 : 0.12 + ((Math.sin(s.phase) + 1) / 2) * 0.28;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
        ctx.fill();
      }
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    window.addEventListener('resize', resize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

const CUBE_FACES = [
  { name: 'front', transform: 'translateZ(72px)' },
  { name: 'back', transform: 'rotateY(180deg) translateZ(72px)' },
  { name: 'right', transform: 'rotateY(90deg) translateZ(72px)' },
  { name: 'left', transform: 'rotateY(-90deg) translateZ(72px)' },
  { name: 'top', transform: 'rotateX(90deg) translateZ(72px)' },
  { name: 'bottom', transform: 'rotateX(-90deg) translateZ(72px)' },
];

const INNER_CUBE_FACES = [
  { name: 'front', transform: 'translateZ(38px)' },
  { name: 'back', transform: 'rotateY(180deg) translateZ(38px)' },
  { name: 'right', transform: 'rotateY(90deg) translateZ(38px)' },
  { name: 'left', transform: 'rotateY(-90deg) translateZ(38px)' },
  { name: 'top', transform: 'rotateX(90deg) translateZ(38px)' },
  { name: 'bottom', transform: 'rotateX(-90deg) translateZ(38px)' },
];

export default function About() {
  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [hasEntered, setHasEntered] = useState(prefersReducedMotion);
  const [typedCount, setTypedCount] = useState(() => (prefersReducedMotion ? TOTAL_CHARS : 0));

  useEffect(() => {
    if (!hasEntered || prefersReducedMotion) return;
    if (typedCount >= TOTAL_CHARS) return;

    const timer = setTimeout(() => {
      setTypedCount((prev) => Math.min(TOTAL_CHARS, prev + 2));
    }, 24);

    return () => clearTimeout(timer);
  }, [hasEntered, prefersReducedMotion, typedCount]);

  const handleReplay = () => {
    if (prefersReducedMotion) return;
    setTypedCount(0);
    setHasEntered(true);
  };

  const renderedLines = useMemo(() => {
    let remaining = typedCount;
    const lines: { lineIdx: number; tokens: CodeToken[]; showCursor: boolean }[] = [];

    for (let i = 0; i < CODE_LINES.length; i++) {
      const lineTokens = CODE_LINES[i];
      if (remaining <= 0 && i > 0) break;

      const visibleTokens: CodeToken[] = [];
      let lineCharsTotal = 0;
      let lineCharsShown = 0;

      for (const tok of lineTokens) {
        lineCharsTotal += tok.text.length;
        if (remaining > 0) {
          const slice = tok.text.slice(0, remaining);
          visibleTokens.push({ text: slice, color: tok.color });
          lineCharsShown += slice.length;
          remaining -= slice.length;
        }
      }

      const lineCompleted = lineCharsShown >= lineCharsTotal;
      if (lineCompleted && remaining > 0) {
        remaining -= 1; // newline budget
      }

      const isLastVisible =
        !lineCompleted || remaining === 0 || (i === CODE_LINES.length - 1 && typedCount >= TOTAL_CHARS);

      lines.push({
        lineIdx: i,
        tokens: visibleTokens,
        showCursor: isLastVisible,
      });

      if (!lineCompleted) break;
    }

    if (lines.length === 0) {
      lines.push({ lineIdx: 0, tokens: [], showCursor: true });
    }

    return lines;
  }, [typedCount]);

  const isTypingComplete = typedCount >= TOTAL_CHARS;

  return (
    <section
      id="about"
      className="relative w-full py-28 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Subtle Space Particles */}
      <AboutSpaceParticles />

      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 25% 50%, rgba(0, 255, 65, 0.045) 0%, transparent 55%), radial-gradient(ellipse at 78% 50%, rgba(176, 224, 230, 0.06) 0%, transparent 55%)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              className="font-mono text-xs uppercase tracking-[0.3em]"
              style={{ color: 'rgba(0, 255, 65, 0.75)' }}
            >
              01
            </span>
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(90deg, rgba(0, 255, 65, 0.35), rgba(176, 224, 230, 0.1))' }}
            />
            <span
              className="font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: 'rgba(176, 224, 230, 0.7)' }}
            >
              Sobre mí
            </span>
          </div>

          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 4rem)', color: '#ffffff' }}
          >
            Sobre{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00ff41 0%, #B0E0E6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              mí
            </span>
          </h2>
        </motion.div>

        {/* Two-column layout (stacks on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: VS Code Terminal Window (alexander_profile.ts) */}
          <motion.div
            className="lg:col-span-7 w-full max-w-full min-w-0"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            onViewportEnter={() => setHasEntered(true)}
          >
            <div
              className="relative w-full max-w-full rounded-xl overflow-hidden border"
              style={{
                backgroundColor: '#070a0d',
                borderColor: 'rgba(0, 255, 65, 0.22)',
                boxShadow:
                  '0 0 40px rgba(0, 255, 65, 0.08), 0 0 80px rgba(176, 224, 230, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.9)',
              }}
            >
              {/* Subtle scanline texture */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.015) 2px, rgba(0, 255, 65, 0.015) 4px)',
                }}
              />

              {/* VS Code Titlebar */}
              <div
                className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b"
                style={{
                  backgroundColor: 'rgba(13, 19, 24, 0.95)',
                  borderColor: 'rgba(176, 224, 230, 0.12)',
                }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                </div>

                <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs min-w-0">
                  <span
                    className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold shrink-0"
                    style={{ backgroundColor: 'rgba(49, 120, 198, 0.22)', color: '#60a5fa' }}
                  >
                    TS
                  </span>
                  <span className="text-white/85 tracking-wide truncate">alexander_profile.ts</span>
                </div>

                <button
                  type="button"
                  onClick={handleReplay}
                  title="Repetir animación de código"
                  aria-label="Repetir animación de máquina de escribir"
                  className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-[#00ff41]/25 text-[#00ff41]/80 hover:text-[#00ff41] hover:border-[#00ff41]/60 transition-colors"
                >
                  <RotateCcw size={11} />
                  <span className="hidden sm:inline">Replay</span>
                </button>
              </div>

              {/* Editor Tab & Path */}
              <div
                className="flex items-center justify-between gap-2 px-3 sm:px-4 py-1.5 border-b font-mono text-[10px] sm:text-[11px]"
                style={{
                  backgroundColor: 'rgba(0, 255, 65, 0.02)',
                  borderColor: 'rgba(0, 255, 65, 0.08)',
                }}
              >
                <span className="text-[#00ff41]/70 truncate min-w-0">
                  src/identity/alexander_profile.ts
                </span>
                <span className="shrink-0 flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#B0E0E6]/65">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isTypingComplete ? '#00ff41' : '#B0E0E6',
                      boxShadow: isTypingComplete
                        ? '0 0 8px rgba(0, 255, 65, 0.8)'
                        : '0 0 8px rgba(176, 224, 230, 0.8)',
                    }}
                  />
                  {isTypingComplete ? 'Ready' : 'Typing...'}
                </span>
              </div>

              {/* Code Body with responsive wrapping & reserved height to avoid CLS */}
              <div className="relative p-3 sm:p-4 md:p-6 font-mono text-[11px] sm:text-xs md:text-sm leading-6 sm:leading-7 overflow-x-auto min-h-[260px] sm:min-h-[292px]">
                {renderedLines.map((line) => (
                  <div key={line.lineIdx} className="flex items-start min-w-0">
                    <span
                      className="select-none text-right pr-2.5 sm:pr-4 shrink-0 w-6 sm:w-9 text-[10px] sm:text-xs"
                      style={{ color: 'rgba(176, 224, 230, 0.25)' }}
                    >
                      {line.lineIdx + 1}
                    </span>
                    <span className="flex-1 min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                      {line.tokens.map((tok, tIdx) => (
                        <span key={tIdx} style={{ color: tok.color }}>
                          {tok.text}
                        </span>
                      ))}
                      {line.showCursor && (
                        <span
                          aria-hidden="true"
                          className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 ml-0.5 align-middle"
                          style={{
                            backgroundColor: '#00ff41',
                            boxShadow: '0 0 10px rgba(0, 255, 65, 0.75)',
                            animation: 'cursorBlink 0.9s step-end infinite',
                          }}
                        />
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Editor Status Bar */}
              <div
                className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 border-t font-mono text-[9px] sm:text-[10px] tracking-wider uppercase"
                style={{
                  backgroundColor: 'rgba(13, 19, 24, 0.9)',
                  borderColor: 'rgba(176, 224, 230, 0.1)',
                  color: 'rgba(176, 224, 230, 0.45)',
                }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-[#00ff41]/80">main*</span>
                  <span>UTF-8</span>
                  <span className="hidden sm:inline">TypeScript</span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span>Ln {renderedLines.length}, Col 1</span>
                  <span className="text-[#B0E0E6]/75">SEC-MODE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Holographic 3D Glass Cube & Orbiting Tech Stack */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center py-8 lg:py-0"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] flex items-center justify-center select-none">
              {/* Outer Hologram Ambient Halo */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0, 255, 65, 0.12) 0%, rgba(176, 224, 230, 0.08) 42%, transparent 72%)',
                  filter: 'blur(12px)',
                }}
              />

              {/* Orbital Track Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-2 sm:inset-3 rounded-full border border-dashed pointer-events-none"
                style={{
                  borderColor: 'rgba(176, 224, 230, 0.22)',
                  boxShadow: 'inset 0 0 30px rgba(0, 255, 65, 0.05)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-9 sm:inset-11 rounded-full border pointer-events-none"
                style={{
                  borderColor: 'rgba(0, 255, 65, 0.14)',
                }}
              />

              {/* Rotating Orbit Container with 4 Tech Icons: React, Node, Python, Cybersecurity Shield */}
              <div className="about-orbit-ring absolute inset-2 sm:inset-3 pointer-events-none">
                {/* Top: React */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div
                    className="about-orbit-item w-11 h-11 rounded-xl flex items-center justify-center border backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(7, 12, 16, 0.88)',
                      borderColor: 'rgba(97, 218, 251, 0.45)',
                      boxShadow: '0 0 18px rgba(97, 218, 251, 0.28)',
                    }}
                    title="React"
                  >
                    <svg viewBox="0 0 128 128" width="22" height="22">
                      <g fill="none" stroke="#61DAFB" strokeWidth="6">
                        <ellipse cx="64" cy="64" rx="50" ry="19" />
                        <ellipse cx="64" cy="64" rx="50" ry="19" transform="rotate(60 64 64)" />
                        <ellipse cx="64" cy="64" rx="50" ry="19" transform="rotate(120 64 64)" />
                      </g>
                      <circle cx="64" cy="64" r="9.5" fill="#61DAFB" />
                    </svg>
                  </div>
                </div>

                {/* Right: Node.js */}
                <div className="absolute top-1/2 -right-5 -translate-y-1/2">
                  <div
                    className="about-orbit-item w-11 h-11 rounded-xl flex items-center justify-center border backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(7, 12, 16, 0.88)',
                      borderColor: 'rgba(0, 255, 65, 0.45)',
                      boxShadow: '0 0 18px rgba(0, 255, 65, 0.26)',
                    }}
                    title="Node.js"
                  >
                    <svg viewBox="0 0 128 128" width="22" height="22">
                      <path fill="#5FA04E" d="M64 8l50 28.8v54.4L64 120 14 91.2V36.8L64 8z" />
                      <path
                        fill="#ffffff"
                        d="M64 31l30 17.3v31.4L64 97 34 79.7V48.3L64 31z"
                        fillOpacity="0.9"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom: Python */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                  <div
                    className="about-orbit-item w-11 h-11 rounded-xl flex items-center justify-center border backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(7, 12, 16, 0.88)',
                      borderColor: 'rgba(255, 212, 59, 0.45)',
                      boxShadow: '0 0 18px rgba(55, 118, 171, 0.35)',
                    }}
                    title="Python"
                  >
                    <svg viewBox="0 0 128 128" width="22" height="22">
                      <path
                        fill="#3776AB"
                        d="M63.4 8C42.5 8 44 17 44 17v13h20v4H34S20 32.5 20 53.5 32 74 32 74h8V62s-.4-12 12-12h21s11-.2 11-11V20s1.7-12-20.6-12zM52 17a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"
                      />
                      <path
                        fill="#FFD43B"
                        d="M64.6 120c20.9 0 19.4-9 19.4-9V98H64v-4h30s14 1.5 14-19.5S96 54 96 54h-8v12s.4 12-12 12H55s-11 .2-11 11v19s-1.7 12 20.6 12zM76 111a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Left: Cybersecurity Shield */}
                <div className="absolute top-1/2 -left-5 -translate-y-1/2">
                  <div
                    className="about-orbit-item w-11 h-11 rounded-xl flex items-center justify-center border backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(7, 12, 16, 0.88)',
                      borderColor: 'rgba(0, 255, 65, 0.55)',
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.32)',
                    }}
                    title="Ciberseguridad"
                  >
                    <ShieldCheck size={22} color="#00ff41" />
                  </div>
                </div>
              </div>

              {/* Floating CSS 3D Glass & Hologram Cube */}
              <div
                className="animate-float flex items-center justify-center"
                style={{ perspective: '900px' }}
              >
                <div className="about-cube-outer relative w-[144px] h-[144px]">
                  {/* Outer Glass Faces */}
                  {CUBE_FACES.map((face) => (
                    <div
                      key={face.name}
                      className="absolute inset-0 flex items-center justify-center border"
                      style={{
                        transform: face.transform,
                        borderColor: 'rgba(176, 224, 230, 0.48)',
                        background:
                          'linear-gradient(135deg, rgba(176, 224, 230, 0.09) 0%, rgba(0, 255, 65, 0.05) 100%)',
                        boxShadow: 'inset 0 0 22px rgba(176, 224, 230, 0.14)',
                        backdropFilter: 'blur(2px)',
                      }}
                    >
                      <div
                        className="w-8 h-8 border border-dashed opacity-45"
                        style={{ borderColor: 'rgba(0, 255, 65, 0.6)' }}
                      />
                    </div>
                  ))}

                  {/* Inner Neon Holographic Core Cube */}
                  <div
                    className="about-cube-inner absolute top-1/2 left-1/2 w-[76px] h-[76px] -ml-[38px] -mt-[38px]"
                  >
                    {INNER_CUBE_FACES.map((face) => (
                      <div
                        key={`inner-${face.name}`}
                        className="absolute inset-0 flex items-center justify-center border"
                        style={{
                          transform: face.transform,
                          borderColor: 'rgba(0, 255, 65, 0.72)',
                          background: 'rgba(0, 255, 65, 0.09)',
                          boxShadow: 'inset 0 0 14px rgba(0, 255, 65, 0.25)',
                        }}
                      >
                        <ShieldCheck size={20} color="#00ff41" className="opacity-70" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
