import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './sections/Preloader';
import Hero from './sections/Hero';
import Navigation from './components/Navigation';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';

// Lazy load below-fold sections for faster initial paint
const About = lazy(() => import('./sections/About'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // lagSmoothing(0) handles high refresh rates gracefully
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // Handle preloader complete
  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    // Refresh ScrollTrigger after content is visible
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Grain overlay */}
      <GrainOverlay />

      {/* Skip to content - accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:border focus:border-[#B0E0E6] focus:rounded"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Saltar al contenido
      </a>

      {/* Preloader */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Navigation */}
      <Navigation lenisRef={lenisRef} />

      {/* Main content */}
      <main
        aria-busy={loading}
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Hero lenisRef={lenisRef} />
        <Suspense fallback={null}>
          <About />
          <Projects />
          <Contact />
          <Footer lenisRef={lenisRef} />
        </Suspense>
      </main>
    </>
  );
}

export default App;
