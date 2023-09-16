const { createUser, getUserById } = require("../db/db");
const jwt = require("jsonwebtoken");

const dataRqst = (req, res, next) => {
  getUserById(req.params.id)
    .then((user) => {
      if (user) {
        res.json({
          message: "Success",
          user,
        });
      } else {
        next(new Error("no user found"));
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

const signUpUser = (req, res, next) => {
  createUser(req.body)
    .then((result) => {
      res.json({
        status: "Success",
        message: "User Created",
      });
    })
    .catch((err) => {
      res.status(409).json({
        status: "Failed",
        message: "User Already Exist",
      });
    });
};

const login = (req, res) => {
  const token = jwt.sign({ name: req.body.name }, process.env.JWTKEY);
  res.json({
    message: "User Logged In",
    keyToken: token,
    user: req.body.userData,
  });
};

module.exports = { dataRqst, signUpUser, login };
