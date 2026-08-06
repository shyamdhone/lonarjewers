import React, { useState, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/Modal';
import { useScrollReveal } from '../hooks/useAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiSliders, 
  FiX, 
  FiCheck, 
  FiRotateCcw, 
  FiGrid, 
  FiPackage,
  FiChevronRight
} from 'react-icons/fi';

// Local Assets - Cleaned up to include only the active images used in the products list
import jumkas3Img from '../assets/images/jumkas3.jpg';
import jumkas4Img from '../assets/images/jumkas4.jpg';
import jumkas5Img from '../assets/images/jumkas5.jpg';
import jumkas6Img from '../assets/images/jumkas6.jpg';
import jumkas7Img from '../assets/images/jumkas7.jpg';
import jumkasetImg from '../assets/images/jumkaset.jpg';
import newjumkasImg from '../assets/images/newjumkas.jpg';
import neckals3Img from '../assets/images/neckals3.jpg';
import necklace6Img from '../assets/images/necklace6.jpg';
import necklace7Img from '../assets/images/necklace7.jpg';
import necklace8Img from '../assets/images/necklace8.jpg';
import necklaceandjImg from '../assets/images/necklaceandj.jpg';
import neklace1Img from '../assets/images/neklace1.jpg';
import neklace2Img from '../assets/images/neklace2.jpg';
import neklasc5Img from '../assets/images/neklasc5.jpg';
import neklasce4Img from '../assets/images/neklasce4.jpg';
import backgroud from "../assets/images/jewelry.jpg"

