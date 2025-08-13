import axiosClient from './axiosClient';

const positionApi = {
  getAll: (params) => axiosClient.get('/teacher-positions', { params }),

  create: async (data) => {
    const res = await axiosClient.post('/teacher-positions', data);
    return res.data;
  },

  update: (id, data) => axiosClient.put(`/teacher-positions/${id}`, data),

  remove: (id) => axiosClient.delete(`/teacher-positions/${id}`),
};

export default positionApi;
