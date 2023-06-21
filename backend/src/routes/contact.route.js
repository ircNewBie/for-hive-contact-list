var express = require("express");
var router = express.Router();

const validateContact = require("../middleware/contact.validation");
const auth = require("../middleware/auth");

const ContactController = require("../controller/contact.controller");
const Contact = require("../model/contact.model");

// test api
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Contacts' route is working!" });
});

/**
 * Contacts Related Endpoints
 */
/* POST create contact */
router.post("/create", auth, validateContact, async (req, res, next) => {
  const contactController = new ContactController();

  try {
    const result = await contactController.createContact(req, res);

    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 * GET all contacts
 */
router.get("/all", auth, async (req, res, next) => {
  const contactController = new ContactController();

  try {
    const result = await contactController.getAllContacts(req, res);

    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 * GET user by id
//  */
// router.get("/by-id", auth, async (req, res, next) => {
//   const userController = new UserController();

//   try {
//     const result = await userController.getUserById(req, res);
//     return res.json(result);
//   } catch (error) {
//     // Pass the error to the error handling middleware
//     next(error);
//   }
// });

module.exports = router;
