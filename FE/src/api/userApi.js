// src/api/userApi.js
import axiosClient from './axiosClient';

const userApi = {
  create: (data) => axiosClient.post('/users', data), // Giả định tạo user endpoint
  // ...
};

export default userApi;
