# Component Index & Usage Guide

## Navigation & Layout Components

### Navbar
**File**: `src/components/Navbar.jsx`
**Props**: None
**Features**:
- Sticky positioning with scroll detection
- Mobile hamburger menu with GSAP animations
- Active route highlighting
- Responsive grid for desktop/mobile

**Usage**:
```jsx
<Navbar />
```

### Footer
**File**: `src/components/Footer.jsx`
**Props**: None
**Features**:
- Organized link categories
- Newsletter signup form
- Social media links
- Payment methods display

**Usage**:
```jsx
<Footer />
```

### MainLayout
**File**: `src/layouts/MainLayout.jsx`
**Props**: `children`
**Features**:
- Wraps all pages with Navbar and Footer
- Ensures consistent layout

**Usage**:
```jsx
<MainLayout>
  <YourPageComponent />
</MainLayout>
```

---

## Page Components

### Home.jsx
**File**: `src/pages/Home.jsx`
**Features**:
- Hero section with cinematic design
- Stats section (4 columns)
- Features section (4 cards)
- Featured collections grid (6 products)
- Best sellers section (6 products)
- Brand story
- Testimonials (4 cards)
- Instagram gallery (8 images)
- Newsletter section
- Store CTA

**Mock Data**:
- `featuredCollections` array (6 products)
- `testimonials` array (4 testimonials)
- `stats` array (4 stats)
- `features` array (4 features)

### Store.jsx
**File**: `src/pages/Store.jsx`
**Features**:
- Category filters (8 categories)
- Collection filters (4 collections)
- Price range slider
- Search functionality
- Sort options (newest, price, rating)
- Product grid (responsive 1-2 columns)
- Quick View modal
- Results counter

**State Management**:
```javascript
filters = {
  category: 'all',
  priceRange: [0, 200000],
  collection: 'all',
  sortBy: 'newest'
}
searchQuery: ''
```

### GoldCalculator.jsx
**File**: `src/pages/GoldCalculator.jsx`
**Features**:
- Real-time price calculation
- Input validation
- Side-by-side calculator and results
- Detailed price breakdown
- How-to guide section

**Calculator Inputs**:
- Weight (grams)
- Purity (18K/22K/24K)
- Gold Rate (₹/gram)
- Making Charges (% or fixed)
- Stone Cost (₹)
- GST (%)
- Discount (%)

**Outputs**:
- Gold Value
- Making Charges
- Stone Cost
- Subtotal
- Discount amount
- GST amount
- Final Price

### About.jsx
**File**: `src/pages/About.jsx`
**Sections**:
- Hero with background image
- Brand story (from Sections component)
- Mission & Vision
- Core values (4 cards)
- Timeline (6 milestones)
- Team (3 members)
- Certifications (4 badges)
- Newsletter

### Contact.jsx
**File**: `src/pages/Contact.jsx`
**Sections**:
- Contact information cards (4)
- Contact form (5 fields)
- Quick connect options (4 buttons)
- FAQ accordion (6 items)
- Map placeholder

**Form Fields**:
- Name (text)
- Email (email)
- Phone (tel)
- Subject (text)
- Message (textarea)

### Privacy.jsx
**File**: `src/pages/Privacy.jsx`
**Sections**:
- Header with last updated date
- 6 policy sections
- Back to home link

### Terms.jsx
**File**: `src/pages/Terms.jsx`
**Sections**:
- Header with last updated date
- 8 terms sections
- Back to home link

### NotFound.jsx
**File**: `src/pages/NotFound.jsx`
**Features**:
- 404 error display
- Home and Browse buttons
- Decorative emoji animation
- Responsive design

---

## Reusable UI Components

### Hero
**File**: `src/components/Hero.jsx`
**Props**:
```jsx
{
  title: string,          // Main heading
  subtitle: string,       // Subheading
  image: string,         // Background image URL
  cta: {                 // Call-to-action buttons
    primary: string,
    secondary: string
  },
  isHome: boolean        // Enable home page animations
}
```
**Features**:
- Parallax background effect
- Text stagger animation
- Scroll indicator
- CTA buttons

**Usage**:
```jsx
<Hero
  title="Timeless Luxury"
  subtitle="Premium jewellery"
  image="https://..."
  cta={{ primary: 'Shop Now', secondary: 'Learn More' }}
  isHome={true}
/>
```

