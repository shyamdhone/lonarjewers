import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHoverAnimation } from '../hooks/useAnimation';

export const ProductCard = ({ product, onClick }) => {
  const hoverRef = useHoverAnimation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback placeholder if image path fails or takes time to load
  const fallbackImage =
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop';
  const displayImage =
    imageError || !product?.image ? fallbackImage : product.image;

  // Preload image to guarantee immediate visibility on mount
  useEffect(() => {
    if (!product?.image) return;
    const img = new Image();
    img.src = product.image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [product?.image]);

  return (
    <motion.div
      ref={hoverRef}
      data-reveal
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E8DFC8] hover:border-[#C5A059] shadow-sm hover:shadow-[0_16px_36px_rgba(197,160,89,0.18)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Header / Image Container */}
      <div className="relative aspect-[4/5] w-full bg-[#F3EFE6] overflow-hidden">
        {/* Skeleton Loader Overlay */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#F3EFE6] via-[#E8DFC8] to-[#F3EFE6] animate-pulse z-10" />
        )}

        <img
          src={displayImage}
          alt={product?.name || 'Jewellery Masterpiece'}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Soft Warm Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-black/10 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

        {/* Top Badges (Glassmorphic Light Theme) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          {/* Collection Badge */}
          <span className="px-3 py-1 text-[10px] font-semibold tracking-widest text-[#8C6D2B] uppercase bg-white/80 backdrop-blur-md rounded-full border border-[#C5A059]/30 shadow-sm">
            {product?.collection || 'Haute Joaillerie'}
          </span>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E8DFC8] shadow-sm">
            <span className="text-[#C5A059] text-xs">★</span>
            <span className="text-[11px] font-semibold text-[#2C2A29]">
              {product?.rating || '5.0'}
            </span>
          </div>
        </div>

        {/* Quick Favorite Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute bottom-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-sm ${
            isFavorite
              ? 'bg-[#C5A059] text-white border-[#C5A059] shadow-[0_4px_12px_rgba(197,160,89,0.4)]'
              : 'bg-white/80 text-[#2C2A29] border-[#E8DFC8] hover:border-[#C5A059] hover:text-[#C5A059]'
          }`}
          aria-label="Add to Favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </motion.button>
      </div>

      {/* Product Information Section (Cream White Background) */}
      <div className="p-5 flex flex-col justify-between flex-grow bg-[#FAF8F5]">
        <div>
          {/* Category */}
          <p className="text-[10px] font-bold text-[#8C6D2B] tracking-[0.2em] uppercase mb-1">
            {product?.category || 'Fine Jewellery'}
          </p>

          {/* Title */}
          <h3 className="text-base font-serif text-[#2C2A29] group-hover:text-[#8C6D2B] transition-colors duration-300 line-clamp-1 mb-1.5 font-medium">
            {product?.name || 'Exquisite Piece'}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#6B655F] line-clamp-2 font-light leading-relaxed mb-4">
            {product?.description ||
              'Crafted with precision and timeless elegance.'}
          </p>
        </div>

        <div>
          {/* Subtle Warm Divider */}
          <div className="h-px w-full bg-gradient-to-r from-[#C5A059]/40 via-[#E8DFC8] to-transparent mb-3.5" />

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-2">
            <div>
              {product?.originalPrice && (
                <p className="text-[11px] text-[#A0988E] line-through font-light">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
              )}
              <p className="text-lg font-serif font-bold text-[#2C2A29]">
                ₹{product?.price ? product.price.toLocaleString() : '0'}
              </p>
            </div>

            {/* Quick View Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A37E36] hover:brightness-105 shadow-[0_4px_12px_rgba(197,160,89,0.25)] transition-all duration-300"
            >
              Quick View
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};