/**
 * Generates a valid card number using Luhn's algorithm
 * @returns {string} A valid card number as a string
 */
export const generateLuhnCardNumber = () => {
  // Generate first 15 digits randomly
  let cardNumber = '';
  for (let i = 0; i < 15; i++) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }
  
  // Calculate checksum using Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  // Process digits from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  // Calculate the check digit
  const checkDigit = (10 - (sum % 10)) % 10;
  
  // Return the complete card number as a string
  return cardNumber + checkDigit.toString();
};

export default generateLuhnCardNumber;