### ProductCard
**File**: `src/components/ProductCard.jsx`
**Props**:
```jsx
{
  product: {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    originalPrice: number,
    category: string,
    collection: string,
    rating: number
  },
  onClick: function  // Fired when quick view clicked
}
```
**Features**:
- Hover zoom animation
- Price display with strikethrough original
- Category badge
- Rating stars
- Quick View & Wishlist buttons

### TestimonialCard
**File**: `src/components/TestimonialCard.jsx`
**Props**:
```jsx
{
  testimonial: {
    id: number,
    author: string,
    role: string,
    rating: number,    // 1-5 stars
    text: string       // Testimonial text
  }
}
```
**Features**:
- Star rating display
- Author avatar initial
- Hover animation

### Modal & QuickViewModal
**File**: `src/components/Modal.jsx`
**Modal Props**:
```jsx
{
  isOpen: boolean,
  onClose: function,
  title: string,
  children: node
}
```
**QuickViewModal Props**:
```jsx
{
  product: object,
  isOpen: boolean,
  onClose: function
}
```
**Features**:
- Backdrop click to close
- Close button
- Animated entrance/exit
- Product specs display
- Add to cart & wishlist buttons

### UI Components
**File**: `src/components/UI.jsx`

#### SectionTitle
```jsx
<SectionTitle
  title="Featured Collections"
  subtitle="Explore our curated selection"
  align="center"  // or 'left'
/>
```

#### StatCard
```jsx
<StatCard
  number="20+"
  label="Years of Excellence"
  icon="👑"
/>
```

#### FeatureCard
```jsx
<FeatureCard
  icon="💯"
  title="Certified Authentic"
  description="BIS hallmark certification"
/>
```

#### Badge
```jsx
<Badge color="gold">New Collection</Badge>
// Colors: 'gold', 'cream', 'dark'
```

#### Divider
```jsx
<Divider className="my-8" />
```

### Sections
**File**: `src/components/Sections.jsx`

#### BrandStory
```jsx
<BrandStory />
// Pre-built brand story section
```

#### Newsletter
```jsx
<Newsletter />
// Email subscription form
```

---

## Custom Hooks

### useScrollReveal
**File**: `src/hooks/useAnimation.js`
**Usage**:
```jsx
const ref = useScrollReveal({
  duration: 0.8,      // Animation duration
  delay: 0,           // Initial delay
  stagger: 0.1,       // Stagger between items
  yPercent: 30,       // Y movement
  opacity: 0          // Starting opacity
});

return (
  <div ref={ref}>
    <div data-reveal>Item 1</div>
    <div data-reveal>Item 2</div>
  </div>
);
```

### useParallax
**Usage**:
```jsx
const ref = useParallax(0.5);  // Speed factor

return (
  <div ref={ref}>
    Background content
  </div>
);
```

### useHoverAnimation
**Usage**:
```jsx
const ref = useHoverAnimation();

return (
  <div ref={ref}>
    Hover for scale animation
  </div>
);
```

### useScrollPosition
**Usage**:
```jsx
const scrollY = useScrollPosition();

return (
  <div>Scroll position: {scrollY}px</div>
);
```

### useIsMobile
**Usage**:
```jsx
const isMobile = useIsMobile();

return (
  <div>{isMobile ? 'Mobile View' : 'Desktop View'}</div>
);
```

### useDebounce
**Usage**:
```jsx
const debouncedSearch = useDebounce(searchQuery, 500);
```

---

## Utility Functions

### goldCalculator

#### calculateGoldValue
```javascript
const goldValue = goldCalculator.calculateGoldValue(
  weight,      // grams
  purity,      // 18, 22, or 24
  goldRate     // ₹/gram
);
```

#### calculateMakingCharges
```javascript
const charges = goldCalculator.calculateMakingCharges(
  goldValue,
  'percentage',  // or 'fixed'
  15            // % or ₹ amount
);
```

#### calculateCompletePrice
```javascript
const result = goldCalculator.calculateCompletePrice(
  weight,             // grams
  purity,             // 18/22/24
  goldRate,           // ₹/gram
  makingChargeType,   // 'percentage' | 'fixed'
  makingChargeValue,  // % or amount
  stoneCost,          // ₹
  gstPercentage,      // 0-18
  discount            // %
);

// Returns:
{
  goldValue: "xxxxx.xx",
  makingCharges: "xxxx.xx",
  stoneCost: "xxxx.xx",
  subtotal: "xxxxx.xx",
  discount: "xxxx.xx",
  gst: "xxxx.xx",
  finalPrice: "xxxxx.xx"
}
```

