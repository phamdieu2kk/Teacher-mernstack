require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const teacherRoutes = require('./routes/teacherRoutes');
const positionRoutes = require('./routes/teacherPositionRoutes');
const userRoutes = require('./routes/usersRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/teachers', teacherRoutes);
app.use('/api/teacher-positions', positionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
