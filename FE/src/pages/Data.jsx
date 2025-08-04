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
      <Typography variant="h5" component="h1" gutterBottom>
        Danh sách giáo viên
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Họ tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell>Chuyên môn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher._id}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.phone}</TableCell>
              <TableCell>{teacher.position?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Data;
