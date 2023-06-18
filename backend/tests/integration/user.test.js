const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const API_SERVER = require("../test.constants");

chai.use(chaiHttp);

describe("GET /api/user/test", () => {
  const routerURI = "/api/user/test";
  it("should return a success response", (done) => {
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
