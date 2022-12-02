const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const userSchema = require('../models/userSchema');
const userData = mongoose.model("userData", userSchema);
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");
const cookies =require("universal-cookie");
const jwt = require("jsonwebtoken");
const router  = new express.Router();
router.post ("/",async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await userData.findOne({ email: email });
        const isMatch = bcrypt.compare(password, userEmail.password);
        console.log(userEmail._id);
        // const token = jwt.sign({ _id: userEmail._id }, process.env.SECRET_KEY);
        res.cookie("jwt", userEmail.tokens, {
            //expires:new Date(date.now()+ 6000000),
            httpOnly: true,
        });
        console.log(userEmail);
        if (userEmail) {
            if (isMatch) {
                res.status(200).send(userEmail.tokens);
            }
            else {
                res.status(400).send("Password did not matched");
            }
        }
        else {
            res.status(400).send("Email does not exist");
        }
    } catch (error) {
        res.status(400).send("Invalid Email");
        console.log(error);
    }
});
module.exports = router;