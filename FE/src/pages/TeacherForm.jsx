import React, { useEffect, useState, useRef } from 'react';
import {
    Drawer, Box, Typography, Button, IconButton, Stack, Divider, FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TeacherInfo from '../components/TeacherInfo';
import positionApi from '../api/positionApi';
import teacherApi from '../api/teacherApi';
import CustomSnackbar from '../CustomSnackbar';
const defaultDegree = { type: '', school: '', major: '', year: '', isGraduated: false };

const TeacherForm = ({ open, onClose, onSave, teacher }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', phoneNumber: '', address: '', identity: '',
        dob: '', teacherPositionsId: [], degrees: [], teacherCode: '',
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const fileInputRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const [errors, setErrors] = useState({});
    
    // Snackbar state phải nằm trong component
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Hàm đóng snackbar
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const commonTextFieldSx = {
        flexGrow: 1,
        flexBasis: 'calc(50% - 8px)',
        '& .MuiInputBase-input': {
            fontSize: '0.8rem',
            py: 1,
            color: '#4a148c',
        },
        '& .MuiInputLabel-root': {
            fontSize: '0.8rem',
            color: '#7b1fa2',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#7b1fa2',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#7b1fa2',
            },
            '&:hover fieldset': {
                borderColor: '#7b1fa2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7b1fa2',
                borderWidth: 1.5,
            },
        },
        '& .MuiFormHelperText-root': {
            fontSize: '0.7rem',
            color: '#7b1fa2',
            marginLeft: 0,
        },
    };

    useEffect(() => {
        if (open) {
            const fetchPositions = async () => {
                try {
                    const res = await positionApi.getAll();
                    let allPositions = res.data || [];
                    const uniquePositions = [];
                    const seen = new Set();
                    allPositions.forEach(pos => {
                        if (!seen.has(pos.name)) {
                            seen.add(pos.name);
                            uniquePositions.push(pos);
                        }
                    });
                    setPositions(uniquePositions);
                } catch (error) {
                    setSnackbar({ open: true, message: 'Lỗi khi tải danh sách vị trí công tác.', severity: 'error' });
                }
            };
            fetchPositions();
        }
    }, [open]);

    useEffect(() => {
        if (teacher) {
            setFormData({
                name: teacher.user?.name || '',
                email: teacher.user?.email || '',
                phoneNumber: teacher.user?.phoneNumber || '',
                address: teacher.user?.address || '',
                identity: teacher.user?.identity || '',
                dob: teacher.user?.dob ? new Date(teacher.user.dob).toISOString().split('T')[0] : '',
                teacherPositionsId: teacher.teacherPositions?.map(pos => pos._id) || [],
                degrees: teacher.degrees && teacher.degrees.length > 0 ? teacher.degrees : [],
                teacherCode: teacher.code || '',
            });
            if (teacher.user?.avatar) {
                setAvatarPreview(`http://localhost:5000/${teacher.user.avatar}`);
            } else {
                setAvatarPreview('');
            }
        } else {
            setFormData({
                name: '', email: '', phoneNumber: '', address: '', identity: '',
                dob: '', teacherPositionsId: [], degrees: [], teacherCode: '',
            });
            setAvatarPreview('');
            setAvatarFile(null);
        }
        setErrors({});
    }, [teacher, open]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Tên là bắt buộc.';
        if (!formData.email.trim()) newErrors.email = 'Email là bắt buộc.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ.';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Số điện thoại là bắt buộc.';
        if (!formData.address.trim()) newErrors.address = 'Địa chỉ là bắt buộc.';
        if (!formData.identity.trim()) newErrors.identity = 'Số CCCD là bắt buộc.';
        if (!formData.dob.trim()) newErrors.dob = 'Ngày sinh là bắt buộc.';

        if (formData.degrees.length > 0) {
            formData.degrees.forEach((d, idx) => {
                if (!d.type?.trim() || !d.major?.trim() || !d.school?.trim()) {
                    newErrors[`degree-${idx}`] = 'Cần nhập đầy đủ thông tin học vị (Bậc, Trường, Chuyên ngành).';
                }
            });
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleDegreesChange = (index, field) => (e) => {
        const value = e.target.value;
        setFormData(prev => {
            const newDegrees = [...prev.degrees];
            newDegrees[index] = {
                ...newDegrees[index],
                [field]: field === 'isGraduated' ? value === 'true' : value
            };
            return { ...prev, degrees: newDegrees };
        });
        if (errors[`degree-${index}`]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`degree-${index}`];
                return newErrors;
            });
        }
    };

    const addDegree = () => {
        setFormData(prev => ({ ...prev, degrees: [...prev.degrees, { ...defaultDegree }] }));
    };

    const removeDegree = (index) => {
        setFormData(prev => {
            const newDegrees = [...prev.degrees];
            newDegrees.splice(index, 1);
            return { ...prev, degrees: newDegrees };
        });
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[`degree-${index}`];
            return newErrors;
        });
    };

    const handlePositionsChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            teacherPositionsId: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async () => {
        // Xoá message cũ
        setSnackbar({ open: false, message: '', severity: 'success' });
        setErrors({});

        if (!validate()) {
            setSnackbar({ open: true, message: 'Vui lòng kiểm tra lại các trường thông tin.', severity: 'error' });
            return;
        }

        const degreesArray = (formData.degrees || []).map(d => ({
            type: d.type?.trim() || '',
            school: d.school?.trim() || '',
            major: d.major?.trim() || '',
            year: d.year ? Number(d.year) : null,
            isGraduated: !!d.isGraduated
        }));

        try {
            if (avatarFile) {
                const formDataPayload = new FormData();
                formDataPayload.append('name', formData.name.trim());
                formDataPayload.append('email', formData.email.trim());
                formDataPayload.append('phoneNumber', formData.phoneNumber.trim());
                formDataPayload.append('address', formData.address.trim());
                formDataPayload.append('identity', formData.identity.trim());
                formDataPayload.append('dob', formData.dob);
                formDataPayload.append('teacherCode', formData.teacherCode || '');
                formDataPayload.append('teacherPositionsId', JSON.stringify(formData.teacherPositionsId));
                formDataPayload.append('degrees', JSON.stringify(degreesArray));
                formDataPayload.append('avatar', avatarFile);

                if (teacher) {
                    await teacherApi.update(teacher._id, formDataPayload);
                } else {
                    await teacherApi.create(formDataPayload);
                }
            } else {
                const payload = {
                    ...formData,
                    degrees: degreesArray,
                };
                if (teacher) {
                    await teacherApi.update(teacher._id, payload);
                } else {
                    await teacherApi.create(payload);
                }
            }

            setSnackbar({ open: true, message: teacher ? 'Cập nhật giáo viên thành công!' : 'Tạo mới giáo viên thành công!', severity: 'success' });

            onSave();
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Lỗi khi lưu thông tin giáo viên.';
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
    };

    return (
        <>
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: '60vw',
                    maxWidth: '100vw',
                    p: 2,
                    height: '100%',
                    resize: 'horizontal',
                    overflow: 'auto',
                    bgcolor: '#fff',
                }
            }}
        >
            <Box display="flex" flexDirection="column" height="100%" bgcolor="#fff">
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            fontSize: '1.2rem',
                            mt: 1,
                            color: '#4a148c',
                        }}
                    >
                        {teacher ? 'Chỉnh sửa giáo viên' : 'Tạo thông tin giáo viên'}
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ color: '#7b1fa2' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: '#7b1fa2' }} />

                {/* Main Content */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1, bgcolor: '#fff' }}>
                    <Stack spacing={1}>
                        <TeacherInfo
                            formData={formData}
                            errors={errors}
                            positions={positions}
                            avatarPreview={avatarPreview}
                            fileInputRef={fileInputRef}
                            commonTextFieldSx={commonTextFieldSx}
                            handleAvatarChange={handleAvatarChange}
                            handleChange={handleChange}
                            handlePositionsChange={handlePositionsChange}
                            handleDegreesChange={handleDegreesChange}
                            addDegree={addDegree}
                            removeDegree={removeDegree}
                        />
                    </Stack>
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        size="small"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#7b1fa2',
                            '&:hover': {
                                backgroundColor: '#4a148c',
                            },
                        }}
                    >
                        {teacher ? 'Cập nhật' : 'Lưu'}
                    </Button>
                </Box>
            </Box>
        </Drawer>

        {/* Snackbar riêng ngoài Drawer */}
        <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
        />
        </>
    );
};

export default TeacherForm;
