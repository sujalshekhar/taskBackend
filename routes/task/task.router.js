const express = require('express');
const { getAllTasksForUser, getTaskById, createTask, updateTask, deleteTask } = require('../../controller/task.controller');

const router = express.Router();

// GET all tasks
router.get('/user/:userId', getAllTasksForUser);

// GET a specific task
router.get('/:taskId', getTaskById);

// CREATE a new task
router.post('/create', createTask);

// UPDATE a task
router.put('/update/:taskId', updateTask);

// DELETE a task
router.delete('/delete/:taskId', deleteTask);

module.exports = router;