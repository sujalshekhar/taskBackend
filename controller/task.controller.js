const Task = require('../Schema/task.model');

const createTask = async (req, res) => {
    const taskBody = req.body;
    try {
        const task = await Task.create(taskBody);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllTasksForUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskById = async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const task = await Task.findById(taskId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    const taskBody = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, taskBody, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    console.log("Delete Task", req.params.taskId)
    const taskId = req.params.taskId;
    try {
        await Task.findByIdAndDelete(taskId);
        res.status(200).send("Task Deleted Successfully")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTask,
    getAllTasksForUser,
    getTaskById,
    updateTask,
    deleteTask
}