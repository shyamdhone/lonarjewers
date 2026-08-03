import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export const Hero = ({ title, subtitle, image, cta }) => {
  const compRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background image entrance cinematic animation with controlled scaling
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
        );
      }

      // Hero text and content staggered entrance
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('[data-hero-animate]');
        if (elements.length > 0) {
          tl.fromTo(
            elements,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
            '-=1'
          );
        }
      }
    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} className="relative min-h-screen w-full overflow-hidden flex items-center bg-zinc-950">
      {/* Background Image Container with Strict Overflow Clipping */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src={image}
          alt={title || "Luxury Jewellery Showcase"}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-100 contrast-[105%] saturate-[110%] opacity-0 will-change-transform"
        />
        {/* Single Subtle Overlay to Preserve Full Image Vibrance (Max 35%) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Left-Aligned Editorial Content Layout */}
      <div
        ref={contentRef}
        className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-16 relative z-20 pt-32 pb-20 flex flex-col items-start justify-center text-left"
      >
        {/* Pre-header Tag */}
        <div
          data-hero-animate
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-black/30 backdrop-blur-md mb-6 opacity-0 will-change-transform"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-medium">
            Haute Joaillerie & Horlogerie
          </span>
        </div>

        {/* Main Heading */}
        <h1
          data-hero-animate
          className="text-5xl sm:text-7xl lg:text-[90px] font-serif font-bold text-white mb-6 max-w-4xl leading-[1.05] tracking-tight opacity-0 will-change-transform"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          data-hero-animate
          className="text-lg sm:text-xl lg:text-[22px] text-stone-200 mb-10 max-w-xl font-sans font-light leading-relaxed opacity-0 will-change-transform"
          style={{ textShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
        >
          {subtitle}
        </p>

        {/* Action Buttons */}
        {cta && (
          <div
            data-hero-animate
            className="flex items-center gap-5 flex-wrap opacity-0 will-change-transform"
          >
            <motion.button
              className="px-9 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-zinc-950 font-semibold rounded-full tracking-[0.15em] uppercase text-sm shadow-xl shadow-amber-500/20 border border-amber-300/40 cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              {cta.primary}
            </motion.button>
            <motion.button
              className="px-9 py-4 border border-white/40 text-white font-medium rounded-full tracking-[0.15em] uppercase text-sm backdrop-blur-md bg-white/5 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "#FFFFFF", color: "#09090b" }}
              whileTap={{ scale: 0.97 }}
            >
              {cta.secondary}
            </motion.button>
          </div>
        )}

        {/* Elegant Trust Bar with Glass Cards */}
        <div
          data-hero-animate
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 pt-10 border-t border-white/15 max-w-2xl w-full opacity-0 will-change-transform"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 font-serif text-sm">✦</div>
            <div className="flex flex-col">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">100% Certified</span>
              <span className="text-stone-400 text-[11px] uppercase tracking-wider">Diamonds</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 font-serif text-sm">✦</div>
            <div className="flex flex-col">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">BIS Hallmarked</span>
              <span className="text-stone-400 text-[11px] uppercase tracking-wider">Pure Gold</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 font-serif text-sm">✦</div>
            <div className="flex flex-col">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">Lifetime</span>
              <span className="text-stone-400 text-[11px] uppercase tracking-wider">Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Gold Scroll Indicator */}
      <motion.div
        data-hero-animate
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2 opacity-0"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-light">Scroll</span>
        <div className="w-5 h-9 rounded-full border-2 border-amber-500/40 flex items-start justify-center p-1">
          <motion.div 
            className="w-1 h-2 bg-amber-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};