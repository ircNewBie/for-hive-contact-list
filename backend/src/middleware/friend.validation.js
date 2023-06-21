const User = require("../model/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const validateRequestToAdd = async (req, res, next) => {
  // Perform of payload validations
  const { user_id } = req.query;
  const currentUserId = req.user._id;

  if (!ObjectId.isValid(user_id))
    return res.status(422).json({
      message: "User Id is not valid!.",
    });

  const userToAdd = await User.findById(user_id);
  const mySelf = await User.findById(currentUserId);

  if (mySelf.friends.includes(userToAdd._id)) {
    return res
      .status(422)
      .json({ message: `${userToAdd.fullName} is already your friend` });
  }

  if (!userToAdd) {
    return res.status(422).json({ message: "Can't proceed. User not found" });
  }

  if (userToAdd.pendingFriends.includes(currentUserId)) {
    return res
      .status(422)
      .json({ message: `You already sent a request to ${userToAdd.fullName}` });
  }

  // Validation successful, proceed to the next middleware or route handler
  next();
};

const validateProfileUpdate = async (req, res, next) => {
  // Perform of payload validations
  const currentUserId = req.user._id;

  const { error } = payloadSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  const profileExists = await Profile.findOne({ userId: currentUserId });
  if (!profileExists) {
    return res
      .status(422)
      .json({ message: "Profile does not exist. Create one first" });
  }

  // Validation successful, proceed to the next middleware or route handler
  next();
};

module.exports = { validateProfileUpdate, validateRequestToAdd };
