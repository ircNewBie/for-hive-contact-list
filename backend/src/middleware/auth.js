const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const bearerToken = req.header("Authorization");

  if (!bearerToken) {
    return res.status(401).json({ message: "Access denied" });
  }
  const token = bearerToken.split(" ")[1];

  try {
    req.user = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      {},
      (err, decodeUser) => {
        if (err !== null && err instanceof JsonWebTokenError) {
          return err;
        }
        return decodeUser;
      }
    );
    next();
  } catch (err) {
    res.status(422).json({ error: "Unexpected Error! Login failed" });
  }
};
