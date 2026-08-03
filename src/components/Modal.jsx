import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Box Container */}
          <motion.div
            className="relative bg-[#FAF8F5] rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-[#E8DFC8] z-10 flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8DFC8] z-20">
              <h2 className="text-xl font-serif font-bold text-[#2C2A29]">
                {title}
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 text-[#6B655F] hover:text-[#2C2A29] bg-white hover:bg-[#F3EFE6] rounded-full border border-[#E8DFC8] transition-all shadow-sm"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const fallbackImage =
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick View">
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Image (5 Grid Columns) */}
          <motion.div
            className="md:col-span-5 bg-[#F3EFE6] rounded-2xl overflow-hidden aspect-square relative shadow-inner flex items-center justify-center p-3 border border-[#E8DFC8]"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.img
              src={product?.image || fallbackImage}
              alt={product?.name || 'Jewellery Piece'}
              className="w-full h-full object-cover rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            {/* Badge */}
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-[#8C6D2B] uppercase bg-white/90 backdrop-blur-md rounded-full border border-[#C5A059]/30 shadow-sm">
              ✦ {product?.collection || 'Haute Joaillerie'}
            </span>
          </motion.div>

          {/* Right Column: Product Info & Actions (7 Grid Columns) */}
          <motion.div
            className="md:col-span-7 flex flex-col justify-between h-full"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              {/* Category */}
              <motion.p
                className="text-[11px] text-[#8C6D2B] font-bold mb-1 uppercase tracking-[0.2em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {product?.category || 'Fine Jewellery'}
              </motion.p>

              {/* Title - Clean Break and Wraps Smoothly */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2A29] mb-2 leading-tight break-words">
                {product?.name || 'Exquisite Piece'}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#6B655F] leading-relaxed font-light mb-5 break-words">
                {product?.description ||
                  'Crafted with precision, rare gems, and timeless elegance.'}
              </p>

              {/* Specifications Block */}
              <motion.div
                className="bg-[#F3EFE6]/70 rounded-xl p-3.5 border border-[#E8DFC8] mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-[10px] font-bold text-[#8C6D2B] uppercase tracking-widest mb-2">
                  Product Specifications
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product?.specs && product.specs.length > 0 ? (
                    product.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between border-b border-[#E8DFC8]/50 pb-1">
                        <span className="text-[#6B655F]">{spec.label}</span>
                        <span className="font-semibold text-[#2C2A29]">{spec.value}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-[#6B655F]">Purity:</span>
                        <span className="font-semibold text-[#2C2A29]">22K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B655F]">Weight:</span>
                        <span className="font-semibold text-[#2C2A29]">5g</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Price & Rating Row */}
              <motion.div
                className="mb-5 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <span className="text-[10px] text-[#8C6D2B] block uppercase tracking-wider font-semibold">
                    Price
                  </span>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2A29]">
                    ₹{product?.price ? product.price.toLocaleString() : '0'}
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#E8DFC8] shadow-sm">
                  <span className="text-[#C5A059] text-xs">★</span>
                  <span className="text-xs font-semibold text-[#2C2A29]">
                    {product?.rating || '4.8'}
                  </span>
                  <span className="text-[11px] text-[#6B655F]">/ 5</span>
                </div>
              </motion.div>

              {/* Quantity Selector */}
              <motion.div
                className="mb-6 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#2C2A29]">
                  Quantity:
                </p>
                <div className="flex items-center border border-[#E8DFC8] rounded-xl bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-[#2C2A29] hover:bg-[#F3EFE6] transition-colors font-bold text-sm"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-semibold text-xs text-[#2C2A29]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-[#2C2A29] hover:bg-[#F3EFE6] transition-colors font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => onAddToCart && onAddToCart(product, quantity)}
                className="w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A37E36] hover:brightness-105 shadow-[0_4px_16px_rgba(197,160,89,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>

              <motion.button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all duration-300 flex items-center justify-center gap-2 ${
                  isFavorite
                    ? 'bg-[#C5A059]/10 text-[#8C6D2B] border-[#C5A059]'
                    : 'bg-white text-[#2C2A29] border-[#E8DFC8] hover:border-[#C5A059] hover:text-[#8C6D2B]'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{isFavorite ? '❤️' : '🤍'}</span>
                {isFavorite ? 'Added to Wishlist' : 'Add to Wishlist'}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </Modal>
  );
};