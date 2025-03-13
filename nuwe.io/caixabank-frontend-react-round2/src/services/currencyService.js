// Cache implementation for exchange rates
const ratesCache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Mock exchange rates data
const mockExchangeRates = {
  base: "EUR",
  rates: {
    USD: 1.18,
    GBP: 0.86,
    JPY: 130.25,
    CHF: 1.08,
    AUD: 1.61,
    CAD: 1.48,
    CNY: 7.63,
    INR: 87.45,
    EUR: 1.0,
  },
  timestamp: Date.now(),
};

export const fetchExchangeRates = async (base = "EUR") => {
  const cacheKey = `rates-${base}`;
  const cached = ratesCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Create rates for the requested base currency
  const rates = { ...mockExchangeRates.rates };
  if (base !== "EUR") {
    const baseRate = mockExchangeRates.rates[base];
    Object.keys(rates).forEach((currency) => {
      rates[currency] = rates[currency] / baseRate;
    });
  }

  const data = {
    base,
    rates,
    timestamp: Date.now(),
  };

  // Update cache
  ratesCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
};

// Get list of available currencies
export const getAvailableCurrencies = () => {
  return Object.keys(mockExchangeRates.rates).map((code) => ({
    code,
    name: getCurrencyName(code),
  }));
};

// Helper function to get currency names
const getCurrencyName = (code) => {
  const names = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CHF: "Swiss Franc",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
  };
  return names[code] || code;
};
