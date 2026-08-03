import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../hooks/useScroll';
import gsap from 'gsap';
import logo from "../assets/images/logo.jpg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollPosition();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  // Close mobile menu automatically on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // GSAP animation for mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        duration: 0.3,
        height: 'auto',
        opacity: 1,
        ease: 'power2.out',
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        duration: 0.3,
        height: 0,
        opacity: 0,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/store', label: 'Store' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/gold-calculator', label: 'Gold Calculator' },
  ];

  const isScrolled = scrollY > 50;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-luxury-gold/20 py-4'
          : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-6'
      }`}
    >
      {/* Increased side padding (px-6 md:px-12 lg:px-16) to keep content away from screen edges */}
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between h-20 md:h-28">
        
        {/* Larger Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] p-[2.5px] shadow-xl group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
              <img 
                src={logo} 
                alt="Shree Lonar Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className={`font-playfair text-lg md:text-2xl font-bold tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
              Shree Lonar
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-luxury-gold uppercase font-poppins font-medium">
              Haute Joaillerie
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm lg:text-base font-poppins font-medium tracking-wide relative py-1 transition-colors duration-300 group ${
                  isActive
                    ? 'text-luxury-gold font-semibold'
                    : (isScrolled ? 'text-luxury-dark hover:text-luxury-gold' : 'text-white/90 hover:text-luxury-gold')
                }`}
              >
                {item.label}
                {/* Animated active/hover underline indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-luxury-gold to-amber-200 transition-all duration-300 rounded-full ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Larger, Attractive Luxury CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className={`text-xs lg:text-sm px-7 py-3.5 rounded-full font-poppins tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            isScrolled 
              ? 'border border-luxury-gold/60 text-luxury-dark hover:bg-luxury-gold/10' 
              : 'border border-white/60 text-white hover:bg-white/10'
          }`}>
            Wishlist
          </button>
          
          <button className="text-xs lg:text-sm px-8 py-3.5 rounded-full font-poppins tracking-wider uppercase font-medium bg-gradient-to-r from-[#D4AF37] via-[#E6C554] to-[#C59B27] text-luxury-dark shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer">
            Shop Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-12 h-12 rounded-full bg-luxury-gold/10 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
        >
          <span
            className={`w-6 h-0.5 bg-luxury-gold transition-transform duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-luxury-gold transition-opacity duration-300 my-1 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-luxury-gold transition-transform duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5'
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-navigation-menu"
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-luxury-gold/20 shadow-2xl"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 py-6 flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-poppins font-medium py-3 px-4 rounded-lg transition-all ${
                  isActive
                    ? 'text-luxury-gold bg-luxury-gold/10 font-semibold pl-5'
                    : 'text-luxury-dark hover:text-luxury-gold hover:bg-luxury-cream/50 hover:pl-5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-3 pt-5 mt-3 border-t border-luxury-gold/15">
            <button className="flex-1 text-xs py-3.5 rounded-full border border-luxury-gold/50 text-luxury-dark font-poppins uppercase tracking-wider font-medium cursor-pointer">
              Wishlist
            </button>
            <button className="flex-1 text-xs py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-luxury-dark font-poppins uppercase tracking-wider font-semibold shadow-md cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};