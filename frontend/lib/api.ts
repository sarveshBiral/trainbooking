import axios from 'axios';

const formatUrl = (url?: string, fallback: string = '') => {
    if (!url) return fallback;
    return url.startsWith('http') ? url : `https://${url}`;
};

const AUTH_URL = formatUrl(process.env.NEXT_PUBLIC_AUTH_URL, 'http://localhost:3001');
const USER_URL = formatUrl(process.env.NEXT_PUBLIC_USER_URL, 'http://localhost:3002');
const TRAIN_URL = formatUrl(process.env.NEXT_PUBLIC_TRAIN_URL, 'http://localhost:3003');
const BOOKING_URL = formatUrl(process.env.NEXT_PUBLIC_BOOKING_URL, 'http://localhost:3004');
const ADMIN_URL = formatUrl(process.env.NEXT_PUBLIC_ADMIN_URL, 'http://localhost:3005');


console.log('API URLs:', { AUTH_URL, USER_URL, TRAIN_URL, BOOKING_URL, ADMIN_URL });

export const login = async (credentials: any) => {
    return axios.post(`${AUTH_URL}/auth/login`, credentials);
};

export const register = async (credentials: any) => {
    return axios.post(`${AUTH_URL}/auth/register`, credentials);
};

export const getProfile = async (token: string) => {
    // In real app, pass header: Authorization: Bearer token
    return axios.get(`${USER_URL}/users/profile`);
};

export const getHistory = async (token: string) => {
    return axios.get(`${USER_URL}/users/history`);
};

export const searchTrains = async (from: string, to: string) => {
    return axios.get(`${TRAIN_URL}/trains/search`, { params: { from, to } });
};

export const bookSeat = async (bookingData: any) => {
    return axios.post(`${BOOKING_URL}/bookings`, bookingData);
};

export const getAdminStats = async () => {
    return axios.get(`${ADMIN_URL}/admin/stats`);
};
