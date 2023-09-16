const express = require("express");
const router = express.Router();

const { signUpUser, login } = require("../controller/authContrllr");
const { encryptPassword, checkPassWord } = require("../middleware/middlewares");

router.post("/signup", encryptPassword, signUpUser);
router.post("/login", checkPassWord, login);

module.exports = router;
