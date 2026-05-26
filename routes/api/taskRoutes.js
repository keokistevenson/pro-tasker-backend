const router = require("express").Router();
const { Task, Project } = require("../../models");
const { authMiddleware } = require("../../utils/auth");

router.use(authMiddleware);

// UPDATE a task only if logged-in user owns the parent project
router.put("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const project = await Project.findOne({
      _id: task.project,
      user: req.user._id,
    });

    if (!project) {
      return res.status(403).json({
        message: "You are not authorized to update this task.",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Could not update task.",
      error: error.message,
    });
  }
});

// DELETE a task only if logged-in user owns the parent project
router.delete("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const project = await Project.findOne({
      _id: task.project,
      user: req.user._id,
    });

    if (!project) {
      return res.status(403).json({
        message: "You are not authorized to delete this task.",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);

    res.json({
      message: "Task deleted successfully.",
      task: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete task.",
      error: error.message,
    });
  }
});

module.exports = router;