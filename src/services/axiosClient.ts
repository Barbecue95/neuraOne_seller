import axios from "axios";
import { refreshAccessToken } from "./users.services";
import Cookies from "js-cookie";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const axiosClient = axios.create({
  baseURL: `${apiURL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Authorization Header
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle 401 Token Expiration
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { newAccessToken, newRefreshToken } = await refreshAccessToken();
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("accessToken", newAccessToken);
        axiosClient.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
