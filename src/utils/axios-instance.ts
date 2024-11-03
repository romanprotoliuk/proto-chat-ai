import axios from 'axios';
import { toast } from 'react-toastify';

const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  UNAUTHORIZED: "Please sign in to continue.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  GENERIC_ERROR: "Something went wrong. Please try again later.",
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error(ERROR_MESSAGES.NETWORK_ERROR);
      return Promise.reject(error);
    }
    const { status } = error.response;
    const message = ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.GENERIC_ERROR;
    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;