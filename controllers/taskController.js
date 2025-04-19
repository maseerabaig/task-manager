const Task = require('../models/Task');
const User = require('../models/User');
const sendEmail = require('../utils/email');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      createdBy: req.user.userId,
      assignedTo
    });

    if (assignedTo) {
      const assignee = await User.findById(assignedTo);
      const creator = await User.findById(req.user.userId);

      await sendEmail({
        to: [creator.email, assignee.email],
        subject: `New Task Assigned: ${title}`,
        text: `Task: ${title}\nDescription: ${description}\nDue: ${dueDate}`
      });
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating task' });
  }
};
