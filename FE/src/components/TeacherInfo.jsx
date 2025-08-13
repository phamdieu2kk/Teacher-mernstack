import React from 'react';
import {
    Box, Typography, TextField, Button, IconButton, Stack, Select,
    MenuItem, InputLabel, FormControl, Checkbox, ListItemText, FormHelperText, Divider,
    Avatar, TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import UploadIcon from '@mui/icons-material/Upload';

const mainColor = '#4a148c';      // tím đậm
const whiteColor = '#fff';        // trắng
const lightBgColor = '#f3e5f5';   // nền tím nhạt
const hoverBgColor = '#e1bee7';   // hover nền tím nhạt hơn

const TeacherInfo = ({
    formData, errors, positions, avatarPreview, fileInputRef, commonTextFieldSx,
    handleAvatarChange, handleChange, handlePositionsChange, handleDegreesChange, addDegree, removeDegree
}) => {
    // Style cho các TextField theo yêu cầu:
    const commonTextFieldSxOverride = {
        fontSize: '0.8rem',
        backgroundColor: whiteColor,
        '& label': { color: mainColor },
        '& label.Mui-focused': { color: mainColor },
        '& .MuiInputBase-input': { fontSize: '0.8rem', color: '#333' },
        '& .MuiOutlinedInput-root': {
            backgroundColor: whiteColor,
            '& fieldset': { borderColor: mainColor },
            '&:hover fieldset': { borderColor: mainColor },
            '&.Mui-focused fieldset': { borderColor: mainColor, borderWidth: 1.5 },
        },
        ...commonTextFieldSx,
    };

    return (
        <>
            {/* Avatar & Personal Info */}
            <Box
                display="flex"
                gap={2}
                flexWrap="nowrap"
                alignItems="flex-start"
                sx={{
                    '@media (max-width: 900px)': {
                        flexWrap: 'wrap',
                        '& > div': {
                            flexBasis: '100%',
                            minWidth: 'auto',
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        flex: '0 0 140px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 1,
                    }}
                >
                    <Box
                        onClick={() => fileInputRef.current.click()}
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            border: `2px dashed ${mainColor}`,
                            bgcolor: lightBgColor,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover': { bgcolor: hoverBgColor },
                        }}
                    >
                        {avatarPreview ? (
                            <Avatar
                                src={avatarPreview}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                }}
                            />
                        ) : (
                            <>
                                <UploadIcon sx={{ fontSize: 28, color: mainColor }} />
                                <Typography variant="caption" sx={{ color: mainColor, mt: 0.5 }}>
                                    Upload
                                </Typography>
                            </>
                        )}
                    </Box>
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={handleAvatarChange}
                        accept="image/*"
                    />
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => fileInputRef.current.click()}
                        sx={{
                            fontSize: '0.75rem',
                            my: 0.5,
                            color: mainColor,
                            borderColor: mainColor,
                            '&:hover': {
                                backgroundColor: mainColor,
                                color: whiteColor,
                                borderColor: mainColor,
                            },
                        }}
                    >
                        Chọn ảnh
                    </Button>
                </Box>
                <Box flexGrow={1}>
                    <Stack spacing={1}>
                        <Divider
                            textAlign="left"
                            sx={{
                                my: 1, py: 2,
                                borderColor: mainColor,
                                '&::before, &::after': { borderColor: mainColor }
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '1rem',
                                    color: mainColor,
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1
                                }}
                            >
                                Thông tin cá nhân
                            </Typography>
                        </Divider>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            <TextField
                                label="Họ và tên" value={formData.name} onChange={handleChange('name')}
                                error={!!errors.name} helperText={errors.name} required size="small" sx={commonTextFieldSxOverride} placeholder="VD: Nguyễn Văn A"
                            />
                            <TextField
                                label="Ngày sinh" type="date" value={formData.dob} onChange={handleChange('dob')}
                                error={!!errors.dob} helperText={errors.dob} InputLabelProps={{ shrink: true }} size="small" sx={commonTextFieldSxOverride}
                            />
                            <TextField
                                label="Số điện thoại" value={formData.phoneNumber} onChange={handleChange('phoneNumber')}
                                error={!!errors.phoneNumber} helperText={errors.phoneNumber} size="small" sx={commonTextFieldSxOverride} placeholder="Nhập số điện thoại"
                            />
                            <TextField
                                label="Email" value={formData.email} onChange={handleChange('email')}
                                error={!!errors.email} helperText={errors.email} required type="email" size="small" sx={commonTextFieldSxOverride} placeholder="example@school.edu.vn"
                            />
                            <TextField
                                label="Số CCCD" value={formData.identity} onChange={handleChange('identity')}
                                error={!!errors.identity} helperText={errors.identity} size="small" sx={commonTextFieldSxOverride} placeholder="Nhập số CCCD"
                            />
                            <TextField
                                label="Địa chỉ" value={formData.address} onChange={handleChange('address')}
                                error={!!errors.address} helperText={errors.address} required size="small" sx={commonTextFieldSxOverride} placeholder="Địa chỉ thường trú"
                            />
                        </Box>
                    </Stack>
                </Box>
            </Box>

            <Divider
                textAlign="left"
                sx={{
                    my: 1, py: 2,
                    borderColor: mainColor,
                    '&::before, &::after': { borderColor: mainColor }
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: '1rem',
                        color: mainColor,
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: 1
                    }}
                >
                    Thông tin công tác
                </Typography>
            </Divider>

            <Box>
                <FormControl fullWidth size="small" error={!!errors.teacherPositionsId} sx={{ mt: 1 }}>
                    <InputLabel
                        id="positions-label"
                        sx={{
                            fontSize: '0.8rem',
                            color: mainColor,
                            '&.Mui-focused': { color: mainColor }
                        }}
                    >
                        Vị trí công tác
                    </InputLabel>
                    <Select
                        labelId="positions-label" multiple value={formData.teacherPositionsId} onChange={handlePositionsChange}
                        renderValue={(selected) => {
                            const names = positions.filter(pos => selected.includes(pos._id)).map(p => p.name);
                            return names.join(', ');
                        }}
                        label="Vị trí công tác" size="small"
                        sx={{
                            fontSize: '0.8rem',
                            '& .MuiSelect-select': { fontSize: '0.8rem' },
                            '& fieldset': { borderColor: mainColor },
                            '&:hover fieldset': { borderColor: mainColor },
                            '&.Mui-focused fieldset': { borderColor: mainColor, borderWidth: 1.5 },
                            '&.Mui-focused.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: mainColor, borderWidth: 1.5 },
                            '& .MuiMenuItem-root': {
                                fontSize: '0.8rem',
                                '&.Mui-selected': { backgroundColor: `${mainColor}33`, color: mainColor },
                                '&:hover': { backgroundColor: `${mainColor}33` }
                            }
                        }}
                    >
                        {positions.map(pos => (
                            <MenuItem key={pos._id} value={pos._id} sx={{ fontSize: '0.8rem' }}>
                                <Checkbox
                                    checked={formData.teacherPositionsId.includes(pos._id)}
                                    size="small"
                                    sx={{ color: mainColor, '&.Mui-checked': { color: mainColor } }}
                                />
                                <ListItemText primary={pos.name} sx={{ color: '#333' }} />
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.teacherPositionsId && (
                        <FormHelperText sx={{ fontSize: '0.7rem', color: mainColor }}>{errors.teacherPositionsId}</FormHelperText>
                    )}
                </FormControl>
            </Box>

            <Divider
                textAlign="left"
                sx={{
                    my: 1, py: 2,
                    borderColor: mainColor,
                    '&::before, &::after': { borderColor: mainColor }
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: '1rem',
                        color: mainColor,
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: 1
                    }}
                >
                    Học vị
                </Typography>
            </Divider>

            <Box>
                <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Button
                        variant="outlined" size="small" onClick={addDegree}
                        sx={{
                            fontSize: '0.8rem',
                            color: mainColor,
                            borderColor: mainColor,
                            '&:hover': { backgroundColor: mainColor, color: whiteColor, borderColor: mainColor }
                        }}
                    >
                        Thêm
                    </Button>
                </Box>
                <TableContainer sx={{ mt: 1, border: '1px solid', borderColor: mainColor, borderRadius: 1 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: lightBgColor }}>
  <TableRow>
    {['Bậc', 'Trường', 'Chuyên ngành', 'Trạng thái', 'Tốt nghiệp',  ''].map((title, idx) => (
      <TableCell
        key={idx}
        sx={{
          fontWeight: 'bold',
          width: ['15%', '25%', '25%', '10%', '15%', '10%'][idx],
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          p: 1,
          color: mainColor
        }}
      >
        {title}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
<TableBody>
  {formData.degrees.length === 0 ? (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ p: 1 }}>
        <Box sx={{ py: 1, color: mainColor, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <MailOutlineIcon sx={{ fontSize: 50, opacity: 0.3, color: mainColor }} />
          <Typography variant="body2" sx={{ fontSize: '0.75rem', color: mainColor }}>Trống</Typography>
        </Box>
      </TableCell>
    </TableRow>
  ) : (
    formData.degrees.map((degree, idx) => (
      <TableRow key={idx}>
        {/* Bậc */}
        <TableCell sx={{ p: 0.5 }}>
          <FormControl size="small" fullWidth error={!!errors[`degree-${idx}`]}>
            <Select
              value={degree.type} onChange={handleDegreesChange(idx, 'type')} displayEmpty size="small"
              sx={{
                fontSize: '0.8rem',
                '& fieldset': { borderColor: mainColor },
                '&:hover fieldset': { borderColor: mainColor },
                '&.Mui-focused fieldset': { borderColor: mainColor, borderWidth: 1.5 },
                '&.Mui-focused.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: mainColor, borderWidth: 1.5 },
                '& .MuiSelect-select': { fontSize: '0.8rem' }, color: '#333',
              }}
            >
              <MenuItem value="" disabled sx={{ fontSize: '0.8rem' }}>Chọn bậc</MenuItem>
              {['Cử nhân', 'Kỹ sư', 'Thạc sĩ', 'Giáo sư', 'Tiến sĩ'].map((level) => (
                <MenuItem key={level} value={level} sx={{ fontSize: '0.8rem' }}>{level}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        {/* Trường */}
        <TableCell sx={{ p: 0.5 }}>
          <TextField
            size="small" fullWidth value={degree.school} onChange={handleDegreesChange(idx, 'school')} error={!!errors[`degree-${idx}`]}
            placeholder="Tên trường"
            sx={{
              backgroundColor: whiteColor,
              '& .MuiInputBase-input': { fontSize: '0.8rem', py: 1, color: '#333' },
              '& .MuiInputLabel-root': { fontSize: '0.8rem' },
              '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: mainColor }, '&:hover fieldset': { borderColor: mainColor }, '&.Mui-focused fieldset': { borderColor: mainColor, borderWidth: 1.5 } }
            }}
          />
        </TableCell>
        {/* Chuyên ngành */}
        <TableCell sx={{ p: 0.5 }}>
          <TextField
            size="small" fullWidth value={degree.major} onChange={handleDegreesChange(idx, 'major')} error={!!errors[`degree-${idx}`]}
            placeholder="Chuyên ngành"
            sx={{
              backgroundColor: whiteColor,
              '& .MuiInputBase-input': { fontSize: '0.8rem', py: 1, color: '#333' },
              '& .MuiInputLabel-root': { fontSize: '0.8rem' },
              '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: mainColor }, '&:hover fieldset': { borderColor: mainColor }, '&.Mui-focused fieldset': { borderColor: mainColor, borderWidth: 1.5 } }
            }}
          />
        </TableCell>
        {/* Tốt nghiệp (hiển thị year - năm tốt nghiệp) */}
       
        {/* Năm (hiển thị isGraduated: hoàn thành / chưa hoàn thành) */}
        <TableCell sx={{ p: 0.5 }}>
          <FormControl size="small" fullWidth>
            <Select
              value={String(degree.isGraduated)} onChange={handleDegreesChange(idx, 'isGraduated')} size="small"
              sx={{
                fontSize: '0.8rem',
                '& fieldset': { borderColor: mainColor },
                '&:hover fieldset': { borderColor: mainColor },
                '&.Mui-focused fieldset': { borderColor: mainColor, borderWidth: 1.5 },
                '&.Mui-focused.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: mainColor, borderWidth: 1.5 },
              }}
            >
              <MenuItem value="true" sx={{ fontSize: '0.8rem' }}>Hoàn thành</MenuItem>
              <MenuItem value="false" sx={{ fontSize: '0.8rem' }}>Chưa hoàn thành</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
         <TableCell sx={{ p: 0.5 }}>
          <TextField
            size="small" fullWidth value={degree.year} onChange={handleDegreesChange(idx, 'year')} error={!!errors[`degree-${idx}`]}
            placeholder="Năm"
            type="number"
            InputProps={{ inputProps: { min: 1900, max: 2100 } }}
            sx={{
              backgroundColor: whiteColor,
              '& .MuiInputBase-input': { fontSize: '0.8rem', py: 1, color: '#333' },
              '& .MuiInputLabel-root': { fontSize: '0.8rem' },
              '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: mainColor }, '&:hover fieldset': { borderColor: mainColor }, '&.Mui-focused fieldset': { borderColor: mainColor, borderWidth: 1.5 } }
            }}
          />
        </TableCell>
        {/* Nút xóa */}
        <TableCell sx={{ p: 0.5 }} align="center">
          <IconButton size="small" onClick={() => removeDegree(idx)} sx={{ color: mainColor, '&:hover': { color: '#2c0466' } }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

                    </Table>
                </TableContainer>
                {Object.keys(errors).some(key => key.startsWith('degree-')) && (
                    <FormHelperText error sx={{ mt: 1, fontSize: '0.7rem', color: mainColor }}>
                        Vui lòng nhập đầy đủ thông tin cho tất cả các học vị.
                    </FormHelperText>
                )}
            </Box>
        </>
    );
};

export default TeacherInfo;
