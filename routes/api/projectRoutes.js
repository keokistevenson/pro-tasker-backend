const router = require("express").Router();
const { Project } = require("../../models");
const { authMiddleware } = require("../../utils/auth");

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
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
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

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
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

module.exports = router;