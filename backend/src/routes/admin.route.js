var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");

const AdminController = require("../controller/admin.controller");
const UserController = require("../controller/user.controller");

const USER_ROLE = require("../constants/globals");

// test api
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Admin' route is working!" });
});

/**
 * Admin Related Endpoints
 * DELETE a user
 */
router.delete("/delete-user", auth, async (req, res, next) => {
  const adminController = new AdminController();

  if (req.user.role !== USER_ROLE.ADMIN && req.user.role !== USER_ROLE.ROOT) {
    return res.status(401).json({ message: "Unauthorized User." });
  }

  try {
    const result = await adminController.deleteUser(req, res);

    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 * Admins
 * GET all users
 */
router.get("/get-all-users", auth, async (req, res, next) => {
  const userController = new UserController();

  if (req.user.role !== USER_ROLE.ADMIN && req.user.role !== USER_ROLE.ROOT) {
    return res.status(401).json({ message: "Unauthorized User." });
  }

  try {
    const result = await userController.getAllUsers(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 * Admins [ROOT]
 * PATCH update user role
 */
router.patch("/user-role", auth, async (req, res, next) => {
  const adminController = new AdminController();

  if (req.user.role !== USER_ROLE.ROOT) {
    return res.status(401).json({ message: "Unauthorized user." });
  }

  try {
    const result = await adminController.updateUserRole(req, res);

    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 * Admins
 * PATCH update user profile
 */
router.patch("/user-profile", auth, async (req, res, next) => {
  const adminController = new AdminController();

  if (req.user.role !== USER_ROLE.ROOT && req.user.role !== USER_ROLE.ADMIN) {
    return res.status(401).json({ message: "Unauthorized user." });
  }

  try {
    const result = await adminController.updateUserProfile(req, res);

    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});
module.exports = router;
