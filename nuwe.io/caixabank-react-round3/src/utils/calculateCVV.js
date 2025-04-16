/**
 * Calculates a 3-digit CVV from an array of hexadecimal values
 * @param {Array} hexCodes - Array of three hexadecimal values
 * @returns {string} A 3-digit CVV code as a string
 */
export const calculateCVV = (hexCodes) => {
  if (!hexCodes || hexCodes.length !== 3) {
    return '000'; // Default fallback
  }
  
  try {
    // Convert hex codes to decimal values
    const decimalValues = hexCodes.map(hex => parseInt(hex, 16));
    
    // Apply XOR to combine the three values
    let result = decimalValues[0] ^ decimalValues[1] ^ decimalValues[2];
    
    // Apply bitwise shift
    result = result >> 2;
    
    // Ensure the result is within 000-999 range
    result = result % 1000;
    
    // Format as a 3-digit string with leading zeros if needed
    return result.toString().padStart(3, '0');
  } catch (error) {
    console.error('Error calculating CVV:', error);
    return '000'; // Default fallback in case of error
  }
};

export default calculateCVV;
