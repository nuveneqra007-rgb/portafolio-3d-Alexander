import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { CheckCircle2, Loader2, Shield } from 'lucide-react';

// Número de WhatsApp (reemplaza por tu número en formato internacional sin '+', ej: '5491123456789')
const WHATSAPP_NUMBER = '18096314386';

const SOCIAL_ORBIT_LINKS = [
  {
    name: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: FaWhatsapp,
    color: '#25D366',
    positionClass: '-top-6 left-1/2 -translate-x-1/2',
    isExternal: true,
  },
  {
    name: 'Gmail',
    href: 'mailto:miguelalexanderlopezmendosa23@gmail.com',
    icon: SiGmail,
    color: '#EA4335',
    positionClass: 'top-1/2 -right-6 -translate-y-1/2',
    isExternal: false,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/nuveneqra007-rgb',
    icon: FaGithub,
    color: '#F0F6FC',
    positionClass: '-bottom-6 left-1/2 -translate-x-1/2',
    isExternal: true,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alexander-lopez-315673401/',
    icon: FaLinkedinIn,
    color: '#0A66C2',
    positionClass: 'top-1/2 -left-6 -translate-y-1/2',
    isExternal: true,
  },
];

const SHIELD_LAYERS = [
  { z: -14, stroke: 'rgba(0, 255, 65, 0.35)', fill: 'rgba(0, 255, 65, 0.04)' },
  { z: 0, stroke: 'rgba(176, 224, 230, 0.78)', fill: 'rgba(10, 24, 32, 0.45)' },
  { z: 14, stroke: 'rgba(0, 255, 65, 0.65)', fill: 'rgba(176, 224, 230, 0.06)' },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    const formattedMessage = `Hola Alexander, soy ${name.trim()}. Mi correo es ${email.trim()}. Mensaje: ${message.trim()}`;
    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    formRef.current?.reset();
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Subtle radial glow background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 26% 52%, rgba(0, 255, 65, 0.05) 0%, transparent 55%), radial-gradient(ellipse at 76% 48%, rgba(176, 224, 230, 0.06) 0%, transparent 55%)',
        }}
      />

      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              className="font-mono text-xs uppercase tracking-[0.3em]"
              style={{ color: 'rgba(176, 224, 230, 0.65)' }}
            >
              03
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, rgba(176, 224, 230, 0.25), rgba(0, 255, 65, 0.12))',
              }}
            />
            <span
              className="font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: 'rgba(176, 224, 230, 0.65)' }}
            >
              Contacto
            </span>
          </div>

          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.3rem, 4.8vw, 4.2rem)', color: '#ffffff' }}
          >
            Conectemos &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #B0E0E6 0%, #00ff41 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Colaboremos
            </span>
          </h2>
        </motion.div>

        {/* Two-Column Layout: Left (3D Shield + Orbiting Links) / Right (WhatsApp Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
          {/* Left Column: 3D Holographic Shield & 4 Clickable Orbiting Icons */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center justify-center py-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="orbit-pause-group relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
              {/* Neon Ambient Halo */}
              <div
                aria-hidden="true"
                className="absolute inset-6 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0, 255, 65, 0.14) 0%, rgba(176, 224, 230, 0.08) 45%, transparent 72%)',
                  filter: 'blur(14px)',
                }}
              />

              {/* Holographic Orbit Rings */}
              <div
                aria-hidden="true"
                className="absolute inset-2 sm:inset-3 rounded-full border border-dashed pointer-events-none"
                style={{ borderColor: 'rgba(176, 224, 230, 0.24)' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-10 sm:inset-12 rounded-full border pointer-events-none"
                style={{ borderColor: 'rgba(0, 255, 65, 0.16)' }}
              />

              {/* Orbiting Clickable Social Links */}
              <div className="about-orbit-ring absolute inset-2 sm:inset-3 z-30 pointer-events-none">
                {SOCIAL_ORBIT_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className={`absolute ${item.positionClass} z-30 pointer-events-auto`}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <a
                        href={item.href}
                        target={item.isExternal ? '_blank' : undefined}
                        rel={item.isExternal ? 'noopener noreferrer' : undefined}
                        aria-label={item.name}
                        title={item.name}
                        style={{ pointerEvents: 'auto' }}
                        className="about-orbit-item group/icon relative z-30 flex items-center justify-center w-12 h-12 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-110"
                      >
                        <span
                          className="absolute inset-0 rounded-2xl transition-all duration-300"
                          style={{
                            backgroundColor: 'rgba(8, 13, 18, 0.9)',
                            border: `1px solid ${item.color}55`,
                            boxShadow: `0 0 18px ${item.color}30`,
                          }}
                        />
                        <Icon
                          size={20}
                          className="relative z-10 transition-transform duration-300 group-hover/icon:scale-110"
                          style={{ color: item.color }}
                        />
                        <span className="sr-only">{item.name}</span>
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Central 3D Holographic Shield */}
              <div
                className="animate-float relative z-10 pointer-events-none flex items-center justify-center"
                style={{ perspective: '1000px' }}
              >
                <div className="contact-shield-3d relative w-[148px] h-[170px] flex items-center justify-center">
                  {SHIELD_LAYERS.map((layer, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        transform: `translateZ(${layer.z}px)`,
                        filter:
                          idx === 2
                            ? 'drop-shadow(0 0 18px rgba(0, 255, 65, 0.45))'
                            : 'drop-shadow(0 0 12px rgba(176, 224, 230, 0.35))',
                      }}
                    >
                      <svg
                        viewBox="0 0 120 140"
                        className="w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M60 6L110 26V66C110 99 88.5 123.5 60 134C31.5 123.5 10 99 10 66V26L60 6Z"
                          fill={layer.fill}
                          stroke={layer.stroke}
                          strokeWidth="2.2"
                        />
                        {idx === 1 && (
                          <>
                            <path
                              d="M60 18L98 33V65C98 91 81.5 110.5 60 119.5C38.5 110.5 22 91 22 65V33L60 18Z"
                              stroke="rgba(0, 255, 65, 0.35)"
                              strokeWidth="1.2"
                              strokeDasharray="4 4"
                            />
                            <path
                              d="M34 62H86M60 32V104"
                              stroke="rgba(176, 224, 230, 0.25)"
                              strokeWidth="1"
                            />
                          </>
                        )}
                      </svg>
                    </div>
                  ))}

                  {/* Center Neon Core Icon */}
                  <div
                    className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border"
                    style={{
                      transform: 'translateZ(20px)',
                      backgroundColor: 'rgba(0, 255, 65, 0.1)',
                      borderColor: 'rgba(0, 255, 65, 0.6)',
                      boxShadow: '0 0 24px rgba(0, 255, 65, 0.4)',
                    }}
                  >
                    <Shield size={22} color="#00ff41" />
                  </div>
                </div>
              </div>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mt-4 text-center">
              Haz clic en cualquier órbita para conectar
            </p>
          </motion.div>

          {/* Right Column: Glassmorphism WhatsApp Form */}
          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 }}
          >
            <div
              className="relative rounded-2xl border p-6 sm:p-8 lg:p-10 backdrop-blur-xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(11, 16, 21, 0.72)',
                borderColor: 'rgba(176, 224, 230, 0.16)',
                boxShadow:
                  '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 45px rgba(176, 224, 230, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#00ff41]/80">
                  Direct WhatsApp Uplink
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Envíame un mensaje
                </h3>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[#B0E0E6]/75 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 bg-black/50 border border-white/10 focus:border-[#00ff41]/60 focus:outline-none focus:ring-1 focus:ring-[#00ff41]/30 transition-all disabled:opacity-60"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[#B0E0E6]/75 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder="tu_correo@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 bg-black/50 border border-white/10 focus:border-[#00ff41]/60 focus:outline-none focus:ring-1 focus:ring-[#00ff41]/30 transition-all disabled:opacity-60"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[#B0E0E6]/75 mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder="Cuéntame sobre tu proyecto, idea o colaboración..."
                    className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 bg-black/50 border border-white/10 focus:border-[#00ff41]/60 focus:outline-none focus:ring-1 focus:ring-[#00ff41]/30 transition-all resize-none disabled:opacity-60"
                  />
                </div>

                {/* Success Message */}
                {isSuccess && (
                  <div
                    role="status"
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border font-mono text-xs"
                    style={{
                      backgroundColor: 'rgba(0, 255, 65, 0.08)',
                      borderColor: 'rgba(0, 255, 65, 0.45)',
                      color: '#00ff41',
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)',
                    }}
                  >
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>¡Redirigiendo a WhatsApp!</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-sm uppercase tracking-wider border transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01]"
                  style={{
                    backgroundColor: 'rgba(37, 211, 102, 0.14)',
                    borderColor: 'rgba(37, 211, 102, 0.5)',
                    color: '#25D366',
                    boxShadow: '0 0 25px rgba(37, 211, 102, 0.18)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Preparando...</span>
                    </>
                  ) : (
                    <>
                      <FaWhatsapp size={18} />
                      <span>Enviar por WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
