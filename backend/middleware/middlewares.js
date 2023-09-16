const bcrypt = require("bcrypt");
const { userValidation } = require("../db/db");
const jwt = require("jsonwebtoken");

const encryptPassword = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash;
    next();
  });
};

const checkPassWord = (req, res, next) => {
  userValidation(req.body).then((userFromDb) => {
    if (userFromDb) {
      bcrypt.compare(req.body.password, userFromDb.password, (err, result) => {
        if (result) {
          req.body.userData = userFromDb;
          next();
        } else {
          res.status(401).json({
            Status: "Failed",
            message: "check your password or username",
          });
        }
      });
    } else {
      res.status(401).json({
        Status: "Failed",
        message: "User  dosent exist",
      });
    }
  });
};

const checkAuthorization = (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  if (authorizationToken) {
    jwt.verify(authorizationToken, process.env.JWTKEY, (err, result) => {
      if (err) {
        res.status(401).json({
          status: "Failed",
          message: "Token Malformed...",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      status: "Failed",
      message: "Authorization Required",
    });
  }
};

const errorMiddleWare = (err, req, res, next) => {
  res.json({
    status: "Failed",
    error: new Error(err.toString()),
  });
};

module.exports = {
  encryptPassword,
  checkPassWord,
  checkAuthorization,
  errorMiddleWare,
};
