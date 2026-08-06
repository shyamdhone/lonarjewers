import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  FiInstagram, FiYoutube, FiFacebook, FiPhone, FiMail,
  FiMapPin, FiArrowRight, FiHeart, FiEye, FiShoppingBag,
  FiStar, FiChevronRight, FiChevronLeft, FiPlay, FiAward,
  FiShield, FiClock, FiCheckCircle, FiCalendar, FiSmartphone,
  FiSend, FiSearch, FiMenu, FiX, FiGlobe, FiMessageCircle
} from 'react-icons/fi';
import {
  HiOutlineSparkles, HiOutlineBadgeCheck, HiOutlineCurrencyRupee, HiOutlineStar
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import heroImg from '../assets/images/back.jpg';
import jumkas3Img from '../assets/images/jumkas3.jpg';
import jumkas4Img from '../assets/images/jumkas4.jpg';
import jumkas5Img from '../assets/images/jumkas5.jpg';
import jumkas6Img from '../assets/images/jumkas6.jpg';
import jumkas7Img from '../assets/images/jumkas7.jpg';
import jumkasetImg from '../assets/images/jumkaset.jpg';
import newjumkasImg from '../assets/images/newjumkas.jpg';
import neckals3Img from '../assets/images/neckals3.jpg';
import necklace6Img from '../assets/images/necklace6.jpg';
import necklace7Img from '../assets/images/necklace7.jpg';
import necklace8Img from '../assets/images/necklace8.jpg';
import necklaceandjImg from '../assets/images/necklaceandj.jpg';
import neklace1Img from '../assets/images/neklace1.jpg';
import neklace2Img from '../assets/images/neklace2.jpg';
import neklasc5Img from '../assets/images/neklasc5.jpg';
import neklasce4Img from '../assets/images/neklasce4.jpg';

gsap.registerPlugin(ScrollTrigger);

// --- UTILITY & SHARED COMPONENTS ---
const LuxuryHeading = ({ subtitle, title, alignment = "center", dark = false }) => (
  <div className={`space-y-3 mb-16 text-${alignment}`}>
    {subtitle && (
      <span className="inline-block text-xs uppercase tracking-[0.4em] text-[#C5A059] font-medium px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5">
        {subtitle}
      </span>
    )}
    <h2 className={`text-3xl sm:text-5xl font-serif tracking-tight ${dark ? 'text-white' : 'text-[#1B1A17]'}`}>
      {title}
    </h2>
    <div className={`w-16 h-[2px] bg-[#C5A059] mx-auto mt-4 ${alignment === 'left' ? 'mx-0' : alignment === 'right' ? 'ml-auto mr-0' : ''}`} />
  </div>
);

// Helper: compute a full days/hours/minutes/seconds breakdown from a target date
const getTimeRemaining = (targetDate) => {
  const total = Math.max(0, targetDate.getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
};

// --- MAIN LUXURY HOMEPAGE COMPONENT ---
export const Home = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  // Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [activeProductTab, setActiveProductTab] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    store: 'Mumbai Flagship Atelier',
    date: ''
  });
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);

  // Target date for the countdown — 12 days, 8 hours, 45 minutes, 30 seconds from first mount
  const countdownTargetRef = useRef(
    new Date(Date.now() + (12 * 24 * 60 * 60 + 8 * 60 * 60 + 45 * 60 + 30) * 1000)
  );
  const [countdown, setCountdown] = useState(() => getTimeRemaining(countdownTargetRef.current));

  useEffect(() => {
    // GSAP Scroll Animations Setup
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-up').forEach((elem) => {
        gsap.fromTo(elem,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    // Countdown interval for limited edition — derives days/hours/min/sec from a real
    // target Date each tick, so it correctly cascades and never goes negative.
    const timer = setInterval(() => {
      setCountdown(getTimeRemaining(countdownTargetRef.current));
    }, 1000);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  // --- DATA SOURCES ---
  const stories = [
    { id: 1, title: 'New Arrivals', image: neklace1Img, type: 'image' },
    { id: 2, title: 'Bridal Regalia', image: neklace2Img, type: 'image' },
    { id: 3, title: 'Diamond Vault', image: neklasc5Img, type: 'image' },
    { id: 4, title: 'Temple Gold', image: neklasce4Img, type: 'image' },
    { id: 5, title: 'Craftsmanship', image: neklace1Img, type: 'image' },
    { id: 6, title: 'VIP Stories', image: neklace2Img, type: 'image' },
  ];

  const trendingCollections = [
    { id: 1, title: 'The Royal Kundan Suite', subtitle: 'Heritage Bridal Masterpieces', image: jumkas7Img, count: '24 Designs' },
    { id: 2, title: 'Solitaire Brilliance', subtitle: 'Certified Diamond Rings & Sets', image: jumkas6Img, count: '42 Designs' },
    { id: 3, title: 'Temple Gold Regalia', subtitle: 'Traditional South & West Indian Art', image: jumkas5Img, count: '18 Designs' },
  ];

  const bestSellingProducts = [
    { id: 1, name: 'Aurelia 22K Gold Antique Necklace', category: 'Necklaces', price: '₹1,45,000', oldPrice: '₹1,65,000', rating: 4.9, reviews: 128, discount: '12% OFF', badge: 'Best Seller', image: necklace6Img },
    { id: 2, name: 'VVS1 Certified Gold Solitaire Necklace', category: 'Rings', price: '₹95,000', oldPrice: '₹1,10,000', rating: 5.0, reviews: 94, discount: '14% OFF', badge: 'Exclusive', image: necklace7Img },
    { id: 3, name: 'Maharani Jhumka Set', category: 'Earrings', price: '₹78,000', oldPrice: '₹88,000', rating: 4.8, reviews: 76, discount: '11% OFF', badge: 'New Arrival', image: necklace8Img },
    { id: 4, name: 'Royal Filigree Gold Bangle', category: 'Bangles', price: '₹1,12,000', oldPrice: '₹1,25,000', rating: 4.9, reviews: 110, discount: '10% OFF', badge: 'Trending', image: necklaceandjImg },
  ];

  const categories = [
    { name: 'Necklaces', count: '120+ Items', image: neklace1Img },
    { name: 'Rings', count: '85+ Items', image: jumkas6Img },
    { name: 'Bracelets', count: '65+ Items', image: necklaceandjImg },
    { name: 'Pendants', count: '90+ Items', image: neklasc5Img },
    { name: 'Mangalsutra', count: '60+ Items', image: neklace2Img },
    { name: 'Temple Jewellery', count: '45+ Items', image: jumkas5Img },
    { name: 'Diamond Vault', count: '110+ Items', image: jumkas7Img },
    { name: 'Wedding Collection', count: '55+ Items', image: jumkasetImg },
    { name: 'Minimal Jewellery', count: '75+ Items', image: newjumkasImg },
  ];

  const whyChooseUs = [
    { icon: <HiOutlineBadgeCheck className="w-8 h-8 text-[#C5A059]" />, title: 'Lifetime Trust', desc: 'Over two decades of uncompromised purity, transparency, and family heritage.' },
    { icon: <FiAward className="w-8 h-8 text-[#C5A059]" />, title: 'Certified Jewellery', desc: 'Strict GIA, IGI, and international grading for every diamond and gemstone.' },
    { icon: <FiShield className="w-8 h-8 text-[#C5A059]" />, title: 'Hallmarked Gold', desc: '100% BIS Hallmarked gold standards with guaranteed purity across all locations.' },
    { icon: <FiCheckCircle className="w-8 h-8 text-[#C5A059]" />, title: 'Free Insured Shipping', desc: 'Tamper-proof, fully insured doorstep delivery across India and worldwide.' },
    { icon: <FiClock className="w-8 h-8 text-[#C5A059]" />, title: 'Easy Returns & Buyback', desc: 'Transparent lifetime buyback and straightforward exchange policies.' },
    { icon: <HiOutlineSparkles className="w-8 h-8 text-[#C5A059]" />, title: 'Premium Packaging', desc: 'Presented in hand-crafted velvet preservation boxes with royal certificates.' },
  ];

  const craftsmanshipSteps = [
    { step: '01', title: 'Archival Inspiration', desc: 'Master artisans draw from ancient royal motifs and modern architectural silhouettes.' },
    { step: '02', title: '3D CAD Engineering', desc: 'Precision modeling ensures structural integrity, gem-weight balance, and lightweight comfort.' },
    { step: '03', title: 'Hand-Sculpting', desc: 'Veteran goldsmiths hammer, engrave, and assemble filigree details using centuries-old techniques.' },
    { step: '04', title: 'Gemstone Setting', desc: 'Under microscope illumination, diamonds and polki are hand-set before mirror polishing.' }
  ];

  const testimonials = [
    { quote: 'The bridal set I commissioned was breathtaking. The level of detail in the Kundan work is museum-grade.', author: 'Priya Deshmukh', role: 'Bride & Collector', rating: 5 },
    { quote: 'Buying certified diamond solitaires has never been this transparent. Their expert consultation made our anniversary unforgettable.', author: 'Vikramaditya Singhania', role: 'Corporate Patron', rating: 5 },
    { quote: 'A seamless blend of traditional Maharashtrian heritage and contemporary lightweight elegance. Truly a trusted family jeweller.', author: 'Ananya Kulkarni', role: 'Loyal Client of 10 Years', rating: 5 }
  ];

  const faqs = [
    { q: 'Are all your gold jewellery pieces BIS Hallmarked?', a: 'Yes, 100% of our gold jewellery is BIS Hallmarked, ensuring absolute purity and adherence to national standards.' },
    { q: 'Do you provide international shipping for global orders?', a: 'We offer fully insured, tamper-proof international shipping to select countries worldwide with secure transit partners.' },
    { q: 'What is your lifetime buyback and exchange policy?', a: 'We offer a transparent lifetime buyback and exchange policy based on the prevailing market rate of pure gold and certified gemstones.' },
    { q: 'Can I customize a bespoke bridal jewellery set?', a: 'Our master artisans specialize in bespoke bridal regalia. You can book a virtual or in-person consultation to design your custom heirloom.' }
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#FAF8F5] text-[#1B1A17] font-sans antialiased selection:bg-[#C5A059] selection:text-white overflow-x-hidden">

      {/* =================================================================== */}
      {/* SECTION 1: LUXURY NAVBAR */}
      {/* =================================================================== */}
      {/* NOTE: navbar markup was not present in the original file — mobileMenuOpen
          state is retained above in case a navbar is reintroduced here. */}

      {/* =================================================================== */}
      {/* SECTION 2: FULL SCREEN CINEMATIC HERO */}
      {/* =================================================================== */}
<section className="relative min-h-[100vh] lg:min-h-[105vh] w-full flex items-center justify-center overflow-hidden bg-[#FAF8F5] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 border-b border-[#C5A059]/20 selection:bg-[#C5A059] selection:text-white">

  {/* LAYER 1: HERO IMAGE WITH CINEMATIC ZOOM, PARALLAX & RIGHT-ASymmetric FOCAL POINT */}
  <motion.div
    style={{ y: heroParallax }}
    className="absolute inset-0 z-0 scale-105 pointer-events-none"
  >
    <motion.div
      initial={{ scale: 1.12 }}
      animate={{ scale: [1.12, 1.0, 1.04] }}
      transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="w-full h-full relative"
    >
      <img
        src={heroImg}
        alt="Shree Lonar Flagship Heritage Collection"
        className="w-full h-full object-cover object-[75%_center] sm:object-[80%_20%] lg:object-[85%_15%] filter brightness-[1.08] contrast-[1.12] saturate-[1.08]"
      />
    </motion.div>
  </motion.div>

  {/* MULTI-LAYER LIGHTING ARCHITECTURE (CRYSTAL CLEAR MODEL + RICH LUXURY CONTRAST) */}

  {/* Layer 1: Warm Ivory Base Fade (Protects Left-Aligned Text Readability without Obscuring Right Model) */}
  <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 sm:via-[#FAF8F5]/70 to-transparent lg:w-[75%] pointer-events-none" />

  {/* Layer 2: Soft Vertical Studio Gradient */}
  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FFFFFF]/60 pointer-events-none" />

  {/* Layer 3: Top-Left Golden Sunlight Ray */}
  <div className="absolute -top-32 -left-32 w-[36rem] sm:w-[50rem] h-[36rem] sm:h-[50rem] bg-gradient-to-br from-[#D4AF37]/25 via-[#C5A059]/12 to-transparent rounded-full filter blur-[140px] pointer-events-none z-[3] animate-pulse" />

  {/* Layer 4: Top-Right Soft White Diffused Glow */}
  <div className="absolute -top-20 -right-20 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-gradient-to-bl from-[#FFFFFF]/90 via-[#FDFBF8]/50 to-transparent rounded-full filter blur-[100px] pointer-events-none z-[3]" />

  {/* Layer 5: Jewellery Specular Bloom / Localized Golden Glow */}
  <div className="absolute top-1/3 right-[10%] sm:right-[18%] w-72 sm:w-96 h-72 sm:h-96 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.22)_0%,_rgba(197,160,89,0.08)_50%,_transparent_70%)] rounded-full filter blur-[60px] pointer-events-none z-[4]" />

  {/* Layer 6: Soft Royal Vignette Frame */}
  <div className="absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(197,160,89,0.08)_100%)] pointer-events-none" />

  {/* Layer 7: Glass Surface Reflection & Bokeh Particles */}
  <div className="absolute inset-0 pointer-events-none z-[6] overflow-hidden">
    {/* Floating Bokeh 1 */}
    <motion.div
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.15, 1]
      }}
      transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      className="absolute top-1/4 left-1/6 w-72 h-72 bg-[#C5A059]/12 rounded-full filter blur-[90px]"
    />
    {/* Floating Bokeh 2 */}
    <motion.div
      animate={{
        y: [0, 35, 0],
        x: [0, -25, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1]
      }}
      transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full filter blur-[110px]"
    />
    {/* Luxury Diamond Sparkle 1 */}
    <motion.div
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="absolute top-1/3 right-[28%] w-2 h-2 bg-[#FFFFFF] rounded-full shadow-[0_0_12px_#D4AF37]"
    />
    {/* Luxury Diamond Sparkle 2 */}
    <motion.div
      animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.7, 1.3, 0.7] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 }}
      className="absolute top-1/2 right-[18%] w-1.5 h-1.5 bg-[#FFF8E7] rounded-full shadow-[0_0_10px_#C5A059]"
    />
  </div>

  {/* HERO CONTENT CONTAINER - BALANCED FOR MAXIMUM VISUAL IMPACT */}
  <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

    <div className="lg:col-span-8 text-center lg:text-left space-y-7 sm:space-y-9">

      {/* LUXURY HERITAGE PILL BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        <div className="relative group cursor-default">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C5A059]/40 via-[#D4AF37]/60 to-[#C5A059]/40 rounded-full filter blur-[6px] opacity-70 group-hover:opacity-100 transition duration-500" />
          <span className="relative text-[10px] sm:text-[11px] uppercase tracking-[0.45em] text-[#C5A059] font-medium bg-[#FFFFFF]/90 border border-[#C5A059]/40 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full backdrop-blur-md shadow-[0_4px_25px_rgba(197,160,89,0.12)] inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse" />
            Shree Lonar Flagship Heritage Collection
          </span>
        </div>
      </motion.div>

      {/* MONUMENTAL ROYAL TYPOGRAPHY */}
      <motion.h1
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extralight tracking-tight leading-[1.03] text-[#111111]"
      >
        Timeless Regalia <br />
        <span className="italic font-normal bg-gradient-to-r from-[#111111] via-[#C5A059] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-sm">
          Sculpted For Eternity
        </span>
      </motion.h1>

      {/* EDITORIAL SUBHEADING */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl lg:max-w-[650px] mx-auto lg:mx-0 text-xs sm:text-sm md:text-base font-light text-[#666666] leading-relaxed tracking-wide px-2 sm:px-0"
      >
        Immerse yourself in a world of unmatched craftsmanship where ancient Indian royal artistry meets contemporary uncompromising brilliance.
      </motion.p>

      {/* HIGH-FASHION CALL-TO-ACTION BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 max-w-md sm:max-w-none mx-auto"
      >
        {/* Primary Gold Gloss Button with Sweep Animation */}
        <a
          href="#collections"
          className="group relative w-full sm:w-auto px-10 py-4 sm:py-4.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059] bg-[length:200%_auto] text-white font-medium text-[11px] sm:text-xs uppercase tracking-[0.28em] rounded-full overflow-hidden shadow-[0_12px_35px_rgba(197,160,89,0.32)] hover:shadow-[0_18px_45px_rgba(197,160,89,0.48)] transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore Collections
          </span>
          {/* Animated Moving Gold Shine Sweep */}
          <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
        </a>

        {/* Secondary Glass White Button */}
        <a
          href="#appointment"
          className="group relative w-full sm:w-auto px-10 py-4 sm:py-4.5 bg-[#FFFFFF]/90 border border-[#C5A059]/45 text-[#111111] font-medium text-[11px] sm:text-xs uppercase tracking-[0.28em] rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:bg-[#111111] hover:text-[#FFFFFF] hover:border-[#111111] transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
        >
          <span className="relative z-10">
            Book VIP Private Viewing
          </span>
        </a>
      </motion.div>
    </div>

    {/* Empty Column to Allow Unobstructed Focal Visibility of the Right-Side Jewellery Model */}
    <div className="hidden lg:block lg:col-span-4 h-full pointer-events-none" />
  </div>

  {/* REDESIGNED ROYAL MOUSE SCROLL INDICATOR */}
  <motion.div
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
    className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-2.5 text-[#666666] cursor-pointer group"
  >
    <span className="text-[9px] sm:text-[10px] text-[#C5A059] tracking-[0.35em] uppercase font-medium group-hover:text-[#111111] transition-colors">
      Scroll to Discover
    </span>
    <div className="w-5 h-8 sm:w-5.5 sm:h-8.5 border border-[#C5A059]/50 group-hover:border-[#C5A059] rounded-full flex justify-center p-1 bg-[#FFFFFF]/90 backdrop-blur-md shadow-[0_4px_16px_rgba(197,160,89,0.18)] transition-colors">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="w-1 h-2 bg-gradient-to-b from-[#D4AF37] to-[#C5A059] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.9)]"
      />
    </div>
  </motion.div>
</section>

      {/* =================================================================== */}
      {/* SECTION 3: SOCIAL EXPERIENCE HERO (FOUNDER CARD & STORIES) */}
      {/* =================================================================== */}
      {/* EXPERIENCE SHREEJI ON INSTAGRAM SECTION */}
      {/* =================================================================== */}
      <section className="py-24 bg-[#FAF7F2] text-[#1B1A17] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">

          {/* SECTION HEADER */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
              <span>Inside</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Our World</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#1B1A17] tracking-tight">
              Experience Shreeji on Instagram
            </h2>
            <p className="text-sm sm:text-base text-[#6B655F] max-w-xl mx-auto font-light">
              Discover our latest creations, behind-the-scenes moments, happy customers and exclusive launches.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#C5A059] text-[#1B1A17] hover:bg-[#C5A059] hover:text-black transition-all text-xs uppercase tracking-widest font-medium shadow-sm"
              >
                <FiInstagram className="w-4 h-4 text-[#C5A059]" /> Follow Us on Instagram <FiArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl border border-[#C5A059]/30 p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left: Avatar & Bio */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="relative w-28 h-28 shrink-0 rounded-full p-[3px] bg-gradient-to-tr from-[#C5A059] via-[#E6CA85] to-[#C5A059] shadow-md">
                  <img src={neklace1Img} alt="Shreeji Jewellers" className="w-full h-full object-cover rounded-full border-2 border-white" />
                  <span className="absolute bottom-1 right-1 bg-[#C5A059] text-white p-1 rounded-full text-xs shadow">
                    <HiOutlineBadgeCheck className="w-4 h-4" />
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <h3 className="font-serif font-bold text-xl text-[#1B1A17]">Shreeji Jewellers</h3>
                    <HiOutlineBadgeCheck className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <p className="text-xs text-[#6B655F] font-medium tracking-wide">@shreeji.jewellers</p>
                  <p className="text-xs text-[#1B1A17] pt-1">Crafting Timeless Jewellery Since 2004</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#6B655F] pt-1">
                    <span className="flex items-center gap-1"><FiMapPin className="text-[#C5A059]" /> Maharashtra, India</span>
                    <span className="flex items-center gap-1"><FiGlobe className="text-[#C5A059]" /> shreejijewellers.com</span>
                  </div>
                </div>
              </div>

              {/* Middle: Stats */}
              <div className="lg:col-span-4 grid grid-cols-3 gap-4 border-y lg:border-y-0 lg:border-x border-neutral-100 py-6 lg:py-0 lg:px-6 text-center">
                <div>
                  <span className="block font-serif font-bold text-lg text-[#1B1A17]">20+</span>
                  <span className="text-[10px] text-[#6B655F] uppercase tracking-wider">Years of Legacy</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-lg text-[#1B1A17]">25K+</span>
                  <span className="text-[10px] text-[#6B655F] uppercase tracking-wider">Happy Families</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-lg text-[#1B1A17]">5,000+</span>
                  <span className="text-[10px] text-[#6B655F] uppercase tracking-wider">Designs</span>
                </div>
                <div className="pt-4">
                  <span className="block font-serif font-bold text-lg text-[#1B1A17] flex items-center justify-center gap-1">
                    <HiOutlineStar className="text-amber-500 fill-amber-500 w-4 h-4" /> 4.9
                  </span>
                  <span className="text-[10px] text-[#6B655F] uppercase tracking-wider">Google Rating</span>
                </div>
                <div className="pt-4">
                  <span className="block font-serif font-bold text-lg text-[#1B1A17]">100%</span>
                  <span className="text-[10px] text-[#6B655F] uppercase tracking-wider">BIS Hallmarked</span>
                </div>
                <div className="pt-4">
                  <span className="block font-serif font-bold text-lg text-[#1B1A17]">Certified</span>
                  <span className="text-[10px] text-[#6B655F] uppercase tracking-wider">Diamonds</span>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#C5A059] text-black text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#1B1A17] hover:text-white transition-all text-center shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <FiInstagram className="w-4 h-4" /> Follow
                </a>
                <Link
                  to="/store"
                  className="w-full py-3 bg-white border border-[#C5A059] text-[#1B1A17] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#C5A059]/10 transition-all text-center inline-block"
                >
                  Visit Store
                </Link>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white border border-emerald-600/30 text-emerald-700 text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-emerald-50 transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4 text-emerald-600" /> WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* LATEST REELS (With Support for Live Instagram URLs) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1B1A17] flex items-center gap-2">
                <FiPlay className="text-[#C5A059] w-5 h-5 fill-current" /> Latest Reels
              </h3>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold hover:underline flex items-center gap-1">
                View All Reels on Instagram <FiChevronRight />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 1,
                  // Replace with a real, live Instagram Reel URL to enable the embed card below.
                  // Leaving this null falls back to the styled image card instead of a broken embed.
                  instaUrl: null,
                  image: necklace6Img,
                  views: '12.4K'
                },
                { id: 2, image: necklace6Img, views: '9.8K' },
                { id: 3, image: necklace7Img, views: '7.2K' },
                { id: 4, image: neklace2Img, views: '15.6K' },
              ].map((reel) => (
                <div
                  key={reel.id}
                  className="rounded-2xl overflow-hidden border border-[#C5A059]/20 bg-white p-2 shadow-sm flex justify-center"
                >
                  {reel.instaUrl ? (
                    /* Live Embed generated from pasted URL — requires Instagram's embed.js
                       script to be loaded on the page for this to render. */
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={reel.instaUrl}
                      data-instgrm-version="14"
                      style={{ background: '#FFF', border: 0, borderRadius: '12px', margin: '0 auto', maxWidth: '100%', padding: 0, width: '100%' }}
                    >
                      <a href={reel.instaUrl} target="_blank" rel="noopener noreferrer">View this post on Instagram</a>
                    </blockquote>
                  ) : (
                    /* Fallback to standard image card */
                    <div
                      onClick={() => setActiveStory({ title: `Reel #${reel.id}`, image: reel.image })}
                      className="group relative w-full aspect-[9/16] rounded-xl overflow-hidden cursor-pointer bg-neutral-900"
                    >
                      <img src={reel.image} alt="Reel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-3">
                        <span className="self-end p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md">
                          <FiInstagram className="w-3 h-3" />
                        </span>
                        <div className="flex items-center gap-1 text-white text-xs font-medium">
                          <FiPlay className="w-3 h-3 fill-current text-[#C5A059]" />
                          <span>{reel.views}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* STORY HIGHLIGHTS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1B1A17]">Story Highlights</h3>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold hover:underline flex items-center gap-1">
                View All Stories <FiChevronRight />
              </a>
            </div>

            <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-none">
              {[
                { id: 1, title: 'New Arrivals', image: neklace1Img },
                { id: 2, title: 'Bridal', image: neklace2Img },
                { id: 3, title: 'Temple', image: jumkas5Img },
                { id: 4, title: 'Diamond', image: jumkas6Img },
                { id: 5, title: 'Customer Stories', image: necklaceandjImg },
                { id: 6, title: 'Behind the Scenes', image: neklasc5Img },
                { id: 7, title: 'Offers', image: neklasce4Img },
                { id: 8, title: 'Festivals', image: jumkas7Img },
                { id: 9, title: 'Craftsmanship', image: necklace6Img },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveStory(item)}
                  className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#C5A059] via-[#E6CA85] to-[#C5A059] group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <div className="w-full h-full rounded-full p-[2px] bg-white">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#1B1A17] tracking-wide text-center group-hover:text-[#C5A059] transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LATEST INSTAGRAM POSTS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1B1A17] flex items-center gap-2">
                <FiInstagram className="text-[#C5A059] w-5 h-5" /> Latest Instagram Posts
              </h3>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold hover:underline flex items-center gap-1">
                View All Posts on Instagram <FiChevronRight />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { id: 1, image: necklace6Img, likes: '4.5K', comments: '128' },
                { id: 2, image: neklace2Img, likes: '6.2K', comments: '196' },
                { id: 3, image: jumkas6Img, likes: '3.9K', comments: '96' },
                { id: 4, image: neklasc5Img, likes: '5.1K', comments: '142' },
                { id: 5, image: necklaceandjImg, likes: '2.8K', comments: '78' },
                { id: 6, image: jumkas5Img, likes: '3.3K', comments: '88' },
              ].map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActiveStory({ title: `Post #${post.id}`, image: post.image })}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-[#C5A059]/20 bg-neutral-900"
                >
                  <img src={post.image} alt="Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-medium backdrop-blur-xs">
                    <span className="flex items-center gap-1"><FiHeart className="fill-current text-rose-500" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><FiMessageCircle className="fill-current text-white" /> {post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER MOMENTS */}
          <div className="bg-white rounded-3xl border border-[#C5A059]/30 p-8 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1B1A17]">Customer Moments</h3>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#C5A059] text-black text-xs uppercase tracking-widest rounded-full font-medium hover:bg-[#1B1A17] hover:text-white transition-all shadow-sm inline-flex items-center justify-center gap-2"
              >
                <FiInstagram /> Share Your Moment
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[neklace1Img, neklace2Img, jumkas6Img, neklasc5Img, necklace6Img, jumkas5Img].map((img, index) => (
                <div key={index} className="aspect-[4/5] rounded-xl overflow-hidden border border-[#C5A059]/20 shadow-xs">
                  <img src={img} alt={`Customer moment ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM BANNER */}
          <div className="relative rounded-3xl overflow-hidden border border-[#C5A059]/40 bg-neutral-900 text-white p-8 sm:p-14 text-center">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img src={neklace1Img} alt="Background pattern" className="w-full h-full object-cover filter blur-xs" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="font-serif text-3xl sm:text-4xl text-white">Stay Updated With Our Latest Creations</h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light">
                Follow us on Instagram and be the first to see our new collections, exclusive offers and behind-the-scenes moments.
              </p>
              <div className="pt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A059] text-black text-xs uppercase tracking-widest rounded-full font-semibold hover:bg-white transition-all shadow-lg"
                >
                  <FiInstagram /> Follow @shreeji.jewellers <FiArrowRight />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Story Modal Popup (single shared modal for stories, reels & posts) */}
        <AnimatePresence>
          {activeStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-sm h-[80vh] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between">

                <div className="absolute top-0 inset-x-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={neklace1Img} alt="Profile" className="w-8 h-8 rounded-full border border-[#C5A059]" />
                    <div>
                      <h4 className="text-white text-xs font-medium">shreeji.jewellers</h4>
                      <span className="text-[10px] text-neutral-400">{activeStory.title}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveStory(null)}
                    className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-full h-full relative">
                  <img src={activeStory.image} alt={activeStory.title} className="w-full h-full object-cover" />
                </div>

                <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Reply to story..."
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-xs px-4 py-3 rounded-full focus:outline-none focus:border-[#C5A059]"
                  />
                  <button className="p-3 bg-[#C5A059] text-black rounded-full hover:bg-white transition-all">
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* =================================================================== */}
      {/* SECTION 4: TRENDING COLLECTIONS */}
      {/* =================================================================== */}
      <section id="collections" className="py-28 bg-[#F5F1EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LuxuryHeading subtitle="Curated Masterpieces" title="Trending Collections" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCollections.map((col) => (
              <motion.div key={col.id} whileHover={{ y: -8 }} className="reveal-up group relative rounded-2xl overflow-hidden shadow-xl bg-white border border-[#C5A059]/20 cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <span className="absolute top-4 left-4 z-20 bg-black/55 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                    {col.count}
                  </span>
                  <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-white space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">{col.subtitle}</p>
                    <h3 className="font-serif text-xl font-medium">{col.title}</h3>
                    <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] group-hover:translate-x-2 transition-transform">
                      <span>Explore Suite</span> <FiArrowRight />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 5: BEST SELLING PRODUCTS */}
      {/* =================================================================== */}
      <section className="py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold">Most Desired</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#1B1A17] mt-2">Best Selling Products</h2>
            </div>

            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingProducts
              .filter(p => activeProductTab === 'All' || p.category === activeProductTab)
              .map((product) => (
              <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="group bg-white rounded-2xl overflow-hidden border border-[#C5A059]/20 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                  <span className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium border border-white/10">
                    {product.badge}
                  </span>
                  <span className="absolute top-3 right-14 z-10 bg-[#C5A059] text-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                    {product.discount}
                  </span>
                  
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 space-y-4 flex flex-col justify-between flex-grow">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">{product.category}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                        <FiStar className="fill-current w-3 h-3" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-[#6B655F]">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-base font-medium text-[#1B1A17] group-hover:text-[#C5A059] transition-colors">{product.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div>
                      <span className="font-serif font-bold text-base text-[#1B1A17]">{product.price}</span>
                      <span className="text-xs text-[#6B655F] line-through ml-2">{product.oldPrice}</span>
                    </div>
                    <Link to="/store">
  <button className="px-4 py-2 bg-[#1B1A17] text-white text-[11px] uppercase tracking-widest rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
    Quick View
  </button>
</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 6: FEATURED COLLECTION BANNER */}
      {/* =================================================================== */}
      <section className="relative py-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <img src={neklasce4Img} alt="Cinematic Banner" className="w-full h-full object-cover filter brightness-50" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059]">Royal Heirloom Spotlight</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extralight leading-tight">"Where timeless Indian heritage meets avant-garde luxury design."</h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto" />
          <div className="pt-4">
            <a href="#appointment" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A059] text-black font-medium text-xs uppercase tracking-widest rounded-full hover:bg-white transition duration-300 shadow-xl">
              Discover The Vault <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 7: SHOP BY CATEGORY */}
      {/* =================================================================== */}
      <section id="categories" className="py-28 bg-[#F5F1EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LuxuryHeading subtitle="Explore Vault" title="Shop By Category" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div key={idx} whileHover={{ y: -6 }} className="reveal-up group bg-white p-5 rounded-2xl border border-[#C5A059]/20 shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all flex items-center gap-5 cursor-pointer">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 relative">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1B1A17] group-hover:text-[#C5A059] transition-colors">{cat.name}</h4>
                  <p className="text-xs text-[#6B655F] uppercase tracking-wider mt-1">{cat.count}</p>
                  <span className="text-[10px] text-[#C5A059] uppercase tracking-widest mt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <FiArrowRight />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 8: WHY CHOOSE US */}
      {/* =================================================================== */}
      <section className="py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LuxuryHeading subtitle="The Shree Lonar Advantage" title="Why Discerning Connoisseurs Choose Us" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -6 }} className="reveal-up bg-white p-8 rounded-2xl border border-[#C5A059]/20 shadow-sm hover:border-[#C5A059] transition-all space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] w-fit rounded-xl border border-[#C5A059]/20">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B1A17]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#6B655F] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 9: LIMITED EDITION COUNTDOWN BANNER */}
      {/* =================================================================== */}
      <section className="py-24 bg-gradient-to-r from-[#1B1A17] to-[#2C2A25] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src={jumkas7Img} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-medium">Exclusive Release</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light leading-tight">The 20th Anniversary Royal Polki Vault</h2>
            <p className="text-xs sm:text-sm text-neutral-300">Only 50 hand-crafted pieces released worldwide. Each set comes with an archival royal certificate and private vault registration.</p>

            {/* Countdown Timers */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center min-w-[70px]">
                <span className="block font-serif text-2xl font-bold text-[#C5A059]">{countdown.days}</span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-300">Days</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center min-w-[70px]">
                <span className="block font-serif text-2xl font-bold text-[#C5A059]">{countdown.hours}</span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-300">Hours</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center min-w-[70px]">
                <span className="block font-serif text-2xl font-bold text-[#C5A059]">{countdown.minutes}</span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-300">Mins</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center min-w-[70px]">
                <span className="block font-serif text-2xl font-bold text-[#C5A059]">{countdown.seconds}</span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-300">Secs</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl text-[#1B1A17] max-w-md w-full shadow-2xl space-y-6 border border-[#C5A059]/40">
            <h3 className="font-serif text-xl font-bold">Secure Your Allocation</h3>
            <p className="text-xs text-[#6B655F]">Enter your priority client email to receive exclusive access links when the vault opens.</p>
            <div className="space-y-4">
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-xs focus:outline-none focus:border-[#C5A059]"
              />
              <button
                onClick={() => setNewsletterSubscribed(true)}
                className="w-full py-3.5 bg-[#1B1A17] text-white text-xs uppercase tracking-widest rounded-xl hover:bg-[#C5A059] hover:text-black transition-all font-medium"
              >
                {newsletterSubscribed ? 'Request Sent' : 'Request Priority Access'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 10: ATELIER CRAFTSMANSHIP PROCESS */}
      {/* =================================================================== */}
      <section id="craftsmanship" className="py-28 bg-[#F5F1EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LuxuryHeading subtitle="Master Artisans" title="The Art of High Jewellery" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftsmanshipSteps.map((step, idx) => (
              <motion.div key={idx} whileHover={{ y: -6 }} className="reveal-up bg-white p-8 rounded-2xl border border-[#C5A059]/20 shadow-sm space-y-4 relative overflow-hidden group">
                <span className="absolute top-4 right-6 font-serif text-4xl font-bold text-[#C5A059]/20 group-hover:text-[#C5A059]/40 transition-colors">
                  {step.step}
                </span>
                <div className="w-10 h-[2px] bg-[#C5A059]" />
                <h3 className="font-serif text-lg font-bold text-[#1B1A17]">{step.title}</h3>
                <p className="text-xs text-[#6B655F] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 11: TESTIMONIALS & REVIEWS */}
      {/* =================================================================== */}
      <section className="py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LuxuryHeading subtitle="Clientele Voices" title="Words From Our Patrons" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} whileHover={{ y: -6 }} className="reveal-up bg-white p-8 rounded-2xl border border-[#C5A059]/20 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current w-4 h-4" />
                    ))}
                  </div>
                  <p className="font-serif text-sm sm:text-base text-[#1B1A17] italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1B1A17]">{t.author}</h4>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059]">{t.role}</span>
                  </div>
                  <HiOutlineBadgeCheck className="w-5 h-5 text-[#C5A059]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 12: VIP APPOINTMENT BOOKING FORM */}
      {/* =================================================================== */}
      <section id="appointment" className="py-28 bg-[#F5F1EB] border-t border-[#C5A059]/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-[#C5A059]/30 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14 bg-[#1B1A17] text-white flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059]">Private Consultation</span>
                <h2 className="text-3xl font-serif font-light">Book Your Exclusive Private Viewing</h2>
                <p className="text-xs text-neutral-300 leading-relaxed">Experience our high jewellery vaults with dedicated private consultants, champagne service, and custom design previews.</p>
              </div>
              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Flagship Atelier: Mumbai & Pune</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-4 h-4 text-[#C5A059]" />
                  <span>+91 98230 55000 / VIP Line</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiClock className="w-4 h-4 text-[#C5A059]" />
                  <span>Monday – Sunday: 10:30 AM – 8:30 PM</span>
                </div>
              </div>
            </div>

            <div className="p-10 lg:p-14 flex flex-col justify-center">
              {appointmentSubmitted ? (
                <div className="text-center space-y-4 py-12">
                  <FiCheckCircle className="w-16 h-16 text-[#C5A059] mx-auto" />
                  <h3 className="font-serif text-2xl font-bold">Appointment Confirmed</h3>
                  <p className="text-xs text-[#6B655F]">Our senior concierge will reach out to you within 2 hours to finalize your private viewing slot.</p>
                  <button onClick={() => setAppointmentSubmitted(false)} className="px-6 py-2.5 bg-[#1B1A17] text-white text-xs uppercase tracking-widest rounded-full">
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setAppointmentSubmitted(true); }} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1B1A17] mb-2">Request Consultation</h3>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6B655F] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={appointmentForm.name}
                      onChange={e => setAppointmentForm({...appointmentForm, name: e.target.value})}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-xs focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6B655F] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={appointmentForm.phone}
                      onChange={e => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-xs focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6B655F] mb-1">Select Flagship Store</label>
                    <select
                      value={appointmentForm.store}
                      onChange={e => setAppointmentForm({...appointmentForm, store: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-xs focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Mumbai Flagship Atelier">Mumbai Flagship Atelier</option>
                      <option value="Pune Heritage Gallery">Pune Heritage Gallery</option>
                      <option value="Virtual Video Consultation">Virtual Video Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6B655F] mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={appointmentForm.date}
                      onChange={e => setAppointmentForm({...appointmentForm, date: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-xs focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#1B1A17] text-white text-xs uppercase tracking-widest rounded-xl hover:bg-[#C5A059] hover:text-black transition-all font-medium mt-2">
                    Confirm VIP Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 13: FAQ ACCORDION */}
      {/* =================================================================== */}
      <section className="py-28 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6">
          <LuxuryHeading subtitle="Got Questions?" title="Frequently Asked Questions" />

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#C5A059]/20 overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-serif text-base font-medium text-[#1B1A17]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#C5A059] text-xl font-light">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-[#6B655F] leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 14: LUXURY FOOTER */}
      {/* =================================================================== */}
      <footer className="bg-[#1B1A17] text-white pt-20 pb-12 border-t border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">

          <div className="lg:col-span-2 space-y-6">
            <span className="font-serif text-2xl font-light tracking-[0.25em] block">SHREE LONAR</span>
            <span className="block text-[9px] uppercase tracking-[0.4em] text-[#C5A059] -mt-4">Fine Jewellery Atelier</span>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Creating exquisite BIS Hallmarked gold, certified diamond, and traditional temple jewellery heirlooms with unmatched dedication to purity and craftsmanship.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-[#C5A059] hover:text-black transition-colors"><FiInstagram className="w-4 h-4" /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-[#C5A059] hover:text-black transition-colors"><FiYoutube className="w-4 h-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-[#C5A059] hover:text-black transition-colors"><FiFacebook className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C5A059]">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li><a href="#collections" className="hover:text-[#C5A059] transition-colors">Trending Collections</a></li>
              <li><a href="#categories" className="hover:text-[#C5A059] transition-colors">Vault Categories</a></li>
              <li><a href="#craftsmanship" className="hover:text-[#C5A059] transition-colors">Atelier Process</a></li>
              <li><a href="#appointment" className="hover:text-[#C5A059] transition-colors">Book Consultation</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C5A059]">Vault Vaults</h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li><a href="#categories" className="hover:text-[#C5A059] transition-colors">Bridal Regalia</a></li>
              <li><a href="#categories" className="hover:text-[#C5A059] transition-colors">Solitaire Diamonds</a></li>
              <li><a href="#categories" className="hover:text-[#C5A059] transition-colors">Temple Gold Art</a></li>
              <li><a href="#categories" className="hover:text-[#C5A059] transition-colors">Antique Mangalsutra</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C5A059]">Atelier Contact</h4>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Shree Lonar Flagship, Main Bazaar Road, Mumbai & Pune, MH</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>+91 98230 55000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>concierge@shreelonarjewellers.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Shree Lonar Fine Jewellery Atelier. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Hallmarking Guarantee</a>
          </div>
        </div>
      </footer>

    </div>
  );
};