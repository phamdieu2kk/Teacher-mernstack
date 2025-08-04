// src/api/dataApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getTeachers = () => axios.get(`${BASE_URL}/teachers`);
export const getSubjects = () => axios.get(`${BASE_URL}/subjects`);
export const getDepartments = () => axios.get(`${BASE_URL}/departments`);
export const getPositions = () => axios.get(`${BASE_URL}/positions`);
