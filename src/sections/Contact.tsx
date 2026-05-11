import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, Github as GithubIcon, Linkedin, Send, ArrowUpRight, Sparkles } from 'lucide-react';

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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Info cards
      gsap.fromTo(
        infoRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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

  const contactChannels = [
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      description: 'Respuesta rápida y directa',
      href: 'https://wa.me/18096314386',
      color: '#25D366',
    },
    { 
      icon: Mail, 
      label: 'Email', 
      description: 'miguelalexanderlopezmendosa23@gmail.com',
      href: 'mailto:miguelalexanderlopezmendosa23@gmail.com',
      color: '#B0E0E6',
    },
    { 
      icon: GithubIcon, 
      label: 'GitHub', 
      description: 'Mira mi código y proyectos',
      href: 'https://github.com/nuveneqra007-rgb',
      color: '#f0f0f0',
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      description: 'Conectemos profesionalmente',
      href: 'https://www.linkedin.com/in/alexander-lopez-315673401/',
      color: '#0A66C2',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(176, 224, 230, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(176, 224, 230, 0.04) 0%, transparent 50%)',
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(176, 224, 230, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 224, 230, 0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span
            className="font-body text-xs uppercase tracking-[0.3em]"
            style={{ color: 'rgba(176, 224, 230, 0.6)' }}
          >
            03
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(176, 224, 230, 0.1)' }} />
          <span
            className="font-body text-xs uppercase tracking-[0.3em]"
            style={{ color: 'rgba(176, 224, 230, 0.6)' }}
          >
            Contacto
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mb-20">
          <h2
            ref={headingRef}
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: '#ffffff',
              opacity: 0,
            }}
          >
            ¿Listo para llevar tu
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #B0E0E6 0%, #ffffff 50%, #B0E0E6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              proyecto al siguiente nivel?
            </span>
          </h2>
          <p
            className="font-body text-base lg:text-lg leading-relaxed"
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            Cuéntame sobre tu idea y juntos crearemos algo extraordinario. 
            Respondo en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-7"
            style={{ opacity: 0 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border p-8 md:p-10"
              style={{
                borderColor: 'rgba(176, 224, 230, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(176, 224, 230, 0.05)',
              }}
            >
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(176, 224, 230, 0.08), transparent 70%)',
                }}
              />

              <div className="relative z-10 space-y-8">
                {/* Form header */}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(176, 224, 230, 0.15), rgba(176, 224, 230, 0.05))',
                      border: '1px solid rgba(176, 224, 230, 0.1)',
                    }}
                  >
                    <Sparkles size={18} style={{ color: '#B0E0E6' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold" style={{ color: '#ffffff' }}>
                      Envíame un mensaje
                    </h3>
                    <p className="font-body text-xs" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>
                      Se abrirá directamente en WhatsApp
                    </p>
                  </div>
                </div>

                {/* Name field */}
                <div className="space-y-2">
                  <label
                    className="font-body text-sm font-medium block"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    htmlFor="contact-name"
                  >
                    Tu nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="¿Cómo te llamas?"
                    required
                    className="placeholder:text-white/15"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${focused === 'name' ? 'rgba(176, 224, 230, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                      backgroundColor: focused === 'name' ? 'rgba(176, 224, 230, 0.04)' : 'rgba(255, 255, 255, 0.03)',
                      color: '#ffffff',
                      outline: 'none',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      boxShadow: focused === 'name' ? '0 0 0 3px rgba(176, 224, 230, 0.08)' : 'none',
                    }}
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label
                    className="font-body text-sm font-medium block"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    htmlFor="contact-email"
                  >
                    Tu correo electrónico
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="correo@ejemplo.com"
                    required
                    className="placeholder:text-white/15"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${focused === 'email' ? 'rgba(176, 224, 230, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                      backgroundColor: focused === 'email' ? 'rgba(176, 224, 230, 0.04)' : 'rgba(255, 255, 255, 0.03)',
                      color: '#ffffff',
                      outline: 'none',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      boxShadow: focused === 'email' ? '0 0 0 3px rgba(176, 224, 230, 0.08)' : 'none',
                    }}
                  />
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label
                    className="font-body text-sm font-medium block"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    htmlFor="contact-message"
                  >
                    Cuéntame sobre tu proyecto
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="Describe tu idea, los objetivos del proyecto y cómo puedo ayudarte..."
                    required
                    rows={5}
                    className="placeholder:text-white/15"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${focused === 'message' ? 'rgba(176, 224, 230, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                      backgroundColor: focused === 'message' ? 'rgba(176, 224, 230, 0.04)' : 'rgba(255, 255, 255, 0.03)',
                      color: '#ffffff',
                      outline: 'none',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      resize: 'none' as const,
                      transition: 'all 0.3s ease',
                      boxShadow: focused === 'message' ? '0 0 0 3px rgba(176, 224, 230, 0.08)' : 'none',
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group relative flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl overflow-hidden transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #B0E0E6, #87CEEB)',
                    color: '#000000',
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = '0 12px 40px rgba(176, 224, 230, 0.25), 0 0 0 1px rgba(176, 224, 230, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                  data-cursor-hover
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite linear',
                    }}
                  />
                  <Send size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="relative z-10 font-body text-sm tracking-wide">
                    Enviar mensaje por WhatsApp
                  </span>
                </button>
              </div>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-5 space-y-5">
            {/* Availability card */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                borderColor: 'rgba(176, 224, 230, 0.08)',
                backgroundColor: 'rgba(176, 224, 230, 0.03)',
                opacity: 0,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex items-center justify-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: '#4ade80',
                      boxShadow: '0 0 12px rgba(74, 222, 128, 0.4)',
                    }}
                  />
                  <div
                    className="absolute w-3 h-3 rounded-full animate-ping"
                    style={{
                      backgroundColor: '#4ade80',
                      opacity: 0.4,
                    }}
                  />
                </div>
                <span className="font-display text-sm font-semibold" style={{ color: '#4ade80' }}>
                  Disponible para nuevos proyectos
                </span>
              </div>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                ¿Tienes una idea en mente? Estoy disponible para proyectos freelance, 
                colaboraciones y oportunidades a tiempo completo. ¡Hablemos!
              </p>
            </div>

            {/* Contact channels */}
            {contactChannels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <a
                  key={i}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.06)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    textDecoration: 'none',
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(176, 224, 230, 0.15)';
                    el.style.backgroundColor = 'rgba(176, 224, 230, 0.04)';
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    el.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                  data-cursor-hover
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: `${channel.color}10`,
                      border: `1px solid ${channel.color}20`,
                    }}
                  >
                    <Icon size={20} style={{ color: channel.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-display text-sm font-semibold mb-0.5"
                      style={{ color: '#ffffff' }}
                    >
                      {channel.label}
                    </div>
                    <div
                      className="font-body text-xs truncate"
                      style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    >
                      {channel.description}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: '#B0E0E6' }}
                  />
                </a>
              );
            })}

            {/* Response time info */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl border"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.06)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                opacity: 0,
              }}
            >
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>
                    Tiempo de respuesta
                  </span>
                  <span className="font-display text-sm font-semibold" style={{ color: '#B0E0E6' }}>
                    {'< 24h'}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '90%',
                      background: 'linear-gradient(90deg, #B0E0E6, #87CEEB)',
                      boxShadow: '0 0 10px rgba(176, 224, 230, 0.3)',
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>
                    Ubicación
                  </span>
                  <span className="font-body text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    🌎 Disponible mundial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
