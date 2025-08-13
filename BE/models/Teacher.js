const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  school: { type: String, default: '' },
  major: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  isGraduated: { type: Boolean, default: true },
}, { _id: false });

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, unique: true, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  startDate: { type: Date },
  endDate: { type: Date },
  teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
  degrees: [degreeSchema],
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);