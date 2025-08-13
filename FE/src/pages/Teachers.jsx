import React, { useEffect, useState, useCallback } from 'react';
import {
  Breadcrumbs, Container, Typography, Button, CircularProgress, Snackbar, Alert,
  Box, TextField, InputAdornment,
  useMediaQuery, useTheme,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import teacherApi from '../api/teacherApi';
import TeacherForm from './TeacherForm';
import TeacherTable from '../components/TeacherTable';

const Teachers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const pageCount = Math.ceil(total / rowsPerPage);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await teacherApi.getAll({ page, limit: rowsPerPage, search: searchTerm });
      setTeachers(res.data || []);
      setTotal(res.total || 0);
    } catch (err) {
      setError('Không thể tải danh sách giáo viên. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchTerm]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingTeacher(null);
  };

  const handleAdd = () => {
    setEditingTeacher(null);
    setOpenForm(true);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            color="text.primary"
            fontSize={isMobile ? '0.9rem' : '1rem'}
            sx={{ color: '#4a148c', fontWeight: 600 }} // chữ tím đậm
          >
            Giáo viên
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          bgcolor: '#f3e5f5', // nền tím nhạt đồng bộ sidebar
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          p: 3,
          minHeight: '60vh',
        }}
      >
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="flex-end"
          alignItems={isMobile ? 'stretch' : 'center'}
          mb={2}
          gap={1}
        >
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} flexGrow={isMobile ? 1 : 0}>
            <TextField
              size="small"
              placeholder="Tìm kiếm thông tin"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{
                width: isMobile ? '100%' : 250,
                '& .MuiInputBase-root': {
                  borderRadius: '20px',
                  bgcolor: '#ffffffff', // tím nhạt nền input
                  height: 32,
                  color: '#4a148c', // chữ tím đậm
                },
                '& .MuiInputBase-input': { fontSize: '0.85rem', p: '6px 12px' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: '#4a148c' }} /> {/* icon tím đậm */}
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon sx={{ fontSize: 16, color: '#4a148c' }} />}
              onClick={fetchTeachers}
              sx={{
                p: '2px 12px',
                fontSize: '0.8rem',
                textTransform: 'none',
                borderColor: '#4a148c',
                color: '#4a148c',
                height: 32,
                '&:hover': {
                  borderColor: '#7b1fa2',
                  bgcolor: '#d1c4e9', // tím nhạt hơn khi hover
                  color: '#7b1fa2',
                },
              }}
            >
              Tải lại
            </Button>

            <Box mt={isMobile ? 1 : 0} sx={{ width: isMobile ? '100%' : 'auto' }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<PersonAddIcon sx={{ fontSize: 16, color: '#fff' }} />}
                onClick={handleAdd}
                sx={{
                  p: '2px 12px',
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  bgcolor: '#4a148c', // tím đậm
                  color: '#f3e5f5', // tím nhạt chữ
                  height: 32,
                  '&:hover': {
                    bgcolor: '#7b1fa2',
                  },
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                Tạo mới
              </Button>
            </Box>
          </Box>
        </Box>

        <TeacherTable
          teachers={teachers}
          loading={loading}
          error={error}
          page={page}
          pageCount={pageCount}
          rowsPerPage={rowsPerPage}
          total={total}
          onEdit={(teacher) => {
            setEditingTeacher(teacher);
            setOpenForm(true);
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          isMobile={isMobile}
        />
      </Box>

      <TeacherForm
        open={openForm}
        onClose={handleCloseForm}
        onSave={() => {
          setOpenForm(false);
          fetchTeachers();
        }}
        teacher={editingTeacher}
      />
    </Container>
  );
};

export default Teachers;
