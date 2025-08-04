// src/pages/Teachers.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  InputAdornment, Pagination, Select, MenuItem, FormControl, InputLabel, Chip, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import teacherApi from '../api/teacherApi'; // ✅ đúng

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', code: '', academic_level: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await teacherApi.getAll();
    setTeachers(res.data);
  };

  const handleOpen = (teacher = null) => {
    setEditTeacher(teacher);
    setForm(
      teacher || { fullname: '', email: '', phone: '', code: '', academic_level: '' }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editTeacher) {
      await teacherApi.update(editTeacher._id, form);
    } else {
      await teacherApi.add(form);
    }
    fetchData();
    handleClose();
  };

  const handleDelete = async (id) => {
    await teacherApi.delete(id);
    fetchData();
  };

  const filteredTeachers = teachers.filter((t) =>
    Object.values(t).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedTeachers = filteredTeachers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Danh sách giáo viên
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Thêm giáo viên
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Giáo viên</TableCell>
              <TableCell>Học vấn</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>SĐT</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTeachers.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t.code}</TableCell>
                <TableCell>{t.fullname}</TableCell>
                <TableCell>{t.academic_level}</TableCell>
                <TableCell>{t.email}</TableCell>
                <TableCell>{t.phone}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={() => handleOpen(t)}>Sửa</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(t._id)}>Xoá</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
        <Typography variant="body2">Tổng: {filteredTeachers.length}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 80, mr: 2 }}>
            <InputLabel id="rows-per-page">Số hàng</InputLabel>
            <Select
              labelId="rows-per-page"
              value={rowsPerPage}
              label="Số hàng"
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(1);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            count={Math.ceil(filteredTeachers.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>

      {/* ModalForm */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editTeacher ? 'Cập nhật' : 'Thêm'} giáo viên</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField name="fullname" label="Họ tên" value={form.fullname} onChange={handleChange} />
          <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
          <TextField name="phone" label="SĐT" value={form.phone} onChange={handleChange} />
          <TextField name="code" label="Mã GV" value={form.code} onChange={handleChange} />
          <TextField name="academic_level" label="Học vấn" value={form.academic_level} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleSubmit} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Teachers;