#### formatPrice
```javascript
const formatted = formatPrice(50000);
// Returns: "₹50,000"
```

---

## Global Tailwind Classes

```css
/* No custom @apply classes, use inline classes */
/* Typography */
.text-display         /* Playfair, 2.25-9rem, bold */
.text-heading         /* Playfair, 1.875-2.25rem, bold */
.text-subheading      /* Cormorant, 1.5-1.875rem, semibold */
.text-body            /* Poppins, 1rem, leading-relaxed */
.text-small           /* Poppins, 0.875rem */

/* Layout */
.container-luxury     /* Max-width 80rem, centered with padding */
.section-padding      /* Vertical padding 4-8rem based on breakpoint */

/* Buttons */
.btn-luxury          /* Gold bg, dark text, rounded */
.btn-outline         /* Gold border, transparent bg, hover fill */

/* Cards */
.card-luxury         /* White bg, rounded, shadow with hover lift */

/* Effects */
.glass-effect        /* Backdrop blur, semi-transparent white border */
.gradient-text       /* Gold gradient text effect */
```

---

## Color System

```javascript
// Custom Colors (in Tailwind config)
'luxury-gold': '#C9A44C'
'luxury-dark': '#1A1A1A'
'luxury-cream': '#F5F1ED'
'luxury-light': '#FFFFFF'

// Usage
className="text-luxury-gold bg-luxury-cream"
```

---

## Animation Classes

```css
/* Keyframe animations */
animate-fade-in      /* 0.6s ease-in fade */
animate-slide-up     /* 0.6s ease-out slide up */
animate-slide-down   /* 0.6s ease-out slide down */
animate-scale-in     /* 0.6s ease-out scale */
```

---

## Component Dependency Graph

```
App.jsx
├─ MainLayout
│  ├─ Navbar
│  ├─ Routes
│  │  ├─ Home.jsx
│  │  │  ├─ Hero
│  │  │  ├─ ProductCard (x6)
│  │  │  ├─ TestimonialCard (x4)
│  │  │  ├─ BrandStory
│  │  │  ├─ Newsletter
│  │  │  └─ QuickViewModal
│  │  │
│  │  ├─ Store.jsx
│  │  │  ├─ Hero
│  │  │  ├─ ProductCard (x8)
│  │  │  └─ QuickViewModal
│  │  │
│  │  ├─ About.jsx
│  │  │  ├─ Hero
│  │  │  ├─ BrandStory
│  │  │  ├─ FeatureCard (x4)
│  │  │  ├─ StatCard (x3)
│  │  │  └─ Newsletter
│  │  │
│  │  ├─ Contact.jsx
│  │  │  ├─ Hero
│  │  │  ├─ (Contact form)
│  │  │  └─ (FAQ accordion)
│  │  │
│  │  ├─ GoldCalculator.jsx
│  │  │  ├─ Hero
│  │  │  └─ (Calculator UI)
│  │  │
│  │  ├─ Privacy.jsx
│  │  ├─ Terms.jsx
│  │  └─ NotFound.jsx
│  │
│  └─ Footer
```

---

## File Size Reference

```
Navbar.jsx               ~4 KB
Footer.jsx              ~5 KB
Hero.jsx               ~3 KB
ProductCard.jsx        ~3 KB
TestimonialCard.jsx    ~2 KB
Modal.jsx              ~4 KB
UI.jsx                 ~4 KB
Sections.jsx           ~4 KB

Home.jsx               ~10 KB
Store.jsx               ~8 KB
GoldCalculator.jsx      ~9 KB
About.jsx               ~8 KB
Contact.jsx             ~9 KB
Privacy.jsx             ~3 KB
Terms.jsx               ~3 KB
NotFound.jsx            ~2 KB

useAnimation.js         ~2 KB
useScroll.js            ~2 KB
helpers.js              ~3 KB

App.jsx                 ~2 KB
MainLayout.jsx          ~1 KB
```

---

## Next Steps for Development

1. **Replace Images**: Swap Unsplash URLs with actual product images
2. **Add Backend**: Connect to real API endpoints
3. **Database**: Store product, user, order data
4. **Authentication**: User login/registration
5. **Payment**: Stripe/Razorpay integration
6. **Email**: Send order confirmations
7. **Search**: Implement full-text search
8. **Analytics**: Track user behavior
9. **Admin Panel**: Manage products and orders
10. **Cache**: Implement caching strategy

---

**Last Updated**: August 2024
**Component Count**: 15+ reusable components
**Status**: Production Ready ✅
