const mongoose = require("mongoose");
const { stringify } = require("querystring");
const otpSchema = new mongoose.Schema({
    userid:{type:String},
    otp:{type:String}
});

const userOtpVerification = mongoose.model("userOtpVerification",otpSchema);
otpSchema.pre("save",async function(next){
    if(this.isModified("otp")){
    this.otp = await bcrypt.hash(this.otp,10);
    }
    next();
  });
module.exports = userOtpVerification