import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/UI';
import { useScrollReveal } from '../hooks/useAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Filler
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Sparkles,
  Printer,
  Share2,
  Copy,
  Check,
  Phone,
  Calendar,
  MessageSquare,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  ShieldCheck,
  ChevronRight,
  Clock,
  CheckCircle2,
  HelpCircle,
  Coins,
  Calculator,
  ArrowRight,
  Info,
  Scale
} from 'lucide-react';
import cal from "../assets/images/cal.jpg";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Filler
);

// ==========================================
// DAILY RATE SETTINGS
// UPDATE THESE VALUES EVERY MORNING
// ==========================================
const DAILY_RATES = {
  date: "08 Aug 2026",
  lastUpdated: "10:30 AM",

  gold: {
    rate24K: 14990,
    rate22K: 13741,
    rate18K: 11243,
    autoCalculatePurityRates: false // Set true to derive 22K and 18K automatically from 24K
  },

  silver: {
    ratePerGram: 230
  },

  platinum: {
    enabled: true,
    ratePerGram: 4900
  }
};

// ==========================================
// RATE HISTORY
// ADD TODAY'S RATE AT THE END OF ARRAY
// ==========================================
const RATE_HISTORY = [
  { date: "02 Aug", rate24K: 14700, rate22K: 13610, rate18K: 11025, silver: 218 },
  { date: "03 Aug", rate24K: 14820, rate22K: 13720, rate18K: 11115, silver: 220 },
  { date: "04 Aug", rate24K: 14750, rate22K: 13650, rate18K: 11060, silver: 219 },
  { date: "05 Aug", rate24K: 14880, rate22K: 13780, rate18K: 11160, silver: 222 },
  { date: "06 Aug", rate24K: 14920, rate22K: 13820, rate18K: 11190, silver: 224 },
  { date: "07 Aug", rate24K: 14850, rate22K: 13750, rate18K: 11135, silver: 222 },

  // Latest updated market reference rates
  { date: "08 Aug", rate24K: 14990, rate22K: 13741, rate18K: 11243, silver: 232 }
];

// ==========================================
// DATA RETRIEVAL ABSTRACT LAYER
// ==========================================
const getDailyRates = () => {
  const rates = { ...DAILY_RATES };
  if (rates.gold.autoCalculatePurityRates && rates.gold.rate24K) {
    rates.gold.rate22K = Math.round((rates.gold.rate24K * 22) / 24);
    rates.gold.rate18K = Math.round((rates.gold.rate24K * 18) / 24);
  }
  return rates;
};

const getRateHistory = () => {
  return RATE_HISTORY;
};

// Helper function for Indian Rupee Formatting
const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

// Animated Number Counter Component
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 400;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value]);

  return <span>{formatINR(displayValue)}</span>;
};

// ==========================================
// LOCAL SUB-COMPONENTS
// ==========================================

// Daily Rate Card Component
const DailyRateCard = ({ title, purity, rate, iconColor = 'amber', highlight = false }) => {
  const price10g = rate * 10;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-3xl p-6 transition-all duration-300 border ${
        highlight
          ? 'bg-gradient-to-br from-amber-900/90 via-slate-900 to-amber-950 text-white border-amber-500/40 shadow-xl shadow-amber-950/20 ring-1 ring-amber-400/20'
          : 'bg-white text-slate-900 border-amber-100 shadow-lg shadow-slate-900/5'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
            highlight ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-amber-50 text-amber-800 border border-amber-200/60'
          }`}>
            {purity}
          </span>
          <h3 className={`text-xl font-serif font-bold mt-2 ${highlight ? 'text-amber-300' : 'text-slate-900'}`}>
            {title}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl ${highlight ? 'bg-amber-400/10 text-amber-400' : 'bg-amber-50 text-amber-700'}`}>
          <Coins className="w-6 h-6" />
        </div>
      </div>

      <div className="space-y-1 my-4">
        <div className="text-3xl font-serif font-bold tracking-tight">
          {formatINR(rate)} <span className="text-xs font-sans font-normal opacity-70">/ gram</span>
        </div>
        <div className={`text-sm font-medium ${highlight ? 'text-amber-200/80' : 'text-slate-500'}`}>
          10 Grams = <strong className={highlight ? 'text-white' : 'text-slate-800'}>{formatINR(price10g)}</strong>
        </div>
      </div>

      <div className={`pt-4 border-t flex items-center justify-between text-xs font-medium ${
        highlight ? 'border-amber-500/20 text-amber-300/80' : 'border-slate-100 text-slate-500'
      }`}>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Today's Official Rate
        </span>
        <span>Shreeji Jewellers</span>
      </div>
    </motion.div>
  );
};

