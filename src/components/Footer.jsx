import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useAnimation';
import { motion } from 'framer-motion';

export const Footer = () => {
  const ref = useScrollReveal({ yPercent: 20 });

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '#' },
      { label: 'News', href: '#' },
    ],
    Products: [
      { label: 'Gold Jewellery', href: '/store' },
      { label: 'Diamond Collection', href: '/store' },
      { label: 'Semi-Precious', href: '/store' },
      { label: 'Bridal', href: '/store' },
    ],
    Support: [
      { label: 'FAQ', href: '/contact' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Track Order', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  return (
    <footer ref={ref} className="bg-luxury-dark text-luxury-cream">
      <div className="container-luxury section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-luxury-gold border-opacity-20">
          {/* Brand */}
          <motion.div
            data-reveal
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-playfair font-bold text-luxury-gold mb-4">
              Shree Lonar
            </h3>
            <p className="text-sm text-luxury-cream text-opacity-70 mb-6 font-poppins font-light leading-relaxed">
              Crafting timeless luxury jewellery for over two decades. Each piece tells a story of tradition and elegance.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'In', href: 'https://instagram.com' },
                { label: 'F', href: 'https://facebook.com' },
                { label: 'Tw', href: 'https://twitter.com' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-luxury-gold bg-opacity-10 border border-luxury-gold border-opacity-30 flex items-center justify-center hover:bg-opacity-100 hover:text-luxury-dark transition-all duration-300 text-luxury-gold font-poppins font-600 text-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              data-reveal
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-xs font-poppins font-700 text-luxury-gold mb-6 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-luxury-cream text-opacity-70 hover:text-opacity-100 hover:text-luxury-gold transition-all duration-300 font-poppins font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="my-12 py-8">
          <p className="text-xs text-luxury-gold font-poppins font-700 mb-4 uppercase tracking-wider">
            Accepted Payments
          </p>
          <div className="flex gap-3 flex-wrap">
            {['Visa', 'Mastercard', 'AmEx', 'UPI', 'Net Banking'].map((method) => (
              <motion.div
                key={method}
                className="px-4 py-2 bg-luxury-gold bg-opacity-10 rounded-lg text-xs text-luxury-cream border border-luxury-gold border-opacity-30 font-poppins font-500 hover:bg-opacity-20 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                {method}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-30 mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.p
            className="text-xs text-luxury-cream text-opacity-50 font-poppins"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
          >
            © 2024 Shree Lonar. All rights reserved. Crafted with luxury and passion.
          </motion.p>
          <motion.div
            className="flex gap-8 mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Sitemap', href: '#' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs text-luxury-cream text-opacity-60 hover:text-opacity-100 hover:text-luxury-gold transition-all duration-300 font-poppins"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
