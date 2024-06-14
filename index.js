const express = require('express');
const connectDatabase = require('./database/db.config');
require('dotenv').config();
const userRouter = require('./routes/user/user.route');
const taskRouter = require('./routes/task/task.router');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

// connect database
connectDatabase();


// routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});