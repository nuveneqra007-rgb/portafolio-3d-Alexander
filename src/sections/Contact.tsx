import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, MessageCircle, Github as GithubIcon, Linkedin } from 'lucide-react';

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
    borderBottom: `1px solid ${focused === field ? '#B0E0E6' : 'rgba(255, 255, 255, 0.15)'}`,
    color: '#ffffff',
    outline: 'none',
    padding: '16px 0',
    width: '100%',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    letterSpacing: '0.02em',
    transition: 'border-color 0.3s ease',
  });

  const contactInfo = [
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      value: <a href="https://wa.me/18096314386" target="_blank" rel="noopener noreferrer" className="hover:text-[#B0E0E6] transition-colors">Disponible para chat</a> 
    },
    { 
      icon: Mail, 
      label: 'Email', 
      value: <a href="mailto:miguelalexanderlopezmendosa23@gmail.com" className="hover:text-[#B0E0E6] transition-colors" style={{ wordBreak: 'break-all' }}>miguelalexanderlopezmendosa23@gmail.com</a> 
    },
    { 
      icon: GithubIcon, 
      label: 'GitHub', 
      value: <a href="https://github.com/nuveneqra007-rgb" target="_blank" rel="noopener noreferrer" className="hover:text-[#B0E0E6] transition-colors">nuveneqra007-rgb</a> 
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      value: <a href="https://www.linkedin.com/in/alexander-lopez-315673401/" target="_blank" rel="noopener noreferrer" className="hover:text-[#B0E0E6] transition-colors">Alexander Lopez</a> 
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 0, 139, 0.06) 0%, transparent 70%)',
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
        <h2
          ref={headingRef}
          className="font-display font-bold leading-tight mb-20"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            color: '#ffffff',
            opacity: 0,
          }}
        >
          Hagamos realidad tu
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #B0E0E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            próximo proyecto.
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-7 space-y-10"
            style={{ opacity: 0 }}
          >
            <div>
              <label
                className="font-body text-xs uppercase tracking-[0.2em] block mb-2"
                style={{ color: 'rgba(176, 224, 230, 0.5)' }}
              >
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                style={inputStyle('name')}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label
                className="font-body text-xs uppercase tracking-[0.2em] block mb-2"
                style={{ color: 'rgba(176, 224, 230, 0.5)' }}
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                style={inputStyle('email')}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label
                className="font-body text-xs uppercase tracking-[0.2em] block mb-2"
                style={{ color: 'rgba(176, 224, 230, 0.5)' }}
              >
                Mensaje
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                style={{
                  ...inputStyle('message'),
                  resize: 'none',
                  minHeight: '120px',
                }}
                placeholder="Cuéntame sobre tu proyecto..."
                required
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 border transition-all duration-500 hover:bg-[#25D366] hover:border-[#25D366]"
              style={{
                borderColor: 'rgba(37, 211, 102, 0.5)',
                color: '#ffffff',
                backgroundColor: 'rgba(37, 211, 102, 0.1)',
              }}
              data-cursor-hover
            >
              <MessageCircle size={18} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="font-body text-sm uppercase tracking-[0.2em] font-bold">
                Enviar por WhatsApp
              </span>
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-5 space-y-8">
            <div
              className="p-6 border"
              style={{
                borderColor: 'rgba(176, 224, 230, 0.08)',
                backgroundColor: 'rgba(176, 224, 230, 0.02)',
                opacity: 0,
              }}
            >
              <p
                className="font-body text-lg leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                ¿Tienes un proyecto en mente? Estoy disponible para freelance,
                colaboraciones y oportunidades full-time. ¡Hablemos!
              </p>
            </div>

            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border transition-all duration-300 hover:border-[rgba(176,224,230,0.2)]"
                  style={{
                    borderColor: 'rgba(176, 224, 230, 0.08)',
                    backgroundColor: 'rgba(176, 224, 230, 0.02)',
                    opacity: 0,
                  }}
                  data-cursor-hover
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ border: '1px solid rgba(176, 224, 230, 0.2)' }}
                  >
                    <Icon size={16} style={{ color: '#B0E0E6' }} />
                  </div>
                  <div>
                    <div
                      className="font-body text-xs uppercase tracking-wider"
                      style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    >
                      {info.label}
                    </div>
                    <div
                      className="font-body text-sm mt-1"
                      style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {info.value}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
