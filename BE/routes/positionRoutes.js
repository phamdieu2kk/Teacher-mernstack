const express = require("express");
const router = express.Router();
const { getAllPositions, createPosition } = require("../controllers/positionController");

router.get("/", getAllPositions);
router.post("/", createPosition);

module.exports = router;