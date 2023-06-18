const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

describe("GET /api/user/test", () => {
  it("should return a success response", (done) => {
    chai
      .request("http://localhost:5000") // Replace with your server URL
      .get("/api/user/test")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Users' route is working!");
        // Add more assertions as needed
        done();
      });
  });
});
