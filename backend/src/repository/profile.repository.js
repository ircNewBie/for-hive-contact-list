const ObjectId = require("mongoose").Types.ObjectId;

const profileModel = require("../model/profile.model");
const User = require("../model/user.model");

const Exception = require("../utils/error.handler");

class ProfileRepository {
  constructor(mongooseInstance) {
    this.Profile = mongooseInstance.model(
      profileModel.modelName,
      profileModel.schema
    );
  }

  async createProfile(profileData, userId) {
    try {
      let profile = new this.Profile(profileData);

      const savedProfile = await profile.save();

      if (savedProfile != null) {
        // const profile = await this.Profile.findById(savedProfile._id);

        const user = await User.findById(userId);
        user.profile = savedProfile._id;
        await user.save();

        // fetch updated user data
        const result = await User.findById(userId).populate("profile");
        return result;
      }

      return new Exception("Failed to save profile", 400);
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to create profile", 400);
    }
  }

  async findAndGetUser(userId) {
    try {
      const result = await this.User.findById(userId)
        .populate({
          path: "friends",
          select: "fullName email contactNumber",
        })
        .populate({
          path: "pendingFriends",
          select: "fullName",
        });

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to retrieve users", 400);
    }
  }
}

module.exports = ProfileRepository;
