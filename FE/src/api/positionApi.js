// src/api/positionApi.js
import axiosClient from './axiosClient';

const positionApi = {
  getAll: () => axiosClient.get('/positions'),
  getById: (id) => axiosClient.get(`/positions/${id}`),
  create: (data) => axiosClient.post('/positions', data),
  update: (id, data) => axiosClient.put(`/positions/${id}`, data),
  remove: (id) => axiosClient.delete(`/positions/${id}`),
};

export default positionApi;