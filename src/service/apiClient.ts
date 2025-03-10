import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure this is set in .env.local
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important! Sends cookies with requests
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const refreshToken = async () => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );
  return data.accessToken;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await refreshToken();
          onRrefreshed(newToken);
          isRefreshing = false;
          return apiClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          console.error("Refresh token failed", refreshError);
          window.location.href = "/login"; // Redirect to login if refresh fails
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
