const userModel = require("../model/user.model");
const Exception = require("../utils/error.handler");

class UserRepository {
  constructor(mongooseInstance) {
    this.User = mongooseInstance.model(userModel.modelName, userModel.schema);
  }

  async createUser(userData) {
    try {
      let user = new this.User(userData);
      const savedUser = await user.save();
      if (savedUser != null) {
        user = await this.User.findById(savedUser._id);
        return user;
      }
      return new Exception("Failed to save user", 400);
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to create user", 400);
    }
  }
  async findAndGetAllUsers() {
    try {
      const result = await this.User.find({}).select("-password  -__v");

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to retrieve users", 400);
    }
  }
  async findAndGetUser(userId) {
    try {
      const result = await this.User.findById(userId)
        .populate({
          path: "friends",
          select: "fullName email contactNumber -password -__v",
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

  async findAndDeleteUser(userId) {
    try {
      const result = await this.User.findByIdAndDelete(userId);
      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to delete user", 400);
    }
  }

  async findAndUpdateUserRole(userData) {
    try {
      const updatedUser = await this.User.findByIdAndUpdate(
        userData.user_id,
        { $set: userData },
        { new: true }
      );

      return updatedUser;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to update user role", 400);
    }
  }
}

module.exports = UserRepository;
