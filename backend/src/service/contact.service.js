const bcrypt = require("bcrypt");
const Exception = require("../utils/error.handler");
const ObjectId = require("mongoose").Types.ObjectId;

class ContactService {
  constructor(contactRepository) {
    this.repository = contactRepository;
  }

  async createContact(req, res) {
    const contactData = req.body;

    try {
      contactData.createdBy = req.user._id;
      const result = await this.repository.createContact(contactData);

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async getAllContacts(currentUser) {
    try {
      const result = await this.repository.findAndGetAllCurrentUserContacts(
        currentUser
      );

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async deleteCurrentUserContact(currentUser, contactToDelete) {
    if (!ObjectId.isValid(contactToDelete))
      return new Exception("Invalid contact", 422);

    try {
      const result = await this.repository.findAndDeleteCurrentUserContact(
        currentUser,
        contactToDelete
      );

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async updateMyContact(contactId, contactData) {
    try {
      const result = await this.repository.findAndUpdateContact(
        contactId,
        contactData
      );

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  /**
   * Share my contact to friend
   * @param {*} friendId
   * @param {*} contactId
   * @returns
   */
  async shareContactToFriend(friendId, contactId) {
    try {
      const result = await this.repository.findContactAndShareToMyFriend(
        friendId,
        contactId
      );

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }
}

module.exports = ContactService;
