import { fetchData } from "../utils/fetchData";

const BASE_URL = "/blockchain";

export const getBlocks = async () => {
    return fetchData('/blockchain', 'GET');
};

export const mineBlock = async () => {
    return fetchData('/blockchain/mine', 'POST');
};

export const validateChain = async () => {
    return fetchData('/blockchain/validate', 'GET');
};
