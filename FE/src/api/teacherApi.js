import axiosClient from './axiosClient';

const teacherApi = {
  getAll: (params) => axiosClient.get('/teachers', { params }),
  getById: (id) => axiosClient.get(`/teachers/${id}`),

  create: async (data) => {
    const response = await axiosClient.post('/teachers', data);
    return response;
  },

  update: (id, data) => axiosClient.put(`/teachers/${id}`, data),
  delete: (id) => axiosClient.delete(`/teachers/${id}`),
};

export default teacherApi;
