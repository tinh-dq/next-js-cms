import axios from "axios";

import { API_URL } from "@/config/api-config";
import { isWhitelisted } from "@/constants/login-white-list";
import { logger } from "@/utils/logger";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: ((tokenRefreshed: boolean) => void)[] = [];

function processQueue(tokenRefreshed: boolean) {
  failedQueue.forEach((cb) => cb(tokenRefreshed));
  failedQueue = [];
}

async function refreshToken() {
  try {
    await axiosInstance.post("/api/auth/refresh");
    return true;
  } catch (err) {
    logger.trace(err);

    if (typeof window !== "undefined") {
      document.cookie = "isAuthenticated=;path=/";

      const currentPath = window.location.pathname;

      if (!isWhitelisted(currentPath)) {
        window.location.href = "/sign-in";
      }
    }

    return false;
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push((tokenRefreshed) => {
            if (tokenRefreshed) resolve(axiosInstance(originalRequest));
            else reject(error);
          });
        });
      }

      isRefreshing = true;

      const success = await refreshToken();
      isRefreshing = false;
      processQueue(success);

      if (success) {
        return axiosInstance(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
