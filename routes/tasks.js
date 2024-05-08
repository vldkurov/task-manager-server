const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks/tasks');
const authMiddleware = require("../middleware/authMiddleware");

// POST a new task
router.post('/', authMiddleware, tasksController.createTask);

// GET all tasks
router.get('/', authMiddleware, tasksController.getAllTasks);

// GET a single task by ID
router.get('/:taskId', authMiddleware, tasksController.getTaskById);

// PUT update a task by ID
router.put('/:taskId', authMiddleware, tasksController.updateTask);

// DELETE a task by ID
router.delete('/:taskId', authMiddleware, tasksController.deleteTask);

module.exports = router;
