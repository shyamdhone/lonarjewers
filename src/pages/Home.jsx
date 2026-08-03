import { useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { QuickViewModal } from '../components/Modal';
import { SectionTitle, StatCard, FeatureCard, Divider } from '../components/UI';
import { BrandStory, Newsletter } from '../components/Sections';
import { useScrollReveal } from '../hooks/useAnimation';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
// Fix the path here based on your actual file name and location:
import heroImage from "../assets/images/back.jpg";
import 'swiper/css/navigation';

export const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const collectionsRef = useScrollReveal();
  const bestSellersRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();
  const statsRef = useScrollReveal();

  // Mock Data
  const featuredCollections = [
    {
      id: 1,
      name: 'Eternal Radiance',
      description: 'A timeless collection of gold necklaces and earrings',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      price: 45000,
      originalPrice: 55000,
      category: 'Gold',
      collection: 'Premium',
      rating: 4.8,
      specs: [
        { label: 'Purity', value: '22K' },
        { label: 'Weight', value: '5g' },
        { label: 'Finish', value: 'Polished' },
      ],
    },
    {
      id: 2,
      name: 'Diamond Dreams',
      description: 'Exquisite diamond-studded jewellery for special occasions',
      image: 'https://images.unsplash.com/photo-1536599810114-c91512e5e19b?w=500&h=500&fit=crop',
      price: 125000,
      originalPrice: 150000,
      category: 'Diamond',
      collection: 'Luxury',
      rating: 5.0,
      specs: [
        { label: 'Stones', value: 'VVS1' },
        { label: 'Carat', value: '2.5' },
        { label: 'Setting', value: 'Platinum' },
      ],
    },
    {
      id: 3,
      name: 'Emerald Elegance',
      description: 'Green emerald collection with intricate designs',
      image: 'https://images.unsplash.com/photo-1515562141207-7daf5c4c99f6?w=500&h=500&fit=crop',
      price: 65000,
      originalPrice: 80000,
      category: 'Gemstone',
      collection: 'Premium',
      rating: 4.9,
      specs: [
        { label: 'Stone', value: 'Emerald' },
        { label: 'Origin', value: 'Zambian' },
        { label: 'Weight', value: '3.2 carat' },
      ],
    },
    {
      id: 4,
      name: 'Pearl Paradise',
      description: 'Lustrous pearl jewellery for everyday elegance',
      image: 'https://images.unsplash.com/photo-1515377905703-c28bde83ee91?w=500&h=500&fit=crop',
      price: 35000,
      originalPrice: 42000,
      category: 'Pearl',
      collection: 'Classic',
      rating: 4.7,
      specs: [
        { label: 'Pearl Type', value: 'South Sea' },
        { label: 'Grade', value: 'AA' },
        { label: 'Size', value: '12mm' },
      ],
    },
    {
      id: 5,
      name: 'Ruby Romance',
      description: 'Stunning red ruby pieces for the bold and beautiful',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      price: 95000,
      originalPrice: 120000,
      category: 'Gemstone',
      collection: 'Luxury',
      rating: 4.9,
      specs: [
        { label: 'Stone', value: 'Ruby' },
        { label: 'Origin', value: 'Burmese' },
        { label: 'Weight', value: '2.8 carat' },
      ],
    },
    {
      id: 6,
      name: 'Sapphire Serenity',
      description: 'Deep blue sapphire jewellery for sophisticated tastes',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
      price: 85000,
      originalPrice: 105000,
      category: 'Gemstone',
      collection: 'Premium',
      rating: 4.8,
      specs: [
        { label: 'Stone', value: 'Sapphire' },
        { label: 'Origin', value: 'Kashmir' },
        { label: 'Weight', value: '3.5 carat' },
      ],
    },
  ];

  const testimonials = [
    {
      id: 1,
      author: 'Priya Sharma',
      role: 'Bride',
      rating: 5,
      text: 'Shree Lonar created the most beautiful bridal set for my wedding. Every detail was perfect, and the quality is exceptional. Highly recommended!',
    },
    {
      id: 2,
      author: 'Rajesh Kumar',
      role: 'Customer',
      rating: 5,
      text: 'The craftsmanship is outstanding. I purchased a pendant for my wife, and she absolutely loves it. Great customer service too!',
    },
    {
      id: 3,
      author: 'Anjali Patel',
      role: 'Jewellery Collector',
      rating: 5,
      text: 'I have been a loyal customer for 5 years. The designs are always unique, and the prices are fair. Shree Lonar is my go-to jeweller.',
    },
    {
      id: 4,
      author: 'Vikram Singh',
      role: 'Business Owner',
      rating: 5,
      text: 'Outstanding customer experience from start to finish. The team is professional, knowledgeable, and genuinely cares about customer satisfaction.',
    },
  ];

  const stats = [
    { number: '20+', label: 'Years of Excellence', icon: '👑' },
    { number: '50K+', label: 'Happy Customers', icon: '💎' },
    { number: '100%', label: 'Certified Authentic', icon: '✓' },
    { number: '500+', label: 'Unique Designs', icon: '✨' },
  ];

  const features = [
    {
      icon: '💯',
      title: 'Certified Authentic',
      description: 'All our jewellery comes with BIS hallmark certification',
    },
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Complimentary delivery across India on orders above ₹10,000',
    },
    {
      icon: '↩️',
      title: '30-Day Returns',
      description: 'Hassle-free return policy for 30 days after purchase',
    },
    {
      icon: '🔐',
      title: 'Secure Payments',
      description: 'Multiple payment options with 100% secure transactions',
    },
  ];

  return (
    <div className="w-full">
      <Hero
        title="Crafted For Generations"
        subtitle="Exquisite jewellery. Trusted legacy. Designed to be cherished forever."
        image={heroImage}
        cta={{
          primary: "Enter The Boutique",
          secondary: "Watch Our Story",
        }}
        isHome={true}
      />

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding bg-luxury-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.number} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-luxury-cream">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section ref={collectionsRef} className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <SectionTitle
              title="Featured Collections"
              subtitle="Explore our curated selection of premium jewellery pieces"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="/store"
              className="btn-luxury inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Collections
            </motion.a>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section ref={bestSellersRef} className="section-padding bg-luxury-cream">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <SectionTitle
              title="Best Sellers"
              subtitle="Our most loved pieces, trusted by thousands"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.slice(3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <BrandStory />

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <SectionTitle
              title="What Our Customers Say"
              subtitle="Real stories from happy customers"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section className="section-padding bg-luxury-cream">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <SectionTitle
              title="Follow Us on Instagram"
              subtitle="See our latest designs and customer moments"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <motion.div
                key={idx}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`https://images.unsplash.com/photo-${1599643478518 + idx}?w=300&h=300&fit=crop`}
                  alt={`Instagram post ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow @ShreeLonar
            </motion.a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Visit Store CTA */}
      <section className="section-padding bg-luxury-dark">
        <div className="container-luxury text-center">
          <h2 className="text-heading text-luxury-light mb-6">Experience Our Store</h2>
          <p className="text-lg text-luxury-cream max-w-2xl mx-auto mb-8">
            Visit our showroom to see our full collection and consult with our expert jewellery specialists.
          </p>
          <motion.button
            className="btn-luxury"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Nearest Store
          </motion.button>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};