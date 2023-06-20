const User = require("../../model/user.model");
const bcrypt = require("bcrypt");
const saltlevel = 10;

const defaultPassword = "123456";

const userSeederRun = async () => {
  const salt = await bcrypt.genSalt(saltlevel);
  const encryptedPassword = await bcrypt.hash(defaultPassword, salt);
  const userData = [
    {
      email: "root@admin.com",
      password: encryptedPassword,
      fullName: "Root Admin User",
      contactNumber: "099999999",
      completeAddress: "Temp address",
      role: "ROOT",
    },
    {
      email: "user@email.com",
      password: encryptedPassword,
      confirm_password: "user",
      fullName: "Regular User",
      contactNumber: "099999999",
      completeAddress: "Temp address",
    },
  ];

  try {
    // drop Users if collection exists
    await Promise.allSettled([User.deleteMany({})]);

    console.log("Users collection has been cleared");

    const docs = await User.insertMany(userData);

    if (docs instanceof Error) {
      console.log("Error occured while inserting data", docs.message);
    }
    return;
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      console.log(
        "Duplicate key error. Skipped inserting duplicate documents."
      );
    } else {
      console.error(err);
    }
  }
};

module.exports = userSeederRun;