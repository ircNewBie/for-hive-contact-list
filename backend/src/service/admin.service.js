const Exception = require("../utils/error.handler");
const ObjectId = require("mongoose").Types.ObjectId;

class AdminService {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async deleteUser(userId) {
    if (!ObjectId.isValid(userId)) return new Exception("Invalid User Id", 422);

    try {
      const result = await this.repository.findAndDeleteUser(userId);

      if (!result) return new Exception("User not found!", 404);

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async getAllUsers() {
    try {
      const result = await this.repository.findAndGetAllUsers();

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async updateUserRole(userData) {
    if (!ObjectId.isValid(userData.user_id))
      return new Exception("Invalid User Id", 422);

    try {
      const result = await this.repository.findAndUpdateUserRole(userData);

      if (!result) return new Exception("User not found!", 404);

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async getUserById(userId) {
    if (!ObjectId.isValid(userId)) return new Exception("Invalid User Id", 422);

    try {
      const result = await this.repository.findAndGetUser(userId);

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }
  async updateUserProfile(userId, payload) {
    if (!ObjectId.isValid(userId)) return new Exception("Invalid User Id", 422);

    const profileData = {
      aboutBio: payload.aboutBio,
      skills: payload.skills,
      hobbies: payload.hobbies,
      profession: payload.profession,
      profilePhoto: payload.profilePhoto,
      socialMediaLinks: payload.socialMediaLinks,
    };

    const userData = {
      userId: userId,
      fullName: payload.fullName,
      contactNumber: payload.contactNumber,
      completeAddress: payload.completeAddress,
    };

    try {
      const result = await this.repository.findAndUpdateUserProfile(
        userData,
        profileData
      );

      if (!result) return new Exception("User not found!", 404);

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }
}

module.exports = AdminService;
