import { motion } from 'framer-motion';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      data-reveal
      className="card-luxury p-8 md:p-10 bg-white border-2 border-luxury-cream hover:border-luxury-gold"
      whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(201, 164, 76, 0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Quote Icon */}
      <motion.div
        className="text-5xl text-luxury-gold opacity-30 mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
      >
        "
      </motion.div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-6">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-xl ${i < testimonial.rating ? 'text-luxury-gold' : 'text-luxury-cream'}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-base text-luxury-dark mb-8 leading-relaxed font-poppins font-light italic">
        "{testimonial.text}"
      </p>

      {/* Divider */}
      <div className="h-0.5 bg-gradient-to-r from-luxury-gold to-transparent opacity-30 mb-6" />

      {/* Author */}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-14 h-14 rounded-full bg-gradient-to-br from-luxury-gold to-yellow-500 flex items-center justify-center text-white font-playfair font-bold text-lg shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          {testimonial.author[0]}
        </motion.div>
        <div>
          <p className="font-playfair font-semibold text-luxury-dark text-lg">
            {testimonial.author}
          </p>
          <p className="text-xs text-luxury-dark text-opacity-60 font-poppins font-500 uppercase tracking-wider">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
