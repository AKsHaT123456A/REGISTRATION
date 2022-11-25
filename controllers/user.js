const express = require("express");  
const router =express();
const bodyParser = require("body-parser");
const register = require("../routes/register");
const login = require("../routes/login");
const logout = require("../routes/logout");
const auth = require("../middleware/auth");
const otpController = require("../routes/otp");
router.post("/register",register);
router.post("/login",login);
router.get("/home",auth);
router.get("/logout",auth,logout);
router.get("/otp",otpController.otpChecker)
module.exports = router;

