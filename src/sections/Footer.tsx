import { ArrowUp } from 'lucide-react';

interface FooterProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Footer({ lenisRef }: FooterProps) {
  const handleScrollTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 2 });
    }
  };

  return (
    <footer
      className="relative w-full py-16 overflow-hidden"
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(176, 224, 230, 0.08)',
      }}
    >
      {/* Marquee */}
      <div className="relative w-full overflow-hidden mb-16 py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display text-6xl lg:text-8xl font-bold mx-4"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(176, 224, 230, 0.15)',
              }}
            >
              ALEXANDER • FULL-STACK DEVELOPER • PORTFOLIO 2026 •
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo / Name */}
          <div className="flex items-center gap-4">
            <span
              className="font-display text-2xl font-bold"
              style={{ color: '#ffffff' }}
            >
              ALEXANDER
            </span>
            <span
              className="font-body text-xs"
              style={{ color: 'rgba(255, 255, 255, 0.3)' }}
            >
              |
            </span>
            <span
              className="font-body text-xs uppercase tracking-wider"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              Full-Stack Developer
            </span>
          </div>

          {/* Center text */}
          <div
            className="font-body text-xs text-center"
            style={{ color: 'rgba(255, 255, 255, 0.3)' }}
          >
            Diseñado y desarrollado con pasión • 2026
          </div>

          {/* Back to top */}
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 group"
            data-cursor-hover
          >
            <span
              className="font-body text-xs uppercase tracking-wider transition-colors duration-300 group-hover:text-[#B0E0E6]"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              Volver arriba
            </span>
            <div
              className="w-8 h-8 flex items-center justify-center border transition-all duration-300 group-hover:border-[#B0E0E6] group-hover:bg-[rgba(176,224,230,0.1)]"
              style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <ArrowUp size={14} style={{ color: '#B0E0E6' }} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
