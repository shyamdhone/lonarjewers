import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);

  // Extract properties to prevent re-running effect on object identity changes
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    yPercent = 30,
    opacity = 0,
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    // Use GSAP Context for isolated scope and clean teardown
    const ctx = gsap.context(() => {
      const elements = elementRef.current.querySelectorAll('[data-reveal]');
      if (!elements.length) return;

      gsap.fromTo(
        elements,
        {
          opacity: opacity,
          yPercent: yPercent,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 85%',
            once: true, // Guarantees elements remain visible once triggered
            invalidateOnRefresh: true,
          },
        }
      );
    }, elementRef);

    return () => ctx.revert(); // Safely removes triggers and resets inline CSS
  }, [duration, delay, stagger, yPercent, opacity]);

  return elementRef;
};

export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          invalidateOnRefresh: true,
        },
        y: () => window.innerHeight * speed,
        ease: 'none',
      });
    }, elementRef);

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
};

export const useHoverAnimation = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return elementRef;
};