/**
 * Generates a gradient background based on the card number
 * @param {string} cardNumber - The card number
 * @returns {string} CSS linear-gradient value
 */
export const generateCardColors = (cardNumber) => {
  if (!cardNumber) {
    // Default gradient if no card number is provided
    return 'linear-gradient(to bottom, rgba(100, 100, 100, 0.7), rgba(50, 50, 50, 0.3))';
  }
  
  // Sum all digits of the card number
  const sum = cardNumber.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // Generate two colors
  const r1 = (sum * 3) % 256;
  const g1 = (sum * 5) % 256;
  const b1 = (sum * 7) % 256;
  
  const r2 = (sum * 2) % 256;
  const g2 = (sum * 4) % 256;
  const b2 = (sum * 6) % 256;
  
  // Determine opacity for each color
  const opacity1 = (sum % 50 + 50) / 100; // Range: 0.5 to 1.0
  const opacity2 = (sum % 30 + 20) / 100; // Range: 0.2 to 0.5
  
  // Return the linear gradient
  return `linear-gradient(to bottom, rgba(${r1}, ${g1}, ${b1}, ${opacity1}), rgba(${r2}, ${g2}, ${b2}, ${opacity2}))`;
};

export default generateCardColors;
