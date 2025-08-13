import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Typography, Button,
  Box, CircularProgress,
  Select, MenuItem, Breadcrumbs, Link,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import positionApi from '../api/positionApi';
import PositionForm from '../components/PositionForm';
import PositionTable from '../components/PositionTable';

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const pageCount = Math.ceil(total / rowsPerPage);

  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await positionApi.getAll({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
      });

      if (res?.data && Array.isArray(res.data)) {
        setPositions(res.data);
        setTotal(res.total || 0);
      } else if (Array.isArray(res)) {
        setPositions(res);
        setTotal(res.length);
      } else {
        setPositions([]);
        setTotal(0);
        setError('Dữ liệu không đúng định dạng.');
      }
    } catch {
      setPositions([]);
      setTotal(0);
      setError('Không thể tải danh sách vị trí.');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchTerm]);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleEdit = (position) => {
    setEditData(position);
    setOpenForm(true);
  };

  const handleCloseForm = (updated) => {
    setOpenForm(false);
    setEditData(null);
    if (updated) fetchPositions();
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box mb={2}>
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" sx={{ color: '#4a148c' }} />}>
          <Link underline="hover" color="#4a148c" href="/data">
            Dữ liệu
          </Link>
          <Typography color="#4a148c">
            Vị trí công tác
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            onClick={handleAdd}
            sx={{
              p: '2px 12px',
              fontSize: '0.8rem',
              textTransform: 'none',
              backgroundColor: '#7b1fa2',    // tím nhạt
              height: '32px',
              '&:hover': {
                backgroundColor: '#4a148c',  // tím đậm
              },
            }}
          >
            Tạo
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon sx={{ fontSize: 16 }} />}
            onClick={fetchPositions}
            sx={{
              p: '2px 12px',
              fontSize: '0.8rem',
              textTransform: 'none',
              borderColor: '#7b1fa2',
              color: '#7b1fa2',
              height: '32px',
              '&:hover': {
                borderColor: '#4a148c',
                backgroundColor: '#ede7f6',
              },
            }}
          >
            Làm mới
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress size={24} sx={{ color: '#7b1fa2' }} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ bgcolor: '#f3e5f5', color: '#4a148c', fontWeight: 'bold' }}>
          {error}
        </Alert>
      ) : (
        <>
          <PositionTable
            positions={positions}
            page={page}
            rowsPerPage={rowsPerPage}
            onEdit={handleEdit}
          />

          <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center">
            <Typography variant="body2" fontWeight="bold" mr={2} color="#7b1fa2">
              Tổng: {total}
            </Typography>

            <Stack spacing={2} direction="row" alignItems="center">
              <Pagination
                count={pageCount}
                page={page + 1}
                onChange={handleChangePage}
                shape="rounded"
                size="small"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: '0.8rem',
                    minWidth: 26,
                    height: 26,
                    borderRadius: 1,
                    border: '1px solid #7b1fa2',
                    color: '#7b1fa2',
                    '&.Mui-selected': {
                      bgcolor: '#4a148c',
                      color: '#fff',
                      borderColor: '#4a148c',
                    },
                    '&:hover': { bgcolor: '#ede7f6' },
                  },
                }}
              />
            </Stack>

            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              size="small"
              sx={{
                ml: 2,
                fontSize: '0.8rem',
                height: 26,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#7b1fa2' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4a148c' },
                color: '#7b1fa2',
              }}
            >
              {[10, 20, 50, 100].map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ fontSize: '0.8rem', color: '#7b1fa2' }}>
                  {opt} / trang
                </MenuItem>
              ))}
            </Select>
          </Box>
        </>
      )}

      <PositionForm open={openForm} onClose={handleCloseForm} editData={editData} />
    </Container>
  );
};

export default Positions;
