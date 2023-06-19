const bcrypt = require("bcrypt");
const Exception = require("../utils/error.handler");
const ObjectId = require("mongoose").Types.ObjectId;

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(req, res) {
    const userData = req.body;

    try {
      const salt = await bcrypt.genSalt(10);

      userData.password = await bcrypt.hash(userData.password, salt);

      const result = await this.userRepository.createUser(userData);
      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async getAllUsers() {
    try {
      const result = await this.userRepository.findAndGetAllUsers();

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }

  async getUserById(userId) {
    if (!ObjectId.isValid(userId)) return new Exception("Invalid User Id", 422);

    try {
      const result = await this.userRepository.findAndGetUser(userId);

      return result;
    } catch (err) {
      console.log(err);
      return new Exception("Unexpected Error", 500);
    }
  }
}

module.exports = UserService;
