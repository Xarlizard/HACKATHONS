// Cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Generate mock data
const generateMockData = (count = 1000) => {
  const types = ["Stocks", "Crypto", "Funds"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Asset ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    value: Math.floor(Math.random() * 10000),
    change: (Math.random() * 20 - 10).toFixed(2),
    history: Array.from({ length: 30 }, (_, j) => ({
      date: new Date(Date.now() - j * 24 * 60 * 60 * 1000),
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

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data = generateMockData();

  // Update cache
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
};

// Add IndexedDB support for larger datasets
const initIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("InvestmentDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("investments")) {
        db.createObjectStore("investments", { keyPath: "id" });
      }
    };
  });
};

export const storeInIndexedDB = async (data) => {
  const db = await initIndexedDB();
  const transaction = db.transaction(["investments"], "readwrite");
  const store = transaction.objectStore("investments");

  data.forEach((item) => {
    store.put(item);
  });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getFromIndexedDB = async () => {
  const db = await initIndexedDB();
  const transaction = db.transaction(["investments"], "readonly");
  const store = transaction.objectStore("investments");
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
