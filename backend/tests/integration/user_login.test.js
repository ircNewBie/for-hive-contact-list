require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../src/model/user.model");

const bcrypt = require("bcrypt");
const API_SERVER = require("../test.constants");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
describe("Integration test for user login", () => {
  const userData = {
    email: "testuser@admin.com",
    password: "admin",
    fullName: "Root Admin",
    contactNumber: "099999999",
    completeAddress: "test address",
    role: "ROOT",
  };

  const validUserCreds = {
    email: userData.email,
    password: userData.password,
  };

  before(async () => {
    const saltlevel = 10;
    const salt = await bcrypt.genSalt(saltlevel);
    userData.password = await bcrypt.hash(userData.password, salt);

    // connect to database
    const MONGO_CONN_STRING = process.env.MONGODB_URI + process.env.MONGODB_DB;
    await mongoose.connect(MONGO_CONN_STRING, {
      useNewUrlParser: true,
    });
    await Promise.allSettled([User.deleteMany({})]);
    const user = await new User(userData).save();
  });

  after(async () => {
    await Promise.allSettled([User.deleteMany({})]);
    mongoose.disconnect();
  });

  describe("GET /api/user/test", () => {
    const routerURI = "/api/user/test";
    it("should return a success status", (done) => {
      chai
        .request(API_SERVER) // Replace with your server URL
        .get(routerURI)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Users' route is working!");
          done();
        });
    });
  });

  describe("POST /api/user/login", () => {
    const loginURI = "/api/user/login";
    const loginPayload = {
      email: userData.email,
      password: userData.password,
    };

    it("User login should fail with incorrect password", (done) => {
      loginPayload.password = "XXXXXXXXX";
      chai
        .request(API_SERVER)
        .post(loginURI)
        .send(loginPayload)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.equal("Invalid Credentials");
          done();
        });
    });
    it("User login should fail with incorrect email", (done) => {
      loginPayload.email = "test.dddd";
      chai
        .request(API_SERVER)
        .post(loginURI)
        .send(loginPayload)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.equal("Invalid Credentials");
          done();
        });
    });

    it("User should be able to login using correct credentials", (done) => {
      const loginURI = "/api/user/login";
      const loginPayload = validUserCreds;

      chai
        .request(API_SERVER)
        .post(loginURI)
        .send(loginPayload)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("accessToken");
          expect(res.body).to.have.property("user");
          done();
        });
    });
  });
});
