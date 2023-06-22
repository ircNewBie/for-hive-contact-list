var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");
const {
  validateRequestToAdd,
  validateAcceptOrDenyFriend,
} = require("../middleware/friend.validation");

const UserController = require("../controller/user.controller");
const User = require("../model/user.model");

// test api
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Friends route is working!" });
});

/**
 * Friend Management Related Endpoints
 */
/* POST Invite to add as friend   */
router.post("/invite", auth, validateRequestToAdd, async (req, res, next) => {
  const userController = new UserController();

  try {
    const result = await userController.addFriend(req, res);

    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 * User accept friend request
 */
router.post(
  "/accept",
  auth,
  validateAcceptOrDenyFriend,
  async (req, res, next) => {
    const userController = new UserController();

    try {
      const result = await userController.acceptFriendRequest(req, res);

      return res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
/**
 * User rejects friend request
 */
router.post(
  "/reject",
  auth,
  validateAcceptOrDenyFriend,
  async (req, res, next) => {
    const userController = new UserController();

    try {
      const result = await userController.rejectFriendRequest(req, res);

      return res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
/**
 * GET friends
 */
router.get("/all", auth, async (req, res, next) => {
  const userController = new UserController();

  try {
    const result = await userController.getAllMyFriends(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

module.exports = router;
// eager21earn;
