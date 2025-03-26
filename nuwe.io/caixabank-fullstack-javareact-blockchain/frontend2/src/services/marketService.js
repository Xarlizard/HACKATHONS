import { fetchData } from "../utils/fetchData";

const BASE_URL = "/market";

export const getPrices = async () => {
    return fetchData('/market/prices', 'GET');
};

export const getPrice = async (symbol) => {
    return fetchData(`/market/price/${symbol}`, 'GET');
};
