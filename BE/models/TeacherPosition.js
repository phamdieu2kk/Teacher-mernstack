const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  des: String,
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("TeacherPosition", positionSchema);