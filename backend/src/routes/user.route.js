var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ObjectId = require("mongoose").Types.ObjectId;
const UserController = require("../controller/user.controller");
const validateSignup = require("../middleware/signup.validation");
const auth = require("../middleware/auth");

const User = require("../model/user.model");
// test api
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Users' route is working!" });
});

/**
 * User Related Endpoints
 */
router.get("/", auth, async (req, res) => {
  const userController = new UserController();
  return await userController.getAllUsers(req, res);
});

/* POST signup */
router.post("/signup", validateSignup, async (req, res, next) => {
  const userController = new UserController();

  try {
    const result = await userController.signup(req, res);

    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
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

router.get("/by-id", auth, async (req, res, next) => {
  const userController = new UserController();

  try {
    const result = await userController.getUserById(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

module.exports = router;
