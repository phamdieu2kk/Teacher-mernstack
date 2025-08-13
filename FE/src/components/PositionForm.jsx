import React, { useState, useEffect } from 'react';
import {
  Divider,
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  CircularProgress,
  Snackbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import positionApi from '../api/positionApi';
import CustomSnackbar from '../CustomSnackbar';
const PRIMARY = '#7b1fa2';        // tím đậm
const PRIMARY_DARK = '#4a148c';   // tím đậm hơn
const PRIMARY_LIGHT = '#d1c4e9';  // tím nhạt (dùng hover)
const STATUS_ACTIVE = '#3fac45';  // xanh lá
const STATUS_INACTIVE = '#f44506'; // đỏ cam

const PositionForm = ({ open, onClose, editData }) => {
  const [formState, setFormState] = useState({
    code: '',
    name: '',
    des: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const isEditing = Boolean(editData);

  useEffect(() => {
    setFormState({
      code: editData?.code || '',
      name: editData?.name || '',
      des: editData?.des || '',
      isActive: editData?.isActive ?? true,
    });
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((s) => ({ ...s, open: false }));
    if (snackbar.severity === 'success') {
      onClose(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await positionApi.update(editData._id, formState);
        setSnackbar({
          open: true,
          message: 'Cập nhật vị trí thành công',
          severity: 'success',
        });
      } else {
        await positionApi.create(formState);
        setSnackbar({
          open: true,
          message: 'Lưu thông tin vị trí công tác mới thành công',
          severity: 'success',
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Lỗi khi lưu vị trí. Vui lòng thử lại.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose(false)} ModalProps={{ keepMounted: true }}>
         <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

        <Box
          sx={{
            width: 400,
            p: 3,
            py: 10,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ lineHeight: 1.6, color: PRIMARY }}
            >
              {isEditing ? 'Chỉnh sửa vị trí công tác' : 'Vị trí công tác'}
            </Typography>
            <Button
              onClick={() => onClose(false)}
              color="inherit"
              aria-label="close"
              sx={{ minWidth: 'auto', p: 0.5, color: '#fff'  }}
            >
              <CloseIcon />
            </Button>
          </Box>

          <Divider sx={{ mb: 2, borderColor: PRIMARY }} />

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}
          >
            <FormControl>
              <FormLabel sx={{ mb: 0.5, color: PRIMARY, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Mã
              </FormLabel>
              <TextField
                name="code"
                value={formState.code}
                onChange={handleChange}
                required
                size="small"
                variant="outlined"
                disabled={isEditing}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: PRIMARY },
                    '&:hover fieldset': { borderColor: '#9c27b0' },
                    '&.Mui-focused fieldset': { borderColor: PRIMARY, borderWidth: 1.5 },
                  },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ mb: 0.5, color: PRIMARY, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Tên
              </FormLabel>
              <TextField
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                size="small"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: PRIMARY },
                    '&:hover fieldset': { borderColor: '#9c27b0' },
                    '&.Mui-focused fieldset': { borderColor: PRIMARY, borderWidth: 1.5 },
                  },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ mb: 0.5, color: PRIMARY, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Mô tả
              </FormLabel>
              <TextField
                name="des"
                value={formState.des}
                onChange={handleChange}
                multiline
                rows={3}
                size="small"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: PRIMARY },
                    '&:hover fieldset': { borderColor: '#9c27b0' },
                    '&.Mui-focused fieldset': { borderColor: PRIMARY, borderWidth: 1.5 },
                  },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ mb: 1, color: PRIMARY, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Trạng thái
              </FormLabel>
              <ToggleButtonGroup
                value={formState.isActive}
                exclusive
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setFormState((prev) => ({ ...prev, isActive: newValue }));
                  }
                }}
                sx={{
                  '& .MuiToggleButton-root': {
                    flex: 1,
                    textTransform: 'none',
                    border: `1px solid ${PRIMARY}`,
                    borderRadius: '4px !important',
                    color: PRIMARY,
                    fontWeight: 600,
                    '&.Mui-selected': {
                      backgroundColor: PRIMARY,
                      color: '#fff',
                      border: `1px solid ${PRIMARY}`,
                      '&:hover': {
                        backgroundColor: '#ad85deff',
                      },
                    },
                    '&:hover': {
                      borderColor: '#9c27b0',
                      color: '#000000ff',
                    },
                  },
                }}
              >
                <ToggleButton value={true}>Hoạt động</ToggleButton>
                <ToggleButton value={false}>Ngừng</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                type="submit"
                variant="outlined"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                disabled={loading}
                sx={{
                  color: PRIMARY,
                  borderColor: PRIMARY,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: PRIMARY,
                    color: '#fff',
                  },
                }}
              >
                {isEditing ? 'Lưu thay đổi' : 'Lưu'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default PositionForm;
