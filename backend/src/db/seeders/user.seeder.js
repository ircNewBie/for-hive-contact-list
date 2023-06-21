const User = require("../../model/user.model");
const Profile = require("../../model/profile.model");

const bcrypt = require("bcrypt");
const saltlevel = 10;

const USER_ROLE = require("../../constants/globals");

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
      role: USER_ROLE.ROOT,
    },
    {
      email: "admin@admin.com",
      password: encryptedPassword,
      fullName: "Root Admin User",
      contactNumber: "099999999",
      completeAddress: "Temp address",
      role: USER_ROLE.ADMIN,
    },
    {
      email: "user@email.com",
      password: encryptedPassword,
      fullName: "Regular User",
      contactNumber: "099999999",
      completeAddress: "Temp address",
    },
    {
      email: "edelberto.mania@hivegroupinc.com",
      password: encryptedPassword,
      fullName: "Mdelberto Mania",
      contactNumber: "099999999",
      completeAddress: "Temp address",
      role: USER_ROLE.ADMIN,
    },
    {
      email: "sherwyn.ayao@hivegroupinc.com",
      password: encryptedPassword,
      fullName: "Sherwyn Ayao",
      contactNumber: "099999999",
      completeAddress: "Temp address",
      role: USER_ROLE.ADMIN,
    },
    {
      email: "elmo.villamante@hivegroupinc.com",
      password: encryptedPassword,
      fullName: "Elmo Villamante",
      contactNumber: "099999999",
      completeAddress: "Temp address",
      role: USER_ROLE.ROOT,
    },
  ];

  try {
    // drop Users if collection exists
    await Promise.allSettled([User.deleteMany({}), Profile.deleteMany({})]);

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
