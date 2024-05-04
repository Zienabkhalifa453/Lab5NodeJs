const router = require("express").Router();
const {
  updateTask,
  getTasks,
  getOneTask,
  createTask,
  deleteTask,
} = require("../controllers/tasksController");

const validationMiddleware = require("../middleware/joiMiddleware");

router.route("/").get(getTasks).post(validationMiddleware, createTask);
router.route("/:id").get(getOneTask).delete(deleteTask).patch(updateTask);

module.exports = router;
