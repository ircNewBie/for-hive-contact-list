const User = require("../model/user.model");
const Joi = require("joi");
const Profile = require("../model/profile.model");
const ObjectId = require("mongoose").Types.ObjectId;

const payloadSchema = Joi.object({
  aboutBio: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  hobbies: Joi.array().items(Joi.string()),
  profession: Joi.string(),
  profilePhoto: Joi.string(),
  socialMediaLinks: Joi.array().items(Joi.object()),
});

module.exports = validateProfile = async (req, res, next) => {
  // Perform of payload validations
  const { user_id } = req.params;
  const currentUserId = req.user._id;

  const { error } = payloadSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  if (!ObjectId.isValid(user_id))
    return res.status(422).json({
      message: "User Id is not valid!.",
    });

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(422).json({ message: "Can't proceed. User not found" });
  }

  if (user_id !== currentUserId) {
    return res
      .status(401)
      .json({ message: "Unauthorized to create this profile" });
  }

  const profileExists = await Profile.findOne({ userId: user_id });
  if (profileExists) {
    return res
      .status(422)
      .json({ message: "Profile already exists. Just edit it instead" });
  }
  // Validation successful, proceed to the next middleware or route handler
  next();
};
