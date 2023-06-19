const Exception = require("../utils/error.handler");
const UserService = require("../service/user.service");
const UserRepository = require("../repository/user.repository");

class UserController {
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
}

module.exports = UserController;
