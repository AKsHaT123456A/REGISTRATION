const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const userSchema = require('../models/userSchema');
const userData = mongoose.model("userData", userSchema);
const auth = require("../middleware/auth");
const router = express();
const logout =async (req, res) => {
    try {
        res.clearCookie("jwt");
        console.log("Logged out");
        // await req.user.save();
        res.status(200).send("Redirect to login");
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};

module.exports = logout