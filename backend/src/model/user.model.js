const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String },
  completeAddress: { type: String },

  role: {
    type: String,
    enum: ["ADMIN", "SUPERVISOR", "USER"],
    default: "USER",
  },
});

// Create the User model from the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
