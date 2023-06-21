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

  async getAllContacts(req, res) {
    const currentUser = req.user;
    const mongooseInstance = req.app.get("mongooseInstance");
    const contactService = new ContactService(
      new ContactRepository(mongooseInstance)
    );

    const result = await contactService.getAllContacts(currentUser);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "My Contacts", data: result });
  }
  async deleteAContact(req, res) {
    const currentUser = req.user;
    const contactToDelete = req.query.contact_id;

    const mongooseInstance = req.app.get("mongooseInstance");
    const contactService = new ContactService(
      new ContactRepository(mongooseInstance)
    );

    const result = await contactService.deleteCurrentUserContact(
      currentUser,
      contactToDelete
    );

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "Contact deleted.", data: result });
  }
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
