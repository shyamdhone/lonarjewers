import React, { useState } from 'react';
import { useScrollReveal, useParallax } from '../hooks/useAnimation';
import { motion } from 'framer-motion';

export const BrandStory = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding bg-luxury-cream">
      <div className="container-luxury grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            data-reveal
            className="text-luxury-gold text-xs font-poppins font-700 mb-4 uppercase tracking-widest"
          >
            ✦ Our Heritage
          </motion.p>
          <h2
            data-reveal
            className="text-4xl md:text-5xl lg:text-6xl text-luxury-dark mb-8 font-playfair font-bold leading-tight"
          >
            Crafted with Passion for Generations
          </h2>

          {/* Decorative Line */}
          <div className="h-1 w-12 bg-luxury-gold rounded-full mb-8" />

          <p data-reveal className="text-lg text-luxury-dark text-opacity-70 mb-6 leading-relaxed font-poppins font-light">
            For over 20 years, Shree Lonar has been at the forefront of Indian luxury jewellery, blending traditional craftsmanship with contemporary design. Each piece is a testament to our commitment to excellence.
          </p>
          <p data-reveal className="text-lg text-luxury-dark text-opacity-70 mb-8 leading-relaxed font-poppins font-light">
            Our master artisans handpick every gemstone and meticulously craft each design, ensuring that your jewellery isn't just beautiful, but also a valuable investment.
          </p>
          <motion.button
            data-reveal
            className="btn-luxury"
            whileHover={{ scale: 1.08, boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Story →
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          data-reveal
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-luxury border-2 border-luxury-gold border-opacity-10">
            <motion.img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
              alt="Artisan crafting jewellery"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <motion.div
            className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-br from-luxury-gold to-yellow-400 rounded-3xl -z-10 blur-3xl opacity-20"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export const Newsletter = () => {
  const ref = useScrollReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-luxury-dark to-black relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container-luxury max-w-2xl mx-auto text-center relative z-10">
        <motion.p
          data-reveal
          className="text-luxury-gold text-xs font-poppins font-700 mb-4 uppercase tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ✦ Stay Connected
        </motion.p>

        <motion.h2
          data-reveal
          className="text-4xl md:text-5xl lg:text-6xl text-luxury-light mb-4 font-playfair font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Subscribe to Our Newsletter
        </motion.h2>

        <motion.p
          data-reveal
          className="text-lg text-luxury-cream text-opacity-80 mb-10 font-poppins font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Get exclusive offers, new collections, and luxury jewellery tips delivered to your inbox.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-0 md:rounded-2xl overflow-hidden shadow-luxury"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input-luxury flex-1 mdv:rounded-r-none focus:ring-2 focus:ring-luxury-gold focus:ring-opacity-50"
            required
          />
          <motion.button
            type="submit"
            className="btn-luxury md:rounded-l-none px-8 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            {submitted ? '✓ Subscribed' : 'Subscribe'}
          </motion.button>
        </motion.form>

        {submitted && (
          <motion.p
            className="text-luxury-gold text-sm mt-4 font-poppins font-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Thank you for subscribing to luxury news!
          </motion.p>
        )}
      </div>
    </section>
  );
};
