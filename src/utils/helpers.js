export const goldCalculator = {
  calculateGoldValue: (weight, purity, goldRate) => {
    const pureWeight = (weight * purity) / 100;
    return pureWeight * goldRate;
  },

  calculateMakingCharges: (goldValue, makingChargeType, makingChargeValue) => {
    if (makingChargeType === 'percentage') {
      return (goldValue * makingChargeValue) / 100;
    }
    return makingChargeValue;
  },

  calculateGST: (subtotal, gstPercentage = 5) => {
    return (subtotal * gstPercentage) / 100;
  },

  calculateFinalPrice: (goldValue, makingCharges, stoneCost, gst, discount = 0) => {
    const subtotal = goldValue + makingCharges + stoneCost;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal + gst - discountAmount;
  },

  calculateCompletePrice: (weight, purity, goldRate, makingChargeType, makingChargeValue, stoneCost, gstPercentage, discount) => {
    const goldValue = exports.goldCalculator.calculateGoldValue(weight, purity, goldRate);
    const makingCharges = exports.goldCalculator.calculateMakingCharges(goldValue, makingChargeType, makingChargeValue);
    const subtotal = goldValue + makingCharges + stoneCost;
    const discountAmount = (subtotal * discount) / 100;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const gst = exports.goldCalculator.calculateGST(subtotalAfterDiscount, gstPercentage);
    const finalPrice = subtotalAfterDiscount + gst;

    return {
      goldValue: goldValue.toFixed(2),
      makingCharges: makingCharges.toFixed(2),
      stoneCost: stoneCost.toFixed(2),
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      gst: gst.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    };
  },
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
