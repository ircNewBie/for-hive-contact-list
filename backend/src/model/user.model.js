const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String },
  completeAddress: { type: String },
  role: {
    type: String,
    enum: ["ROOT", "ADMIN", "SUPERVISOR", "USER"],
    default: "USER",
  },
  contacts: [{ type: String }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pendingFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

// Create the User model from the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
