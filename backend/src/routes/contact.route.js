var express = require("express");
var router = express.Router();

const {
  validateContact,
  validateContactUpdate,
} = require("../middleware/contact.validation");
const auth = require("../middleware/auth");

const ContactController = require("../controller/contact.controller");

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
 * DELETE user's  contact
 */
router.delete("/delete", auth, async (req, res, next) => {
  const contactController = new ContactController();

  try {
    const result = await contactController.deleteAContact(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 *Update my Contact
 */
router.patch("/update", auth, validateContactUpdate, async (req, res, next) => {
  const contactController = new ContactController();

  try {
    const result = await contactController.updateMyContact(req, res);
    return res.json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

/**
 *  Share contact
 */
router.post(
  "/share",
  auth,
  // validateContactShare,
  async (req, res, next) => {
    const contactController = new ContactController();

    try {
      const result = await contactController.shareContactToFriend(req, res);
      return res.json(result);
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  }
);

module.exports = router;
