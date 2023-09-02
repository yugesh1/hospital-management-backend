const express = require("express");
const { isAuthenticatedUser } = require("../utils/auth");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserDetails,
  registerUser,
  loginUser,
  logout,
  getCurrentUserDetails,
} = require("../controller/userController");

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/user/new").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getCurrentUserDetails);
router
  .route("/user/:id")
  .put(updateUser)
  .delete(deleteUser)
  .get(isAuthenticatedUser, getUserDetails);

module.exports = router;
