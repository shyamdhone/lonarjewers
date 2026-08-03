import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container-luxury text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <div className="text-10xl md:text-11xl font-playfair font-bold text-luxury-gold mb-6">
            404
          </div>

          {/* Error Message */}
          <h1 className="text-heading text-luxury-dark mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-luxury-dark text-opacity-70 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back to our beautiful jewellery collections.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="btn-luxury inline-block">
                Go to Home
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/store" className="btn-outline inline-block">
                Browse Collections
              </Link>
            </motion.div>
          </div>

          {/* Decorative Element */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-12"
          >
            <p className="text-6xl">💎</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
