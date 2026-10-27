import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { TechBadge } from '../components/TechIcons';

gsap.registerPlugin(ScrollTrigger);

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
    title: 'superN',
    category: '2D Platform Fighter',
    description: '«Lucha. Esquiva. Sobrevive.» — Juego de combate y plataformas 2D estilo Superfighters Deluxe con física a 60Hz, 13 armas, 21 estados de combate y bots con IA táctica.',
    image: '/supern.png',
    tech: ['TypeScript', 'React', 'Canvas', 'Game Engine'],
    liveUrl: 'https://supern01.vercel.app/',
    githubUrl: 'https://github.com/nuveneqra007-rgb',
    isNew: true,
  },
  {
    title: 'NOVA AI',
    category: 'Asistente IA',
    description: 'Asistente de investigación con IA, con persistencia en la nube y arquitectura escalable.',
    image: '/nova-ai.png',
    tech: ['React', 'FastAPI', 'Supabase', 'Python'],
    liveUrl: 'https://nova-ai-three-zeta.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'COKELAB',
    category: 'Landing Page',
    description: 'Página web promocional dinámica con animaciones fluidas y diseño de producto impactante.',
    image: '/assets/aistudio/image_bb2f7d96.png',
    tech: ['React', 'CSS3', 'JavaScript'],
    liveUrl: 'https://cokelab.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'AIM TRAINER',
    category: 'Juego Web',
    description: 'Aplicación competitiva para entrenar la puntería, precisión y reflejos del usuario.',
    image: '/aim-trainer.png',
    tech: ['React', 'CSS3', 'JavaScript'],
    liveUrl: 'https://aim-trainerrr.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'SISTEMA SOLAR 3D',
    category: 'Experiencia 3D',
    description: 'Simulación interactiva y exploratoria del sistema solar renderizada en 3D para la web.',
    image: '/sistema-solar.png',
    tech: ['Three.js', 'React', 'JavaScript'],
    liveUrl: 'https://sistema-solar-3d-three.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'APEX MOTORS',
    category: 'Landing Page',
    description: 'Concesionario de autos premium con diseño moderno y minimalista, optimizado para alto rendimiento.',
    image: '/assets/aistudio/Captura_desde_2026-10-27_16-49-12_e6327df7.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://apex-motors-lyart.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'PLAYA PARAÍSO',
    category: 'Turismo',
    description: 'Plataforma web promocional para un destino turístico exclusivo con enfoque en la experiencia del usuario.',
    image: '/assets/aistudio/image_339ac744.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://playa-paraiizo.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'ECO MOTORS',
    category: 'Landing Page',
    description: 'Sitio web enfocado en movilidad sustentable y autos eléctricos de última generación.',
    image: '/assets/aistudio/image_e7feb2af.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://eco-motors.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'ELECTRO MAXX',
    category: 'E-Commerce',
    description: 'Tienda en línea de productos electrónicos con interfaz intuitiva y moderna.',
    image: '/assets/aistudio/image_e592e6d5.png',
    tech: ['React', 'CSS3'],
    liveUrl: 'https://electro-maxx.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'CALCULADORA DIGITAL',
    category: 'Web App',
    description: 'Calculadora funcional y estilizada, con diseño responsivo y fácil de usar.',
    image: '/calculadora.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://calculadoradigital99.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'RELOJ DIGITAL',
    category: 'Web App',
    description: 'Reloj dinámico en tiempo real construido con React, con diseño elegante.',
    image: '/reloj.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://reloj-digitalreact.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'CAMBIADOR DE COLOR',
    category: 'Herramienta',
    description: 'Utilidad interactiva para experimentar con cambios de color y fondos.',
    image: '/color.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://cambiadordecolooor.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'CONTADOR DIGITAL',
    category: 'Web App',
    description: 'Aplicación de contador minimalista con controles precisos.',
    image: '/contador.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://contadordigitaal.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'TO-DO LIST',
    category: 'Productividad',
    description: 'Gestor de tareas interactivo para organizar el día a día de manera eficiente.',
    image: '/todo.png',
    tech: ['React', 'JavaScript'],
    liveUrl: 'https://to-do-listdigitaaal.netlify.app/',
    githubUrl: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards animation - individual triggers for smooth scroll
      cardsRef.current.filter(Boolean).forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 35,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 text-center" style={{ opacity: 0 }}>
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
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group flex flex-col h-full border rounded-xl transition-all duration-300 hover:border-[rgba(176,224,230,0.35)] hover:-translate-y-2 relative overflow-hidden"
              style={{
                opacity: 0,
                borderColor: project.isNew ? 'rgba(64, 204, 255, 0.35)' : 'rgba(176, 224, 230, 0.1)',
                backgroundColor: project.isNew ? 'rgba(64, 204, 255, 0.03)' : 'rgba(176, 224, 230, 0.02)',
              }}
            >
              {/* New Launch Badge */}
              {project.isNew && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border bg-black/90 backdrop-blur-md shadow-[0_0_20px_rgba(64,204,255,0.4)]" style={{ borderColor: 'rgba(64, 204, 255, 0.6)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#40ccff] animate-ping" />
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#40ccff]">
                    Nuevo Lanzamiento
                  </span>
                </div>
              )}

              {/* Image */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video overflow-hidden border-b group/img block cursor-pointer"
                style={{ borderColor: 'rgba(176, 224, 230, 0.1)' }}
                data-cursor-hover
                aria-label={`Ver proyecto ${project.title} en vivo`}
              >
                <img
                  src={project.image}
                  alt={`Screenshot del proyecto ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover/img:scale-105"
                />
                
                {/* Overlay Links */}
                <div
                  className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 border rounded-full transition-all duration-300 hover:scale-105"
                    style={{ borderColor: 'rgba(176, 224, 230, 0.5)', color: '#B0E0E6', backgroundColor: 'rgba(0,0,0,0.6)' }}
                  >
                    <span className="font-body text-xs tracking-wider uppercase font-medium">
                      {project.category.includes('Fighter') || project.category.includes('Juego') ? 'Jugar ahora' : 'Ver proyecto'}
                    </span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </a>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-body text-[10px] uppercase tracking-[0.2em] inline-block"
                    style={{ color: project.isNew ? '#40ccff' : 'rgba(176, 224, 230, 0.8)' }}
                  >
                    {project.category}
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono tracking-wider text-[#B0E0E6]/70 hover:text-[#B0E0E6] inline-flex items-center gap-1 transition-colors"
                    data-cursor-hover
                  >
                    <span>{project.category.includes('Fighter') || project.category.includes('Juego') ? 'Jugar' : 'En vivo'}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title inline-block mb-3"
                  data-cursor-hover
                >
                  <h3
                    className="font-display text-xl font-bold transition-colors duration-200 group-hover/title:text-[#B0E0E6]"
                    style={{ color: '#ffffff' }}
                  >
                    {project.title}
                  </h3>
                </a>

                <p
                  className="font-body text-sm leading-relaxed mb-6 flex-1"
                  style={{ color: 'rgba(255, 255, 255, 0.55)' }}
                >
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {project.tech.map((tech, j) => (
                    <TechBadge key={j} name={tech} />
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                style={{
                  boxShadow: project.isNew
                    ? 'inset 0 0 35px rgba(64, 204, 255, 0.12)'
                    : 'inset 0 0 30px rgba(176, 224, 230, 0.05)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
