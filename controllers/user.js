const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const regController = require("../routes/register");
const login = require("../routes/login");
const logout = require("../routes/logout");
const auth = require("../middleware/auth");
const otpController = require("../routes/otp");
const sendResetMail = require("../routes/reset");
router.post("/register", regController.register);
router.post("/", login);
router.get("/home", auth);
router.get("/logout", auth, logout);
router.post("/otp", otpController.otpChecker);
router.post("/reset", sendResetMail)
module.exports = router;

