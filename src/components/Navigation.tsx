import { useEffect, useState } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);

      // Determine active section
      const sections = ['hero', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.5 });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderBottom: '1px solid rgba(176, 224, 230, 0.08)',
      }}
    >
      <div className="flex items-center justify-between px-8 lg:px-16 h-16">
        <span className="font-display text-lg font-bold tracking-tight text-white">
          ALEXANDER
        </span>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative font-body text-xs uppercase tracking-[0.15em] transition-colors duration-300"
              style={{
                color: activeSection === item.id ? '#B0E0E6' : 'rgba(255, 255, 255, 0.5)',
              }}
              data-cursor-hover
            >
              {item.label}
              {activeSection === item.id && (
                <span
                  className="absolute -bottom-1 left-0 h-px w-full"
                  style={{ backgroundColor: '#B0E0E6' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
