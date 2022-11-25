const mongoose = require("mongoose");
const { stringify } = require("querystring");
const otpSchema = new mongoose.Schema({
    otp:{type:Number}
});
const userOtpVerification = mongoose.model("userOtpVerification",otpSchema);
module.exports = userOtpVerification