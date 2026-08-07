import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- React Icons Imports ---
import { 
  FaInstagram, 
  FaYoutube, 
  FaFacebookF, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaGlobe, 
  FaCalendarCheck, 
  FaHeadset, 
  FaStore, 
  FaCar, 
  FaWheelchair, 
  FaSnowflake, 
  FaUserCheck, 
  FaPaperPlane,
  FaChevronDown,
  FaArrowRight,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaHeart
} from 'react-icons/fa';

import { 
  HiOutlineShieldCheck, 
  HiOutlineSparkles, 
  HiOutlineBadgeCheck, 
  HiOutlineClock, 
  HiOutlineCurrencyRupee, 
  HiOutlineHeart 
} from 'react-icons/hi';

import contactImg from "../assets/images/Contact.jpg";

export const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    contactMethod: 'WhatsApp',
    message: '',
    privacyPolicy: false,
  });

  // Accordion FAQ State
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Form Field Handler
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // WhatsApp Message Generator Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.privacyPolicy) {
      alert('Please agree to the Privacy Policy to submit your request.');
      return;
    }

    const whatsappNumber = '+918605505091';
    const formattedMessage = 
`---------------------------------
*Hello Shreeji Jewellers,*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'N/A'}
*Subject:* ${formData.subject}
*Preferred Contact Method:* ${formData.contactMethod}

*Message:*
${formData.message}
---------------------------------`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset Form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      contactMethod: 'WhatsApp',
      message: '',
      privacyPolicy: false,
    });
  };

  // Animation Variants
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

  return (
    <div className="w-full bg-[#FCFBFA] text-[#111111] antialiased selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: LUXURY HERO */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a150c] via-black to-[#2c2211]">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={contactImg}
            alt="Shree Lonar Contact Hero"
            className="w-full h-full object-cover object-center opacity-45 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Decorative Glowing Orbs for Color & Vibrancy */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] bg-black/40 px-4 py-2 rounded-full border border-[#D4AF37]/40 font-medium shadow-md backdrop-blur-md">
              ✨ Shreeji Jewellers • Hirdav Road Lonar ✨
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-extralight tracking-tight leading-tight"
          >
            Let's Create Something <br />
            <span className="italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-[#D4AF37] bg-clip-text text-transparent drop-shadow-sm">
              Brilliant Together
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-sm sm:text-base font-light text-neutral-300 leading-relaxed tracking-wide"
          >
            Step into a world of timeless craftsmanship. Connect with our expert advisors for bespoke bridal consultations and royal creations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#map-section"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:from-white hover:to-amber-100 transition-all duration-300 shadow-xl shadow-amber-500/20 transform hover:-translate-y-0.5"
            >
              Visit Showroom
            </a>
            <a
              href="#contact-form"
              className="w-full sm:w-auto px-8 py-3.5 bg-black/50 backdrop-blur-md border border-[#D4AF37]/60 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37]/20 transition-all duration-300"
            >
              Send Message
            </a>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 z-10 flex flex-col items-center gap-1.5 text-white/60 text-xs tracking-widest uppercase cursor-pointer"
        >
          <span className="text-[10px] text-[#D4AF37]">Explore</span>
          <FaChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.div>
      </section>

      {/* SECTION 2: LUXURY INFORMATION PANEL */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-amber-600 font-bold bg-amber-100/60 px-3.5 py-1.5 rounded-full border border-amber-200">
              Boutique & Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Contact Information
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-[#D4AF37] mx-auto rounded-full mt-2" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Store Address */}
            <motion.a
              href="#map-section"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg shadow-amber-900/5 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full pointer-events-none" />
              <div className="space-y-4">
                <div className="p-3.5 bg-gradient-to-br from-amber-50 to-amber-100/60 w-fit rounded-xl border border-[#D4AF37]/30 group-hover:scale-110 transition-transform shadow-sm">
                  <FaMapMarkerAlt className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">Showroom Address</h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Hirdav Road, Lonar,<br />
                  Maharashtra, India
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider pt-3 border-t border-neutral-100 group-hover:translate-x-1 transition-transform">
                Open in Google Maps <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Phone Numbers */}
            <motion.a
              href="tel:+918605505091"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg shadow-amber-900/5 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full pointer-events-none" />
              <div className="space-y-4">
                <div className="p-3.5 bg-gradient-to-br from-amber-50 to-amber-100/60 w-fit rounded-xl border border-[#D4AF37]/30 group-hover:scale-110 transition-transform shadow-sm">
                  <FaPhoneAlt className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">Phone & WhatsApp</h3>
                <div className="text-xs sm:text-sm text-neutral-600 font-light space-y-1">
                  <p className="font-medium text-neutral-900">+91 86055 05091</p>
                  <p className="text-xs text-amber-700/80 font-medium">Available for direct inquiries</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider pt-3 border-t border-neutral-100 group-hover:translate-x-1 transition-transform">
                Click to Call Now <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Email Contact */}
            <motion.a
              href="mailto:info@shreelonar.com"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg shadow-amber-900/5 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full pointer-events-none" />
              <div className="space-y-4">
                <div className="p-3.5 bg-gradient-to-br from-amber-50 to-amber-100/60 w-fit rounded-xl border border-[#D4AF37]/30 group-hover:scale-110 transition-transform shadow-sm">
                  <FaEnvelope className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">Email Addresses</h3>
                <div className="text-xs sm:text-sm text-neutral-600 font-light space-y-1">
                  <p>info@shreelonar.com</p>
                  <p>support@shreelonar.com</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider pt-3 border-t border-neutral-100 group-hover:translate-x-1 transition-transform">
                Click to Email Us <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Business Hours */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg shadow-amber-900/5 space-y-4 relative overflow-hidden"
            >
              <div className="p-3.5 bg-gradient-to-br from-amber-50 to-amber-100/60 w-fit rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <FaClock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#111111]">Showroom Hours</h3>
              <div className="text-xs sm:text-sm text-neutral-600 font-light space-y-1">
                <p><strong className="font-semibold text-neutral-800">Mon - Sat:</strong> 10:00 AM – 8:00 PM</p>
                <p><strong className="font-semibold text-neutral-800">Sunday:</strong> 12:00 PM – 6:00 PM</p>
              </div>
            </motion.div>

            {/* WhatsApp Direct */}
            <motion.a
              href="https://wa.me/918605505091"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg shadow-amber-900/5 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-100/50 to-transparent rounded-bl-full pointer-events-none" />
              <div className="space-y-4">
                <div className="p-3.5 bg-gradient-to-br from-green-50 to-green-100/60 w-fit rounded-xl border border-green-300 group-hover:scale-110 transition-transform shadow-sm">
                  <FaWhatsapp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">WhatsApp Concierge</h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Fast support and real-time live product catalogs available 24/7.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wider pt-3 border-t border-neutral-100 group-hover:translate-x-1 transition-transform">
                Chat on WhatsApp <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Official Website */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg shadow-amber-900/5 space-y-4 relative overflow-hidden"
            >
              <div className="p-3.5 bg-gradient-to-br from-amber-50 to-amber-100/60 w-fit rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <FaGlobe className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#111111]">Official Portal</h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                www.shreelonar.com
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2.5: INSTAGRAM PROFILE CARD (UPDATED WITH STATS) */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-600 text-black relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/20 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Instagram Profile Left Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
                    alt="Shreeji Jewellers Instagram"
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-pink-600 text-white p-2 rounded-full shadow-md">
                  <FaInstagram className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111111]">shreeji__jewellers_lonar</h3>
                  <span className="text-blue-500 bg-blue-50 rounded-full p-0.5"><FaCheckCircle className="w-4 h-4" /></span>
                </div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Umesh Gherwara | Lonar 📍</p>
                <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-sm">
                  ✨ Jewelry Wholesaler • Gold & Diamond Jewellery—Lonar's #1 • Retail & Wholesale Supply
                </p>
              </div>
            </div>

            {/* Instagram Follow Button / Action */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="flex gap-4 text-center px-4 py-2 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div>
                  <p className="text-sm font-bold text-neutral-900">31</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Posts</p>
                </div>
                <div className="border-r border-neutral-200" />
                <div>
                  <p className="text-sm font-bold text-neutral-900">392</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Followers</p>
                </div>
                <div className="border-r border-neutral-200" />
                <div>
                  <p className="text-sm font-bold text-neutral-900">130</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Following</p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/shreeji__jewellers_lonar/?__pwa=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <FaInstagram className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Follow on Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: LUXURY CONTACT FORM (WHATSAPP INTEGRATION) */}
      <section id="contact-form" className="py-20 md:py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center space-y-3 mb-12"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-amber-600 font-bold bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
              Bespoke Assistance
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#111111]">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-lg mx-auto">
              Fill out your details below to generate an automated WhatsApp inquiry directly to our senior customer concierge at Hirdav Road, Lonar.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-[#D4AF37] mx-auto rounded-full mt-2" />
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            onSubmit={handleFormSubmit}
            className="bg-gradient-to-b from-[#FAF8F5] to-amber-50/40 p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/35 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                  Full Name <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm outline-none transition shadow-inner"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                  Email Address <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm outline-none transition shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+91 86055 05091"
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm outline-none transition shadow-inner"
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm outline-none transition shadow-inner"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Email">Email</option>
                  <option value="In-Store Visit">In-Store Visit (Hirdav Road Lonar)</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                Subject <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                placeholder="Bridal Consultation / Custom Design Inquiry"
                required
                className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm outline-none transition shadow-inner"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                Message <span className="text-[#D4AF37]">*</span>
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Please describe your requirements or requested design detail in brief..."
                required
                className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm outline-none transition resize-none shadow-inner"
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleFormChange}
                className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
              />
              <label htmlFor="privacyPolicy" className="text-xs text-neutral-600 cursor-pointer">
                I agree to the <span className="text-[#D4AF37] underline font-medium">Privacy Policy</span> and consent to receiving updates.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold text-xs uppercase tracking-[0.2em] hover:from-emerald-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-green-600/20"
              >
                <FaWhatsapp className="w-5 h-5 text-white" /> Send Via WhatsApp (+91 86055 05091)
              </motion.button>
            </div>
          </motion.form>

        </div>
      </section>

      {/* SECTION 4: GOOGLE MAPS & SHOWROOM AMENITIES */}
      <section id="map-section" className="py-20 md:py-32 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-14 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-amber-600 font-bold bg-amber-100/60 px-3.5 py-1.5 rounded-full border border-amber-200">
              Boutique Location
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Find Us at Hirdav Road, Lonar
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-[#D4AF37] mx-auto rounded-full mt-2" />
          </motion.div>

          {/* Embedded Google Map Frame */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-white p-3 mb-12"
          >
            <div className="w-full h-[400px] lg:h-[480px] rounded-2xl overflow-hidden">
              <iframe
                title="Shreeji Jewellers Hirdav Road Lonar Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.0!2d76.54!3d19.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHirdav+Rd%2C+Lonar%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Showroom Features Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-md flex flex-col items-center space-y-2.5 hover:border-[#D4AF37] transition-colors">
              <div className="p-2.5 bg-amber-50 rounded-xl text-[#D4AF37]"><FaCar className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-neutral-800">Valet Parking</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-md flex flex-col items-center space-y-2.5 hover:border-[#D4AF37] transition-colors">
              <div className="p-2.5 bg-amber-50 rounded-xl text-[#D4AF37]"><FaWheelchair className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-neutral-800">Wheelchair Access</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-md flex flex-col items-center space-y-2.5 hover:border-[#D4AF37] transition-colors">
              <div className="p-2.5 bg-amber-50 rounded-xl text-[#D4AF37]"><FaStore className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-neutral-800">Luxury Showroom</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-md flex flex-col items-center space-y-2.5 hover:border-[#D4AF37] transition-colors">
              <div className="p-2.5 bg-amber-50 rounded-xl text-[#D4AF37]"><FaSnowflake className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-neutral-800">Air Conditioned</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-md flex flex-col items-center space-y-2.5 hover:border-[#D4AF37] transition-colors col-span-2 sm:col-span-1">
              <div className="p-2.5 bg-amber-50 rounded-xl text-[#D4AF37]"><FaUserCheck className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-neutral-800">Private Lounges</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: MEET OUR FOUNDER */}
    

    </div>
  );
};