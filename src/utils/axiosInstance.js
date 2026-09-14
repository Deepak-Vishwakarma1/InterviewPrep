// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://interview-backend-mrqy.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ This interceptor runs before every request and attaches the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // or wherever you store it
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosInstance;
