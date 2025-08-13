import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Button,
  Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const PRIMARY = '#7b1fa2';        // tím đậm
const PRIMARY_DARK = '#4a148c';   // tím đậm hơn
const PRIMARY_LIGHT = '#d1c4e9';  // tím nhạt hover
const STATUS_ACTIVE = '#3fac45';  // xanh lá
const STATUS_INACTIVE = '#f44506'; // đỏ cam

const StyledTableRow = styled(TableRow)(() => ({
  fontSize: '0.8rem',
  backgroundColor: 'transparent',
  '&:nth-of-type(odd)': { backgroundColor: '#f3e5f5' }, // tím nhạt dòng chẵn
  '&:hover': {
    backgroundColor: PRIMARY_LIGHT,  // nền tím nhạt khi hover
    cursor: 'pointer',
    '& > .MuiTableCell-root': {
      color: PRIMARY_DARK,            // chữ tím đậm khi hover
    },
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: '10px 12px',
  fontSize: '0.8rem',
  borderBottom: 'none',
  color: PRIMARY_DARK,              // chữ tím đậm mặc định
}));

const PositionTable = ({ positions, page, rowsPerPage, onEdit }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        border: `1px solid ${PRIMARY}`,  // viền tím đậm
        overflowX: 'auto',
      }}
    >
      <Table size="small" aria-label="positions table" sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <TableHead sx={{ backgroundColor: PRIMARY }}>
          <TableRow>
            {['STT', 'Mã', 'Tên', 'Trạng thái', 'Mô tả', 'Hành động'].map((title, idx) => (
              <StyledTableCell
                key={idx}
                align={title === 'Hành động' ? 'center' : 'left'}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  color: '#f3e5f5',        // chữ trắng trên nền tím
                  borderBottom: 'none',
                }}
              >
                <Typography fontWeight="bold" fontSize="inherit" color="inherit">
                  {title}
                </Typography>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {positions.length > 0 ? (
            positions.map((pos, idx) => (
              <StyledTableRow key={pos._id || idx}>
                <StyledTableCell>{page * rowsPerPage + idx + 1}</StyledTableCell>
                <StyledTableCell>{pos.code}</StyledTableCell>
                <StyledTableCell>{pos.name}</StyledTableCell>
                <StyledTableCell>
                  <Box
                    sx={{
                      bgcolor: pos.isActive ? STATUS_ACTIVE : STATUS_INACTIVE,
                      color: '#fff',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      minWidth: '90px',
                      textAlign: 'center',
                      display: 'inline-block',
                    }}
                  >
                    {pos.isActive ? 'Hoạt động' : 'Ngừng'}
                  </Box>
                </StyledTableCell>
                <StyledTableCell>{pos.des || ' '}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() => onEdit(pos)}
                    size="small"
                    sx={{
                      color: PRIMARY,
                      minWidth: '32px',
                      '&:hover': { backgroundColor: PRIMARY_LIGHT },
                      p: '2px',
                    }}
                  >
                    <SettingsIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{ color: PRIMARY, fontWeight: 'bold', fontSize: '0.8rem' }}
              >
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PositionTable;
