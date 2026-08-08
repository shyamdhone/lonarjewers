import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiHeart, 
  FiX, 
  FiCalendar, 
  FiArrowUpRight, 
  FiChevronDown,
  FiPhone,
  FiMessageCircle,
  FiStar,
  FiShield
} from 'react-icons/fi';
import { Link } from "react-router-dom";

// Curated High Jewellery Mega Menu Categories
const MEGA_MENU_ITEMS = [
  { id: 'necklaces', title: 'Necklaces & Chokers', desc: 'Solitaires, Navratna & Royalty chains', tag: 'Bestseller', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop' },
  { id: 'earrings', title: 'Haute Earrings', desc: 'Cascading Chandbalis & Polki Jhumkas', tag: 'New Arrival', img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop' },
  { id: 'mangalsutra', title: 'Royal Mangalsutra', desc: 'Modern black beads & GIA solitaires', tag: 'Exclusive', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop' },
  { id: 'temple', title: 'Temple Artistry', desc: 'Heritage handcrafted South Indian gold', tag: 'Handmade', img: 'https://images.unsplash.com/photo-1611591475858-a53c0235316f?q=80&w=600&auto=format&fit=crop' },
  { id: 'bridal', title: 'Bridal Parure', desc: 'Grand wedding sets & Jadau masterpieces', tag: 'Masterpiece', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
  { id: 'diamond', title: 'Certified Diamonds', desc: 'EF-VVS+ flawless solitaire collection', tag: 'GIA Certified', img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop' }
];
import logoImg from '../assets/images/logo.jpg'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [goldRate, setGoldRate] = useState(144800); // Updated standard 24K gold rate per 10g (Pune/India regional benchmark)
  const [rateUp, setRateUp] = useState(true);

  // Monitor Scroll Position & Direction safely
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past threshold for styling
      setIsScrolled(currentScrollY > 20);

      // Hide/Show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px -> Hide navbar
        setIsVisible(false);
        setActiveMenu(null); // Close mega menu if open while scrolling down
      } else {
        // Scrolling up -> Show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Live Market Fluctuation Mock
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 120;
      setGoldRate((prev) => {
        const next = Math.round(prev + delta);
        setRateUp(delta >= 0);
        return next;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when modals are active
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen || isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen, isMobileMenuOpen, isBookingOpen]);

  return (
    <>
      {/* FLOATING PILL NAVBAR CONTAINER */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        
        {/* Ambient Gold Particles */}
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none overflow-hidden flex justify-around opacity-30">
          <span className="w-1 h-1 bg-[#D4AF37] rounded-full animate-ping mt-2" />
          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse mt-4" />
          <span className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce mt-1" />
        </div>

        <nav
          className={`pointer-events-auto w-full max-w-[94vw] lg:max-w-[92vw] xl:max-w-[1440px] rounded-[9999px] transition-all duration-700 ease-in-out relative border backdrop-blur-3xl backdrop-saturate-150 ${
            isScrolled
              ? 'bg-[#FFFDF8]/95 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(27,26,23,0.12)] py-3 px-2'
              : 'bg-[#FFFDF8]/80 border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(27,26,23,0.08)] py-5 px-3'
          }`}
        >
          <div className="px-6 md:px-10 flex items-center justify-between relative z-10">
            
            {/* BRAND LOGO IMAGE REPLACEMENT - INCREASED SIZE */}
            <Link to="/" className="flex items-center group relative">
              <div className="relative overflow-hidden flex items-center py-1">
                <img 
                  src={logoImg}
                  alt="Shreeji Jewellers Logo" 
                  className="h-14 md:h-16 w-auto object-contain rounded-full border border-[#D4AF37]/50 shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* NAVIGATION LINKS */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              {[
                { name: 'Home', path: '/' },
                { name: 'Store', path: '/store', hasMega: true },
                { name: 'Gold Calculator', path: '/gold-calculator' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <div
                  key={link.name}
                  className="relative py-2 group/nav"
                  onMouseEnter={() => link.hasMega && setActiveMenu('store')}
                  onMouseLeave={() => link.hasMega && setActiveMenu(null)}
                >
                  <Link
                    to={link.path}
                    className="text-xs xl:text-[13px] font-sans font-medium tracking-[0.2em] uppercase text-[#1B1A17]/85 hover:text-[#C5A059] transition-colors duration-300 flex items-center gap-1.5 py-1"
                  >
                    <span>{link.name}</span>
                    {link.hasMega && (
                      <FiChevronDown className="text-[#C5A059] group-hover/nav:rotate-180 transition-transform duration-500 text-xs" />
                    )}
                  </Link>

                  {/* Animated Gold Underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 flex items-center justify-center transition-all duration-500 group-hover/nav:w-full">
                    <span className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT ACTION CONTROLS */}
            <div className="hidden md:flex items-center gap-3.5 xl:gap-4">
              
              {/* LIVE GOLD WIDGET */}
              <div className="hidden xl:flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1B1A17] border border-[#D4AF37]/40 shadow-inner group cursor-pointer hover:border-[#D4AF37] transition-all duration-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
                </span>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#FFFDF8]/60 font-medium">
                  24K Gold
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-[#D4AF37]">
                  ₹{goldRate.toLocaleString('en-IN')}
                </span>
                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${rateUp ? 'text-emerald-400 bg-emerald-950/50' : 'text-rose-400 bg-rose-950/50'}`}>
                  {rateUp ? '+0.42%' : '-0.15%'}
                </span>
              </div>

              {/* SEARCH TRIGGER */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search Collection"
                className="group relative p-2.5 rounded-full border border-[#D4AF37]/30 bg-[#1B1A17]/5 text-[#1B1A17] hover:border-[#D4AF37] hover:bg-[#1B1A17] hover:text-[#D4AF37] transition-all duration-500 shadow-sm"
              >
                <FiSearch className="text-sm group-hover:rotate-90 transition-transform duration-500" />
              </button>

              {/* WISHLIST BUTTON */}
              <button 
                aria-label="Wishlist"
                className="group relative p-2.5 rounded-full border border-[#D4AF37]/30 bg-[#1B1A17]/5 text-[#1B1A17] hover:border-[#D4AF37] hover:bg-[#1B1A17] hover:text-[#D4AF37] transition-all duration-500 shadow-sm"
              >
                <FiHeart className="text-sm group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-[#1B1A17] text-[9px] font-bold font-mono rounded-full flex items-center justify-center border border-[#FFFDF8] shadow-md">
                  2
                </span>
              </button>

              {/* PRIVATE VIEWING CTA */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1B1A17] via-[#2A2823] to-[#1B1A17] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md flex items-center gap-2.5 cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-500"
              >
                <FiCalendar className="text-xs text-[#D4AF37]" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#FFFDF8] relative z-10">
                  Book Experience
                </span>
                <FiArrowUpRight className="text-xs" />
              </button>
            </div>

            {/* MOBILE HAMBURGER TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2.5 rounded-full border border-[#D4AF37]/40 bg-[#1B1A17]/5 text-[#1B1A17]"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <div className="space-y-1 w-5"><span className="block h-0.5 bg-current" /><span className="block h-0.5 bg-[#C5A059]" /><span className="block h-0.5 bg-current" /></div>}
            </button>
          </div>

          {/* EDITORIAL MEGA MENU DROPDOWN */}
          {activeMenu === 'store' && (
            <div
              onMouseEnter={() => setActiveMenu('store')}
              onMouseLeave={() => setActiveMenu(null)}
              className="absolute top-full left-0 right-0 mt-4 mx-auto w-[96vw] max-w-[1360px] bg-[#FFFDF8]/98 backdrop-blur-3xl border border-[#D4AF37]/40 rounded-[2.5rem] p-10 shadow-2xl text-[#1B1A17] transition-all duration-500"
            >
              <div className="flex justify-between items-end pb-6 mb-8 border-b border-[#D4AF37]/20">
                <div>
                  <div className="flex items-center gap-2 text-[#C5A059] mb-1">
                    <FiStar className="text-xs" />
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-semibold">High Jewellery Haute Couture</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold uppercase tracking-[0.18em] text-[#1B1A17]">
                    Curated Masterpieces & Collections
                  </h3>
                </div>
                <Link to="/store" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] hover:text-[#1B1A17] transition-colors flex items-center gap-1.5">
                  <span>Explore Complete Catalogue</span> 
                  <FiArrowUpRight />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MEGA_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    to={`/store`}
                    className="group relative flex gap-5 p-4 rounded-2xl bg-[#F8F5EF]/50 hover:bg-[#FFFDF8] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                  >
                    <span className="absolute top-3 right-3 z-10 text-[8.5px] font-mono tracking-widest uppercase bg-[#1B1A17] text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                      {item.tag}
                    </span>

                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37]/30 shadow-md">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>

                    <div className="flex flex-col justify-center pr-6">
                      <h4 className="font-serif text-base font-bold tracking-wider text-[#1B1A17] group-hover:text-[#C5A059] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11.5px] text-[#706A63] font-sans mt-1 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-[#C5A059] mt-2">
                        Discover <FiArrowUpRight className="text-[9px]" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#D4AF37]/15 flex items-center justify-between bg-gradient-to-r from-[#F8F5EF] via-[#FFFDF8] to-[#F8F5EF] p-5 rounded-2xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1B1A17] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-md">
                    <FiShield className="text-sm" />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-bold tracking-wide uppercase text-[#1B1A17]">100% Certified Hallmarked Gold & GIA Diamonds</h5>
                    <p className="text-[11px] text-[#706A63]">Every masterpiece is accompanied by international gemological certification and lifetime buyback guarantee.</p>
                  </div>
                </div>
                <Link to="/store" className="px-5 py-2 rounded-full bg-[#1B1A17] text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-[#1B1A17] transition-all shrink-0">
                  View Certified Stock
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* FULLSCREEN SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B1A17]/95 backdrop-blur-3xl flex flex-col px-6 md:px-20 py-12 text-[#FFFDF8]">
          <div className="flex justify-between items-center max-w-7xl mx-auto w-full pb-10 border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-3">
              <FiSearch className="text-[#D4AF37] text-2xl" />
              <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#D4AF37]">Haute Search & Discovery</span>
            </div>
            <button 
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close Search"
              className="p-3 rounded-full border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#1B1A17] transition-all"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="max-w-4xl mx-auto w-full pt-16">
            <div className="relative border-b-2 border-[#D4AF37]/50 pb-4 focus-within:border-[#D4AF37] transition-colors">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solitaires, bridal chokers, temple sets..."
                className="w-full bg-transparent border-none outline-none font-serif text-3xl md:text-5xl text-[#FFFDF8] placeholder-[#FFFDF8]/30 tracking-wider"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] mb-4">Trending Collections</h4>
                <div className="flex flex-wrap gap-3">
                  {['Navratna Necklaces', 'Polki Chandbalis', 'GIA Solitaires', 'Temple Haram', '18K Minimal Gold'].map((tag) => (
                    <button key={tag} onClick={() => setSearchQuery(tag)} className="px-4 py-2 rounded-full border border-[#D4AF37]/30 text-xs font-sans tracking-wider hover:bg-[#D4AF37] hover:text-[#1B1A17] transition-all">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] mb-4">Quick Links</h4>
                <ul className="space-y-3 font-serif text-lg">
                  <li><Link to="/store" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between"><span>Explore Bridal Parure</span> <FiArrowUpRight /></Link></li>
                  <li><Link to="/gold-calculator" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between"><span>Live Gold Rate & Custom Valuation</span> <FiArrowUpRight /></Link></li>
                  <li><Link to="/store" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between"><span>Book Private Viewing Lounge</span> <FiArrowUpRight /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE EDITORIAL MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1B1A17] backdrop-blur-3xl text-[#FFFDF8] flex flex-col justify-between px-8 py-20 overflow-y-auto">
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
              <img src={logoImg} alt="Logo" className="h-12 w-auto rounded-full object-contain" />
              <span className="text-[9px] font-mono tracking-widest text-[#706A63]">HIGH JEWELLERY</span>
            </div>
            
            {[
              { name: 'Home', path: '/' },
              { name: 'Store', path: '/store' },
              { name: 'Gold Calculator', path: '/gold-calculator' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-3xl uppercase tracking-[0.18em] text-[#FFFDF8] hover:text-[#D4AF37] border-b border-[#D4AF37]/15 pb-4 transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                <FiArrowUpRight className="text-xl text-[#D4AF37]" />
              </Link>
            ))}
          </div>

          <div className="space-y-5 pt-8 border-t border-[#D4AF37]/20 mt-10">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#2A2823] border border-[#D4AF37]/30">
              <span className="text-xs uppercase font-sans tracking-widest text-[#FFFDF8]/70">Live 24K Gold Rate</span>
              <span className="text-sm font-mono font-bold text-[#D4AF37]">₹{goldRate.toLocaleString('en-IN')} / 10g</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href="tel:+919876543210" className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#D4AF37]/40 text-xs font-sans uppercase tracking-wider text-[#FFFDF8] hover:bg-[#D4AF37] hover:text-[#1B1A17] transition-all">
                <FiPhone /> Call Concierge
              </a>
              <a href="https://wa.me/" className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-sans uppercase tracking-wider hover:bg-emerald-500 hover:text-black transition-all">
                <FiMessageCircle /> WhatsApp
              </a>
            </div>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsBookingOpen(true); }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059] text-[#1B1A17] font-sans text-xs font-bold uppercase tracking-[0.2em] shadow-lg"
            >
              Book Private Jewellery Experience
            </button>
          </div>
        </div>
      )}

      {/* PRIVATE VIEWING CONSULTATION MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#FFFDF8] border border-[#D4AF37]/60 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-[#1B1A17]">
            <button 
              onClick={() => setIsBookingOpen(false)}
              aria-label="Close Modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-[#1B1A17]"
            >
              <FiX size={22} />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-[#C5A059] mb-1">
                <FiStar className="text-xs" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-semibold">Exquisite Private Hospitality</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wider text-[#1B1A17]">
                Reserve Private Viewing
              </h3>
              <p className="text-xs text-[#706A63] font-sans mt-1">Experience bespoke high jewellery in our VIP salon with dedicated gemologists.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsBookingOpen(false); alert('Private consultation successfully reserved.'); }}>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1A17]/80 mb-1.5">Full Name</label>
                <input type="text" required placeholder="Enter your full name" className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/40 bg-white text-xs outline-none focus:border-[#C5A059]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1A17]/80 mb-1.5">Phone Number</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/40 bg-white text-xs outline-none focus:border-[#C5A059]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1A17]/80 mb-1.5">Preferred Date</label>
                  <input type="date" required className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/40 bg-white text-xs outline-none focus:border-[#C5A059] font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1A17]/80 mb-1.5">Collection of Interest</label>
                <select className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/40 bg-white text-xs outline-none focus:border-[#C5A059]">
                  <option>Bridal Parure & Kundan Sets</option>
                  <option>Certified GIA Solitaires</option>
                  <option>Temple Heritage Artistry</option>
                  <option>Bespoke Custom Design</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-[#1B1A17] text-[#D4AF37] font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-[#1B1A17] transition-all shadow-xl mt-4">
                Confirm Reservation Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}