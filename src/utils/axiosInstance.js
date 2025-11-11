import axios from "axios";
import { message } from "antd";

const axiosInstance = axios.create({
   
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

// ✅ Request Interceptor – Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("admintoken") || localStorage.getItem("token");

    if (token) {
      config.headers.admintoken = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor – Handle Token Expiry / Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      message.error("Session expired! Please login again.");

      // Clear all stored data
      localStorage.clear();

      // ✅ Simple redirect (no React hooks)
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
