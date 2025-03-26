import { useContext } from "react";
import { MarketContext } from "../context/MarketContext";

export const useMarket = () => {
    const context = useContext(MarketContext);
    if (!context) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
}; 
