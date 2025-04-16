/**
 * Calculates the expiration date based on the card number
 * @param {string} cardNumber - The card number
 * @returns {string} The expiration date in MM/YYYY format
 */
export const calculateExpirationDate = (cardNumber) => {
  if (!cardNumber || cardNumber.length < 2) {
    return '01/2030'; // Default fallback
  }
  
  // Get current year
  const currentYear = new Date().getFullYear();
  
  // Extract first two digits for month calculation
  const firstTwoDigits = parseInt(cardNumber.substring(0, 2));
  // Calculate month (1-12)
  const month = ((firstTwoDigits % 12) + 1);
  
  // Extract last two digits for year calculation
  const lastTwoDigits = parseInt(cardNumber.substring(cardNumber.length - 2));
  // Calculate year offset (3-7 years)
  const yearOffset = (lastTwoDigits % 5) + 3;
  // Calculate expiration year
  const year = currentYear + yearOffset;
  
  // Format month with leading zero if needed
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  
  return `${formattedMonth}/${year}`;
};

export default calculateExpirationDate;
