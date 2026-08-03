import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle = ({
  title,
  subtitle,
  category = '✦ Premium Collection',
  align = 'center',
}) => {
  const alignmentClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left mr-auto items-start',
    right: 'text-right ml-auto items-end',
  };

  const dividerAlignment = {
    center: 'mx-auto',
    left: 'mr-auto',
    right: 'ml-auto',
  };

  return (
    <motion.div
      data-reveal
      className={`max-w-3xl flex flex-col mb-12 ${
        alignmentClasses[align] || alignmentClasses.center
      }`}
    >
      {/* Category / Eyebrow */}
      <motion.p
        className="text-[#8C6D2B] text-xs font-sans font-bold mb-3 uppercase tracking-[0.2em]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {category}
      </motion.p>

      {/* Main Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C2A29] mb-4 font-serif font-bold leading-tight break-words"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-base sm:text-lg text-[#6B655F] leading-relaxed font-sans font-light max-w-2xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative Gold Bar */}
      <motion.div
        className={`h-1 bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A37E36] rounded-full mt-5 ${
          dividerAlignment[align] || dividerAlignment.center
        }`}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 64, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </motion.div>
  );
};

export const StatCard = ({ number, label, icon }) => {
  return (
    <motion.div
      data-reveal
      className="text-center group p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]/60 shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {icon && (
        <div className="text-3xl mb-3 text-[#C5A059] flex justify-center">
          {icon}
        </div>
      )}
      <motion.div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#8C6D2B] mb-2 group-hover:scale-105 transition-transform duration-300">
        {number}
      </motion.div>
      <p className="text-xs sm:text-sm text-[#6B655F] font-sans font-medium uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
};

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      data-reveal
      className="group text-center p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E8DFC8]/50 hover:border-[#E8DFC8] transition-all duration-300 shadow-sm hover:shadow-md"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-[#F3EFE6] group-hover:bg-[#C5A059] text-[#8C6D2B] group-hover:text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-5 shadow-inner transition-colors duration-300 border border-[#E8DFC8]"
        whileHover={{ scale: 1.1, rotate: 8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#2C2A29] mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#6B655F] font-sans font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export const Badge = ({ children, color = 'gold' }) => {
  const colors = {
    gold: 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A37E36] text-white shadow-sm',
    cream: 'bg-[#F3EFE6] text-[#8C6D2B] border border-[#E8DFC8]',
    dark: 'bg-[#2C2A29] text-[#FAF8F5]',
  };

  return (
    <motion.span
      className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-sans font-bold tracking-wider uppercase ${
        colors[color] || colors.gold
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  );
};

export const Divider = ({ className = '' }) => (
  <motion.div
    className={`h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent my-8 ${className}`}
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: '100%', opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  />
);