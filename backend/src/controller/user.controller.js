const Exception = require("../utils/error.handler");
const UserService = require("../service/user.service");
const UserRepository = require("../repository/user.repository");

class UserController {
  async addFriend(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const userService = new UserService(new UserRepository(mongooseInstance));

    const result = await userService.addFriend(req, res);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res
      .status(201)
      .json({ message: "Friend request  successful!", data: result });
  }

  async signup(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const userService = new UserService(new UserRepository(mongooseInstance));

    const result = await userService.createUser(req, res);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res
      .status(201)
      .json({ message: "User signup  successful!", data: result });
  }

  async getAllUsers(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const userService = new UserService(new UserRepository(mongooseInstance));
    const result = await userService.getAllUsers();

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "Success", data: result });
  }

  async getUserById(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const userService = new UserService(new UserRepository(mongooseInstance));

    const userId = req.query.id;

    const result = await userService.getUserById(userId);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "Success", data: result });
  }
}

module.exports = UserController;
