import axios from "axios";
import { encode as base64Encode } from "base-64";
import { store } from "../../redux/store/store";

export const BaseURL = "https://api.scamalertpro.in/";

// Basic Auth credentials
const username = "3scam_alertUser!@3#";
const password = "9scam_alert@3!)#@done";
export const encodedCredentials = base64Encode(`${username}:${password}`);

export const http = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Basic ${encodedCredentials}`,
  },
});

// ✅ Add `accessToken` if token exists
http.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.login?.userToken;
    if (token) {
      config.headers["accessToken"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorResponse = error.message;
    console.log("errorResponse ===", error?.response?.data, errorResponse);
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      // Show toast or logout logic
    }
    return Promise.reject(error);
  }
);

// ✅ Typing API Response
export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};
