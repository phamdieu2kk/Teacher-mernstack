const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  identity: { type: String, default: '' },
  dob: { type: Date },
  gender: { type: String, default: '' },       // thêm nếu bạn muốn lưu

  isDeleted: { type: Boolean, default: false },
  role: { type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN'], default: 'STUDENT' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
