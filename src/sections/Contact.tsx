import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, Github as GithubIcon, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Info
      gsap.fromTo(
        infoRef.current?.children || [],
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Número de WhatsApp (República Dominicana +1)
    const whatsappNumber = '18096314386'; 
    
    const text = `¡Hola Alexander! Me interesa colaborar en un proyecto.%0A%0A*Detalles del contacto:*%0A👤 Nombre: ${formData.name}%0A📧 Email: ${formData.email}%0A%0A*Mensaje:*%0A${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
    
    setFormData({ name: '', email: '', message: '' });
  };

  const inputStyle = (field: string) => ({
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === field ? '#00ff41' : 'rgba(0, 255, 65, 0.15)'}`,
    color: '#00ff41',
    outline: 'none',
    padding: '16px 0',
    width: '100%',
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    fontSize: '14px',
    letterSpacing: '0.05em',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: focused === field ? '0 2px 8px rgba(0, 255, 65, 0.1)' : 'none',
    caretColor: '#00ff41',
  });

  const contactInfo = [
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      value: <a href="https://wa.me/18096314386" target="_blank" rel="noopener noreferrer" className="hover:text-[#50fa7b] transition-colors">Disponible para chat</a>,
      prefix: '~/connect/whatsapp',
    },
    { 
      icon: Mail, 
      label: 'Email', 
      value: <a href="mailto:miguelalexanderlopezmendosa23@gmail.com" className="hover:text-[#50fa7b] transition-colors" style={{ wordBreak: 'break-all' as const }}>miguelalexanderlopezmendosa23@gmail.com</a>,
      prefix: '~/connect/email',
    },
    { 
      icon: GithubIcon, 
      label: 'GitHub', 
      value: <a href="https://github.com/nuveneqra007-rgb" target="_blank" rel="noopener noreferrer" className="hover:text-[#50fa7b] transition-colors">nuveneqra007-rgb</a>,
      prefix: '~/connect/github',
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      value: <a href="https://www.linkedin.com/in/alexander-lopez-315673401/" target="_blank" rel="noopener noreferrer" className="hover:text-[#50fa7b] transition-colors">Alexander Lopez</a>,
      prefix: '~/connect/linkedin',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 255, 65, 0.008) 3px, rgba(0, 255, 65, 0.008) 6px)',
        }}
      />

      {/* Background glow - hacker green */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 255, 65, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Grid background with green tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section header - hacker style */}
        <div className="flex items-center gap-4 mb-20">
          <span
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: 'rgba(0, 255, 65, 0.5)' }}
          >
            03
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0, 255, 65, 0.1)' }} />
          <span
            className="font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2"
            style={{ color: 'rgba(0, 255, 65, 0.5)' }}
          >
            <span style={{ color: '#00ff41', animation: 'terminalPulse 2s ease-in-out infinite' }}>●</span>
            Contacto
          </span>
        </div>

        {/* Heading - hacker terminal style */}
        <h2
          ref={headingRef}
          className="font-display font-bold leading-tight mb-20"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            color: '#00ff41',
            textShadow: '0 0 40px rgba(0, 255, 65, 0.15), 0 0 80px rgba(0, 255, 65, 0.05)',
            opacity: 0,
          }}
        >
          <span style={{ color: 'rgba(0, 255, 65, 0.3)', fontSize: '0.6em' }}>{'> '}</span>
          Hagamos realidad tu
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #00ff41 0%, #50fa7b 50%, #8be9fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <span style={{ WebkitTextFillColor: 'transparent' }}>{'  '}próximo proyecto.</span>
          </span>
          <span
            className="inline-block w-3 h-8 ml-2 align-middle"
            style={{
              backgroundColor: '#00ff41',
              animation: 'cursorBlink 1s step-end infinite',
              boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
            }}
          />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form - Hacker Terminal Style */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-7"
            style={{ opacity: 0 }}
          >
            {/* Terminal wrapper */}
            <div
              className="relative rounded-lg overflow-hidden border"
              style={{
                borderColor: 'rgba(0, 255, 65, 0.15)',
                backgroundColor: '#0a0a0a',
                boxShadow: '0 0 40px rgba(0, 255, 65, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(0, 255, 65, 0.08)',
              }}
            >
              {/* Scanline inside form */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.01) 2px, rgba(0, 255, 65, 0.01) 4px)',
                }}
              />

              {/* Terminal header */}
              <div
                className="flex items-center px-4 py-2.5 border-b"
                style={{
                  borderColor: 'rgba(0, 255, 65, 0.1)',
                  backgroundColor: 'rgba(0, 255, 65, 0.03)',
                }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56', boxShadow: '0 0 6px rgba(255, 95, 86, 0.5)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e', boxShadow: '0 0 6px rgba(255, 189, 46, 0.5)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f', boxShadow: '0 0 6px rgba(39, 201, 63, 0.5)' }} />
                </div>
                <div className="flex-1 flex items-center justify-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(0, 255, 65, 0.5)' }}>
                    ⌘ root@alexander
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(0, 255, 65, 0.3)' }}>—</span>
                  <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(0, 255, 65, 0.35)' }}>
                    ~/contact/send_message.sh
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00ff41', animation: 'terminalPulse 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(0, 255, 65, 0.6)' }} />
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(0, 255, 65, 0.4)' }}>secure</span>
                </div>
              </div>

              {/* Terminal body with form fields */}
              <div className="relative z-0 p-6 md:p-8 space-y-8">
                {/* Comment line */}
                <div className="font-mono text-xs" style={{ color: 'rgba(0, 255, 65, 0.25)' }}>
                  {'// '}Inicializando conexión segura... ✓ Encryption enabled
                </div>

                {/* Name field */}
                <div>
                  <label
                    className="font-mono text-[11px] uppercase tracking-[0.2em] block mb-3 flex items-center gap-2"
                    style={{ color: 'rgba(0, 255, 65, 0.45)' }}
                  >
                    <span style={{ color: '#00ff41' }}>❯</span>
                    <span style={{ color: '#ff79c6' }}>set</span>
                    <span>--nombre</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('name')}
                    placeholder="Ingresa tu identidad..."
                    required
                    className="placeholder:text-[rgba(0,255,65,0.15)]"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    className="font-mono text-[11px] uppercase tracking-[0.2em] block mb-3 flex items-center gap-2"
                    style={{ color: 'rgba(0, 255, 65, 0.45)' }}
                  >
                    <span style={{ color: '#00ff41' }}>❯</span>
                    <span style={{ color: '#ff79c6' }}>set</span>
                    <span>--email</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('email')}
                    placeholder="tu@correo.encrypted"
                    required
                    className="placeholder:text-[rgba(0,255,65,0.15)]"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    className="font-mono text-[11px] uppercase tracking-[0.2em] block mb-3 flex items-center gap-2"
                    style={{ color: 'rgba(0, 255, 65, 0.45)' }}
                  >
                    <span style={{ color: '#00ff41' }}>❯</span>
                    <span style={{ color: '#ff79c6' }}>set</span>
                    <span>--mensaje</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    style={{
                      ...inputStyle('message'),
                      resize: 'none' as const,
                      minHeight: '120px',
                    }}
                    placeholder="Transmite tu mensaje cifrado..."
                    required
                    className="placeholder:text-[rgba(0,255,65,0.15)]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group relative flex items-center justify-center gap-3 w-full px-8 py-4 border rounded-md overflow-hidden transition-all duration-500"
                  style={{
                    borderColor: 'rgba(0, 255, 65, 0.3)',
                    color: '#00ff41',
                    backgroundColor: 'rgba(0, 255, 65, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(0, 255, 65, 0.15)';
                    el.style.borderColor = 'rgba(0, 255, 65, 0.6)';
                    el.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.15), inset 0 0 30px rgba(0, 255, 65, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(0, 255, 65, 0.05)';
                    el.style.borderColor = 'rgba(0, 255, 65, 0.3)';
                    el.style.boxShadow = 'none';
                  }}
                  data-cursor-hover
                >
                  {/* Shimmer on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(0,255,65,0.08) 45%, rgba(0,255,65,0.15) 50%, rgba(0,255,65,0.08) 55%, transparent 60%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite linear',
                    }}
                  />
                  <MessageCircle size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10 font-mono text-sm uppercase tracking-[0.2em] font-bold">
                    ./enviar_mensaje.sh
                  </span>
                </button>
              </div>

              {/* Terminal status bar */}
              <div
                className="flex items-center justify-between px-4 py-1.5 border-t font-mono text-[9px] tracking-wider uppercase"
                style={{
                  borderColor: 'rgba(0, 255, 65, 0.08)',
                  backgroundColor: 'rgba(0, 255, 65, 0.03)',
                  color: 'rgba(0, 255, 65, 0.3)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span style={{ color: '#50fa7b' }}>●</span> INSERT
                  </span>
                  <span>UTF-8</span>
                  <span>BASH</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>SSL/TLS</span>
                  <span className="flex items-center gap-1">
                    <span style={{ color: '#50fa7b' }}>⬤</span> ENCRYPTED
                  </span>
                </div>
              </div>
            </div>
          </form>

          {/* Contact Info - Hacker Style */}
          <div ref={infoRef} className="lg:col-span-5 space-y-6">
            {/* Access message */}
            <div
              className="p-5 border rounded-lg"
              style={{
                borderColor: 'rgba(0, 255, 65, 0.1)',
                backgroundColor: 'rgba(0, 255, 65, 0.02)',
                opacity: 0,
              }}
            >
              <div className="font-mono text-[10px] mb-3 flex items-center gap-2" style={{ color: 'rgba(0, 255, 65, 0.35)' }}>
                <span style={{ color: '#00ff41' }}>❯</span> system.log
              </div>
              <p
                className="font-mono text-sm leading-relaxed"
                style={{ color: 'rgba(0, 255, 65, 0.55)' }}
              >
                <span style={{ color: '#50fa7b' }}>ACCESS_GRANTED:</span> ¿Tienes un proyecto en mente? Estoy disponible para freelance,
                colaboraciones y oportunidades full-time. <span style={{ color: '#00ff41' }}>¡Conectemos!</span>
              </p>
            </div>

            {/* Contact items as terminal entries */}
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 border rounded-lg transition-all duration-300"
                  style={{
                    borderColor: 'rgba(0, 255, 65, 0.08)',
                    backgroundColor: 'rgba(0, 255, 65, 0.02)',
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(0, 255, 65, 0.25)';
                    el.style.backgroundColor = 'rgba(0, 255, 65, 0.04)';
                    el.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(0, 255, 65, 0.08)';
                    el.style.backgroundColor = 'rgba(0, 255, 65, 0.02)';
                    el.style.boxShadow = 'none';
                  }}
                  data-cursor-hover
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-md"
                    style={{
                      border: '1px solid rgba(0, 255, 65, 0.2)',
                      backgroundColor: 'rgba(0, 255, 65, 0.05)',
                    }}
                  >
                    <Icon size={16} style={{ color: '#00ff41' }} />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="font-mono text-[10px] uppercase tracking-wider mb-0.5 flex items-center gap-1.5"
                      style={{ color: 'rgba(0, 255, 65, 0.3)' }}
                    >
                      <span style={{ color: '#50fa7b' }}>▸</span>
                      {info.prefix}
                    </div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: 'rgba(0, 255, 65, 0.5)' }}
                    >
                      {info.label}
                    </div>
                    <div
                      className="font-mono text-sm"
                      style={{ color: 'rgba(0, 255, 65, 0.75)' }}
                    >
                      {info.value}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Status indicator */}
            <div
              className="p-4 border rounded-lg font-mono text-[11px]"
              style={{
                borderColor: 'rgba(0, 255, 65, 0.08)',
                backgroundColor: 'rgba(0, 255, 65, 0.02)',
                color: 'rgba(0, 255, 65, 0.35)',
                opacity: 0,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00ff41', animation: 'terminalPulse 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(0, 255, 65, 0.6)' }} />
                <span className="uppercase tracking-wider" style={{ color: '#00ff41' }}>System Status: Online</span>
              </div>
              <div className="space-y-1" style={{ color: 'rgba(0, 255, 65, 0.25)' }}>
                <div>├── Response time: {'<'} 24h</div>
                <div>├── Availability: Open for work</div>
                <div>└── Location: Worldwide 🌍</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
