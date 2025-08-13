// routes/teacherPositionRoutes.js
const express = require('express');
const router = express.Router();
const positionController = require('../controllers/teacherPositionController');

router.get('/', positionController.getAllPositions);
router.post('/', positionController.createPosition);
router.put('/:id', positionController.updatePosition);
router.delete('/:id', positionController.deletePosition);

module.exports = router;