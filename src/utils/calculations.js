// Utility functions for gold price calculations

export function formatMoney(value) {
  if (isNaN(value) || value === null || value === undefined) return '0';
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function parseNumber(value) {
  if (!value) return 0;
  return parseFloat(value.toString().replace(/,/g, '')) || 0;
}

export function calculateItemPrice(goldPrice, weight, stampEnduser, quantity, num1 = 1, num2 = 1, num3 = 0) {
  if (quantity <= 0 || weight <= 0 || goldPrice <= 0) {
    return { itemPrice: 0, totalPrice: 0 };
  }

  const soso = num1 / num2;
  const unitPrice = goldPrice * soso + stampEnduser;
  const totalPrice = weight * quantity * unitPrice + num3;
  const itemPrice = totalPrice / quantity;

  return {
    itemPrice: itemPrice,
    totalPrice: totalPrice
  };
}

export function calculateGoldPrice24(goldPrice21) {
  if (goldPrice21 <= 0) return 0;
  return goldPrice21 * (999.9 / 875);
}

export function validateGoldPrice(value) {
  const price = parseNumber(value);
  if (!value || value.trim() === '') {
    return { isValid: false, error: 'Gold price is required' };
  }
  if (isNaN(price) || price <= 0) {
    return { isValid: false, error: 'Please enter a valid gold price greater than 0' };
  }
  return { isValid: true, error: null };
}

export function validateQuantity(value) {
  const qty = parseInt(value);
  if (!value || value.trim() === '') {
    return { isValid: false, error: 'Quantity is required' };
  }
  if (isNaN(qty) || qty < 1) {
    return { isValid: false, error: 'Quantity must be at least 1' };
  }
  return { isValid: true, error: null };
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}