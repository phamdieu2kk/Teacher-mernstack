import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Typography, Avatar, Chip, Button, Stack, Select, MenuItem,
  styled, useMediaQuery, useTheme,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';

const StyledTableRow = styled(TableRow)(() => ({
  fontSize: '0.8rem',
  backgroundColor: 'transparent',
  '&:nth-of-type(odd)': { backgroundColor: '#f3e5f5' }, // nền tím nhạt cho dòng chẵn
  '&:hover': { backgroundColor: '#d1c4e9', cursor: 'pointer' }, // hover tím nhạt hơn
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: '10px 12px',
  fontSize: '0.8rem',
  borderBottom: 'none',
  color: '#4a148c', // chữ tím đậm mặc định
}));

const TeacherTable = ({
  teachers,
  loading,
  error,
  page,
  pageCount,
  rowsPerPage,
  total,
  onEdit,
  onChangePage,
  onChangeRowsPerPage,
  isMobile,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography sx={{ color: '#4a148c' }}>Đang tải...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          borderRadius: 0,
          overflowX: isMobile ? 'auto' : 'visible',
        }}
      >
        <Table
          size="small"
          sx={{
            borderCollapse: 'separate',
            borderSpacing: 0,
            minWidth: isMobile ? 650 : 'auto',
          }}
        >
          <TableHead sx={{ bgcolor: '#7b1fa2' }}> {/* header tím đậm */}
            <TableRow>
              {[ 
                'Mã', 'Giáo viên', 'Trình độ (cao nhất)', 'Bộ Môn', 'TT công tác',
                isMobile ? '' : 'Địa chỉ', 'Trạng thái', 'Hành động',
              ].map(
                (title, i) =>
                  title && (
                    <StyledTableCell
                      key={i}
                      align={title === 'Hành động' ? 'center' : 'left'}
                      sx={{ 
                        fontSize: isMobile ? '0.7rem' : '0.8rem', 
                        minWidth: i === 1 ? 140 : 'auto',
                        color: '#f3e5f5', // chữ trắng header
                        fontWeight: 'bold',
                      }}
                    >
                      {title}
                    </StyledTableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => {
                const { _id, user, degrees, teacherPositions, code, subjects, isActive } = teacher;
                const highestDegree = (degrees || []).slice(-1)[0];

                return (
                  <StyledTableRow
                    key={_id}
                    sx={{
                      '&:hover': {
                        bgcolor: '#d1c4e9',
                        '& > .MuiTableCell-root': {
                          color: '#4a148c',
                        },
                      },
                    }}
                  >
                    <StyledTableCell sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#4a148c' }}>
                      {code || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem', minWidth: 140, color: '#4a148c' }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar src={user?.profilePicture || ''} sx={{ width: 28, height: 28 }} />
                        <Box>
                          <Typography fontWeight="bold" fontSize={isMobile ? '0.75rem' : '0.8rem'} color="#4a148c">
                            {user?.name || 'Chưa có tên'}
                          </Typography>
                          {!isMobile && (
                            <>
                              <Typography variant="body2" color="#6a1b9a" fontSize="0.7rem">
                                {user?.email || 'Chưa có email'}
                              </Typography>
                              <Typography variant="body2" fontSize="0.7rem" color="#6a1b9a">
                                {user?.phoneNumber || 'Chưa có SĐT'}
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: isMobile ? '0.65rem' : '0.8rem', minWidth: 100, color: '#4a148c' }}>
                      {highestDegree ? (
                        <>
                          <Typography variant="body2" fontSize="inherit">
                            Bậc: {highestDegree.type}
                          </Typography>
                          <Typography variant="body2" fontSize="inherit">
                            Chuyên ngành: {highestDegree.major}
                          </Typography>
                        </>
                      ) : (
                        'N/A'
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem', minWidth: 100, color: '#4a148c' }}>
                      {subjects?.length > 0
                        ? subjects.map((subj, idx) => (
                            <Typography key={subj._id || idx} variant="body2" fontSize="inherit">
                              {subj.name}
                            </Typography>
                          ))
                        : 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem', minWidth: 100, color: '#4a148c' }}>
                      {teacherPositions?.length > 0
                        ? teacherPositions.map((pos, idx) => (
                            <Typography key={pos._id || idx} variant="body2" fontSize="inherit">
                              {pos.name}
                            </Typography>
                          ))
                        : 'N/A'}
                    </StyledTableCell>
                    {!isMobile && (
                      <StyledTableCell sx={{ fontSize: '0.8rem', minWidth: 150, color: '#4a148c' }}>
                        <Typography variant="body2">{user?.address || 'N/A'}</Typography>
                      </StyledTableCell>
                    )}
                    <StyledTableCell sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                      <Chip
                        label={isActive ? 'Đang công tác' : 'Nghỉ việc'}
                        size="small"
                        sx={{
                          fontSize: isMobile ? '0.65rem' : '0.7rem',
                          bgcolor: isActive ? '#3fac45' : '#f44506', // xanh lá hoặc cam
                          color: '#fff',
                          fontWeight: '600',
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100, color: '#4a148c' }}>
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%" gap={0.5}>
                        <Button
                          variant="outlined"
                          size={isMobile ? 'small' : 'medium'}
                          onClick={() => onEdit(teacher)}
                          sx={{
                            p: isMobile ? '2px 6px' : '2px 8px',
                            fontSize: isMobile ? '0.65rem' : '0.7rem',
                            textTransform: 'none',
                            minHeight: 26,
                            minWidth: isMobile ? 70 : 90,
                            borderColor: '#7b1fa2', // tím đậm
                            color: '#7b1fa2',
                            '&:hover': {
                              bgcolor: '#d1c4e9',
                              borderColor: '#4a148c',
                              color: '#4a148c',
                            },
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: isMobile ? 12 : 13, mr: 0.3, color: 'inherit' }} />
                          Chi tiết
                        </Button>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 7 : 8}
                  align="center"
                  sx={{ fontSize: isMobile ? '0.8rem' : '1rem', color: '#4a148c' }}
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        mt={2}
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="flex-end"
        alignItems="center"
        gap={1}
      >
        <Typography
          variant="body2"
          fontWeight="bold"
          color="#7b1fa2"
          fontSize={isMobile ? '0.8rem' : '0.9rem'}
        >
          Tổng: {total}
        </Typography>

        <Stack spacing={2} direction="row" alignItems="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={onChangePage}
            shape="rounded"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                minWidth: 26,
                height: 26,
                borderRadius: 1,
                border: '1px solid #7b1fa2',
                color: '#7b1fa2',
                '&.Mui-selected': {
                  bgcolor: '#7b1fa2',
                  color: '#fff',
                  borderColor: '#4a148c',
                },
                '&:hover': { bgcolor: '#d1c4e9' },
              },
            }}
          />
        </Stack>

        <Select
          value={rowsPerPage}
          onChange={onChangeRowsPerPage}
          size="small"
          sx={{
            ml: 2,
            fontSize: isMobile ? '0.7rem' : '0.8rem',
            height: 26,
            minWidth: 80,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#7b1fa2' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4a148c' },
            color: '#4a148c',
          }}
        >
          {[10, 20, 50, 100].map((opt) => (
            <MenuItem key={opt} value={opt} sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#4a148c' }}>
              {opt} / trang
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default TeacherTable;
