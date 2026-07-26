/**
 * Formats a number to INR currency string format with ₹ symbol.
 * @param {number} amount
 * @returns {string} Formatted price in INR (₹)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
