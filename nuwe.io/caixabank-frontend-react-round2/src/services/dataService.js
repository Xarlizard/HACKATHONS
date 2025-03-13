// Cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Generate mock data
const generateMockData = (count = 20) => {
  const types = ["Stocks", "Crypto", "Funds"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Asset ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    value: Math.floor(Math.random() * 10000),
    dailyChange: Math.random() * 20 - 10,
    totalChange: Math.random() * 50 - 25,
    history: Array.from({ length: 30 }, (_, j) => ({
      date: new Date(Date.now() - j * 24 * 60 * 60 * 1000).toISOString(),
      value: Math.floor(Math.random() * 10000),
    })),
  }));
};

export const fetchData = async () => {
  const cacheKey = "investment-data";
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data = generateMockData();

  // Update cache
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
};
