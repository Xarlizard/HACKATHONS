import { fetchData } from "../utils/fetchData";

const BASE_URL = "/wallet";

export const getWalletBalance = async () => {
    return fetchData('/wallet/balance', 'GET');
};

export const getWalletTransactions = async () => {
    return fetchData('/wallet/transactions', 'GET');
};

export const createWallet = async () => {
    return fetchData('/wallet/create', 'POST');
};

export const buyUSDT = async (amount) => {

};

export const buyAsset = async (tradeRequest) => {
    return fetchData('/wallet/buy', 'POST', tradeRequest);
};

export const sellAsset = async (tradeRequest) => {
    return fetchData('/wallet/sell', 'POST', tradeRequest);
};

export const getTransactions = async () => {
    return fetchData('/wallet/transactions', 'GET');
};
