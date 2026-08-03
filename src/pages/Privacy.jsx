import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Privacy = () => {
  const sections = [
    {
      title: 'Introduction',
      content: 'At Shree Lonar, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.',
    },
    {
      title: 'Information We Collect',
      content: 'We may collect information about you in a variety of ways. The information we may collect on the Site includes: Personal Data such as name, shipping address, email address, phone number, and billing address.',
    },
    {
      title: 'Use of Your Information',
      content: 'Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to process your transactions and send you related information.',
    },
    {
      title: 'Disclosure of Your Information',
      content: 'We may share your information in certain situations. Your information may be disclosed when required by law, to comply with legal obligations, or to protect the rights of Shree Lonar.',
    },
    {
      title: 'Security of Your Information',
      content: 'We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.',
    },
    {
      title: 'Contact Us',
      content: 'If you have questions or comments about this Privacy Policy, please contact us at privacy@shreelonar.com or visit our contact page.',
    },
  ];

  return (
    <div className="w-full pt-20 pb-16">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-heading text-luxury-dark mb-4">Privacy Policy</h1>
            <p className="text-luxury-dark text-opacity-60">
              Last updated: August 2024
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-luxury-dark text-opacity-80">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="text-2xl font-playfair font-bold text-luxury-dark mb-3">
                  {section.title}
                </h2>
                <p className="leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-luxury-gold border-opacity-20"
          >
            <Link to="/" className="text-luxury-gold hover:text-luxury-dark transition">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
