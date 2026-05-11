import { useEffect, useState, useCallback } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['hero', 'about', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = useCallback((id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.5 });
    }
    setMobileOpen(false);
  }, [lenisRef]);

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderBottom: '1px solid rgba(176, 224, 230, 0.08)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-6 md:px-8 lg:px-16 h-16">
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-lg font-bold tracking-tight text-white"
            aria-label="Go to top"
          >
            ALEXANDER
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative font-body text-xs uppercase tracking-[0.15em] transition-colors duration-300"
                style={{
                  color: activeSection === item.id ? '#B0E0E6' : 'rgba(255, 255, 255, 0.5)',
                }}
                aria-current={activeSection === item.id ? 'page' : undefined}
                data-cursor-hover
              >
                {item.label}
                {activeSection === item.id && (
                  <span
                    className="absolute -bottom-1 left-0 h-px w-full transition-all duration-300"
                    style={{ backgroundColor: '#B0E0E6' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className="block w-6 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: '#B0E0E6',
                transform: mobileOpen ? 'rotate(45deg) translate(2px, 5px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: '#B0E0E6',
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: '#B0E0E6',
                transform: mobileOpen ? 'rotate(-45deg) translate(2px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="font-display text-2xl font-bold uppercase tracking-[0.2em] transition-all duration-300"
            style={{
              color: activeSection === item.id ? '#B0E0E6' : 'rgba(255, 255, 255, 0.5)',
              transform: mobileOpen ? 'translateY(0)' : `translateY(${20 + i * 10}px)`,
              transitionDelay: mobileOpen ? `${i * 0.08}s` : '0s',
            }}
          >
            <span className="font-mono text-xs mr-3" style={{ color: 'rgba(176, 224, 230, 0.3)' }}>
              0{i + 1}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
