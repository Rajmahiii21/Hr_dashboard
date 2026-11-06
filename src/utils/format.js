/**
 * Formatting utilities for Techstuff HR Management Dashboard
 */

export function formatCurrency(amount, decimals = 2) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0.00';
  
  const num = Number(amount);
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  const parts = absNum.toFixed(decimals).split('.');
  let intPart = parts[0];
  const decPart = parts[1];

  // Indian currency numbering formatting:
  // Last 3 digits grouped, then groups of 2 digits
  let lastThree = intPart.substring(intPart.length - 3);
  const otherNumbers = intPart.substring(0, intPart.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  const result = '₹' + formattedInt + (decimals > 0 ? '.' + decPart : '');
  return isNegative ? '-' + result : result;
}

export function formatIndianNumber(value, decimals = 0) {
  if (value === undefined || value === null || isNaN(value)) return '0';
  const num = Number(value);
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  const parts = absNum.toFixed(decimals).split('.');
  let intPart = parts[0];
  const decPart = parts[1];

  let lastThree = intPart.substring(intPart.length - 3);
  const otherNumbers = intPart.substring(0, intPart.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  const result = formattedInt + (decimals > 0 ? '.' + decPart : '');
  return isNegative ? '-' + result : result;
}

export function getGreeting(name = '') {
  const hour = new Date().getHours();
  let timeGreeting = 'Good Morning';
  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good Afternoon';
  } else if (hour >= 17 || hour < 4) {
    timeGreeting = 'Good Evening';
  }
  return name ? `${timeGreeting}, ${name}!` : `${timeGreeting}!`;
}

export function getInitials(name = '') {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
