const User = require("../model/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const validateRequestToAdd = async (req, res, next) => {
  const { user_id } = req.query;
  const currentUserId = req.user._id;

  if (!ObjectId.isValid(user_id))
    return res.status(422).json({
      message: "User Id is not valid!.",
    });

  if (user_id === currentUserId) {
    return res.status(422).json({ message: "Can't add yourself." });
  }

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

const validateAcceptOrDenyFriend = async (req, res, next) => {
  const friendRequestId = req.query.user_id;
  const currentUserId = req.user._id;

  if (!ObjectId.isValid(friendRequestId))
    return res.status(422).json({
      message: "User Id is not valid!.",
    });

  if (friendRequestId === currentUserId) {
    return res.status(422).json({ message: "Can't add yourself." });
  }

  const userAcceptOrDeny = await User.findById(friendRequestId);
  if (!userAcceptOrDeny) {
    return res.status(422).json({ message: "Can't proceed. User not found" });
  }

  const mySelf = await User.findById(currentUserId);
  if (mySelf.friends.includes(friendRequestId)) {
    return res
      .status(422)
      .json({ message: `${userAcceptOrDeny.fullName} is already your friend` });
  }

  if (!mySelf.pendingFriends.includes(friendRequestId)) {
    return res.status(404).json({ message: `Friend request not found.` });
  }

  // Validation successful, proceed to the next middleware or route handler
  next();
};

module.exports = { validateAcceptOrDenyFriend, validateRequestToAdd };
