var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");
const { validateRequestToAdd } = require("../middleware/friend.validation");

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
router.post("/accept", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log("Invalid / incorrect Email address");
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.TOKEN_SECRET
    );

    if (match) {
      user.password = undefined;
      return res.json({ accessToken, user });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
    next(error);
  }
});
/**
 * User rejects friend request
 */
router.post("/reject", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log("Invalid / incorrect Email address");
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.TOKEN_SECRET
    );

    if (match) {
      user.password = undefined;
      return res.json({ accessToken, user });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
    next(error);
  }
});
/**
 * GET friends
 */
router.get("/all", auth, async (req, res, next) => {
  const userController = new UserController();

  try {
    const result = await userController.getAllUsers(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

module.exports = router;
