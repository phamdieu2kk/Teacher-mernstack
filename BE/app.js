const express = require('express');
const cors = require('cors');
const teacherRoutes = require('./routes/teacherRoutes');
const positionRoutes = require('./routes/positionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/teachers', teacherRoutes);
app.use('/teacher-positions', positionRoutes);

module.exports = app;