import React, { createContext, useState, useEffect } from "react";
import { getPrices } from "../services/marketService";

export const MarketContext = createContext(null);

export const MarketProvider = ({ children }) => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getPrices();
        setPrices(data);
        setError("");
      } catch (error) {
        setError("Failed to fetch market prices");
        console.error("Market data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContext.Provider value={{ prices, loading, error }}>
      {children}
    </MarketContext.Provider>
  );
};
