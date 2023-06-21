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

const validateContactShare = async (req, res, next) => {
  if (
    !(
      req.query.hasOwnProperty("friend_id") &&
      req.query.hasOwnProperty("contact_id")
    )
  )
    return res.status(422).json({
      message: `Invalid request property. Expecting 'friend_id' & 'contact_id'`,
    });

  const currentUserId = req.user._id;
  const friendId = req.query.friend_id;
  const contactId = req.query.contact_id;

  if (!ObjectId.isValid(friendId))
    return res.status(422).json({ message: "Invalid Friend Id" });

  if (!ObjectId.isValid(contactId))
    return res.status(422).json({ message: "Invalid Contact Id" });

  const currentUser = await User.findById(currentUserId);
  const myFriend = await User.findById(friendId);

  if (!myFriend)
    res.status(404).json({
      message: `Friend not found.`,
    });

  // contact to be shared should be in current user's contacts
  if (!currentUser.friends.includes(friendId)) {
    return res.status(401).json({
      message: "Cannot share contact to this user. Not a friend yet.",
    });
  }

  if (!currentUser.contacts.includes(contactId)) {
    return res
      .status(404)
      .json({ message: "Contact not found in your contact list." });
  }

  // contact should not have been shared yet with this friend
  if (myFriend.sharedContacts.includes(contactId)) {
    return res.status(422).json({
      message: `You already shared this contact to  ${myFriend.fullName}.`,
    });
  }

  // Validation successful
  next();
};

module.exports = {
  validateContact,
  validateContactUpdate,
  validateContactShare,
};
