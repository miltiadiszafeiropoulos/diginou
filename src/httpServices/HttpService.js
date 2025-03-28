import axios from "axios";
import { AppConstants } from "../constants/AppConstants";

// Create an axios instance for the HTTP service
export const httpService = axios.create({
  baseURL: AppConstants.GetUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor without token attachment
httpService.interceptors.request.use(
  (config) => {
    // No token is attached here
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);
