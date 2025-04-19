const express = require('express');
const { protect, admin } = require('../middleware/auth');
const { createTask, deleteTask, reassignTask } = require('../controllers/taskController');
const router = express.Router();
router.post('/create', protect, admin, createTask); 
router.delete('/:id', protect, admin, deleteTask);   
router.put('/reassign/:id', protect, admin, reassignTask);
module.exports = router;
