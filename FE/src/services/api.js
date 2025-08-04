// src/services/api.js
import axios from 'axios';

// Khởi tạo instance axios
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // giả sử BE có prefix /api, sửa lại nếu không có
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // timeout sau 10 giây nếu không có phản hồi
});

// Optional: Interceptors (nếu bạn cần xử lý auth sau này)
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// ==============================
// 👨‍🏫 Teacher APIs
// ==============================
export const getTeachers = (page = 1, limit = 10) =>
  API.get(`/teachers?page=${page}&limit=${limit}`);

export const createTeacher = (data) => API.post('/teachers', data);

// ==============================
// 📌 Position APIs
// ==============================
export const getPositions = () => API.get('/teacher-positions');

export const createPosition = (data) => API.post('/teacher-positions', data);

// ==============================
// ✅ Export default instance nếu muốn dùng lại instance gốc
// ==============================
export default API;