export const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const initialFilters = {
    category: 'all',
    priceRange: [0, 200000],
    collection: 'all',
    sortBy: 'newest',
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const productsRef = useScrollReveal();

  const allProducts = useMemo(() => [
    {
      id: 1,
      name: 'Eternal Radiance Necklace',
      description: 'A timeless collection of gold necklaces crafted with fine precision',
      image: neklace1Img,
      price: 110000,
      originalPrice: 130000,
      category: 'Necklace',
      collection: 'Premium',
      rating: 4.8,
      specs: [
        { label: 'Purity', value: '22K' },
        { label: 'Weight', value: '18g' },
      ],
    },
    {
      id: 2,
      name: 'Emerald Elegance Earrings',
      description: 'Green emerald collection with intricate vintage designs',
      image: jumkas3Img,
      price: 65000,
      originalPrice: 80000,
      category: 'Earrings',
      collection: 'Premium',
      rating: 4.9,
      specs: [
        { label: 'Stone', value: 'Emerald' },
        { label: 'Weight', value: '3.2 carat' },
      ],
    },
    {
      id: 4,
      name: 'Royal Heritage Jhumkas II',
      description: 'Traditional gold jhumkas adorned with fine enamel accents',
      image: jumkas4Img,
      price: 48000,
      originalPrice: 55000,
      category: 'Earrings',
      collection: 'Classic',
      rating: 4.7,
      specs: [
        { label: 'Purity', value: '22K' },
        { label: 'Weight', value: '10g' },
      ],
    },
    {
      id: 5,
      name: 'Temple Gold Drop Earrings',
      description: 'Intricate temple design hanging drops with gold bead drops',
      image: jumkas5Img,
      price: 59000,
      originalPrice: 70000,
      category: 'Earrings',
      collection: 'Classic',
      rating: 4.8,
      specs: [
        { label: 'Design', value: 'Temple' },
        { label: 'Purity', value: '22K' },
      ],
    },
    {
      id: 6,
      name: 'Chandbali Regal Earrings',
      description: 'Majestic half-moon chandbalis studded with polki diamonds',
      image: jumkas6Img,
      price: 88000,
      originalPrice: 105000,
      category: 'Earrings',
      collection: 'Luxury',
      rating: 4.9,
      specs: [
        { label: 'Work', value: 'Polki' },
        { label: 'Weight', value: '14g' },
      ],
    },
    {
      id: 7,
      name: 'Pearl Kissed Jhumki',
      description: 'Delicate mini jhumkis fringed with cascading freshwater pearls',
      image: jumkas7Img,
      price: 39000,
      originalPrice: 46000,
      category: 'Earrings',
      collection: 'Classic',
      rating: 4.6,
      specs: [
        { label: 'Pearl', value: 'Freshwater' },
        { label: 'Weight', value: '7g' },
      ],
    },
    {
      id: 8,
      name: 'Grand Bridal Jhumka Set',
      description: 'Comprehensive bridal ear adornment set with matching maang tikka',
      image: jumkasetImg,
      price: 142000,
      originalPrice: 165000,
      category: 'Set',
      collection: 'Luxury',
      rating: 5.0,
      specs: [
        { label: 'Includes', value: 'Earrings + Tikka' },
        { label: 'Purity', value: '22K' },
      ],
    },
    {
      id: 9,
      name: 'Modern Jhumka New Edition',
      description: 'Fresh stylistic approach to classic temple jhumkas',
      image: newjumkasImg,
      price: 54000,
      originalPrice: 62000,
      category: 'Earrings',
      collection: 'Premium',
      rating: 4.7,
      specs: [
        { label: 'Style', value: 'Modern' },
        { label: 'Purity', value: '22K' },
      ],
    },
    {
      id: 10,
      name: 'Regal Gold Neckpiece',
      description: 'Statement gold neckpiece featuring traditional motifs and laser cuts',
      image: neckals3Img,
      price: 175000,
      originalPrice: 195000,
      category: 'Necklace',
      collection: 'Luxury',
      rating: 4.9,
      specs: [
        { label: 'Purity', value: '22K' },
        { label: 'Weight', value: '30g' },
      ],
    },
    {
      id: 11,
      name: 'Victorian Diamond Necklace',
      description: 'Dark antique finish encrusted with brilliant-cut sparkling stones',
      image: necklace6Img,
      price: 155000,
      originalPrice: 180000,
      category: 'Necklace',
      collection: 'Luxury',
      rating: 4.8,
      specs: [
        { label: 'Setting', value: 'Victorian' },
        { label: 'Stones', value: 'CZ & Diamond' },
      ],
    },
    {
      id: 12,
      name: 'Layered Gold Chain Necklace',
      description: 'Multi-strand delicate gold chains offering effortless layering chic',
      image: necklace7Img,
      price: 78000,
      originalPrice: 90000,
      category: 'Necklace',
      collection: 'Premium',
      rating: 4.7,
      specs: [
        { label: 'Purity', value: '18K' },
        { label: 'Strands', value: '3-Layer' },
      ],
    },
    {
      id: 13,
      name: 'Royal Kundan Neckset',
      description: 'Pure uncut glass-Kundan pieces hand-set in a broad choker profile',
      image: necklace8Img,
      price: 138000,
      originalPrice: 155000,
      category: 'Necklace',
      collection: 'Luxury',
      rating: 4.9,
      specs: [
        { label: 'Craft', value: 'Kundan' },
        { label: 'Plating', value: '24K Gold' },
      ],
    },
    {
      id: 14,
      name: 'Necklace & Jhumka Ensemble',
      description: 'Matched matching necklace and earring set for weddings',
      image: necklaceandjImg,
      price: 190000,
      originalPrice: 215000,
      category: 'Set',
      collection: 'Luxury',
      rating: 5.0,
      specs: [
        { label: 'Set Type', value: 'Complete' },
        { label: 'Purity', value: '22K' },
      ],
    },
    {
      id: 15,
      name: 'Minimalist Diamond Pendant Necklace',
      description: 'A single floating diamond suspended on an invisible gold chain',
      image: neklace2Img,
      price: 42000,
      originalPrice: 49000,
      category: 'Necklace',
      collection: 'Classic',
      rating: 4.8,
      specs: [
        { label: 'Carat', value: '0.25' },
        { label: 'Metal', value: 'Yellow Gold' },
      ],
    },
    {
      id: 16,
      name: 'Traditional Kasu Haram',
      description: 'Classic coin necklace featuring traditional goddess motifs',
      image: neklasc5Img,
      price: 128000,
      originalPrice: 145000,
      category: 'Necklace',
      collection: 'Classic',
      rating: 4.8,
      specs: [
        { label: 'Motif', value: 'Temple Coin' },
        { label: 'Purity', value: '22K' },
      ],
    },
    {
      id: 17,
      name: 'Navratna Gemstone Necklace',
      description: 'A brilliant alignment of nine auspicious planetary gemstones',
      image: neklasce4Img,
      price: 160000,
      originalPrice: 185000,
      category: 'Necklace',
      collection: 'Luxury',
      rating: 5.0,
      specs: [
        { label: 'Gems', value: 'Navratna' },
        { label: 'Setting', value: 'Handmade' },
      ],
    }
  ], []);

  const categories = ['all', 'Necklace', 'Ring', 'Earrings', 'Bracelet', 'Pendant', 'Set', 'Bangle'];
  const collections = ['all', 'Classic', 'Premium', 'Luxury'];

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filters.category === 'all' || product.category === filters.category;
        const matchesCollection = filters.collection === 'all' || product.collection === filters.collection;
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

        return matchesSearch && matchesCategory && matchesCollection && matchesPrice;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [allProducts, filters, searchQuery]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.collection !== 'all') count++;
    if (filters.priceRange[1] < 200000) count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [filters, searchQuery]);

  const clearAllFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-[#2C2A29] font-sans antialiased">
      {/* Hero Section */}
      <Hero
        title="Our Masterpiece Gallery"
        subtitle="Explore our meticulously crafted jewelry lines designed for sophisticated elegance and timeless celebration."
        image={backgroud}
      />

      {/* Main Boutique Section */}
      <section ref={productsRef} className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Filter & Bar Header */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#E8DFC8]">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C6D2B] font-semibold">
                Collection View
              </p>
              <p className="text-sm text-[#6B655F]">
                Showing <span className="font-serif font-bold text-[#2C2A29]">{filteredProducts.length}</span> items
              </p>
            </div>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="relative flex items-center gap-2 px-5 py-2.5 bg-[#2C2A29] text-[#FAF8F5] rounded-full text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 transition"
            >
              <FiSliders className="w-4 h-4 text-[#C5A059]" /> 
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 bg-[#C5A059] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            
            {/* Desktop Modern Glassmorphic Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#E8DFC8] shadow-xl shadow-stone-200/50 space-y-7">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-4">
                  <div className="flex items-center gap-2">
                    <FiSliders className="text-[#C5A059]" />
                    <h3 className="font-serif text-lg font-bold text-[#2C2A29]">Refine By</h3>
                  </div>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-1 text-xs text-[#8C6D2B] hover:text-[#2C2A29] font-medium tracking-wide transition uppercase"
                    >
                      <FiRotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                {/* Search Bar */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#8C6D2B] mb-2">
                    Search Piece
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A37E36] w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or gem..."
                      className="w-full pl-10 pr-8 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition text-[#2C2A29]"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category List */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#8C6D2B] mb-2">
                    Jewelry Category
                  </label>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const isActive = filters.category === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setFilters({ ...filters, category: cat })}
                          className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-[#2C2A29] text-[#FAF8F5] shadow-sm'
                              : 'text-[#6B655F] hover:bg-[#FAF8F5] hover:text-[#2C2A29]'
                          }`}
                        >
                          <span className="capitalize">{cat === 'all' ? 'All Jewelry' : cat}</span>
                          {isActive && <FiCheck className="w-3.5 h-3.5 text-[#C5A059]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Collection Line */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#8C6D2B] mb-2">
                    Collection Tier
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {collections.map((col) => {
                      const isActive = filters.collection === col;
                      return (
                        <button
                          key={col}
                          onClick={() => setFilters({ ...filters, collection: col })}
                          className={`py-2 px-3 rounded-xl text-xs font-medium transition text-center border ${
                            isActive
                              ? 'bg-[#C5A059] text-white border-[#C5A059] shadow-sm'
                              : 'bg-white border-[#E8DFC8] text-[#6B655F] hover:border-[#C5A059]'
                          }`}
                        >
                          {col === 'all' ? 'All Tiers' : col}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dual Price Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#8C6D2B]">
                      Max Price
                    </label>
                    <span className="text-xs font-serif font-bold text-[#2C2A29]">
                      ₹{filters.priceRange[1].toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="200000"
                    step="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                      })
                    }
                    className="w-full accent-[#C5A059] cursor-pointer bg-[#E8DFC8] h-1.5 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-[#A37E36] font-medium mt-1">
                    <span>₹20,000</span>
                    <span>₹2,00,000+</span>
                  </div>
                </div>

                {/* Sort Option */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#8C6D2B] mb-2">
                    Sort Arrangement
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  >
                    <option value="newest">New Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Main Products Grid Column */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Desktop Bar Display */}
              <div className="hidden lg:flex justify-between items-center bg-white/85 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#E8DFC8] shadow-sm">
                <div className="flex items-center gap-2">
                  <FiGrid className="text-[#C5A059]" />
                  <p className="text-xs text-[#6B655F]">
                    Displaying <span className="font-serif font-bold text-[#2C2A29]">{filteredProducts.length}</span> curated pieces
                  </p>
                </div>

                {/* Active Filter Chips */}
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold text-[#8C6D2B]">Active:</span>
                    {filters.category !== 'all' && (
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8DFC8] text-[#2C2A29]">
                        {filters.category}
                        <FiX className="cursor-pointer text-[#8C6D2B]" onClick={() => setFilters({ ...filters, category: 'all' })} />
                      </span>
                    )}
                    {filters.collection !== 'all' && (
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8DFC8] text-[#2C2A29]">
                        {filters.collection}
                        <FiX className="cursor-pointer text-[#8C6D2B]" onClick={() => setFilters({ ...filters, collection: 'all' })} />
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Grid Render */}
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.35 }}
                      >
                        <ProductCard
                          product={product}
                          onClick={() => setSelectedProduct(product)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 bg-white rounded-3xl border border-[#E8DFC8] p-8 shadow-sm flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center text-[#C5A059] text-2xl">
                    <FiPackage />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2C2A29]">No Masterpieces Found</h3>
                  <p className="text-xs text-[#6B655F] max-w-sm">
                    We could not find any jewelry matching your exact selection. Try resetting filters or expanding your price point.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-[#2C2A29] text-[#FAF8F5] rounded-full text-xs font-semibold tracking-wider hover:bg-[#8C6D2B] transition shadow-md flex items-center gap-2"
                  >
                    <FiRotateCcw /> Reset Selection
                  </button>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Mobile Glass Drawer Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative z-10 w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC8]">
                  <h3 className="font-serif text-lg font-bold text-[#2C2A29]">Filters & Options</h3>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 text-[#6B655F] hover:text-[#2C2A29] rounded-full bg-[#FAF8F5]"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6D2B] mb-2">Search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gallery..."
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-[#2C2A29]"
                  />
                </div>

                {/* Mobile Categories */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6D2B] mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs text-[#2C2A29]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Jewelry Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Collections */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6D2B] mb-2">Collection Tier</label>
                  <select
                    value={filters.collection}
                    onChange={(e) => setFilters({ ...filters, collection: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs text-[#2C2A29]"
                  >
                    {collections.map((col) => (
                      <option key={col} value={col}>
                        {col === 'all' ? 'All Tiers' : col}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Price Range */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D2B]">Max Price</label>
                    <span className="text-xs font-serif font-bold text-[#2C2A29]">
                      ₹{filters.priceRange[1].toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="200000"
                    step="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                      })
                    }
                    className="w-full accent-[#C5A059]"
                  />
                </div>

                {/* Mobile Sort */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6D2B] mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs text-[#2C2A29]"
                  >
                    <option value="newest">New Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Drawer Controls */}
              <div className="pt-6 border-t border-[#E8DFC8] flex gap-3">
                <button
                  onClick={clearAllFilters}
                  className="w-1/2 py-3 border border-[#E8DFC8] rounded-full text-xs font-semibold text-[#6B655F]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-3 bg-[#2C2A29] text-[#FAF8F5] rounded-full text-xs font-semibold shadow-md flex items-center justify-center gap-1"
                >
                  Apply ({filteredProducts.length}) <FiChevronRight />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};