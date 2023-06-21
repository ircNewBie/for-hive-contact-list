const Exception = require("../utils/error.handler");
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

  async updateMyContact(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const contactService = new ContactService(
      new ContactRepository(mongooseInstance)
    );

    const contactData = req.body;
    const contactId = req.query.contact_id;

    const result = await contactService.updateMyContact(contactId, contactData);

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "Contact updated.", data: result });
  }

  async shareContactToFriend(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const contactService = new ContactService(
      new ContactRepository(mongooseInstance)
    );

    const contactId = req.query.contact_id;
    const friendId = req.query.friend_id;

    const result = await contactService.shareContactToFriend(
      friendId,
      contactId
    );

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ message: "Contact shared.", data: result });
  }
}

module.exports = ContactController;
