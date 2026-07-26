/**
 * Formats a number to USD currency string format.
 * @param {number} amount
 * @returns {string} Formatted price
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};
