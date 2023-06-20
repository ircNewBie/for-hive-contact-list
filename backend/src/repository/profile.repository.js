const profileModel = require("../model/profile.model");
const Exception = require("../utils/error.handler");

class ProfileRepository {
  constructor(mongooseInstance) {
    this.Profile = mongooseInstance.model(
      profileModel.modelName,
      profileModel.schema
    );
  }

  async createProfile(profileData) {
    try {
      let profile = new this.Profile(profileData);
      const savedProfile = await profile.save();
      if (savedProfile != null) {
        profile = await this.Profile.findById(savedProfile._id);
        return profile;
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
