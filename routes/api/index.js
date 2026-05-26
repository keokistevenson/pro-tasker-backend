const router = require("express").Router();

const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");


router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
// router.use("/tasks", taskRoutes);

module.exports = router;