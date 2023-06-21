const contactModel = require("../model/contact.model");
const userModel = require("../model/user.model");

const Exception = require("../utils/error.handler");

class ContactRepository {
  constructor(mongooseInstance) {
    this.Contact = mongooseInstance.model(
      contactModel.modelName,
      contactModel.schema
    );
    this.User = mongooseInstance.model(userModel.modelName, userModel.schema);
  }

  async createContact(contactData) {
    try {
      let contact = new this.Contact(contactData);

      const savedContact = await contact.save();
      if (!savedContact) {
        return new Exception("Failed to save user", 400);
      }

      contact = await this.Contact.findById(savedContact._id).select(
        "-createdBy -__v"
      );
      return contact;
    } catch (err) {
      console.log("err", err);
      return new Exception("Unexpected Error! Failed to create contact", 400);
    }
  }
  //   async findAndGetAllUsers() {
  //     try {
  //       const result = await this.User.find({})
  //         .populate("profile")
  //         .select("-password  -__v");

  //       return result;
  //     } catch (err) {
  //       console.log("err", err);
  //       return new Exception("Failed to retrieve users", 400);
  //     }
  //   }
  //   async findAndGetUser(userId) {
  //     try {
  //       const result = await this.User.findById(userId)
  //         .populate({
  //           path: "friends",
  //           select: "fullName email contactNumber -password -__v",
  //         })
  //         .populate({
  //           path: "pendingFriends",
  //           select: "fullName",
  //         })
  //         .populate("profile");
  //       return result;
  //     } catch (err) {
  //       console.log("err", err);
  //       return new Exception("Failed to retrieve users", 400);
  //     }
  //   }

  //   async findAndDeleteUser(userId) {
  //     try {
  //       // deletes user profile if it exists
  //       await this.Profile.findOneAndDelete({ userId: userId });
  //       const result = await this.User.findByIdAndDelete(userId);

  //       return result;
  //     } catch (err) {
  //       console.log("err", err);
  //       return new Exception("Failed to delete user", 400);
  //     }
  //   }

  //   async findAndUpdateUserRole(userData) {
  //     try {
  //       const updatedUser = await this.User.findByIdAndUpdate(
  //         userData.user_id,
  //         { $set: userData },
  //         { new: true }
  //       );

  //       return updatedUser;
  //     } catch (err) {
  //       console.log("err", err);
  //       return new Exception("Failed to update user role", 400);
  //     }
  //   }

  //   async findAndUpdateUserProfile(userData, profileData) {
  //     const userId = userData.userId;
  //     let updatedProfile = {};
  //     let updatedUser = {};

  //     const user = await this.User.findById(userId);

  //     if (!user) {
  //       return new Exception("User not found", 404);
  //     }

  //     const profileExists = await this.Profile.findOne({
  //       userId: userId,
  //     });

  //     try {
  //       // update profile if it exists and create  otherwise
  //       if (profileExists) {
  //         const profileId = profileExists._id;

  //         updatedProfile = await this.Profile.findByIdAndUpdate(
  //           profileId,
  //           { $set: profileData },
  //           { new: true }
  //         );
  //       } else {
  //         profileData.userId = userId;

  //         const newProfile = new this.Profile(profileData);
  //         updatedProfile = await newProfile.save();
  //         userData.profile = updatedProfile._id;
  //       }

  //       updatedUser = await this.User.findByIdAndUpdate(
  //         userData.userId,
  //         { $set: userData },
  //         { new: true }
  //       )
  //         .select("-password -friends -pendingFriends -contacts -__v")
  //         .populate({
  //           path: "profile",
  //           select: "-_id -userId -__v",
  //         });

  //       return updatedUser;
  //     } catch (err) {
  //       console.log("err", err);
  //       return new Exception(
  //         "Unexpected error! Failed to update user profile",
  //         400
  //       );
  //     }
  //   }
}

module.exports = ContactRepository;
