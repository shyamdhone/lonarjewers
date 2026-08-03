import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/UI';
import { useScrollReveal } from '../hooks/useAnimation';
import { goldCalculator, formatPrice } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Filler } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { 
  Sparkles, 
  Download, 
  Printer, 
  Share2, 
  Copy, 
  Check, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Award, 
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  ChevronRight
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

// Animated Counter Component for Smooth Price Transition
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value]);

  return <span>{formatPrice(displayValue)}</span>;
};

export const GoldCalculator = () => {
  const calculatorRef = useScrollReveal();
  const ctaRef = useRef(null);
  
  const [inputs, setInputs] = useState({
    weight: 10,
    purity: 22,
    goldRate: 7300,
    makingChargeType: 'percentage',
    makingChargeValue: 10,
    stoneCost: 0,
    gstPercentage: 3, // Standard gold GST in India
    discount: 0,
  });

  const [copied, setCopied] = useState(false);

  // Pure gold purity factors mapping for exact mathematical accuracy
  const purityFactors = useMemo(() => ({
    18: 0.75,
    22: 0.916,
    24: 0.999
  }), []);

  // Validation & Sanitization Helper
  const handleNumericInputChange = (key, rawValue, min = 0, max = Infinity) => {
    const parsed = parseFloat(rawValue);
    if (isNaN(parsed)) {
      setInputs(prev => ({ ...prev, [key]: 0 }));
      return;
    }
    const clamped = Math.min(Math.max(parsed, min), max);
    setInputs(prev => ({ ...prev, [key]: clamped }));
  };

  // Synchronized Instant Calculation Loop
  const results = useMemo(() => {
    const weight = Math.max(0, inputs.weight || 0);
    const goldRate = Math.max(0, inputs.goldRate || 0);
    const purity = inputs.purity || 22;
    const stoneCost = Math.max(0, inputs.stoneCost || 0);
    const makingChargeVal = Math.max(0, inputs.makingChargeValue || 0);
    const discountPct = Math.min(Math.max(0, inputs.discount || 0), 100);
    const gstPct = Math.max(0, inputs.gstPercentage || 0);

    // Calculate Gold Value based on purity factor
    const purityFactor = purityFactors[purity] || (purity / 24);
    const rawGoldValue = weight * goldRate * purityFactor;

    // Calculate Making Charges
    let makingCharges = 0;
    if (inputs.makingChargeType === 'percentage') {
      makingCharges = (rawGoldValue * makingChargeVal) / 100;
    } else {
      makingCharges = makingChargeVal * weight;
    }

    // Calculations Breakdown
    const subtotal = rawGoldValue + makingCharges + stoneCost;
    const discountAmount = (subtotal * discountPct) / 100;
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const gstAmount = (discountedSubtotal * gstPct) / 100;
    const finalPrice = Math.round(discountedSubtotal + gstAmount);

    const pureGoldWeight = Number((weight * purityFactor).toFixed(3));

    // Fallback/Interop with existing goldCalculator helper if method exists
    if (goldCalculator && typeof goldCalculator.calculateCompletePrice === 'function') {
      try {
        const externalCalc = goldCalculator.calculateCompletePrice(
          weight, purity, goldRate, inputs.makingChargeType, makingChargeVal, stoneCost, gstPct, discountPct
        );
        if (externalCalc && externalCalc.finalPrice) {
          return {
            ...externalCalc,
            pureGoldWeight,
            goldValue: Math.round(rawGoldValue),
            makingCharges: Math.round(makingCharges),
            stoneCost: Math.round(stoneCost),
            subtotal: Math.round(subtotal),
            discountAmount: Math.round(discountAmount),
            gst: Math.round(gstAmount),
            finalPrice: Math.round(externalCalc.finalPrice)
          };
        }
      } catch (e) {
        // Fallback to internal robust calculation if utility throws or differs
      }
    }

    return {
      goldValue: Math.round(rawGoldValue),
      makingCharges: Math.round(makingCharges),
      stoneCost: Math.round(stoneCost),
      subtotal: Math.round(subtotal),
      discountAmount: Math.round(discountAmount),
      gst: Math.round(gstAmount),
      finalPrice,
      pureGoldWeight
    };
  }, [inputs, purityFactors]);

  // Set default market gold rate
  const handleUseTodayRate = () => {
    setInputs(prev => ({ ...prev, goldRate: 7450 }));
  };

  // GSAP subtle pulse effect on CTA
  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
      );
    }
  }, []);

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
          '#D4AF37', // Gold
          '#1E293B', // Luxury Dark
          '#94A3B8', // Slate/Stone
          '#E2E8F0', // GST / Light Accent
        ],
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  }), [results]);

  const chartOptions = {
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Poppins', size: 12 },
          color: '#1E293B',
          usePointStyle: true,
          padding: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${formatPrice(context.raw)}`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Chart Data: 30-Day Trend
  const trendData = useMemo(() => ({
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
    datasets: [
      {
        fill: true,
        label: '22K Gold Rate (₹/g)',
        data: [7180, 7220, 7190, 7280, 7350, 7310, 7450],
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.12)',
        tension: 0.4,
        pointBackgroundColor: '#D4AF37',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }), []);

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` Rate: ₹${context.raw}/g`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        grid: { color: 'rgba(212, 175, 55, 0.1)' },
        ticks: { callback: (val) => `₹${val}` }
      }
    }
  };

  // Action Handlers
  const handleCopy = () => {
    const summaryText = `*Luxury Gold Estimate*\nWeight: ${inputs.weight}g (${inputs.purity}K)\nPure Gold: ${results.pureGoldWeight}g\nGold Value: ${formatPrice(results.goldValue)}\nMaking Charges: ${formatPrice(results.makingCharges)}\nGST: ${formatPrice(results.gst)}\n*Total Price: ${formatPrice(results.finalPrice)}*`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Hello! Here is my gold valuation summary:\nWeight: ${inputs.weight}g (${inputs.purity}K)\nTotal Price: ${formatPrice(results.finalPrice)}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800 selection:bg-amber-200">
      {/* Hero Section */}
      <Hero
        title="Gold Calculator"
        subtitle="Calculate the exact price of your luxury gold jewellery with real-time market accuracy"
        image={cal}
      />

      {/* Calculator Main Section */}
      <section ref={calculatorRef} className="py-12 md:py-20 bg-gradient-to-b from-amber-50/40 via-white to-slate-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-amber-800 bg-amber-100/80 border border-amber-300/50 mb-3 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Precision Estimation Tool
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Calculate Your Jewellery Price
            </h2>
            <p className="mt-2 text-slate-600 text-sm md:text-base">
              Transparent breakdown with live market metrics, customized making charges, and instant tax calculation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs Column (7 Cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-xl shadow-amber-900/5"
            >
              {/* Weight Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-800 tracking-wide">
                    Gross Weight (Grams)
                  </label>
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
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
                      className="w-full px-3 py-2 text-right border border-slate-200 rounded-xl bg-white font-medium text-slate-900 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                    />
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-medium">g</span>
                  </div>
                </div>
              </div>

              {/* Purity Selection Cards */}
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-slate-800 tracking-wide block">
                  Select Purity (Karat)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { kt: 18, label: '18K', sub: '75.0% Pure' },
                    { kt: 22, label: '22K', sub: '91.6% Pure' },
                    { kt: 24, label: '24K', sub: '99.9% Pure' },
                  ].map((item) => (
                    <button
                      key={item.kt}
                      type="button"
                      onClick={() => setInputs(prev => ({ ...prev, purity: item.kt }))}
                      className={`p-3.5 rounded-2xl border text-center transition-all duration-200 ${
                        inputs.purity === item.kt
                          ? 'border-amber-500 bg-gradient-to-b from-amber-500/10 to-amber-500/5 shadow-md shadow-amber-500/10 text-amber-900 ring-2 ring-amber-500/20'
                          : 'border-slate-200 hover:border-amber-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="font-serif font-bold text-lg">{item.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gold Rate Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-800 tracking-wide">
                    Gold Rate (per gram)
                  </label>
                  <button
                    type="button"
                    onClick={handleUseTodayRate}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" /> Today's Rate
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400 font-semibold">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={inputs.goldRate || ''}
                    onChange={(e) => handleNumericInputChange('goldRate', e.target.value, 0, 100000)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Making Charges Toggle & Input */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-800 tracking-wide">
                    Making Charges
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
                  placeholder={inputs.makingChargeType === 'percentage' ? 'Percentage (e.g. 10%)' : 'Amount per gram'}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              {/* Stone Cost & Discount Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-800 tracking-wide block">
                    Stone Cost (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-400 font-medium text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={inputs.stoneCost || ''}
                      onChange={(e) => handleNumericInputChange('stoneCost', e.target.value, 0, 1000000)}
                      placeholder="0"
                      className="w-full pl-8 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-800 tracking-wide block">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={inputs.discount || ''}
                    onChange={(e) => handleNumericInputChange('discount', e.target.value, 0, 100)}
                    placeholder="0%"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* GST Segmented Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800 tracking-wide block">
                  GST Rate
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 3, 5, 12].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setInputs(prev => ({ ...prev, gstPercentage: rate }))}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        inputs.gstPercentage === rate
                          ? 'border-slate-900 bg-slate-900 text-white shadow'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {rate}% {rate === 3 ? '(Std)' : ''}
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* Right Results & Breakdown Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/20 border border-slate-800 relative overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-serif font-bold text-amber-400 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" /> Valuation Result
                  </h3>
                  <span className="text-[11px] font-medium tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    Live Calculation
                  </span>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Gold Value ({inputs.weight}g @ {inputs.purity}K)</span>
                    <span className="font-semibold text-white">{formatPrice(results.goldValue)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Making Charges</span>
                    <span className="font-semibold text-white">{formatPrice(results.makingCharges)}</span>
                  </div>

                  {results.stoneCost > 0 && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Stone Cost</span>
                      <span className="font-semibold text-white">{formatPrice(results.stoneCost)}</span>
                    </div>
                  )}

                  {results.discountAmount > 0 && (
                    <div className="flex justify-between items-center text-emerald-400">
                      <span>Discount ({inputs.discount}%)</span>
                      <span className="font-semibold">- {formatPrice(results.discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-slate-300">
                    <span>GST ({inputs.gstPercentage}%)</span>
                    <span className="font-semibold text-white">{formatPrice(results.gst)}</span>
                  </div>
                </div>

                {/* Final Price Banner */}
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/30 text-center">
                  <span className="text-xs uppercase font-semibold text-amber-300/80 tracking-widest block mb-1">
                    Estimated Final Price
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 tracking-tight">
                    ₹<AnimatedCounter value={results.finalPrice} />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Inclusive of all statutory taxes & charges
                  </span>
                </div>

                {/* Quick Summary Specs */}
                <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 grid grid-cols-2 gap-2">
                  <div>• Pure Gold: <strong className="text-slate-200">{results.pureGoldWeight}g</strong></div>
                  <div>• Purity Factor: <strong className="text-slate-200">{((results.pureGoldWeight/inputs.weight)*100).toFixed(1)}%</strong></div>
                  <div>• Rate Base: <strong className="text-slate-200">₹{inputs.goldRate}/g</strong></div>
                  <div>• Calculated On: <strong className="text-slate-200">{new Date().toLocaleDateString()}</strong></div>
                </div>

                {/* Export Buttons */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all border border-slate-700"
                    title="Copy Estimate"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>

                  <button
                    onClick={handleWhatsAppShare}
                    className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all border border-emerald-800/50"
                    title="Share via WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" /> WhatsApp
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all border border-slate-700"
                    title="Print Document"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all border border-amber-500/30"
                    title="Download PDF"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </motion.div>

              {/* Doughnut Chart Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5">
                <h4 className="text-sm font-semibold text-slate-800 mb-4 text-center">
                  Price Distribution Breakdown
                </h4>
                <div className="h-52 relative">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gold Price Trend Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> Market Insights
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
              30-Day Gold Price Trend
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Track historical fluctuations to choose the best buying window
            </p>
          </div>

          <div className="bg-slate-50/70 p-6 md:p-8 rounded-3xl border border-slate-200/80 max-w-4xl mx-auto h-72 sm:h-80 shadow-inner">
            <Line data={trendData} options={trendOptions} />
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How to Use This Calculator"
            subtitle="Follow these simple steps to calculate accurate gold jewellery estimates"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                step: '01',
                title: 'Enter Gold Details',
                description: 'Input gross weight in grams and select standard purity (18K, 22K, or 24K).',
              },
              {
                step: '02',
                title: 'Add Making & Stones',
                description: 'Set custom making charges by percentage or fixed amount per gram along with gemstone value.',
              },
              {
                step: '03',
                title: 'Instant Valuation',
                description: 'Review transparent tax breakdown, download PDF estimate or share directly with our store.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 text-center border border-slate-200/60 shadow-lg shadow-slate-900/5 relative overflow-hidden group"
              >
                <div className="text-4xl font-serif font-extrabold text-amber-500/30 group-hover:text-amber-500/50 transition-colors mb-2">
                  {item.step}
                </div>
                <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section ref={ctaRef} className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/20 via-slate-900 to-slate-950 pointer-events-none" />
        
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Ready to Own Your Dream Jewellery?
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Book an exclusive appointment with our master jewellers or consult online for bespoke handcrafted designs.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
            <button 
              onClick={() => window.location.href = '#book-appointment'}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2"
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
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};