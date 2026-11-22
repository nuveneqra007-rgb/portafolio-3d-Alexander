import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react';

interface StackIconItem {
  name: string;
  color: string;
  render: (size: number) => ReactNode;
}

const STACK_ICONS: StackIconItem[] = [
  {
    name: 'TypeScript',
    color: '#3178C6',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <rect x="6" y="6" width="116" height="116" rx="14" fill="#3178C6" />
        <path
          fill="#ffffff"
          d="M28 54h42v10H54v40H43V64H28V54zm46 39.2c3.2 2 7.5 3.4 11.7 3.4 5.5 0 8.5-2.2 8.5-5.6 0-3.1-2.3-4.9-8.3-7.1-8.4-3-13.6-7.4-13.6-14.6 0-8.6 7-14.8 17.8-14.8 5.2 0 9.6 1.1 12.6 2.6l-2.7 9.1c-2.2-1.1-5.6-2.4-9.8-2.4-5 0-7.6 2.2-7.6 4.9 0 3.2 2.7 4.7 9.1 7.1 8.7 3.3 12.9 7.7 12.9 14.9 0 8.6-6.5 15.6-19.1 15.6-5.5 0-11.1-1.5-14.2-3.5l2.7-9.6z"
        />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <rect x="6" y="6" width="116" height="116" rx="14" fill="#F7DF1E" />
        <path
          fill="#111111"
          d="M36 96.5l8.8-5.3c1.7 3 3.3 5.5 7 5.5 3.6 0 5.8-1.4 5.8-6.9V53h11v37c0 11.2-6.6 16.3-16.2 16.3-8.7 0-13.8-4.5-16.4-9.8zm39-1.1l8.8-5.1c2.3 3.8 5.3 6.6 10.6 6.6 4.5 0 7.3-2.2 7.3-5.3 0-3.7-2.9-5-7.8-7.2l-2.7-1.2c-7.8-3.3-13-7.5-13-16.3 0-8.1 6.2-14.3 15.8-14.3 6.9 0 11.8 2.4 15.4 8.7l-8.4 5.4c-1.9-3.3-3.9-4.6-7-4.6-3.2 0-5.2 2-5.2 4.6 0 3.2 2 4.5 6.7 6.6l2.7 1.2c9.2 3.9 14.4 8 14.4 17 0 9.7-7.7 15.1-18 15.1-10.1 0-16.6-4.8-19.6-11.5z"
        />
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <g fill="none" stroke="#61DAFB" strokeWidth="5.5">
          <ellipse cx="64" cy="64" rx="52" ry="20" />
          <ellipse cx="64" cy="64" rx="52" ry="20" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="52" ry="20" transform="rotate(120 64 64)" />
        </g>
        <circle cx="64" cy="64" r="10" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#FFFFFF',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <circle cx="64" cy="64" r="56" fill="#0B0B0B" stroke="#FFFFFF" strokeWidth="5" />
        <path
          fill="#FFFFFF"
          d="M44 40v48h8V53.5L92.5 104c2.7-1.6 5.2-3.5 7.4-5.7L53.5 40H44zm36 0v32.5l8 10.2V40h-8z"
        />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#5FA04E',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <path
          fill="#5FA04E"
          d="M64 8l50 28.8v54.4L64 120 14 91.2V36.8L64 8z"
        />
        <path
          fill="#0B0B0B"
          fillOpacity="0.28"
          d="M64 22l37.5 21.6v40.8L64 106 26.5 84.4V43.6L64 22z"
        />
        <text
          x="64"
          y="74"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="30"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    color: '#38BDF8',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <path
          fill="#38BDF8"
          d="M64 30c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.8 12.2 8.7 6.2 6.3 13.4 13.6 29.4 13.6 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.8-12.2-8.7C87.2 37.3 80 30 64 30zM32 68.4c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.8 12.2 8.7 6.2 6.3 13.4 13.6 29.4 13.6 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.8-12.2-8.7-6.2-6.3-13.4-13.6-29.4-13.6z"
        />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    color: '#009688',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <circle cx="64" cy="64" r="56" fill="#009688" />
        <path fill="#ffffff" d="M69 24L40 68h22l-5 36 31-46H66l3-34z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#3776AB',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <path
          fill="#3776AB"
          d="M63.4 8C42.5 8 44 17 44 17v13h20v4H34S20 32.5 20 53.5 32 74 32 74h8V62s-.4-12 12-12h21s11-.2 11-11V20s1.7-12-20.6-12zM52 17a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"
        />
        <path
          fill="#FFD43B"
          d="M64.6 120c20.9 0 19.4-9 19.4-9V98H64v-4h30s14 1.5 14-19.5S96 54 96 54h-8v12s.4 12-12 12H55s-11 .2-11 11v19s-1.7 12 20.6 12zM76 111a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
        />
      </svg>
    ),
  },
  {
    name: 'Three.js',
    color: '#FFFFFF',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <g fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinejoin="round">
          <path d="M16 112L36 14l78 44z" />
          <path d="M36 14l20 49 58-5M36 14l-20 98 40-49M16 112l78-54-38 5z" />
        </g>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <path
          fill="#336791"
          stroke="#7CB7E8"
          strokeWidth="3.5"
          d="M84 22c-10-4-20-1-20-1s-10-3-20 1c-14 6-22 22-18 42 3 16 10 26 18 28 3 .8 6 0 7-4l1-10c1 10 3 24 12 24 8 0 11-11 12-23l2 10c1 4 4 4.5 7 3.5 8-3 15-13 17-28 3-20-4-36-18-42z"
        />
        <circle cx="51" cy="48" r="4" fill="#ffffff" />
        <circle cx="77" cy="48" r="4" fill="#ffffff" />
        <path
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
          d="M64 60v32c0 8 7 12 13 8"
        />
      </svg>
    ),
  },
  {
    name: 'Git',
    color: '#F05032',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <rect
          x="22"
          y="22"
          width="84"
          height="84"
          rx="12"
          transform="rotate(45 64 64)"
          fill="#F05032"
        />
        <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round">
          <path d="M46 38l36 36M64 56v34" />
        </g>
        <circle cx="64" cy="56" r="8" fill="#ffffff" />
        <circle cx="82" cy="74" r="8" fill="#ffffff" />
        <circle cx="64" cy="90" r="8" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    color: '#E6EDF3',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <path
          fill="#E6EDF3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M64 10C34.2 10 10 34.2 10 64c0 23.9 15.5 44.1 37 51.2 2.7.5 3.7-1.2 3.7-2.6v-9.2c-15 3.3-18.2-7.2-18.2-7.2-2.5-6.2-6-7.9-6-7.9-4.9-3.3.4-3.3.4-3.3 5.4.4 8.3 5.5 8.3 5.5 4.8 8.3 12.6 5.9 15.7 4.5.5-3.5 1.9-5.9 3.4-7.2-12-1.4-24.6-6-24.6-26.7 0-5.9 2.1-10.7 5.5-14.5-.6-1.4-2.4-6.9.5-14.3 0 0 4.5-1.4 14.8 5.5a51.5 51.5 0 0127 0c10.3-7 14.8-5.5 14.8-5.5 2.9 7.4 1.1 12.9.5 14.3 3.4 3.8 5.5 8.6 5.5 14.5 0 20.8-12.7 25.3-24.7 26.6 1.9 1.7 3.7 5 3.7 10v14.8c0 1.4 1 3.1 3.7 2.6 21.4-7.1 36.9-27.3 36.9-51.2C118 34.2 93.8 10 64 10z"
        />
      </svg>
    ),
  },
  {
    name: 'Docker',
    color: '#2496ED',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <g fill="#2496ED">
          <rect x="26" y="50" width="14" height="12" rx="1.5" />
          <rect x="43" y="50" width="14" height="12" rx="1.5" />
          <rect x="60" y="50" width="14" height="12" rx="1.5" />
          <rect x="43" y="35" width="14" height="12" rx="1.5" />
          <rect x="60" y="35" width="14" height="12" rx="1.5" />
          <rect x="60" y="20" width="14" height="12" rx="1.5" />
          <rect x="77" y="50" width="14" height="12" rx="1.5" />
          <path d="M114 60c-3.5-2.3-11.3-3.1-17.2-1.8-1-7-5.6-12.8-11-16.8l-2.3 2.5c-2.6 3.5-3.4 9.5-1.5 14.2-2.2 1.2-6 2.1-11.2 2.1H14c-1.8 11.5 1.8 25 10.6 33.8C32.4 101.8 44 106 58.6 106c28.6 0 49.8-13.2 58.9-37.3 4.3.2 10.5-.2 13.7-6.3-1.4-1.2-6.3-3.4-17.2-2.4z" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    color: '#FFFFFF',
    render: (s) => (
      <svg viewBox="0 0 128 128" width={s} height={s}>
        <path fill="#FFFFFF" d="M64 16L116 106H12L64 16z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    color: '#3ECF8E',
    render: (s) => (
      <svg viewBox="0 0 109 113" width={s} height={s}>
        <path
          d="M63.71 110.47c-2.5 3.15-7.47.92-7.34-3.29l1.84-58.29h39.97c7.24 0 11.25 8.36 6.67 13.88z"
          fill="#3ECF8E"
        />
        <path
          d="M45.27 2.27c2.5-3.15 7.47-.92 7.34 3.29l-.84 58.29H11.81c-7.24 0-11.25-8.36-6.67-13.88z"
          fill="#3ECF8E"
          fillOpacity="0.82"
        />
      </svg>
    ),
  },
];

