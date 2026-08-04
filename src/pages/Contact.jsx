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
  FaCheckCircle
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

    const whatsappNumber = '919876543210'; // Replace with target business WhatsApp number
    const formattedMessage = 
`---------------------------------
*Hello Shree Lonar Jewellers,*

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

  // Data Collections
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@shreelonarjewellers',
      icon: <FaInstagram className="w-5 h-5 text-[#D4AF37]" />,
      url: 'https://instagram.com'
    },
    {
      name: 'YouTube',
      handle: '@shreelonarjewellers',
      icon: <FaYoutube className="w-5 h-5 text-[#D4AF37]" />,
      url: 'https://youtube.com'
    },
    {
      name: 'Facebook',
      handle: 'Shree Lonar Jewellers',
      icon: <FaFacebookF className="w-5 h-5 text-[#D4AF37]" />,
      url: 'https://facebook.com'
    },
    {
      name: 'WhatsApp',
      handle: '+91 XXXXX XXXXX',
      icon: <FaWhatsapp className="w-5 h-5 text-[#D4AF37]" />,
      url: 'https://wa.me/919876543210'
    },
    {
      name: 'Email',
      handle: 'info@shreelonar.com',
      icon: <FaEnvelope className="w-5 h-5 text-[#D4AF37]" />,
      url: 'mailto:info@shreelonar.com'
    },
    {
      name: 'Phone',
      handle: '+91 XXXXX XXXXX',
      icon: <FaPhoneAlt className="w-5 h-5 text-[#D4AF37]" />,
      url: 'tel:+919876543210'
    }
  ];

  const quickActions = [
    {
      title: 'Book Appointment',
      desc: 'Schedule a private consultation at our boutique',
      icon: <FaCalendarCheck className="w-6 h-6 text-[#D4AF37]" />,
      link: '#contact-form'
    },
    {
      title: 'Request Callback',
      desc: 'Speak directly with our senior jewellery advisor',
      icon: <FaHeadset className="w-6 h-6 text-[#D4AF37]" />,
      link: '#contact-form'
    },
    {
      title: 'WhatsApp Chat',
      desc: 'Instant messaging for immediate inquiries',
      icon: <FaWhatsapp className="w-6 h-6 text-[#D4AF37]" />,
      link: 'https://wa.me/919876543210'
    },
    {
      title: 'Email Us',
      desc: 'Drop us a detailed query or customized request',
      icon: <FaEnvelope className="w-6 h-6 text-[#D4AF37]" />,
      link: 'mailto:info@shreelonar.com'
    },
    {
      title: 'Call Now',
      desc: 'Direct hotline for assistance and orders',
      icon: <FaPhoneAlt className="w-6 h-6 text-[#D4AF37]" />,
      link: 'tel:+919876543210'
    },
    {
      title: 'Visit Showroom',
      desc: 'Experience our royal collections in person',
      icon: <FaStore className="w-6 h-6 text-[#D4AF37]" />,
      link: '#map-section'
    }
  ];

  const faqItems = [
    {
      question: 'What is BIS Hallmark certification?',
      answer: 'BIS (Bureau of Indian Standards) hallmark guarantees the purity and authenticity of gold and silver according to official national standards. Every piece at Shree Lonar is 100% hallmarked.'
    },
    {
      question: 'Can I customize my jewellery design?',
      answer: 'Absolutely. Our master artisans specialize in bespoke design. You can bring a reference sketch or collaborate with our team to sculpt your dream ornament from scratch.'
    },
    {
      question: 'Do you provide safe home delivery?',
      answer: 'Yes, we provide fully insured, tamper-proof global and nationwide shipping right to your doorstep with real-time transit tracking.'
    },
    {
      question: 'How long does custom jewellery creation take?',
      answer: 'Custom handcrafted creations generally take between 10 to 21 business days, depending on design complexity and stone sourcing requirements.'
    },
    {
      question: 'Do you offer jewellery exchange and buyback options?',
      answer: 'Yes, we offer transparent exchange and buyback policies based on real-time market gold/gem rates with zero hidden deductions.'
    },
    {
      question: 'How do I book a private consultation appointment?',
      answer: 'You can book an appointment by filling out the contact form above, selecting "In-Store Visit" as your contact method, or messaging us directly on WhatsApp.'
    }
  ];

  const promiseBadges = [
    { icon: <HiOutlineBadgeCheck className="w-8 h-8 text-[#D4AF37]" />, title: '100% Hallmarked', desc: 'Bureau of Indian Standards Certified' },
    { icon: <HiOutlineSparkles className="w-8 h-8 text-[#D4AF37]" />, title: 'Certified Diamonds', desc: 'IGI & GIA Authenticated Stones' },
    { icon: <HiOutlineCurrencyRupee className="w-8 h-8 text-[#D4AF37]" />, title: 'Transparent Pricing', desc: 'Detailed making charge transparency' },
    { icon: <HiOutlineHeart className="w-8 h-8 text-[#D4AF37]" />, title: 'Lifetime Care', desc: 'Complimentary maintenance & polish' },
    { icon: <HiOutlineShieldCheck className="w-8 h-8 text-[#D4AF37]" />, title: 'Secure Handling', desc: 'Insured transport and guaranteed safety' },
    { icon: <HiOutlineClock className="w-8 h-8 text-[#D4AF37]" />, title: 'Trusted Since 2004', desc: 'Two decades of artistic heritage' }
  ];

  return (
    <div className="w-full bg-white text-[#111111] antialiased selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: LUXURY HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={contactImg}
            alt="Shree Lonar Contact Hero"
            className="w-full h-full object-cover object-center opacity-50 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] border-b border-[#D4AF37]/40 pb-1 font-medium">
              Shree Lonar Jewellers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-extralight tracking-tight leading-tight"
          >
            Let's Create Something <br />
            <span className="italic font-normal bg-gradient-to-r from-white via-[#FAF8F5] to-[#D4AF37] bg-clip-text text-transparent">
              Beautiful Together
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-sm sm:text-base font-light text-neutral-300 leading-relaxed tracking-wide"
          >
            Whether you are seeking bespoke bridal consultation, custom diamond crafting, or heirloom restoration, our master advisors are dedicated to serving you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#map-section"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] text-black font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
            >
              Visit Showroom
            </a>
            <a
              href="#contact-form"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#D4AF37]/50 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 z-10 flex flex-col items-center gap-1.5 text-white/50 text-xs tracking-widest uppercase cursor-pointer"
        >
          <span className="text-[10px] text-[#D4AF37]">Scroll</span>
          <FaChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.div>
      </section>

      {/* SECTION 2: LUXURY INFORMATION PANEL */}
      <section className="py-20 md:py-28 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16 space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Boutique & Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Contact Information
            </h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
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
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-md shadow-stone-100 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] w-fit rounded-xl border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <FaMapMarkerAlt className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">Store Address</h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  123 Luxury Lane, Near Jewel Plaza,<br />
                  Mumbai, Maharashtra 400001, India
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider pt-2 border-t border-neutral-100">
                Click to Open Maps <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Phone Numbers */}
            <motion.a
              href="tel:+919876543210"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-md shadow-stone-100 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] w-fit rounded-xl border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <FaPhoneAlt className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">Phone Numbers</h3>
                <div className="text-xs sm:text-sm text-neutral-600 font-light space-y-1">
                  <p>+91 98765 43210 (Boutique)</p>
                  <p>+91 22 1234 5678 (Corporate)</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider pt-2 border-t border-neutral-100">
                Click to Call Directly <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Email Contact */}
            <motion.a
              href="mailto:info@shreelonar.com"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-md shadow-stone-100 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] w-fit rounded-xl border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <FaEnvelope className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">Email Addresses</h3>
                <div className="text-xs sm:text-sm text-neutral-600 font-light space-y-1">
                  <p>info@shreelonar.com</p>
                  <p>support@shreelonar.com</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider pt-2 border-t border-neutral-100">
                Click to Email Us <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Business Hours */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-md shadow-stone-100 space-y-4"
            >
              <div className="p-3.5 bg-[#FAF8F5] w-fit rounded-xl border border-[#D4AF37]/20">
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
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-md shadow-stone-100 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] w-fit rounded-xl border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <FaWhatsapp className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111111]">WhatsApp Concierge</h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Fast support and real-time product catalogs available 24/7 on WhatsApp.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider pt-2 border-t border-neutral-100">
                Click to WhatsApp <FaArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            {/* Official Website */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-md shadow-stone-100 space-y-4"
            >
              <div className="p-3.5 bg-[#FAF8F5] w-fit rounded-xl border border-[#D4AF37]/20">
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
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Bespoke Assistance
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#111111]">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-lg mx-auto">
              Fill out your details below to generate an automated WhatsApp inquiry directly to our senior customer concierge.
            </p>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            onSubmit={handleFormSubmit}
            className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 shadow-xl space-y-6"
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
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs sm:text-sm outline-none transition"
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
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs sm:text-sm outline-none transition"
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
                  placeholder="+91 00000 00000"
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs sm:text-sm outline-none transition"
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
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs sm:text-sm outline-none transition"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Email">Email</option>
                  <option value="In-Store Visit">In-Store Visit</option>
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
                className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs sm:text-sm outline-none transition"
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
                className="w-full px-4 py-3.5 bg-white rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs sm:text-sm outline-none transition resize-none"
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
                className="w-full py-4 bg-[#111111] text-white rounded-xl font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaPaperPlane className="w-3.5 h-3.5" /> Send Via WhatsApp
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
            className="text-center max-w-2xl mx-auto mb-14 space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Boutique Location
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Find Our Showroom
            </h2>
          </motion.div>

          {/* Embedded Google Map Frame */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-white p-2 mb-12"
          >
            <div className="w-full h-[400px] lg:h-[480px] rounded-2xl overflow-hidden">
              <iframe
                title="Shree Lonar Showroom Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.809228833189!2d72.83106131490212!3d18.922002987178345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c06d0d7723%3A0x1b28d7d91e6b9112!2sTaj%20Mahal%20Tower%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
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
            <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/20 shadow-xs flex flex-col items-center space-y-2">
              <FaCar className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-neutral-800">Valet Parking</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/20 shadow-xs flex flex-col items-center space-y-2">
              <FaWheelchair className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-neutral-800">Wheelchair Access</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/20 shadow-xs flex flex-col items-center space-y-2">
              <FaStore className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-neutral-800">Luxury Showroom</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/20 shadow-xs flex flex-col items-center space-y-2">
              <FaSnowflake className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-neutral-800">Air Conditioned</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/20 shadow-xs flex flex-col items-center space-y-2 col-span-2 sm:col-span-1">
              <FaUserCheck className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-neutral-800">Private Lounges</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: MEET OUR FOUNDER & SOCIAL CARDS */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16 space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Visionary Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Meet Our Founder
            </h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-[#FAF8F5] rounded-3xl p-8 lg:p-12 border border-[#D4AF37]/30 shadow-xl mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
                    alt="Founder of Shree Lonar Jewellers"
                    className="w-full h-[380px] lg:h-[440px] object-cover object-top"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
                    Mr. Lonar
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mt-1">
                    Founder & Managing Director
                  </p>
                </div>

                <div className="w-12 h-[2px] bg-[#D4AF37]" />

                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed italic">
                  "Jewellery isn't merely gold or stone—it is an emotional treasure, an heirloom that holds memories, celebrations, and familial legacies across generations. When you choose Shree Lonar, you choose a bond built on absolute trust and lifelong dedication."
                </p>

                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                  With over 20 years at the forefront of precious metal craftsmanship, Mr. Lonar established the brand with an unyielding commitment to purity, ethics, and artistic perfection.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Cards Grid */}
          <div className="space-y-6">
            <h4 className="text-center font-serif text-lg text-[#111111]">
              Connect Directly With Us
            </h4>

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
                  className="bg-white p-4 rounded-2xl border border-[#D4AF37]/30 shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all flex flex-col items-center text-center space-y-2 group"
                >
                  <div className="p-2.5 bg-[#FAF8F5] rounded-full group-hover:bg-[#D4AF37]/10 transition-colors">
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

      {/* SECTION 6: QUICK ACTION CARDS */}
      <section className="py-20 md:py-32 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-14 space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Instant Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Quick Actions
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {quickActions.map((action, idx) => (
              <motion.a
                key={idx}
                href={action.link}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-white p-7 rounded-2xl border border-[#D4AF37]/20 shadow-sm hover:border-[#D4AF37] transition-all space-y-3 group"
              >
                <div className="p-3 bg-[#FAF8F5] w-fit rounded-xl border border-[#D4AF37]/10 group-hover:bg-[#D4AF37]/10 transition-colors">
                  {action.icon}
                </div>
                <h3 className="text-base font-serif font-bold text-[#111111]">
                  {action.title}
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {action.desc}
                </p>
              </motion.a>
            ))}
          </motion.div>

        </div>
      </section>

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-14 space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Common Queries
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-[#FAF8F5] rounded-2xl border border-[#D4AF37]/30 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-serif font-bold text-[#111111]">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFAQ === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 bg-white rounded-full border border-[#D4AF37]/30 text-[#D4AF37]"
                  >
                    <FaChevronDown className="w-3.5 h-3.5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedFAQ === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 pt-1 border-t border-[#D4AF37]/10"
                    >
                      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8: CUSTOMER PROMISE */}
      <section className="py-20 bg-[#FAF8F5] border-t border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              The Lonar Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
              Our Uncompromised Promises
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {promiseBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-[#D4AF37]/20 text-center space-y-3 hover:shadow-lg transition duration-300"
              >
                <div className="p-3 bg-[#FAF8F5] w-fit mx-auto rounded-xl border border-[#D4AF37]/10">
                  {badge.icon}
                </div>
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">{badge.title}</h4>
                <p className="text-[10px] text-neutral-400 font-light">{badge.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: CALL TO ACTION BANNER */}
      <section className="py-20 md:py-28 bg-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Visit Us Today
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#111111]">
            Visit Our Luxury Showroom Today
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
            Experience the warmth, precision, and elegance of handcrafted gold, solitary diamonds, and heritage jewellery in person.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#map-section"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#D4AF37] hover:text-black transition duration-300"
            >
              Get Directions
            </a>
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#111111] text-xs uppercase tracking-widest font-medium rounded-full border border-[#D4AF37]/40 hover:bg-[#FAF8F5] transition duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};