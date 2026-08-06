import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../hooks/useScroll';
import gsap from 'gsap';
import { 
  FiSearch, 
  FiHeart, 
  FiX, 
  FiCalendar, 
  FiArrowUpRight, 
  FiPhone, 
  FiMessageCircle,
  FiChevronRight
} from 'react-icons/fi';
import logo from '../assets/images/logo.jpg';

// --- DATA CONFIGURATIONS ---
const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/store', label: 'Store', hasMegaMenu: true },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/gold-calculator', label: 'Gold Calculator' },
];

const MEGA_MENU_CATEGORIES = [
  {
    title: 'Gold Jewellery',
    items: ['Bangles & Bracelets', 'Chains & Necklaces', 'Earrings', 'Gold Rings', 'Mangalsutra'],
  },
  {
    title: 'Diamond Jewellery',
    items: ['Solitaire Rings', 'Diamond Necklaces', 'Nose Pins', 'Eternity Bands', 'Diamond Earrings'],
  },
  {
    title: 'Bridal & Royal',
    items: ['Wedding Sets', 'Kundans & Polki', 'Heritage Collection', 'Temple Jewellery', 'Antiques'],
  },
  {
    title: 'Curated Collections',
    items: ['New Arrivals', 'Best Sellers', 'High Jewellery', 'Gifting Specials', 'Coins & Bars'],
  },
];

const SEARCH_TRENDS = [
  'Solitaire Engagement Rings',
  '24K Gold Coins',
  'Kundans Bridal Set',
  'Temple Art Earrings',
  'Rose Gold Bracelets',
];