interface FloatingSlot {
  slotId: number;
  cycleId: number;
  iconIndex: number;
  xPercent: number;
  yPercent: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotStart: number;
  rotEnd: number;
  peakOpacity: number;
}

const SLOT_COUNT = 10;

function pickSpawnPosition(): { x: number; y: number } {
  // Spawn across the entire screen while avoiding the dead-center title box so text stays crisp
  for (let attempt = 0; attempt < 10; attempt++) {
    const x = 6 + Math.random() * 86; // 6% to 92%
    const y = 7 + Math.random() * 82; // 7% to 89%
    const inCenterText = x > 32 && x < 68 && y > 37 && y < 63;
    if (!inCenterText) {
      return { x, y };
    }
  }
  return {
    x: Math.random() > 0.5 ? 10 + Math.random() * 18 : 72 + Math.random() * 18,
    y: 10 + Math.random() * 78,
  };
}

function createSlotState(slotId: number, cycleId: number, iconIndex: number, initialDelay: number): FloatingSlot {
  const { x, y } = pickSpawnPosition();
  const rotStart = (Math.random() - 0.5) * 26;
  return {
    slotId,
    cycleId,
    iconIndex,
    xPercent: x,
    yPercent: y,
    size: Math.round(34 + Math.random() * 18), // 34px – 52px
    duration: Number((6.8 + Math.random() * 4.2).toFixed(2)), // 6.8s – 11.0s
    delay: Number(initialDelay.toFixed(2)),
    driftX: Math.round((Math.random() - 0.5) * 68),
    driftY: Math.round((Math.random() - 0.5) * 64 - 12),
    rotStart: Number(rotStart.toFixed(1)),
    rotEnd: Number((rotStart + (Math.random() - 0.5) * 22).toFixed(1)),
    peakOpacity: Number((0.15 + Math.random() * 0.13).toFixed(2)), // subtle 0.15–0.28
  };
}

