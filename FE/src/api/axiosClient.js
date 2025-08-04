// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000', // Correctly points to your mock backend
  headers: { 'Content-Type': 'application/json' },
});

export default axiosClient;