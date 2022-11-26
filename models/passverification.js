const mongoose = require("mongoose");
const { stringify } = require("querystring");
const otpSchema = new mongoose.Schema({
    userid:{type:String},
    otp:{type:String}
});
const userOtpVerification = mongoose.model("userOtpVerification",otpSchema);
module.exports = userOtpVerification