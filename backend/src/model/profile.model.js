const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  aboutBio: { type: String },
  skills: [{ type: String }],
  hobbies: [{ type: String }],
  profession: { type: String },
  profilePhoto: {
    type: String,
    default: "https://publicdomainvectors.org/photos/generic-avatar.png",
  },
  socialMediaLinks: [{ type: Object }],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
