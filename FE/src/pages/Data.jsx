import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
// ✅ Sửa lại dòng import
import teacherApi from '../api/teacherApi';

const Data = () => {
  const [teachers, setTeachers] = useState([]);


useEffect(() => {
  const fetchTeachers = async () => {
    try {
      const data = await teacherApi.getAllTeachers(); // ✅ gọi qua object
      setTeachers(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };
  fetchTeachers();
}, []);

  return (
    <Box>
      
    </Box>
  );
};

export default Data;
