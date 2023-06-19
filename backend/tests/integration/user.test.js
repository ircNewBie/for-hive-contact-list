require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../src/model/user.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const API_SERVER = require("../test.constants");

describe("Integration test for user", () => {
  // @TODO: for improvement - create a fixture to use separate database when NODE_ENV = 'test'
  // process.env.NODE_ENV = "test";

  const signupURI = "/api/user/signup";
  const userPayload = {
    email: "testuser@admin.com",
    password: "admin",
    confirm_password: "admin",
    fullName: "Root Admin",
    contactNumber: "099999999",
    completeAddress: "test address",
  };

  before(async () => {
    // connect to database
    const MONGO_CONN_STRING = process.env.MONGODB_URI + process.env.MONGODB_DB;

    await mongoose.connect(MONGO_CONN_STRING, {
      useNewUrlParser: true,
    });
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

  describe("Testing 'POST /api/user/signup' route", () => {
    beforeEach(async () => {
      await Promise.allSettled([User.deleteMany({})]);
    });

    it("should return a non-404 response", (done) => {
      chai
        .request(API_SERVER)
        .post(signupURI)
        .end((err, res) => {
          expect(res).to.not.have.status(404);

          done();
        });
    });

    it("User should be able to signup.", (done) => {
      chai
        .request(API_SERVER)
        .post(signupURI)
        .send(userPayload)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe("Testing 'POST /api/user/login' route", () => {
    const loginURI = "/api/user/login";
    const loginPayload = {
      email: "testuser@admin.com",
      password: "admin",
    };

    it("User should be able to login using correct credentials", (done) => {
      const loginURI = "/api/user/login";
      const loginPayload = {
        email: "testuser@admin.com",
        password: "admin",
      };

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
  });
});
