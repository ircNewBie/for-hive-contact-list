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
  contacts: [{ type: String }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pendingFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

// Define the instance method
userSchema.methods.addContact = async function (contactId) {
  try {
    this.contacts.push(contactId);
    await this.save();
    return this;
  } catch (error) {
    throw error;
  }
};

// Create the User model from the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
