var express = require("express");
var router = express.Router();

const ObjectId = require("mongoose").Types.ObjectId;
const UserController = require("../controller/user.controller");

const User = require("../model/user.model");

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Users' route is working!" });
});

module.exports = router;
