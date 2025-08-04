// src/api/teacherApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/teachers';

const teacherApi = {
  getAllTeachers: async () => {
    const res = await axios.get('http://localhost:5000/api/teachers');
    return res.data;
  },
  createTeacher: async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  },
  updateTeacher: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  },
  deleteTeacher: async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};

export default teacherApi; // 👈 cần DÒNG NÀY!
