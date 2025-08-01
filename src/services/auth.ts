import axios from "axios";

import { API_URL } from "@/config/api-config";
import API from "@/lib/axios";
import { LoginData } from "@/types/login-data";

export const loginWithoutRedirect = async (data: LoginData) => {
  try {
    const loginAxios = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await loginAxios.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Login failed";
    } else throw "Login failed";
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await API.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Login failed";
    } else throw "Login failed";
  }
};

export const refresh = async () => {
  try {
    await API.post("/api/auth/refresh");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Refresh error";
    } else throw "Refresh error";
  }
};

export const logout = async () => {
  try {
    await API.post("/api/auth/logout");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Logout error";
    } else throw "Logout error";
  }
};
