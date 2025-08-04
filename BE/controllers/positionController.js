const TeacherPosition = require("../models/TeacherPosition");

exports.getAllPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPosition = async (req, res) => {
  try {
    const { name, code, des } = req.body;
    const existing = await TeacherPosition.findOne({ code });
    if (existing) return res.status(400).json({ message: "Code already exists" });
    const position = new TeacherPosition({ name, code, des });
    await position.save();
    res.status(201).json(position);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};