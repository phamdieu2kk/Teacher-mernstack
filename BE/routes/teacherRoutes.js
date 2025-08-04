const express = require("express");
const router = express.Router();
const { getAllTeachers, createTeacher } = require("../controllers/teacherController");

router.get("/", getAllTeachers);
router.post("/", createTeacher);

module.exports = router;