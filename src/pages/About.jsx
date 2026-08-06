import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Icon Package Imports ---
import { 
  FaInstagram, 
  FaYoutube, 
  FaFacebookF, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhoneAlt 
} from 'react-icons/fa';

import { 
  HiOutlineShieldCheck, 
  HiOutlineSparkles, 
  HiOutlineBadgeCheck, 
  HiOutlineClock, 
  HiOutlineCurrencyRupee, 
  HiOutlineHeart 
} from 'react-icons/hi';

import { FiChevronDown, FiArrowRight } from 'react-icons/fi';
import about from "../assets/images/About.jpg";

// --- Safe Animated Counter Component ---
const Counter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const numericTo = parseInt(String(to).replace(/[^0-9]/g, ''), 10) || 0;
    if (numericTo === 0) return;

    let start = 0;
    const totalMs = duration * 1000;
    const step = Math.max(1, Math.ceil(numericTo / 50));
    const intervalTime = Math.max(10, Math.floor(totalMs / (numericTo / step)));

    const timer = setInterval(() => {
      start += step;
      if (start >= numericTo) {
        setCount(numericTo);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{count.toLocaleString('en-IN')}</span>;
};

// --- Main About Component ---
export const About = () => {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 800], [0, 200]);

  // Framer Motion Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const socialLinks = [
    { name: 'Instagram', handle: '@shreelonarjewellers', icon: <FaInstagram className="w-5 h-5 text-[#D4AF37]" />, url: 'https://instagram.com' },
    { name: 'YouTube', handle: '@shreelonarjewellers', icon: <FaYoutube className="w-5 h-5 text-[#D4AF37]" />, url: 'https://youtube.com' },
    { name: 'Facebook', handle: 'Shree Lonar Jewellers', icon: <FaFacebookF className="w-5 h-5 text-[#D4AF37]" />, url: 'https://facebook.com' },
    { name: 'WhatsApp', handle: '+91 XXXXX XXXXX', icon: <FaWhatsapp className="w-5 h-5 text-[#D4AF37]" />, url: 'https://wa.me/' },
    { name: 'Email', handle: 'info@shreelonar.com', icon: <FaEnvelope className="w-5 h-5 text-[#D4AF37]" />, url: 'mailto:info@shreelonar.com' },
    { name: 'Phone', handle: '+91 XXXXX XXXXX', icon: <FaPhoneAlt className="w-5 h-5 text-[#D4AF37]" />, url: 'tel:+910000000000' }
  ];

  const features = [
    { icon: <HiOutlineBadgeCheck className="w-7 h-7 text-[#D4AF37]" />, title: 'BIS Hallmarked Jewellery', desc: 'Every gold piece is certified for utmost purity by government-approved standards.' },
    { icon: <HiOutlineSparkles className="w-7 h-7 text-[#D4AF37]" />, title: 'Certified Diamonds', desc: 'Sourced responsibly with international laboratory certification for cut, clarity, and color.' },
    { icon: <HiOutlineClock className="w-7 h-7 text-[#D4AF37]" />, title: 'Trusted Since 2004', desc: 'Over two decades of unwavering commitment, trust, and exceptional relationship building.' },
    { icon: <HiOutlineHeart className="w-7 h-7 text-[#D4AF37]" />, title: 'Lifetime Jewellery Care', desc: 'Free complimentary maintenance, annual cleaning, and minor polish for all lifetime orders.' },
    { icon: <HiOutlineCurrencyRupee className="w-7 h-7 text-[#D4AF37]" />, title: 'Transparent Pricing', desc: 'Clear breakdown of precious metal weight, stone valuation, and competitive making charges.' },
    { icon: <HiOutlineShieldCheck className="w-7 h-7 text-[#D4AF37]" />, title: 'Heritage & Modern Styles', desc: 'A harmonized portfolio blending traditional Maharashtrian art with contemporary aesthetics.' }
  ];

  const trustBadges = [
    { title: '100% Hallmarked', desc: 'Bureau of Indian Standards Certified' },
    { title: 'Certified Diamonds', desc: 'IGI & GIA Authenticated' },
    { title: 'Secure Purchase', desc: 'Fully Insured Global Delivery' },
    { title: 'Lifetime Support', desc: 'Endless Care & Polishing' },
    { title: 'Easy Exchange', desc: 'Transparent Buyback Policies' },
    { title: 'Luxury Packaging', desc: 'Signature Velvet Gift Boxes' }
  ];

  const stats = [
    { value: '20+', label: 'Years of Experience' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '10,000+', label: 'Luxury Designs' },
    { value: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#111111] antialiased selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: LUXURY HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          style={{ y: heroParallax }}
          className="absolute inset-0 w-full h-[120%] z-0"
        >
          <img
            src={about}
            alt="Shree Lonar Hero"
            className="w-full h-full object-cover object-center opacity-60 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 pt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] border-b border-[#D4AF37]/40 pb-1 font-medium bg-black/40 px-4 py-1.5 rounded-full">
              Shree Lonar Jewellers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-extralight tracking-tight leading-tight"
          >
            Crafting Timeless Elegance <br />
            <span className="italic font-normal bg-gradient-to-r from-white via-[#FAF8F5] to-[#D4AF37] bg-clip-text text-transparent">
              Since 2004
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-sm sm:text-base font-light text-neutral-300 leading-relaxed tracking-wide"
          >
            Immerse yourself in a world of refined luxury, where traditional artistry seamlessly meets modern sophistication. Every gem tells a story of heritage, passion, and uncompromising purity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4"
          >
            <a
              href="#story"
              className="px-8 py-3.5 bg-[#D4AF37] text-black font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#D4AF37]/20 inline-block"
            >
              Explore Our Legacy
            </a>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto pt-4"
          />
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 z-10 flex flex-col items-center gap-1.5 text-white/50 text-xs tracking-widest uppercase"
        >
          <span className="text-[10px] text-[#D4AF37]">Scroll</span>
          <FiChevronDown className="w-4 h-4 text-[#D4AF37]" />
        </motion.div>
      </section>

      {/* SECTION 2: OUR LEGACY */}
      <section id="story" className="py-20 md:py-32 bg-[#FFFFFF] relative border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 group">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&h=1200&fit=crop"
                  alt="Shree Lonar Jewellery Artistry"
                  className="w-full h-[480px] lg:h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 border border-[#D4AF37]/30 rounded-2xl z-0 hidden sm:block bg-[#FAF8F5]" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Two Decades of Excellence
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#111111] leading-tight">
                  Our Story & Heritage
                </h2>
              </div>

              <div className="w-16 h-[2px] bg-[#D4AF37]" />

              <p className="text-base text-neutral-600 font-light leading-relaxed">
                Founded in 2004, <strong className="font-semibold text-neutral-800">Shree Lonar Jewellers</strong> was born out of a profound passion for preserving ancient Indian gold traditions while pioneering lightweight, modern aesthetic designs.
              </p>

              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Over the years, we have grown from an intimate artisanal boutique into a cornerstone of trust for thousands of families. From intricate Kundan masterpieces and heritage Temple gold to flawless certified solitary diamonds, every piece is sculpted to perfection by our master craftsmen.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-6 border-t border-neutral-100">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#111111]">100% Guaranteed</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Certified purity on every gram of metal.</p>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#111111]">Handcrafted</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Sculpted with passion by veteran artisans.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 3: SOCIAL CONNECT HUB */}
      <section className="py-20 md:py-28 bg-[#FAF8F5] relative border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Get In Touch
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                Connect Directly With Us
              </h4>
              <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all flex flex-col items-center text-center space-y-2.5 group"
                >
                  <div className="p-3 bg-[#FAF8F5] rounded-full group-hover:bg-[#D4AF37]/10 transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111111]">{social.name}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 truncate max-w-[100px]">
                      {social.handle}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-20 md:py-32 bg-[#FFFFFF] relative border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-14 space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              The Shree Lonar Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Why Choose Us
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#D4AF37]/20 shadow-sm hover:border-[#D4AF37] transition-all space-y-3"
              >
                <div className="p-3 bg-white w-fit rounded-xl border border-[#D4AF37]/10 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-base font-serif font-bold text-[#111111]">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* SECTION 5: CRAFTSMANSHIP & ANIMATED STATS */}
      <section className="py-20 md:py-32 bg-[#FAF8F5] relative border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Artistic Perfection
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#111111] leading-tight">
                The Art of Craftsmanship
              </h2>

              <div className="w-16 h-[2px] bg-[#D4AF37]" />

              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Behind every piece lies hundreds of hours of precision engineering, manual polishing, and strict quality checking. We blend traditional hand-carving techniques with laser-precision 3D design technology.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-200">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-3xl font-serif font-bold text-[#D4AF37]">
                      <Counter to={stat.value} />
                      {stat.value.includes('%') ? '%' : '+'}
                    </p>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1000&h=1200&fit=crop"
                  alt="Craftsmanship detail"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 6: CINEMATIC BANNER */}
      <section className="relative py-28 w-full bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&h=900&fit=crop"
            alt="Luxury Background"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
            A Symphony of Precious Metals
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif leading-tight font-extralight">
            "Every Piece Tells A Story of Love, Honor & Pride."
          </h2>

          <div className="pt-2">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D4AF37] text-black font-medium text-xs uppercase tracking-widest rounded-full hover:bg-white transition duration-300"
            >
              Explore Collections <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7: TRUST BADGES */}
      <section className="py-20 bg-[#FFFFFF] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Peace of Mind
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
              Uncompromised Customer Trust
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-5 rounded-xl border border-[#D4AF37]/20 text-center space-y-1.5 shadow-xs"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mx-auto" />
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">{badge.title}</h4>
                <p className="text-[10px] text-neutral-400 font-light">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: LUXURY QUOTE */}
      <section className="py-20 bg-[#FAF8F5] text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto" />
          <blockquote className="font-serif text-2xl sm:text-4xl text-[#111111] italic font-light leading-snug">
            "Jewellery is more than an ornament. It is a timeless memory passed gently from one generation to another."
          </blockquote>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto" />
        </div>
      </section>

      {/* SECTION 9: CALL TO ACTION */}
      <section id="cta" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Visit Our Showroom
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#111111]">
            Begin Your Jewellery Journey
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
            Experience our exclusive bridal lounges and personal consultation services. Visit our flagship store to touch, feel, and try our royal collections.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#D4AF37] hover:text-black transition duration-300"
            >
              Visit Our Store
            </a>
            <a
              href="mailto:info@shreelonar.com"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#111111] text-xs uppercase tracking-widest font-medium rounded-full border border-[#D4AF37]/40 hover:bg-[#FAF8F5] transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};