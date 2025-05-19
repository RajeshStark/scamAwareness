import axios from "axios";
import { encode as base64Encode } from "base-64";
export const BaseURL = "https://api.scamalertpro.in/";

// Basic Auth credentials
const username = "3scam_alertUser!@3#";
const password = "9scam_alert@3!)#@done";
const encodedCredentials = base64Encode(`${username}:${password}`);

export const http = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Basic ${encodedCredentials}`,
  },
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorResponse = error.message;
    console.log("errorResponse===", error?.response?.data, errorResponse);
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      // Optionally show a toast or logout user
    } else {
      return Promise.reject(error);
    }
  }
);

export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};
