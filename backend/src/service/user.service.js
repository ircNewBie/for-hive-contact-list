const bcrypt = require("bcrypt");
const Exception = require("../utils/error.handler");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(req, res) {
    const userData = req.body;
    const mongooseInstance = req.app.get("mongooseInstance");

    // console.log("userData", userData);

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
}

module.exports = UserService;
