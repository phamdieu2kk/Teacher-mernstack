const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Lấy danh sách giáo viên (có thể thêm params filter, paging sau)
router.get('/', teacherController.getAllTeachers); 

// Tạo giáo viên mới (bao gồm tạo luôn user)
router.post('/', teacherController.createTeacher);

// Có thể thêm update, delete nếu cần
// router.put('/:id', teacherController.updateTeacher);
// router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
