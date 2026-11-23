import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ExternalLink, Github, MoveHorizontal } from 'lucide-react';
import { TechBadge } from '../components/TechIcons';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  isNew?: boolean;
}

const projects: Project[] = [
  {
    title: 'TuFarmacia',
    category: 'E-Commerce / Salud',
    description: 'Sistema integral de farmacia en línea con catálogo de medicamentos, control de lote, validación clínica Rx y carrito.',
    image: '/assets/aistudio/image_8909c91f.png',
    tech: ['JavaScript', 'PLpgSQL', 'Python', 'CSS3', 'HTML5'],
    liveUrl: 'https://sistema-de-farmacia.vercel.app/',
    githubUrl: 'https://github.com/nuveneqra007-rgb/backend',
  },
  {
    title: 'SecScanner',
    category: 'Threat Intelligence',
    description: 'Plataforma de Threat Intelligence y análisis forense en tiempo real para URLs, IPs, hashes y APKs.',
    image: '/assets/aistudio/image_3da45605.png',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Upstash Redis'],
    liveUrl: 'https://secscanner.dpdns.org/',
    githubUrl: 'https://github.com/nuveneqra007-rgb/secscanner0.1',
  },
  {
    title: 'superN',
    category: '2D Platform Fighter',
    description: 'Juego de combate y plataformas 2D con física a 60Hz, 13 armas y bots con IA táctica.',
    image: '/supern.png',
    tech: ['TypeScript', 'React', 'Canvas', 'Game Engine'],
    liveUrl: 'https://supern01.vercel.app/',
    githubUrl: 'https://github.com/nuveneqra007-rgb',
  },
  {
    title: 'NOVA AI',
    category: 'Asistente IA',
    description: 'Asistente de investigación con IA, persistencia en la nube y arquitectura escalable.',
    image: '/nova-ai.png',
    tech: ['React', 'FastAPI', 'Supabase', 'Python'],
    liveUrl: 'https://nova-ai-three-zeta.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'COKELAB',
    category: 'Landing Page',
    description: 'Landing promocional dinámica con animaciones fluidas y diseño de producto de alto impacto.',
    image: '/assets/aistudio/image_bb2f7d96.png',
    tech: ['React', 'CSS3', 'JavaScript'],
    liveUrl: 'https://cokelab.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'AIM TRAINER',
    category: 'Juego Web',
    description: 'Aplicación competitiva para entrenar puntería, precisión y velocidad de reacción.',
    image: '/aim-trainer.png',
    tech: ['React', 'CSS3', 'JavaScript'],
    liveUrl: 'https://aim-trainerrr.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'SISTEMA SOLAR 3D',
    category: 'Experiencia 3D',
    description: 'Simulación interactiva del sistema solar renderizada en tiempo real con Three.js.',
    image: '/sistema-solar.png',
    tech: ['Three.js', 'React', 'JavaScript'],
    liveUrl: 'https://sistema-solar-3d-three.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'APEX MOTORS',
    category: 'Landing Page',
    description: 'Concesionario de autos premium con estética minimalista optimizada para rendimiento.',
    image: '/assets/aistudio/Captura_desde_2026-10-27_16-49-12_e6327df7.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://apex-motors-lyart.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'PLAYA PARAÍSO',
    category: 'Turismo',
    description: 'Plataforma web promocional para destino turístico exclusivo con diseño inmersivo.',
    image: '/assets/aistudio/image_339ac744.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://playa-paraiizo.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'ECO MOTORS',
    category: 'Landing Page',
    description: 'Sitio web enfocado en movilidad sustentable y vehículos eléctricos de nueva generación.',
    image: '/assets/aistudio/image_e7feb2af.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://eco-motors.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'ELECTRO MAXX',
    category: 'E-Commerce',
    description: 'Tienda en línea de productos electrónicos con catálogo moderno e interfaz ágil.',
    image: '/assets/aistudio/image_e592e6d5.png',
    tech: ['React', 'CSS3'],
    liveUrl: 'https://electro-maxx.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'CALCULADORA DIGITAL',
    category: 'Web App',
    description: 'Calculadora funcional con diseño estilizado, controles claros y respuesta inmediata.',
    image: '/calculadora.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://calculadoradigital99.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'RELOJ DIGITAL',
    category: 'Web App',
    description: 'Reloj dinámico en tiempo real construido con React y estética minimalista oscura.',
    image: '/reloj.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://reloj-digitalreact.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'CAMBIADOR DE COLOR',
    category: 'Herramienta',
    description: 'Utilidad interactiva para explorar paletas cromáticas y transiciones de fondo.',
    image: '/color.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://cambiadordecolooor.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'CONTADOR DIGITAL',
    category: 'Web App',
    description: 'Aplicación de contador minimalista con controles precisos e interfaz reactiva.',
    image: '/contador.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://contadordigitaal.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'TO-DO LIST',
    category: 'Productividad',
    description: 'Gestor de tareas interactivo para organizar pendientes diarios de forma eficiente.',
    image: '/todo.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://to-do-listdigitaaal.netlify.app/',
    githubUrl: '#',
  },
];

