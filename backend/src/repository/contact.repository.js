const contactModel = require("../model/contact.model");
const User = require("../model/user.model");

const Exception = require("../utils/error.handler");

class ContactRepository {
  constructor(mongooseInstance) {
    this.Contact = mongooseInstance.model(
      contactModel.modelName,
      contactModel.schema
    );
  }

  async createContact(contactData) {
    try {
      let contact = new this.Contact(contactData);

      const savedContact = await contact.save();
      if (!savedContact) {
        return new Exception("Failed to save user", 400);
      }

      // update user's contacts.
      const thisUser = await User.findById(contactData.createdBy);

      const updateUserContacts = await thisUser.addContact(savedContact._id);
      console.log(updateUserContacts);

      contact = await this.Contact.findById(savedContact._id).select(
        "-createdBy -__v"
      );
      return contact;
    } catch (err) {
      console.log("err", err);
      return new Exception("Unexpected Error! Failed to create contact", 400);
    }
  }

  async findAndGetAllCurrentUserContacts(currentUser) {
    try {
      const thisUser = await User.findById(currentUser._id);
      const result = await this.Contact.find({
        _id: { $in: thisUser.contacts },
      }).select("-createdBy -__v");

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to retrieve users", 400);
    }
  }

  async findAndDeleteCurrentUserContact(currentUser, contactToDelete) {
    try {
      const thisUser = await User.findById(currentUser._id);

      // remove the contact id from the user's contacts array
      await thisUser.removeAContact(contactToDelete);

      const result = await this.Contact.findByIdAndDelete(contactToDelete);

      if (!result) {
        return new Exception("Contact not found", 404);
      }

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to delete contact", 400);
    }
  }

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
