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

      return user;
    } catch (err) {
      console.log("err", err);
      return new Exception("Failed to create user", 400);
    }
  }
  //   async findAllUsers() {
  //     try {
  //       return await this.User.find({});
  //     } catch (err) {
  //       console.log("err", err);
  //       return new Exception("Failed to retrieve users", 400);
  //     }
  //   }
}

module.exports = UserRepository;
