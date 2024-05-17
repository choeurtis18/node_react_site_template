const express = require('express');
const router = express.Router();

const taskController = require('../controllers/TasksController');

router.get('/', async (req, res) => {
    try {
      const result = await taskController.getAll();
      res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while get all task", error);
      res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
      const taskData = req.body;
      const result = await taskController.add(taskData);
      res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while creating the task", error);
      res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const result = await taskController.getOne(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while get task", error);
      res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const taskData = req.body;
        const result = await taskController.update(req.params.id, taskData);
        res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while update task", error);
      res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await taskController.delete(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while delete task", error);
      res.status(400).json({ error: error.message });
    }
});

module.exports = router;