export default function HeroFloatingIcons() {
  const [slots, setSlots] = useState<FloatingSlot[]>(() =>
    Array.from({ length: SLOT_COUNT }, (_, i) => {
      const iconIndex = i % STACK_ICONS.length;
      const initialDelay = i * 0.65 + Math.random() * 0.5;
      return createSlotState(i, 0, iconIndex, initialDelay);
    })
  );

  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleCycleComplete = useCallback((slotId: number) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.slotId !== slotId) return slot;
        const usedIndices = new Set(prev.map((s) => s.iconIndex));
        const available = STACK_ICONS.map((_, idx) => idx).filter((idx) => !usedIndices.has(idx));
        const nextIconIndex =
          available.length > 0
            ? available[Math.floor(Math.random() * available.length)]
            : (slot.iconIndex + SLOT_COUNT) % STACK_ICONS.length;

        return createSlotState(slot.slotId, slot.cycleId + 1, nextIconIndex, Math.random() * 0.4);
      })
    );
  }, []);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 2 }}
    >
      {slots.map((slot) => {
        const tech = STACK_ICONS[slot.iconIndex];
        const style = {
          left: `${slot.xPercent}%`,
          top: `${slot.yPercent}%`,
          animationDuration: `${slot.duration}s`,
          animationDelay: `${slot.delay}s`,
          '--drift-x': `${slot.driftX}px`,
          '--drift-y': `${slot.driftY}px`,
          '--rot-start': `${slot.rotStart}deg`,
          '--rot-end': `${slot.rotEnd}deg`,
          '--peak-opacity': String(slot.peakOpacity),
          filter: `drop-shadow(0 0 14px ${tech.color}28)`,
        } as CSSProperties;

        return (
          <div
            key={`${slot.slotId}-${slot.cycleId}`}
            className="hero-floating-icon absolute -translate-x-1/2 -translate-y-1/2"
            style={style}
            onAnimationEnd={() => handleCycleComplete(slot.slotId)}
          >
            {tech.render(slot.size)}
          </div>
        );
      })}
    </div>
  );
}
