require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const API_SERVER = require("../test.constants");

chai.use(chaiHttp);

describe("Integration test for user", () => {
  process.env.NODE_ENV = "test";

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
    const signupURI = "/api/user/signup";
    const userPayload = {
      email: "testuser@admin.com",
      password: "admin",
      confirm_password: "admin",
      fullName: "Root Admin",
      contactNumber: "099999999",
      completeAddress: "test address",
    };

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

    it("User should be able to login", (done) => {
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
