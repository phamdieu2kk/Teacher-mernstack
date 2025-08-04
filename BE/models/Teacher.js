const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  code: { type: String, unique: true },
  startDate: Date,
  endDate: Date,
  teacherPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" }],
  degrees: [{
    type: { type: String },
    school: String,
    major: String,
    year: Number,
    isGraduated: Boolean
  }]
});

module.exports = mongoose.model("Teacher", teacherSchema);