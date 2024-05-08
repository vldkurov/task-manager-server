const {Task} = require('../../models');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            dueDate: req.body.dueDate,
            userId: req.user.id  // Use the userId from the auth middleware
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Retrieve all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {userId: req.user.id}
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Retrieve a single task by id
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.taskId,
                userId: req.user.id  // Ensure the task belongs to the logged-in user
            }
        });
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({message: 'Task not found or access denied'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// Update a task by id
exports.updateTask = async (req, res) => {
    try {
        const updated = await Task.update(req.body, {
            where: {
                id: req.params.taskId,
                userId: req.user.id  // Verify task belongs to the user
            }
        });
        if (updated[0] > 0) {
            const updatedTask = await Task.findByPk(req.params.taskId);
            res.json(updatedTask);
        } else {
            res.status(404).json({message: 'Task not found or access denied'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// Delete a task by id
exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({
            where: {
                id: req.params.taskId,
                userId: req.user.id  // Ensure deletion is permitted only for the task owner
            }
        });
        if (deleted) {
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({message: 'Task not found or access denied'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