// Silver Rate Card Component
const SilverRateCard = ({ rate }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-xl shadow-slate-950/20 relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-200 border border-slate-600">
            99.9% Fine Silver
          </span>
          <h3 className="text-2xl font-serif font-bold text-slate-100 mt-2">
            Silver Rate Today
          </h3>
        </div>
        <div className="p-3 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700">
          <Coins className="w-6 h-6" />
        </div>
      </div>

      <div className="text-3xl sm:text-4xl font-serif font-bold text-white my-3">
        {formatINR(rate)} <span className="text-xs font-sans font-normal text-slate-400">/ gram</span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 my-5 bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-700/60 text-center">
        <div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">10 Grams</div>
          <div className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">{formatINR(rate * 10)}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">100 Grams</div>
          <div className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">{formatINR(rate * 100)}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">1 Kilogram</div>
          <div className="text-sm sm:text-base font-bold text-amber-300 mt-0.5">{formatINR(rate * 1000)}</div>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        * Silver rate shown per gram. Final jewellery price may vary based on product design, making charges and applicable taxes.
      </p>
    </motion.div>
  );
};

// Quick Gold Rate Converter Tool
const QuickRateConverter = ({ rates }) => {
  const [weight, setWeight] = useState(10);
  const quickWeights = [1, 5, 10, 20, 50, 100];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xl shadow-amber-900/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Instant Estimator
          </span>
          <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
            Gold Weight Converter
          </h3>
        </div>
        <div className="p-3 bg-amber-50 rounded-2xl text-amber-700">
          <Scale className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
            Select or Enter Weight (Grams)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {quickWeights.map((w) => (
              <button
                key={w}
                onClick={() => setWeight(w)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  weight === w
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {w}g
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={weight || ''}
              onChange={(e) => setWeight(Math.max(0, parseFloat(e.target.value) || 0))}
              placeholder="Enter weight in grams"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
            <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">Grams</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-center">
            <div className="text-xs font-bold text-amber-900 uppercase">24K Gold (99.9%)</div>
            <div className="text-lg font-serif font-bold text-slate-900 mt-1">
              {formatINR((rates.gold.rate24K || 0) * weight)}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/60 text-center">
            <div className="text-xs font-bold text-amber-950 uppercase">22K Gold (91.6%)</div>
            <div className="text-lg font-serif font-bold text-amber-900 mt-1">
              {formatINR((rates.gold.rate22K || 0) * weight)}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center">
            <div className="text-xs font-bold text-slate-700 uppercase">18K Gold (75.0%)</div>
            <div className="text-lg font-serif font-bold text-slate-900 mt-1">
              {formatINR((rates.gold.rate18K || 0) * weight)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Silver Simple Calculator Tool
const SilverCalculator = ({ silverRate }) => {
  const [weight, setWeight] = useState(100);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            Silver Calculator
          </span>
          <h3 className="text-xl font-serif font-bold text-slate-100 mt-2">
            Calculate Silver Value
          </h3>
        </div>
        <Coins className="w-5 h-5 text-slate-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mt-4">
        <div className="md:col-span-7 space-y-2">
          <label className="text-xs font-medium text-slate-300 block">Enter Silver Weight (Grams)</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={weight || ''}
              onChange={(e) => setWeight(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400">g</span>
          </div>
        </div>

        <div className="md:col-span-5 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center md:text-right">
          <div className="text-xs text-slate-400 uppercase font-semibold">Total Silver Price</div>
          <div className="text-2xl font-serif font-bold text-amber-300 mt-1">
            {formatINR(weight * silverRate)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">@ {formatINR(silverRate)}/g</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const GoldCalculator = () => {
  const calculatorRef = useScrollReveal();
  const ctaRef = useRef(null);

  // Retrieve current configurations
  const dailyRates = useMemo(() => getDailyRates(), []);
  const rateHistory = useMemo(() => getRateHistory(), []);

  // Today vs Yesterday Calculations
  const trendMetrics = useMemo(() => {
    if (rateHistory.length < 2) {
      return { diff: 0, percent: 0, direction: 'neutral' };
    }
    const today = rateHistory[rateHistory.length - 1].rate24K;
    const yesterday = rateHistory[rateHistory.length - 2].rate24K;
    const diff = today - yesterday;
    const percent = ((diff / yesterday) * 100).toFixed(2);
    
    return {
      diff,
      percent: Math.abs(percent),
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral'
    };
  }, [rateHistory]);

  // Main Calculator Inputs State
  const [selectedPurity, setSelectedPurity] = useState(22); // 18, 22, or 24
  const [inputs, setInputs] = useState({
    weight: 10,
    makingChargeType: 'percentage', // 'percentage' or 'fixed'
    makingChargeValue: 10,
    stoneCost: 0,
    gstPercentage: 3,
    discount: 0
  });

  const [copied, setCopied] = useState(false);

  // Derive Gold Rate automatically based on selected purity
  const currentGoldRate = useMemo(() => {
    if (selectedPurity === 24) return dailyRates.gold.rate24K;
    if (selectedPurity === 18) return dailyRates.gold.rate18K;
    return dailyRates.gold.rate22K; // default 22K
  }, [selectedPurity, dailyRates]);

  // Number Input Sanitizer
  const handleNumericInputChange = (key, rawValue, min = 0, max = Infinity) => {
    const parsed = parseFloat(rawValue);
    if (isNaN(parsed)) {
      setInputs(prev => ({ ...prev, [key]: 0 }));
      return;
    }
    const clamped = Math.min(Math.max(parsed, min), max);
    setInputs(prev => ({ ...prev, [key]: clamped }));
  };

  // Main Jewellery Pricing Calculation
  const results = useMemo(() => {
    const weight = Math.max(0, inputs.weight || 0);
    const goldRate = currentGoldRate || 0;
    const stoneCost = Math.max(0, inputs.stoneCost || 0);
    const makingChargeVal = Math.max(0, inputs.makingChargeValue || 0);
    const discountPct = Math.min(Math.max(0, inputs.discount || 0), 100);
    const gstPct = Math.max(0, inputs.gstPercentage || 0);

    // Direct Rate * Weight calculation (no second purity multiplier)
    const goldValue = weight * goldRate;

    // Making Charges
    let makingCharges = 0;
    if (inputs.makingChargeType === 'percentage') {
      makingCharges = (goldValue * makingChargeVal) / 100;
    } else {
      makingCharges = makingChargeVal * weight;
    }

    const subtotal = goldValue + makingCharges + stoneCost;
    const discountAmount = (subtotal * discountPct) / 100;
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const gstAmount = (discountedSubtotal * gstPct) / 100;
    const finalPrice = Math.round(discountedSubtotal + gstAmount);

    return {
      goldValue: Math.round(goldValue),
      makingCharges: Math.round(makingCharges),
      stoneCost: Math.round(stoneCost),
      subtotal: Math.round(subtotal),
      discountAmount: Math.round(discountAmount),
      gst: Math.round(gstAmount),
      finalPrice
    };
  }, [inputs, currentGoldRate]);

  // Chart Data: Breakdown Doughnut
  const chartData = useMemo(() => ({
    labels: ['Gold Value', 'Making Charges', 'Stone Cost', 'GST'],
    datasets: [
      {
        data: [
          results.goldValue || 0,
          results.makingCharges || 0,
          results.stoneCost || 0,
          results.gst || 0
        ],
        backgroundColor: [
          '#D4AF37', // Luxury Muted Gold
          '#1E293B', // Charcoal
          '#94A3B8', // Slate
          '#CBD5E1'  // Light Slate
        ],
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderWidth: 2,
        hoverOffset: 6
      }
    ]
  }), [results]);

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'sans-serif', size: 12 },
          color: '#334155',
          usePointStyle: true,
          padding: 14
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${formatINR(context.raw)}`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  // Chart Data: Rate History Trend Line
  const trendChartData = useMemo(() => ({
    labels: rateHistory.map(item => item.date),
    datasets: [
      {
        fill: true,
        label: '24K Gold Rate (₹/g)',
        data: rateHistory.map(item => item.rate24K),
        borderColor: '#B45309',
        backgroundColor: 'rgba(217, 119, 6, 0.08)',
        tension: 0.35,
        pointBackgroundColor: '#B45309',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }), [rateHistory]);

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` 24K Rate: ₹${context.raw}/g`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.8)' },
        ticks: { callback: (val) => `₹${val}` }
      }
    }
  };

  // GSAP CTA animation
  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
        }
      );
    }
  }, []);

  // Format Copy/Share Text
  const getSummaryText = () => {
    return `*Anand Jewellers - Jewellery Price Estimate*
Date: ${dailyRates.date}
Purity: ${selectedPurity}K Gold
Weight: ${inputs.weight}g
Gold Rate: ${formatINR(currentGoldRate)}/g

• Gold Value: ${formatINR(results.goldValue)}
• Making Charges: ${formatINR(results.makingCharges)}
${results.stoneCost > 0 ? `• Stone Charges: ${formatINR(results.stoneCost)}\n` : ''}${results.discountAmount > 0 ? `• Discount: -${formatINR(results.discountAmount)}\n` : ''}• GST (${inputs.gstPercentage}%): ${formatINR(results.gst)}
*Estimated Total: ${formatINR(results.finalPrice)}*

Note: Please confirm the final price with Anand Jewellers before purchase.`;
  };

  // Action Handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(getSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getSummaryText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen text-slate-800 selection:bg-amber-200">
      
      {/* Printable Estimate Header (Hidden on screen) */}
      <div className="hidden print:block p-8 bg-white text-slate-900 border-b">
        <h1 className="text-3xl font-serif font-bold">Shreeji jewellery</h1>
        <p className="text-sm text-slate-600">Official Jewellery Price Estimate</p>
        <div className="mt-4 text-xs text-slate-500">
          Date: {dailyRates.date} • Rate Updated: {dailyRates.lastUpdated}
        </div>
      </div>

      {/* Printable Area styling wrapper */}
      <div className="print:p-6 print:bg-white">

        {/* Hero Section */}
        <div className="print:hidden">
          <Hero
            title="Today's Gold & Silver Rates"
            subtitle="Transparent daily rates and instant jewellery price calculator from Anand Jewellers"
            image={cal}
          />
        </div>

        {/* Top Rate Header Banner */}
        <section className="py-8 bg-gradient-to-b from-amber-900/5 via-amber-900/10 to-transparent border-b border-amber-200/40">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-amber-200/80 shadow-lg shadow-amber-950/5">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Today's Rates
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Official Reference Rates
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {dailyRates.date}
                </h2>
                <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  Last Updated: <span className="text-slate-900">{dailyRates.lastUpdated}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 max-w-md">
                <p className="text-xs text-amber-950 font-medium leading-relaxed flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>Rates are displayed reference values for today and may change during the day based on market movements.</span>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* DAILY RATES CARDS SECTION */}
        <section className="py-12 sm:py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/60">
                Gold Rates Today
              </span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mt-2">
                Live Daily Gold Standard
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DailyRateCard
                title="24K Gold"
                purity="99.9% Pure"
                rate={dailyRates.gold.rate24K}
              />
              <DailyRateCard
                title="22K Gold"
                purity="91.6% Pure"
                rate={dailyRates.gold.rate22K}
                highlight={true}
              />
              <DailyRateCard
                title="18K Gold"
                purity="75.0% Pure"
                rate={dailyRates.gold.rate18K}
              />
            </div>
          </div>
        </section>

        {/* SILVER & PLATINUM SECTION */}
        <section className="py-6 pb-12">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 ${dailyRates.platinum?.enabled ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6`}>
              
              <div className={dailyRates.platinum?.enabled ? 'lg:col-span-8' : 'w-full'}>
                <SilverRateCard rate={dailyRates.silver.ratePerGram} />
              </div>

              {dailyRates.platinum?.enabled && (
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                      Rare Metal
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mt-3">
                      Platinum Rate
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">95.0% Pure Platinum Jewellery</p>
                  </div>

                  <div className="my-6">
                    <div className="text-3xl font-serif font-bold text-slate-900">
                      {formatINR(dailyRates.platinum.ratePerGram)} <span className="text-xs font-sans font-normal text-slate-500">/ gram</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 mt-1">
                      10 Grams = {formatINR(dailyRates.platinum.ratePerGram * 10)}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span>Anand Jewellers Standard</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* RATE SUMMARY STRIP (Mobile Optimized) */}
        <section className="py-4 bg-slate-900 text-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 py-2 text-xs sm:text-sm">
              <span className="font-serif font-bold text-amber-400 uppercase tracking-wider text-xs">
                Today's Snapshot
              </span>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 font-medium">
                <div>24K: <strong className="text-amber-300">{formatINR(dailyRates.gold.rate24K)}/g</strong></div>
                <div>22K: <strong className="text-amber-300">{formatINR(dailyRates.gold.rate22K)}/g</strong></div>
                <div>18K: <strong className="text-amber-300">{formatINR(dailyRates.gold.rate18K)}/g</strong></div>
                <div>Silver: <strong className="text-slate-200">{formatINR(dailyRates.silver.ratePerGram)}/g</strong></div>
              </div>

              <div className="text-[11px] text-slate-400 font-sans">
                Updated: {dailyRates.lastUpdated}
              </div>
            </div>
          </div>
        </section>

        {/* MARKET TREND & HISTORY SECTION */}
        <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Trend Chart (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      Rate Movement
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mt-2">
                      7-Day Gold Rate Trend
                    </h3>
                  </div>

                  {/* Today vs Yesterday Badge */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Today vs Yesterday</div>
                      <div className="text-xs font-bold text-slate-800">
                        {trendMetrics.diff >= 0 ? `+${formatINR(trendMetrics.diff)}/g` : `-${formatINR(Math.abs(trendMetrics.diff))}/g`}
                      </div>
                    </div>
                    <div className={`p-2 rounded-xl flex items-center justify-center ${
                      trendMetrics.direction === 'up' ? 'bg-emerald-100 text-emerald-800' : trendMetrics.direction === 'down' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {trendMetrics.direction === 'up' && <TrendingUp className="w-4 h-4" />}
                      {trendMetrics.direction === 'down' && <TrendingDown className="w-4 h-4" />}
                      {trendMetrics.direction === 'neutral' && <Minus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/70 p-4 sm:p-6 rounded-3xl border border-slate-200/80 h-72 shadow-inner">
                  <Line data={trendChartData} options={trendChartOptions} />
                </div>
                <div className="text-right text-[11px] text-slate-400 font-medium">
                  Source: Anand Jewellers Rate History
                </div>
              </div>

              {/* Rate History Table (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Recent Rate History
                </h3>

                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                  <div className="max-h-72 overflow-y-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-200/60 sticky top-0 font-bold text-slate-700">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">24K</th>
                          <th className="p-3">22K</th>
                          <th className="p-3">18K</th>
                          <th className="p-3">Silver</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 font-medium text-slate-800">
                        {[...rateHistory].reverse().map((row, idx) => (
                          <tr key={idx} className={idx === 0 ? 'bg-amber-50/80 font-bold' : 'hover:bg-slate-100/50'}>
                            <td className="p-3 flex items-center gap-1">
                              {row.date}
                              {idx === 0 && <span className="text-[9px] bg-amber-600 text-white px-1.5 py-0.2 rounded">Today</span>}
                            </td>
                            <td className="p-3">₹{row.rate24K}</td>
                            <td className="p-3">₹{row.rate22K}</td>
                            <td className="p-3">₹{row.rate18K}</td>
                            <td className="p-3">₹{row.silver}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MAIN JEWELLERY CALCULATOR SECTION */}
        <section ref={calculatorRef} className="py-12 sm:py-20 bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300/80">
                <Calculator className="w-3.5 h-3.5 text-amber-700" /> Precise Valuation Tool
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
                Calculate Jewellery Price
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Estimate your exact jewellery cost instantly using today's official Anand Jewellers rates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Calculator Inputs (7 Cols) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-xl shadow-amber-900/5"
              >
                
                {/* Purity Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    1. Select Gold Purity
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { kt: 18, label: '18K', sub: '75.0% Pure', rate: dailyRates.gold.rate18K },
                      { kt: 22, label: '22K', sub: '91.6% Pure', rate: dailyRates.gold.rate22K },
                      { kt: 24, label: '24K', sub: '99.9% Pure', rate: dailyRates.gold.rate24K },
                    ].map((item) => (
                      <button
                        key={item.kt}
                        type="button"
                        onClick={() => setSelectedPurity(item.kt)}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          selectedPurity === item.kt
                            ? 'border-amber-600 bg-amber-500/10 text-amber-950 ring-2 ring-amber-500/20 shadow-md'
                            : 'border-slate-200 hover:border-amber-300 bg-white text-slate-700'
                        }`}
                      >
                        <div className="font-serif font-bold text-lg">{item.label}</div>
                        <div className="text-[11px] text-slate-500">{item.sub}</div>
                        <div className="text-xs font-bold text-amber-800 mt-1">{formatINR(item.rate)}/g</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Current Selected Rate (Read Only) */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-900 uppercase">Applied Gold Rate ({selectedPurity}K)</div>
                    <div className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      {formatINR(currentGoldRate)} <span className="text-xs font-sans font-normal text-slate-500">/ gram</span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    Source: Anand Jewellers<br />Updated {dailyRates.lastUpdated}
                  </div>
                </div>

                {/* Weight Input */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      2. Jewellery Weight (Grams)
                    </label>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                      {inputs.weight} Grams
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min="0.5"
                      max="250"
                      step="0.5"
                      value={inputs.weight}
                      onChange={(e) => handleNumericInputChange('weight', e.target.value, 0, 10000)}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="relative w-28">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={inputs.weight || ''}
                        onChange={(e) => handleNumericInputChange('weight', e.target.value, 0, 10000)}
                        className="w-full px-3 py-2 text-right border border-slate-200 rounded-xl bg-white font-medium text-slate-900 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none"
                      />
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-medium">g</span>
                    </div>
                  </div>
                </div>

                {/* Making Charges */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      3. Making Charges
                    </label>
                    <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setInputs(prev => ({ ...prev, makingChargeType: 'percentage' }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                          inputs.makingChargeType === 'percentage'
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Percentage (%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputs(prev => ({ ...prev, makingChargeType: 'fixed' }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                          inputs.makingChargeType === 'fixed'
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Per Gram (₹)
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={inputs.makingChargeValue || ''}
                    onChange={(e) => handleNumericInputChange('makingChargeValue', e.target.value, 0, 100000)}
                    placeholder={inputs.makingChargeType === 'percentage' ? 'Percentage (e.g. 10%)' : 'Amount per gram (₹)'}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 outline-none"
                  />
                </div>

                {/* Stone Cost & Discount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Stone / Diamond Charges
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 font-medium text-sm">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={inputs.stoneCost || ''}
                        onChange={(e) => handleNumericInputChange('stoneCost', e.target.value, 0, 1000000)}
                        placeholder="0"
                        className="w-full pl-8 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={inputs.discount || ''}
                      onChange={(e) => handleNumericInputChange('discount', e.target.value, 0, 100)}
                      placeholder="0%"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 outline-none"
                    />
                  </div>
                </div>

                {/* GST Options */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Applicable GST Rate
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 3, 5, 12].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setInputs(prev => ({ ...prev, gstPercentage: rate }))}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          inputs.gstPercentage === rate
                            ? 'border-slate-900 bg-slate-900 text-white shadow'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

              </motion.div>

              {/* Calculator Results (5 Cols) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-serif font-bold text-amber-400 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" /> Price Breakdown
                    </h3>
                    <span className="text-[11px] font-medium tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2.5 py-1 rounded-full">
                      Estimate
                    </span>
                  </div>

                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Gold Value ({inputs.weight}g @ {selectedPurity}K)</span>
                      <span className="font-semibold text-white">{formatINR(results.goldValue)}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-300">
                      <span>Making Charges</span>
                      <span className="font-semibold text-white">{formatINR(results.makingCharges)}</span>
                    </div>

                    {results.stoneCost > 0 && (
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Stone Charges</span>
                        <span className="font-semibold text-white">{formatINR(results.stoneCost)}</span>
                      </div>
                    )}

                    {results.discountAmount > 0 && (
                      <div className="flex justify-between items-center text-emerald-400">
                        <span>Discount ({inputs.discount}%)</span>
                        <span className="font-semibold">- {formatINR(results.discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-slate-300">
                      <span>GST ({inputs.gstPercentage}%)</span>
                      <span className="font-semibold text-white">{formatINR(results.gst)}</span>
                    </div>
                  </div>

                  {/* Estimated Final Price Banner */}
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/30 text-center">
                    <span className="text-xs uppercase font-semibold text-amber-300/80 tracking-widest block mb-1">
                      Estimated Final Price
                    </span>
                    <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 tracking-tight">
                      <AnimatedCounter value={results.finalPrice} />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Includes making, taxes & applicable charges
                    </span>
                  </div>

                  {/* Transparency Details */}
                  <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 grid grid-cols-2 gap-2">
                    <div>• Rate Used: <strong className="text-slate-200">{formatINR(currentGoldRate)}/g</strong></div>
                    <div>• Purity: <strong className="text-slate-200">{selectedPurity}K Gold</strong></div>
                    <div>• Weight: <strong className="text-slate-200">{inputs.weight}g</strong></div>
                    <div>• Updated: <strong className="text-slate-200">{dailyRates.date}</strong></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 print:hidden">
                    <button
                      onClick={handleCopy}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 text-xs font-semibold border border-slate-700 transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>

                    <button
                      onClick={handleWhatsAppShare}
                      className="p-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 flex items-center justify-center gap-1.5 text-xs font-semibold border border-emerald-800/60 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>

                    <button
                      onClick={handlePrint}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 text-xs font-semibold border border-slate-700 transition-all col-span-2 sm:col-span-1"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                  </div>

                </motion.div>

                {/* Doughnut Chart Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg print:hidden">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4 text-center">
                    Cost Component Breakdown
                  </h4>
                  <div className="h-48 relative">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* UTILITY TOOLS SECTION (Converter & Silver Calc) */}
        <section className="py-12 bg-amber-900/5 print:hidden">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <QuickRateConverter rates={dailyRates} />
            <SilverCalculator silverRate={dailyRates.silver.ratePerGram} />
          </div>
        </section>

        {/* DISCLAIMER SECTION */}
        <section className="py-10 bg-white border-t border-slate-200">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Important Terms & Disclaimer
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto">
              Rates shown on this page are Anand Jewellers' displayed daily reference rates and may change during the day based on bullion market variations. Jewellery prices can vary based on specific product design, making charges, gemstones, wastage, and statutory taxes. The calculator provides an estimate only and does not constitute a binding purchase agreement. Please confirm final price directly with Anand Jewellers prior to billing.
            </p>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section ref={ctaRef} className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden print:hidden">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              Planning Your Next Jewellery Purchase?
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Check today's rates, calculate your estimate and visit Anand Jewellers for expert assistance and bespoke handcrafted designs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
              <button
                onClick={() => window.location.href = '#book-visit'}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Store Visit
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xl shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Us
              </button>

              <button
                onClick={() => window.location.href = 'tel:+911234567890'}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Anand Jewellers
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
};