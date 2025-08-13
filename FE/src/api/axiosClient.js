// src/api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Nếu là FormData thì bỏ Content-Type để axios tự set
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  // Có thể thêm logic xử lý token ở đây
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
