// controllers/userController.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, identity, dob, role } = req.body;

    // Kiểm tra email tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }

    // Tạo user mới
    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      role: role || 'STUDENT'
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('POST /users error:', error);
    res.status(500).json({ message: 'Lỗi khi tạo user', error: error.message });
  }
};
