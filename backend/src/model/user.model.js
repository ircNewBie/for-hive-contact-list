const mongoose = require("mongoose");
const USER_ROLE = require("../constants/globals");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String },
  completeAddress: { type: String },
  role: {
    type: String,
    enum: [
      USER_ROLE.ROOT,
      USER_ROLE.ADMIN,
      USER_ROLE.SUPERVISOR,
      USER_ROLE.USER,
    ],
    default: USER_ROLE.USER,
  },
  sharedContacts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Contact", default: [] },
  ],
  contacts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Contact", default: [] },
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  pendingFriends: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

/**
 *
 * @param {*} contactId
 * @returns user
 */
userSchema.methods.addContact = async function (contactId) {
  try {
    this.contacts.push(contactId);
    await this.save();
    return this;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} contactId
 * @returns user
 */
userSchema.methods.removeAContact = async function (contactIdToRemove) {
  try {
    this.contacts = this.contacts.filter((id) => id !== contactIdToRemove);
    await this.save();
    return this;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} contactId
 * @returns user
 */
userSchema.methods.shareContact = async function (contactId) {
  try {
    this.sharedContacts.push(contactId);
    await this.save();
    return this;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} contactId
 * @returns user
 */
userSchema.methods.addToPendingFriends = async function (userId) {
  try {
    this.pendingFriends.push(userId);
    await this.save();
    return this;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.acceptPendingFriend = async function (userIdToBeAccepted) {
  try {
    // Remove from pending friends
    this.pendingFriends = this.pendingFriends.filter(
      (userId) => userId !== userIdToBeAccepted
    );
    // Add to friends
    if (!this.friends.includes(userIdToBeAccepted))
      this.friends.push(userIdToBeAccepted);
    await this.save();
    return this;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.denyPendingFriend = async function (userIdToBeDenied) {
  try {
    // Remove from pending friends
    this.pendingFriends = this.pendingFriends.filter(
      (userId) => userId !== userIdToBeDenied
    );
    await this.save();
    return this;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.getFriends = async function () {
  return this.model("User")
    .find({
      _id: { $in: this.friends },
    })
    .exec();
};
// Create the User model from the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
