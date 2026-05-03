import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '1+', label: 'Año de Experiencia' },
  { value: '12+', label: 'Proyectos Completados' },
  { value: '100%', label: 'Tasa de Éxito' },
];

const skills = [
  { icon: Code2, label: 'HTML5', items: 'Estructura y semántica' },
  { icon: Code2, label: 'CSS3', items: 'Diseño y animaciones' },
  { icon: Code2, label: 'JavaScript', items: 'Lógica e interactividad' },
  { icon: Code2, label: 'React', items: 'Desarrollo de interfaces' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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

      // Text paragraphs
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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

      // Skills
      gsap.fromTo(
        skillsRef.current?.children || [],
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
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
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
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
              Construyo el
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #B0E0E6 0%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                futuro digital,
              </span>
              línea a línea.
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

          {/* Right column - Text */}
          <div className="lg:col-span-7">
            <div ref={textRef}>
              <p
                className="font-body text-lg lg:text-xl leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                Soy un desarrollador de 18 años con pasión por crear interfaces modernas y funcionales. Mi enfoque está en perfeccionar mis habilidades técnicas y creativas para entregar proyectos que marquen la diferencia.
              </p>

              <p
                className="font-body text-lg lg:text-xl leading-relaxed mt-6"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                Cada proyecto es una oportunidad de aprender algo nuevo, enfrentar desafíos reales y llevar mis habilidades al siguiente nivel.
              </p>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="mt-12 space-y-4">
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 border transition-all duration-300 hover:border-[rgba(176,224,230,0.3)]"
                    style={{
                      borderColor: 'rgba(176, 224, 230, 0.08)',
                      backgroundColor: 'rgba(176, 224, 230, 0.02)',
                      opacity: 0,
                    }}
                    data-cursor-hover
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{
                        border: '1px solid rgba(176, 224, 230, 0.2)',
                      }}
                    >
                      <Icon size={18} style={{ color: '#B0E0E6' }} />
                    </div>
                    <div>
                      <div
                        className="font-display text-sm font-semibold uppercase tracking-wider"
                        style={{ color: '#ffffff' }}
                      >
                        {skill.label}
                      </div>
                      <div
                        className="font-body text-sm mt-1"
                        style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                      >
                        {skill.items}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
