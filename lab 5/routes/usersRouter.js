const express = require("express");
const router = express.Router();
const {
  getUsers,
  register,
  login,
  updateUser,
  deleteUser,
  getOneUser,
} = require("../controllers/usersController");


router.route("/").get(getUsers).post(register);
router.post("/login", login);
router.route("/:id").get(getOneUser).delete(deleteUser).patch(updateUser);


module.exports = router;