// --- 1. LIVE GOLD PRICE WIDGET ---
const GoldPriceWidget = memo(() => {
  const [rate, setRate] = useState(72450);
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 120;
      setRate((prev) => {
        const nextRate = Math.round(prev + delta);
        setIsUp(delta >= 0);
        return nextRate;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-luxury-dark/4 border border-luxury-gold/20 text-[11px] font-poppins transition-all hover:border-luxury-gold/50">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-luxury-dark/70 font-medium tracking-wider uppercase">24K Gold:</span>
      <span className="font-semibold text-luxury-dark tracking-tight">₹{rate.toLocaleString('en-IN')}/10g</span>
      <span className={`flex items-center text-[10px] font-bold ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
        <FiArrowUpRight className={`transition-transform duration-300 ${!isUp ? 'rotate-180' : ''}`} />
        {isUp ? '+0.4%' : '-0.2%'}
      </span>
    </div>
  );
});

// --- 2. MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, className = '', ...props }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;

    gsap.to(btnRef.current, {
      x,
      y,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div 
      ref={btnRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      {...props}
    >
      <div className={className}>
        {children}
      </div>
    </div>
  );
};

// --- 3. FULLSCREEN SEARCH OVERLAY ---
const SearchOverlay = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        display: 'flex',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden opacity-0 flex-col bg-black/85 backdrop-blur-2xl text-white px-6 md:px-20 py-12 justify-between"
    >
      <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
        <span className="font-playfair text-xl tracking-widest text-luxury-gold uppercase">Shreeji Search</span>
        <button
          onClick={onClose}
          className="p-3 rounded-full border border-white/20 text-white/80 hover:text-luxury-gold hover:border-luxury-gold transition-colors cursor-pointer"
          aria-label="Close search"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="max-w-4xl w-full mx-auto my-auto">
        <div className="relative border-b-2 border-luxury-gold/50 focus-within:border-luxury-gold transition-colors pb-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search High Jewellery, Solitaires, Collections..."
            className="w-full bg-transparent text-2xl md:text-4xl font-playfair placeholder-white/30 text-white focus:outline-none pr-12"
          />
          <FiSearch size={32} className="absolute right-0 top-1/2 -translate-y-1/2 text-luxury-gold" />
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-luxury-gold/80 font-poppins mb-4">Trending Searches</p>
          <div className="flex flex-wrap gap-3">
            {SEARCH_TRENDS.map((term, i) => (
              <button
                key={i}
                className="text-xs md:text-sm px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-luxury-gold/20 hover:border-luxury-gold transition-all text-white/80 cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto text-center text-xs text-white/40 tracking-wider font-poppins">
        PRESS ESC TO CLOSE
      </div>
    </div>
  );
};

// --- MAIN NAVBAR COMPONENT ---
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(2);

  const scrollY = useScrollPosition();
  const location = useLocation();

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const megaMenuRef = useRef(null);
  const spotlightRef = useRef(null);

  const isScrolled = scrollY > 40;

  // Track Mouse Spotlight Movement
  const handleMouseMove = useCallback((e) => {
    if (!spotlightRef.current || !navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.08), transparent 80%)`;
  }, []);

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  // Keyboard navigation & search escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        height: '100vh',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.fromTo(
        '.mobile-nav-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  // Mega Menu Toggle Animation
  useEffect(() => {
    if (!megaMenuRef.current) return;
    if (isMegaMenuOpen) {
      gsap.to(megaMenuRef.current, {
        opacity: 1,
        y: 0,
        display: 'block',
        duration: 0.35,
        ease: 'power3.out',
      });
    } else {
      gsap.to(megaMenuRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (megaMenuRef.current) megaMenuRef.current.style.display = 'none';
        },
      });
    }
  }, [isMegaMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-glass-luxury border-b border-luxury-gold/20 py-2'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4'
        }`}
      >
        {/* Cursor Spotlight Glow */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-100"
        />

        {/* Top Continuous Gold Shimmer Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold/20 overflow-hidden">
          <div className="w-full h-full bg-gold-shimmer animate-shimmer-slide" />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between h-16 md:h-20 max-w-[1920px] mx-auto relative z-10">
          
          {/* Brand Logo Section */}
          <Link to="/" className="flex items-center gap-3.5 group cursor-pointer">
            <div className="relative flex items-center justify-center">
              <div className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] p-[2px] shadow-gold-glow group-hover:shadow-gold-glow-lg group-hover:scale-105 transition-all duration-500 overflow-hidden shrink-0">
                <img
                  src={logo}
                  alt="Shreeji Jewellers"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className={`font-playfair text-lg md:text-2xl font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
                Shreeji
              </span>
              <span className="text-[8px] md:text-[9.5px] tracking-[0.3em] text-luxury-gold uppercase font-poppins font-semibold -mt-0.5">
                
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 h-full">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={item.path}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.hasMegaMenu && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => item.hasMegaMenu && setIsMegaMenuOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`text-xs lg:text-[13px] font-poppins tracking-[0.12em] uppercase transition-colors duration-300 py-2 relative group ${
                      isActive
                        ? 'text-luxury-gold font-semibold'
                        : isScrolled
                        ? 'text-luxury-dark/90 hover:text-luxury-gold'
                        : 'text-white/90 hover:text-luxury-gold'
                    }`}
                  >
                    {item.label}

                    {/* Active/Hover Animated Indicator */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>

                  {/* Mega Menu Overlay Trigger Box */}
                  {item.hasMegaMenu && (
                    <div
                      ref={megaMenuRef}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[88vw] max-w-6xl bg-white/95 backdrop-blur-2xl border border-luxury-gold/30 rounded-2xl shadow-glass-luxury p-8 hidden opacity-0 z-50 text-luxury-dark"
                    >
                      <div className="grid grid-cols-4 gap-8">
                        {MEGA_MENU_CATEGORIES.map((cat, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="font-playfair text-sm font-bold tracking-wider text-luxury-gold uppercase border-b border-luxury-gold/20 pb-2">
                              {cat.title}
                            </h4>
                            <ul className="space-y-2">
                              {cat.items.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <Link
                                    to="/store"
                                    className="text-xs text-luxury-dark/70 hover:text-luxury-gold transition-colors font-poppins flex items-center justify-between group/sub"
                                  >
                                    <span>{sub}</span>
                                    <FiChevronRight className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-luxury-gold" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Mega Menu Bottom Banner */}
                      <div className="mt-8 pt-6 border-t border-luxury-gold/15 flex justify-between items-center bg-luxury-cream/40 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-luxury-gold" />
                          <span className="text-xs font-poppins font-medium tracking-wide">
                            Bespoke Jewellery Design Services Available
                          </span>
                        </div>
                        <Link
                          to="/contact"
                          className="text-xs font-poppins font-semibold text-luxury-gold hover:underline uppercase tracking-wider flex items-center gap-1"
                        >
                          Book Personal Consultation <FiArrowUpRight />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live Gold Widget */}
            <GoldPriceWidget />

            {/* Search Toggle Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? 'border-luxury-dark/10 text-luxury-dark hover:border-luxury-gold hover:text-luxury-gold'
                  : 'border-white/20 text-white hover:border-luxury-gold hover:text-luxury-gold'
              }`}
              aria-label="Search"
            >
              <FiSearch size={16} />
            </button>

            {/* Wishlist Button with Heartbeat */}
            <button
              className={`relative p-2.5 rounded-full border transition-all duration-300 group cursor-pointer ${
                isScrolled
                  ? 'border-luxury-dark/10 text-luxury-dark hover:border-luxury-gold hover:text-luxury-gold'
                  : 'border-white/20 text-white hover:border-luxury-gold hover:text-luxury-gold'
              }`}
              aria-label="Wishlist"
            >
              <FiHeart size={16} className="group-hover:scale-110 group-hover:text-rose-500 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-luxury-gold text-luxury-dark text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Primary CTA: Book Appointment (Navigates to /contact) */}
            <MagneticButton>
              <Link
                to="/contact"
                className="text-xs px-5 py-2.5 rounded-full font-poppins tracking-widest uppercase font-semibold bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-luxury-dark shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 cursor-pointer flex items-center gap-2 border border-luxury-gold-light/40"
              >
                <FiCalendar size={14} />
                <span>Book Appointment</span>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-luxury-gold/10 focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            <span
              className={`w-5 h-0.5 bg-luxury-gold transition-transform duration-300 origin-center ${
                isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-luxury-gold transition-opacity duration-300 my-0.5 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-luxury-gold transition-transform duration-300 origin-center ${
                isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}
            />
          </button>
        </div>

        {/* Fullscreen Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden fixed inset-0 top-0 left-0 w-full h-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-between px-8 py-20 text-white"
        >
          <div className="flex flex-col gap-4 mt-8">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-item font-playfair text-2xl tracking-widest uppercase transition-all ${
                    isActive ? 'text-luxury-gold font-bold pl-2 border-l-2 border-luxury-gold' : 'text-white/80 hover:text-luxury-gold'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Bottom Contact & Action Bar */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-xs font-poppins uppercase tracking-wider text-white"
              >
                <FiPhone /> Call Us
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-xs font-poppins uppercase tracking-wider"
              >
                <FiMessageCircle /> WhatsApp
              </a>
            </div>

            {/* Mobile Book VIP Consultation (Navigates to /contact) */}
            <Link
              to="/contact"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-luxury-dark font-poppins text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center justify-center gap-2"
            >
              <FiCalendar size={14} />
              <span>Book VIP Consultation</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Global Search Drawer */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};