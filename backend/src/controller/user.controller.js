const Exception = require("../utils/error.handler");

class UserController {
  async createUser(req, res) {
    // const userService = new UserService(new UserRepository(mongooseInstance));

    // const result = await userService.createUser(req, res);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res
      .status(201)
      .json({ message: "User signup  successful!", data: result });
  }
}

module.exports = UserController;
