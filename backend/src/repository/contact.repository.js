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

      // update user's contacts.
      const thisUser = await this.User.findById(contactData.createdBy);

      const updateUserContacts = await thisUser.addContact(savedContact._id);
      console.log(updateUserContacts);

      contact = await this.Contact.findById(savedContact._id).select(
        "-createdBy -__v"
      );
      return contact;
    } catch (err) {
      console.log("err", err);
      return new Exception("Unexpected Error! Failed to create contact", 500);
    }
  }

  async findAndGetAllCurrentUserContacts(currentUser) {
    try {
      const thisUser = await this.User.findById(currentUser._id);
      const result = await this.Contact.find({
        _id: { $in: thisUser.contacts },
      }).select("-createdBy -__v");

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to retrieve users", 500);
    }
  }

  async findAndDeleteCurrentUserContact(currentUser, contactToDelete) {
    try {
      const thisUser = await this.User.findById(currentUser._id);

      // remove the contact id from the user's contacts array
      await thisUser.removeAContact(contactToDelete);

      const result = await this.Contact.findByIdAndDelete(contactToDelete);

      if (!result) {
        return new Exception("Contact not found", 404);
      }

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to delete contact", 500);
    }
  }

  async findAndUpdateContact(contactId, contactData) {
    try {
      const updatedContact = await this.Contact.findByIdAndUpdate(
        contactId,
        { $set: contactData },
        { new: true }
      );

      return updatedContact;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to update contact.", 500);
    }
  }

  async findContactAndShareToMyFriend(friendId, contactId) {
    try {
      const myFriend = await this.User.findById(friendId);

      const result = await myFriend.shareContact(contactId);
      console.log("result", result);

      return result;
    } catch (err) {
      console.log("err", err);
      return new Exception(
        "Unexpected error! Failed to share your contact.",
        500
      );
    }
  }
}

module.exports = ContactRepository;
