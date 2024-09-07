require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../src/model/user.model");
const bcrypt = require("bcrypt");
const API_SERVER = require("../test.constants");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

let userData;

const setupUsers = async () => {
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
  return userData;
};

chai.use(chaiHttp);
describe("Integration tests for GETting users", () => {
  let validUserCreds;
  let jwToken = "test";
  before(async () => {
    // connect to database
    const MONGO_CONN_STRING = process.env.MONGODB_URI + process.env.MONGODB_DB;
    await mongoose.connect(MONGO_CONN_STRING, {
      useNewUrlParser: true,
    });
    await Promise.allSettled([User.deleteMany({})]);
    
    userData = await setupUsers();
    await User.insertMany(userData);

    validUserCreds = {
      email: userData[1].email,
      password: "123456", // Plaintext password for testing
    };

    // login User
    const loginURI = "/api/user/login";
    const res = await chai
    .request(API_SERVER)
    .post(loginURI)
    .send(validUserCreds); // Use async/await to ensure the response is awaited
    expect(res).to.have.status(200); // Ensure the login was successful
    jwToken = res.body.accessToken; // Assuming the token is in res.body.accessToken
    
  });

  after(async () => {
    mongoose.disconnect();
  });

  describe("Get all users URL: `GET /api/user/all`", () => {
 
    const getAllURI = "/api/user/all";
    it("Should return unauthorized without using a token.", (done) => {
      chai
        .request(API_SERVER)
        .get(getAllURI)
        .end((err, res) => {
        expect(res).to.have.status(401); // Expect unauthorized
        done();
      });
    });

    
    it("Should be able to get users using a valid JWT token.", (done) => {
      chai
        .request(API_SERVER)
        .get(getAllURI)
        .set("Authorization", `Bearer ${jwToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);  
        done();
      });
  });
  });
});
