const teacherRoutes = require('./routes/teacherRoutes');
const userRoutes = require('./routes/usersRoutes');



app.use('/api', teacherRoutes);
app.use('/api/users', userRoutes);