const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const API_SERVER = require("./test.constants");

chai.use(chaiHttp);

describe("Testing the health of the server", () => {
  it("should return a success status", (done) => {
    chai
      .request(API_SERVER) // Replace with your server URL
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal("myContactList App v. 0.1");
        done();
      });
  });
});
