const Exception = require("../utils/error.handler");
const UserService = require("../service/user.service");
const ContactService = require("../service/contact.service");
const ContactRepository = require("../repository/contact.repository");

class ContactController {
  async createContact(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const contactService = new ContactService(
      new ContactRepository(mongooseInstance)
    );

    const result = await contactService.createContact(req, res);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res
      .status(201)
      .json({ message: "Contact created successfully", data: result });
  }

  // async getAllUsers(req, res) {
  //   const mongooseInstance = req.app.get("mongooseInstance");
  //   const userService = new UserService(new UserRepository(mongooseInstance));
  //   const result = await userService.getAllUsers();

  //   if (result instanceof Exception) {
  //     return res.status(result.code).json({ message: result.message });
  //   }
  //   return res.status(200).json({ message: "Success", data: result });
  // }

  // async getUserById(req, res) {
  //   const mongooseInstance = req.app.get("mongooseInstance");
  //   const userService = new UserService(new UserRepository(mongooseInstance));

  //   const userId = req.query.id;

  //   const result = await userService.getUserById(userId);

  //   if (result instanceof Exception) {
  //     return res.status(result.code).json({ message: result.message });
  //   }
  //   return res.status(200).json({ message: "Success", data: result });
  // }
}

module.exports = ContactController;