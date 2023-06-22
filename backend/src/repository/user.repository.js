const userModel = require("../model/user.model");
const profileModel = require("../model/profile.model");
const Exception = require("../utils/error.handler");

class UserRepository {
  constructor(mongooseInstance) {
    this.User = mongooseInstance.model(userModel.modelName, userModel.schema);
    this.Profile = mongooseInstance.model(
      profileModel.modelName,
      profileModel.schema
    );
  }

  async sendAddFriendInvite(requestedBy, sendRequestTo) {
    try {
      const userToAddFriend = await this.User.findById(sendRequestTo);
      const request = await userToAddFriend.addToPendingFriends(
        requestedBy._id
      );

      const result = {
        status: "Invited",
        name: request.fullName,
      };

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to send invite ", 500);
    }
  }

  async acceptFriendInvite(mySelf, sendRequestFrom) {
    try {
      mySelf = await this.User.findById(mySelf._id);
      await mySelf.acceptPendingFriend(sendRequestFrom);

      const newFriend = await this.User.findById(sendRequestFrom);
      const result = {
        status: "Accepted",
        name: newFriend.fullName,
      };

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to send invite ", 500);
    }
  }

  async rejectFriendInvite(mySelf, sendRequestFrom) {
    try {
      mySelf = await this.User.findById(mySelf._id);
      await mySelf.rejectPendingFriend(sendRequestFrom);

      const newFriend = await this.User.findById(sendRequestFrom);
      const result = {
        status: "Rejected!",
        name: newFriend.fullName,
      };

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to respond to the invite ", 500);
    }
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
      return new Exception("Failed to create user", 500);
    }
  }

  async findAndGetAllUsers() {
    try {
      const result = await this.User.find({})
        .populate("profile")
        .select("-password  -__v");

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to retrieve users", 500);
    }
  }
  async findAndGetUser(userId) {
    try {
      const result = await this.User.findById(userId).populate("profile");
      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to retrieve users", 500);
    }
  }

  async findAndDeleteUser(userId) {
    try {
      // deletes user profile if it exists
      await this.Profile.findOneAndDelete({ userId: userId });
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
      return new Exception("Unexpected error! Failed to update user role", 500);
    }
  }

  async findAndUpdateUserProfile(userData, profileData) {
    const userId = userData.userId;
    let updatedProfile = {};
    let updatedUser = {};

    const user = await this.User.findById(userId);

    if (!user) {
      return new Exception("User not found", 404);
    }

    const profileExists = await this.Profile.findOne({
      userId: userId,
    });

    try {
      // update profile if it exists and create  otherwise
      if (profileExists) {
        const profileId = profileExists._id;

        updatedProfile = await this.Profile.findByIdAndUpdate(
          profileId,
          { $set: profileData },
          { new: true }
        );
      } else {
        profileData.userId = userId;

        const newProfile = new this.Profile(profileData);
        updatedProfile = await newProfile.save();
        userData.profile = updatedProfile._id;
      }

      updatedUser = await this.User.findByIdAndUpdate(
        userData.userId,
        { $set: userData },
        { new: true }
      )
        .select("-password -friends -pendingFriends -contacts -__v")
        .populate({
          path: "profile",
          select: "-_id -userId -__v",
        });

      return updatedUser;
    } catch (err) {
      console.log("err", err);
      return new Exception(
        "Unexpected error! Failed to update user profile",
        500
      );
    }
  }
}

module.exports = UserRepository;
