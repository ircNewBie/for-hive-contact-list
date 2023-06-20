require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../src/model/user.model");

const bcrypt = require("bcrypt");
const API_SERVER = require("../test.constants");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
describe("Integration test for GET users", async () => {
  const saltlevel = 10;
  const salt = await bcrypt.genSalt(saltlevel);
  const defaultPassword = "123456";

  const encryptedPassword = await bcrypt.hash(defaultPassword, salt);

  const userData = [
    {
      email: "testuser1@admin.com",
      password: encryptedPassword,
      fullName: "Root Admin",
      contactNumber: "099999999",
      completeAddress: "test address",
      role: "ROOT",
    },
    {
      email: "testuser2@admin.com",
      password: encryptedPassword,
      fullName: "Root Admin2",
      contactNumber: "099999999",
      completeAddress: "test address",
      role: "ROOT",
    },
  ];

  const validUserCreds = {
    email: userData[1].email,
    password: userData[1].password,
  };

  before(async () => {
    // connect to database
    const MONGO_CONN_STRING = process.env.MONGODB_URI + process.env.MONGODB_DB;
    await mongoose.connect(MONGO_CONN_STRING, {
      useNewUrlParser: true,
    });
    await Promise.allSettled([User.deleteMany({})]);
    await User.insertMany(userData);
  });

  after(async () => {
    // await Promise.allSettled([User.deleteMany({})]);
    mongoose.disconnect();
  });

  describe("GET /api/user/all", () => {
    const getAllURI = "/api/user/all";

    it("GET'/api/user/all' Should be a valid uri. ", (done) => {
      chai
        .request(API_SERVER)
        .get(getAllURI)
        .send(validUserCreds)
        .end((err, res) => {
          expect(res).to.not.have.status(404);
          done();
        });
    });

    it(" Should return an unauthorized using an invalid user credentials. ", (done) => {
      validUserCreds.email = "XXXXXXXXXXXXXXXXX";

      chai
        .request(API_SERVER)
        .get(getAllURI)
        .send(validUserCreds)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
