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

  //   async getAllUsers() {
  //     try {
  //       const result = await this.repository.findAndGetAllUsers();

  //       return result;
  //     } catch (err) {
  //       console.log(err);
  //       return new Exception("Unexpected Error", 500);
  //     }
  //   }

  //   async getUserById(userId) {
  //     if (!ObjectId.isValid(userId)) return new Exception("Invalid User Id", 422);

  //     try {
  //       const result = await this.userRepository.findAndGetUser(userId);

  //       return result;
  //     } catch (err) {
  //       console.log(err);
  //       return new Exception("Unexpected Error", 500);
  //     }
  //   }
}

module.exports = ContactService;
