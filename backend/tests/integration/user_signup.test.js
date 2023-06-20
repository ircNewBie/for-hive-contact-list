require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../src/model/user.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const API_SERVER = require("../test.constants");

describe("Integration test for user Signup", () => {
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

  describe("POST /api/user/signup", () => {
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
});
