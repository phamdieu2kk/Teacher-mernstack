const TeacherPosition = require('../models/TeacherPosition');

exports.getAllPositions = async (req, res) => {
  try {
    let { page = 1, limit = 1000, search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {
      isDeleted: false,
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { des: { $regex: search, $options: 'i' } },
      ],
    };

    const total = await TeacherPosition.countDocuments(filter);

    const data = await TeacherPosition.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      data,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('GET /teacher-positions error:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách vị trí', error: error.message });
  }
};

exports.createPosition = async (req, res) => {
  try {
    const { name, code, des, isActive } = req.body;

    const existing = await TeacherPosition.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: 'Code vị trí đã tồn tại' });
    }

    const newPosition = await TeacherPosition.create({ name, code, des, isActive });
    res.status(201).json(newPosition);
  } catch (error) {
    console.error('POST /teacher-positions error:', error);
    res.status(500).json({ message: 'Lỗi khi tạo vị trí', error: error.message });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, des, isActive } = req.body;

    const existing = await TeacherPosition.findOne({ code, _id: { $ne: id } });
    if (existing) {
      return res.status(400).json({ message: 'Code vị trí đã tồn tại' });
    }

    const updated = await TeacherPosition.findByIdAndUpdate(id, { name, code, des, isActive }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy vị trí' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('PUT /teacher-positions error:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật vị trí', error: error.message });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TeacherPosition.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy vị trí để xoá' });
    }
    res.status(200).json({ message: 'Xoá vị trí thành công' });
  } catch (error) {
    console.error('DELETE /teacher-positions error:', error);
    res.status(500).json({ message: 'Lỗi khi xoá vị trí', error: error.message });
  }
};
