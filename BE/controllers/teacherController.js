const Teacher = require("../models/Teacher");
const User = require("../models/User");
const TeacherPosition = require("../models/TeacherPosition");
const generateTeacherCode = require("../utils/generateCode");

exports.getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const teachers = await Teacher.find()
      .populate("userId")
      .populate("teacherPositions")
      .skip(Number(skip))
      .limit(Number(limit));
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, identity, dob, role, startDate, endDate, teacherPositions, degrees } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, phoneNumber, address, identity, dob, role });
    await user.save();

    let code;
    do {
      code = generateTeacherCode();
    } while (await Teacher.findOne({ code }));

    const teacher = new Teacher({ userId: user._id, code, startDate, endDate, teacherPositions, degrees });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};