// Duplicated array for seamless infinite loop
const LOOP_PROJECTS = [...projects, ...projects];

interface GalleryCardProps {
  project: Project;
  index: number;
  x: MotionValue<number>;
  cardWidth: number;
  cardGap: number;
  viewportWidth: number;
  reducedMotion: boolean;
  isDraggingRef: React.MutableRefObject<boolean>;
}

function GlideCard({
  project,
  index,
  x,
  cardWidth,
  cardGap,
  viewportWidth,
  reducedMotion,
  isDraggingRef,
}: GalleryCardProps) {
  const metricsRef = useRef({
    cardCenterInTrack: index * (cardWidth + cardGap) + cardWidth / 2,
    halfViewport: Math.max(viewportWidth / 2, 320),
    reducedMotion,
  });

  useEffect(() => {
    metricsRef.current = {
      cardCenterInTrack: index * (cardWidth + cardGap) + cardWidth / 2,
      halfViewport: Math.max(viewportWidth / 2, 320),
      reducedMotion,
    };
  }, [index, cardWidth, cardGap, viewportWidth, reducedMotion]);

  const rotateY = useTransform(x, (latestX) => {
    const { cardCenterInTrack, halfViewport, reducedMotion: rm } = metricsRef.current;
    if (rm) return 0;
    const screenCenterOffset = latestX + cardCenterInTrack - halfViewport;
    const normalized = Math.max(-1.3, Math.min(1.3, screenCenterOffset / halfViewport));
    return -normalized * 20;
  });

  const opacity = useTransform(x, (latestX) => {
    const { cardCenterInTrack, halfViewport, reducedMotion: rm } = metricsRef.current;
    if (rm) return 1;
    const screenCenterOffset = latestX + cardCenterInTrack - halfViewport;
    const dist = Math.min(1.25, Math.abs(screenCenterOffset / halfViewport));
    return Math.max(0.32, 1 - Math.pow(dist, 1.5) * 0.58);
  });

  const scale = useTransform(x, (latestX) => {
    const { cardCenterInTrack, halfViewport, reducedMotion: rm } = metricsRef.current;
    if (rm) return 1;
    const screenCenterOffset = latestX + cardCenterInTrack - halfViewport;
    const dist = Math.min(1.2, Math.abs(screenCenterOffset / halfViewport));
    return Math.max(0.88, 1 - dist * 0.1);
  });

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
    }
  };

  return (
    <motion.article
      style={{
        width: cardWidth,
        rotateY,
        opacity,
        scale,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex-shrink-0 flex flex-col rounded-2xl overflow-hidden border transition-colors duration-300 backdrop-blur-xl select-none"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Glassmorphism surface */}
      <div
        className="flex flex-col h-full rounded-2xl border transition-colors duration-300 group-hover:border-[#B0E0E6]/40"
        style={{
          backgroundColor: project.isNew ? 'rgba(10, 22, 30, 0.72)' : 'rgba(11, 15, 19, 0.72)',
          borderColor: project.isNew ? 'rgba(64, 204, 255, 0.35)' : 'rgba(176, 224, 230, 0.14)',
          boxShadow: project.isNew
            ? '0 20px 45px -15px rgba(64, 204, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 20px 45px -15px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* New Launch Badge */}
        {project.isNew && (
          <div
            className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-black/85 backdrop-blur-md"
            style={{ borderColor: 'rgba(64, 204, 255, 0.55)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#40ccff] animate-ping" />
            <span className="font-mono text-[9px] font-bold tracking-wider uppercase text-[#40ccff]">
              Nuevo
            </span>
          </div>
        )}

        {/* Top Image / Mockup */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
          draggable={false}
          className="relative aspect-video overflow-hidden border-b border-white/10 block"
          aria-label={`Abrir ${project.title}`}
        >
          <img
            src={project.image}
            alt={`Vista previa de ${project.title}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f13]/85 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#B0E0E6]/40 bg-black/75 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#B0E0E6]">
            <span>{project.category.includes('Fighter') || project.category.includes('Juego') ? 'Jugar' : 'Visitar'}</span>
            <ExternalLink size={11} />
          </div>
        </a>

        {/* Minimalist Body */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: project.isNew ? '#40ccff' : 'rgba(176, 224, 230, 0.72)' }}
            >
              {project.category}
            </span>

            <div className="flex items-center gap-2.5">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  draggable={false}
                  aria-label={`Repositorio GitHub de ${project.title}`}
                  className="text-white/50 hover:text-[#B0E0E6] transition-colors"
                        >
                  <Github size={13} />
                </a>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                draggable={false}
                aria-label={`Demo en vivo de ${project.title}`}
                className="text-[#B0E0E6]/70 hover:text-[#B0E0E6] transition-colors"
                    >
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            draggable={false}
            className="inline-block mb-2"
            >
            <h3 className="font-display text-lg sm:text-xl font-bold text-white transition-colors duration-200 group-hover:text-[#B0E0E6]">
              {project.title}
            </h3>
          </a>

          <p className="font-body text-xs sm:text-[13px] leading-relaxed text-white/60 line-clamp-2 mb-4 flex-1">
            {project.description}
          </p>

          {/* Compact Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 mt-auto">
            {project.tech.slice(0, 5).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const stageRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const currentSpeedRef = useRef(62); // px/sec

  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
  );
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [viewportWidth, setViewportWidth] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 1280)
  );

  const x = useMotionValue(0);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 1023px), (pointer: coarse)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const updateMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const updateWidth = () => setViewportWidth(stageRef.current?.clientWidth || window.innerWidth);

    updateWidth();
    mobileMq.addEventListener('change', updateMobile);
    motionMq.addEventListener('change', updateMotion);
    window.addEventListener('resize', updateWidth, { passive: true });

    return () => {
      mobileMq.removeEventListener('change', updateMobile);
      motionMq.removeEventListener('change', updateMotion);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const cardWidth = viewportWidth < 640 ? 290 : 350;
  const cardGap = viewportWidth < 640 ? 20 : 28;
  const singleSetWidth = projects.length * (cardWidth + cardGap);

  // Desktop continuous infinite glide (smoothly pauses on hover; disabled on mobile)
  useAnimationFrame((_, delta) => {
    if (isMobile || reducedMotion || singleSetWidth <= 0) return;

    const targetSpeed = isHoveredRef.current ? 0 : 62;
    const lerpFactor = Math.min(1, (delta / 1000) * 5.5);
    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * lerpFactor;

    if (currentSpeedRef.current < 0.2) return;

    let nextX = x.get() - (currentSpeedRef.current * delta) / 1000;
    if (nextX <= -singleSetWidth) {
      nextX += singleSetWidth;
    } else if (nextX > 0) {
      nextX -= singleSetWidth;
    }
    x.set(nextX);
  });

  return (
    <section
      id="projects"
      className="relative w-full py-28 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background grid & subtle ambient glow */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(176, 224, 230, 0.07) 0%, rgba(0, 255, 65, 0.03) 45%, transparent 72%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-14 lg:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className="font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: 'rgba(176, 224, 230, 0.6)' }}
            >
              02
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: 'rgba(176, 224, 230, 0.3)' }} />
            <span
              className="font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: 'rgba(176, 224, 230, 0.6)' }}
            >
              Proyectos
            </span>
          </div>

          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ffffff' }}
          >
            Mis{' '}
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #B0E0E6 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Creaciones
            </span>
          </h2>

          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mt-4 flex items-center justify-center gap-2">
            {isMobile ? (
              <>
                <MoveHorizontal size={13} className="text-[#B0E0E6]/70" />
                <span>Desliza para explorar la galería 3D</span>
              </>
            ) : (
              <span>Galería Infinita 3D • Pasa el cursor para pausar</span>
            )}
          </p>
        </motion.div>
      </div>

      {/* 3D Perspective Infinite Glide Stage */}
      <div
        ref={stageRef}
        onMouseEnter={() => {
          if (!isMobile) isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          if (!isMobile) isHoveredRef.current = false;
        }}
        className="relative z-10 w-full py-10 overflow-hidden"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Subtle edge fade masks for depth */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-y-0 left-0 w-24 lg:w-44 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #000000 0%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-y-0 right-0 w-24 lg:w-44 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(270deg, #000000 0%, transparent 100%)',
          }}
        />

        {/* Tilted 3D Plane Container */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: reducedMotion ? 'none' : 'rotateX(5deg)',
          }}
        >
          <motion.div
            style={{
              x,
              gap: `${cardGap}px`,
              transformStyle: 'preserve-3d',
            }}
            drag={isMobile ? 'x' : false}
            dragConstraints={{ left: -singleSetWidth, right: 0 }}
            dragElastic={0.12}
            dragTransition={{ power: 0.28, timeConstant: 260 }}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDraggingRef.current = false;
              }, 120);
            }}
            className={`flex items-stretch will-change-transform ${
              isMobile ? 'cursor-grab active:cursor-grabbing px-6' : ''
            }`}
          >
            {LOOP_PROJECTS.map((project, index) => (
              <GlideCard
                key={`${project.title}-${index}`}
                project={project}
                index={index}
                x={x}
                cardWidth={cardWidth}
                cardGap={cardGap}
                viewportWidth={viewportWidth}
                reducedMotion={reducedMotion}
                isDraggingRef={isDraggingRef}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
