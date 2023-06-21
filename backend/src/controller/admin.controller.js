const Exception = require("../utils/error.handler");

const UserService = require("../service/user.service");
const AdminService = require("../service/admin.service");

const UserRepository = require("../repository/user.repository");

const USER_ROLE = require("../constants/globals");

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

  async updateUserRole(req, res) {
    const userData = req.query;

    const mongooseInstance = req.app.get("mongooseInstance");
    const adminService = new AdminService(new UserRepository(mongooseInstance));

    const validRoles = [USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPERVISOR];

    if (!validRoles.includes(userData.role)) {
      return res.status(422).json({ message: "Invalid Role" });
    }

    const result = await adminService.updateUserRole(userData);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res
      .status(200)
      .json({ message: "Role Updated Successfully ", data: result });
  }

  async updateUserProfile(req, res) {
    const payload = req.body;
    const userId = req.query.user_id;

    const mongooseInstance = req.app.get("mongooseInstance");
    const adminService = new AdminService(new UserRepository(mongooseInstance));

    const result = await adminService.updateUserProfile(userId, payload);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res
      .status(200)
      .json({ message: "Profile Updated Successfully ", data: result });
  }
}

module.exports = AdminController;
