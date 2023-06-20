const Exception = require("../utils/error.handler");

const UserService = require("../service/user.service");
const UserRepository = require("../repository/user.repository");

const AdminService = require("../service/admin.service");

class AdminController {
  async getAllUsers(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const userService = new UserService(new UserRepository(mongooseInstance));
    const result = await userService.getAllUsers();

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "Success", data: result });
  }

  async deleteUser(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const adminService = new AdminService(new UserRepository(mongooseInstance));

    const userId = req.query.user_id;

    const result = await adminService.deleteUser(userId);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "Success", data: result });
  }
}

module.exports = AdminController;
