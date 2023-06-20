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
        const user = await User.findById(userId);
        user.profile = savedProfile._id;
        await user.save();

        // fetch updated user data
        const result = await User.findById(userId)
          .select("-password -createdAt -__v")
          .populate({
            path: "profile",
          });
        return result;
      }

      return new Exception("Failed to save profile", 400);
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to create profile", 400);
    }
  }

  async findAndGetUserProfile(userId) {
    try {
      const result = await this.Profile.findOne({ userId: userId })
        .select(" -createdAt -__v")
        .exec();

      if (!result) {
        return new Exception("Sorry,  profile not found", 404);
      }
      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to retrieve user's profile", 400);
    }
  }

  async findAndUpdateProfile(userId, updatedProfileData) {
    try {
      const profile = await this.Profile.findOne({ userId: userId });

      const updatedProfile = await this.Profile.findByIdAndUpdate(
        profile._id,
        { $set: updatedProfileData },
        { new: true }
      );

      return updatedProfile;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to update profile", 400);
    }
  }
}

module.exports = ProfileRepository;
