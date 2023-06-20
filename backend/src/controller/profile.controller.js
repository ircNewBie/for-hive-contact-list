const Exception = require("../utils/error.handler");
const ProfileService = require("../service/profile.service");
const ProfileRepository = require("../repository/profile.repository");

class ProfileController {
  async createProfile(req, res) {
    const mongooseInstance = req.app.get("mongooseInstance");
    const payload = req.body;

    const profileService = new ProfileService(
      new ProfileRepository(mongooseInstance)
    );

    const result = await profileService.createProfile(
      req.params.user_id,
      payload
    );

    if (result instanceof Exception) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(201).json({ message: "success", data: result });
  }
}

module.exports = ProfileController;
