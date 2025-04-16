/**
 * Fetches CVV hex codes from the API
 * @returns {Promise<Array>} Array of three hexadecimal values
 */
export const fetchCVV = async () => {
  try {
    const response = await fetch('https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-50deec91-1644-467d-9759-c2eb309d6f91/default/cvv-hex-codes');
    
    if (!response.ok) {
      throw new Error('Failed to fetch CVV codes');
    }
    
    const data = await response.json();
    return data.codes; // Return the array of hex codes
  } catch (error) {
    console.error('Error fetching CVV:', error);
    // Return fallback values in case of error
    return ['0xAA', '0xBB', '0xCC'];
  }
};

export default fetchCVV;
