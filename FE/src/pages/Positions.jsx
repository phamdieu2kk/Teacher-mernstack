// src/pages/Positions.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
import positionApi from '../api/positionApi';
import ModalForm from '../components/ModalForm'; // Import ModalForm

export default function Positions() {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null); // Data for editing
  const [openModal, setOpenModal] = useState(false); // State for ModalForm

  const fetchData = async () => {
    try {
      const res = await positionApi.getAll();
      setPositions(res.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách chức vụ:', error);
      // Optionally show an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (position = null) => {
    setSelectedPosition(position);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPosition(null);
  };

  const handleModalSuccess = () => {
    fetchData(); // Refresh data after successful add/edit
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá chức vụ này?')) {
      try {
        await positionApi.remove(id);
        fetchData(); // Refresh data after deletion
      } catch (error) {
        console.error('Lỗi khi xoá chức vụ:', error);
        alert('Đã có lỗi xảy ra khi xoá chức vụ.');
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Quản lý vị trí công tác
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" mb={2}>
          Danh sách chức vụ
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          sx={{ mb: 2 }}
        >
          Thêm mới
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tên chức vụ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.length > 0 ? (
              positions.map((pos, index) => (
                <TableRow key={pos.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{pos.name}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenModal(pos)}
                      >
                        Sửa
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(pos.id)}
                      >
                        Xoá
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Không có dữ liệu chức vụ.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ModalForm for Add/Edit Position */}
      <ModalForm
        open={openModal}
        onClose={handleCloseModal}
        data={selectedPosition}
        onSuccess={handleModalSuccess}
        type="position"
      />
    </Box>
  );
}