import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Terms = () => {
  const sections = [
    {
      title: 'Agreement to Terms',
      content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily download one copy of the materials on Shree Lonar\'s site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: Modify or copy the materials; Use the materials for any commercial purpose or for any public display; Attempt to decompile or reverse engineer any software contained on the website.',
    },
    {
      title: 'Disclaimer',
      content: 'The materials on Shree Lonar\'s website are provided on an as-is basis. Shree Lonar makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: 'Limitations',
      content: 'In no event shall Shree Lonar or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Shree Lonar\'s website.',
    },
    {
      title: 'Payment Terms',
      content: 'All sales are final. We accept various payment methods including credit cards, debit cards, and digital wallets. Payment must be received before order processing. We reserve the right to cancel orders if payment is declined or delayed.',
    },
    {
      title: 'Shipping & Delivery',
      content: 'Orders typically ship within 3-5 business days. Delivery times vary based on location. Shree Lonar is not responsible for delays caused by courier services or unforeseen circumstances. Insurance on shipments is at the customer\'s discretion.',
    },
    {
      title: 'Returns & Refunds',
      content: 'Items can be returned within 30 days of purchase in original condition with all packaging and certificates. Return shipping is the customer\'s responsibility. Refunds will be processed within 10 business days of receiving the returned item.',
    },
    {
      title: 'Contact Information',
      content: 'For questions regarding these terms and conditions, please contact us at legal@shreelonar.com',
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
            <h1 className="text-heading text-luxury-dark mb-4">Terms & Conditions</h1>
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
            transition={{ delay: 0.8 }}
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
