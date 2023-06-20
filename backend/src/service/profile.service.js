const Exception = require("../utils/error.handler");
const ObjectId = require("mongoose").Types.ObjectId;

class ProfileService {
  constructor(profileRepository) {
    this.profileRepository = profileRepository;
  }

  async createProfile(userId, payload) {
    const profileData = payload;
    profileData.userId = userId;

    try {
      const result = await this.profileRepository.createProfile(
        profileData,
        userId
      );
      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async updateProfile(userId, payload) {
    const profileData = payload;

    try {
      const result = await this.profileRepository.findAndUpdateProfile(
        userId,
        profileData
      );

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async getMyProfile(userId) {
    if (!ObjectId.isValid(userId)) return new Exception("Invalid User Id", 422);

    try {
      const result = await this.profileRepository.findAndGetUserProfile(userId);

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }
}

module.exports = ProfileService;
