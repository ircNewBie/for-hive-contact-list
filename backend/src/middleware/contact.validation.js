const Contact = require("../model/contact.model");
const User = require("../model/user.model");

const ObjectId = require("mongoose").Types.ObjectId;

const Joi = require("joi");

const payloadSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  aboutInfo: Joi.string(),
});

const validateContact = async (req, res, next) => {
  const currentUserId = req.user._id;

  // Perform of payload validations
  const { error } = payloadSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  const contactExists = await Contact.findOne({
    createdBy: currentUserId,
    name: req.body.name,
  });

  if (contactExists) {
    return res
      .status(422)
      .json({ message: `${contactExists.name} is already in your contacts.` });
  }

  req.body.createdBy = currentUserId;

  // Validation successful, proceed to the next middleware or route handler
  next();
};

const validateContactUpdate = async (req, res, next) => {
  const currentUserId = req.user._id;
  const contactId = req.query.contact_id;

  const { error } = payloadSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  if (!ObjectId.isValid(contactId))
    return res.status(422).json({ message: "Invalid Contact Id" });

  const currentUser = await User.findById(currentUserId);

  if (!currentUser.contacts.includes(contactId)) {
    return res
      .status(404)
      .json({ message: "Contact not found in your contact list." });
  }

  // Validation successful
  next();
};

module.exports = { validateContact, validateContactUpdate };
