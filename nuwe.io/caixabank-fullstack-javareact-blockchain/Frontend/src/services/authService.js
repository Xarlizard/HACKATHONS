import { fetchData } from "../utils/fetchData";

const BASE_URL = "/auth";

export const checkUserSession = async () => {
    return fetchData('/auth/check-session', 'GET');
};

export const registerUser = async (userData) => {
    return fetchData('/auth/register', 'POST', userData);
};

export const loginUser = async (credentials) => {
    return fetchData('/auth/login', 'POST', credentials);
};

export const logoutUser = async () => {
    return fetchData('/auth/logout', 'POST');
};
