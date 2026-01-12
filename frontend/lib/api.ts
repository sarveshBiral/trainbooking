import axios from 'axios';


const getEnv = (key: string, fallback: string) => {
    if (typeof window !== 'undefined' && (window as any).__ENV && (window as any).__ENV[key]) {
        return (window as any).__ENV[key];
    }
    return process.env[key] || fallback; // Fallback for local dev/SSR
};

const formatUrl = (url?: string, fallback: string = '') => {
    if (!url) return fallback;
    if (url.startsWith('http')) return url;
    if (url.includes('.')) return `https://${url}`;
    return `https://${url}.onrender.com`;
};

const getAuthUrl = () => formatUrl(getEnv('NEXT_PUBLIC_AUTH_URL', 'http://localhost:3001'));
const getUserUrl = () => formatUrl(getEnv('NEXT_PUBLIC_USER_URL', 'http://localhost:3002'));
const getTrainUrl = () => formatUrl(getEnv('NEXT_PUBLIC_TRAIN_URL', 'http://localhost:3003'));
const getBookingUrl = () => formatUrl(getEnv('NEXT_PUBLIC_BOOKING_URL', 'http://localhost:3004'));
const getAdminUrl = () => formatUrl(getEnv('NEXT_PUBLIC_ADMIN_URL', 'http://localhost:3005'));


console.log('API URLs:', { AUTH: getAuthUrl(), USER: getUserUrl() });

export const login = async (credentials: any) => {
    return axios.post(`${getAuthUrl()}/auth/login`, credentials);
};

export const register = async (credentials: any) => {
    return axios.post(`${getAuthUrl()}/auth/register`, credentials);
};

export const getProfile = async (token: string) => {
    // In real app, pass header: Authorization: Bearer token
    return axios.get(`${getUserUrl()}/users/profile`);
};

export const getHistory = async (token: string) => {
    return axios.get(`${getUserUrl()}/users/history`);
};

export const searchTrains = async (from: string, to: string) => {
    return axios.get(`${getTrainUrl()}/trains/search`, { params: { from, to } });
};

export const bookSeat = async (bookingData: any) => {
    return axios.post(`${getBookingUrl()}/bookings`, bookingData);
};

export const getAdminStats = async () => {
    return axios.get(`${getAdminUrl()}/admin/stats`);
};
