const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const userSchema = require("../models/userSchema");
const userData =  mongoose.model("userData",userSchema);
const v=0;
const auth = async(req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        const userVerify = jwt.verify(token,process.env.SECRET_KEY);
        console.log(userVerify);
        const user = userData.findById(userVerify._id);
        console.log(user);
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}
module.exports = auth;