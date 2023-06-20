var express = require("express");
var router = express.Router();

const ProfileController = require("../controller/profile.controller");

const auth = require("../middleware/auth");
const {
  validateProfile,
  validateProfileUpdate,
} = require("../middleware/profile.validation");

// test api
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Profile' route is working!" });
});

/**
 * Get my profile
 */
router.get("/", auth, async (req, res, next) => {
  const profileController = new ProfileController();

  try {
    const result = await profileController.getMyProfile(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 *Create user's  Profile
 */
router.post("/user/:user_id", auth, validateProfile, async (req, res, next) => {
  const profileController = new ProfileController();

  try {
    const result = await profileController.createProfile(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 *Update my Profile
 */
router.put("/", auth, validateProfileUpdate, async (req, res, next) => {
  const profileController = new ProfileController();

  try {
    const result = await profileController.updateMyProfile(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

module.exports = router;
