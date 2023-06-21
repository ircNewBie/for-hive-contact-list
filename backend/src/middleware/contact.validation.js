const Contact = require("../model/contact.model");
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

// const validateProfileUpdate = async (req, res, next) => {
//   // Perform of payload validations
//   const currentUserId = req.user._id;

//   const { error } = payloadSchema.validate(req.body);
//   if (error) {
//     return res.status(422).json({ message: error.details[0].message });
//   }

//   const profileExists = await Profile.findOne({ userId: currentUserId });
//   if (!profileExists) {
//     return res
//       .status(422)
//       .json({ message: "Profile does not exist. Create one first" });
//   }

//   // Validation successful, proceed to the next middleware or route handler
//   next();
// };

module.exports = validateContact;
