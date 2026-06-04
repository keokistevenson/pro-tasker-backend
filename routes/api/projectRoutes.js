const router = require("express").Router();
const mongoose = require("mongoose");

const { Project, Task } = require("../../models");
const { authMiddleware } = require("../../utils/auth");


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Every Project route below this requires a valid JWT
router.use(authMiddleware);

// CREATE a Project
router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Could not create project.",
      error: error.message,
    });
  }
});

// GET all projects owned by logged-in user
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user._id,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Could not get projects.",
      error: error.message,
    });
  }
});

// GET one project owned by logged-in user
router.get("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: "Could not get project.",
      error: error.message,
    });
  }
});

// UPDATE one project owned by logged-in user
router.put("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: "Could not update project.",
      error: error.message,
    });
  }
});

// DELETE one project owned by logged-in user
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    res.json({
      message: "Project deleted successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete project.",
      error: error.message,
    });
  }
});

// CREATE a task for a project owned by logged-in user
router.post("/:projectId/tasks", async (req, res) => {
  try {

    if (!isValidObjectId(req.params.projectId)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const task = await Task.create({
      ...req.body,
      project: req.params.projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Could not create task.",
      error: error.message,
    });
  }
});

// GET all tasks for a project owned by logged-in user
router.get("/:projectId/tasks", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.projectId)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const tasks = await Task.find({
      project: req.params.projectId,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Could not get tasks.",
      error: error.message,
    });
  }
});

module.exports = router;