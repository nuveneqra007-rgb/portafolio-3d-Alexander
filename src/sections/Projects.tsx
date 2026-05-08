import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
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
    image: '/cokelab.png',
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
    image: '/apex-motors.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://apex-motors-lyart.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'PLAYA PARAÍSO',
    category: 'Turismo',
    description: 'Plataforma web promocional para un destino turístico exclusivo con enfoque en la experiencia del usuario.',
    image: '/playa-paraiso.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://playa-paraiizo.netlify.app/',
    githubUrl: '#',
  },
  {
    title: 'ECO MOTORS',
    category: 'Landing Page',
    description: 'Sitio web enfocado en movilidad sustentable y autos eléctricos de última generación.',
    image: '/eco-motors.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://eco-motors.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'ELECTRO MAXX',
    category: 'E-Commerce',
    description: 'Tienda en línea de productos electrónicos con interfaz intuitiva y moderna.',
    image: '/electro-maxx.png',
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

      // Cards animation
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
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
              className="group flex flex-col h-full border transition-all duration-300 hover:border-[rgba(176,224,230,0.3)] hover:-translate-y-2 relative"
              style={{
                opacity: 0,
                borderColor: 'rgba(176, 224, 230, 0.1)',
                backgroundColor: 'rgba(176, 224, 230, 0.02)',
              }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden border-b group" style={{ borderColor: 'rgba(176, 224, 230, 0.1)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-all duration-[6000ms] ease-in-out group-hover:object-bottom"
                />
                
                {/* Overlay Links */}
                <div
                  className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 hover:scale-110"
                    style={{ borderColor: 'rgba(176, 224, 230, 0.5)', color: '#B0E0E6', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    data-cursor-hover
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span
                  className="font-body text-[10px] uppercase tracking-[0.2em] mb-3 inline-block"
                  style={{ color: 'rgba(176, 224, 230, 0.8)' }}
                >
                  {project.category}
                </span>

                <h3
                  className="font-display text-xl font-bold mb-3"
                  style={{ color: '#ffffff' }}
                >
                  {project.title}
                </h3>

                <p
                  className="font-body text-sm leading-relaxed mb-6 flex-1"
                  style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                >
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-[10px] font-body border"
                      style={{
                        borderColor: 'rgba(176, 224, 230, 0.15)',
                        color: 'rgba(176, 224, 230, 0.6)',
                        backgroundColor: 'rgba(176, 224, 230, 0.03)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(176, 224, 230, 0.05)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
