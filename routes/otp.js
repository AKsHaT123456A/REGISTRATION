const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const userOtpVerification = require("../models/passverification");
const userSchema = require("../models/userSchema");
const userData = mongoose.model("userData", userSchema);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const otp = Math.floor(1000 + Math.random() * 9000);
const stringOtp = otp.toString();
console.log(stringOtp);
const router = express();
const sendVerifyMail =async (_id, email, res) => {
  try {
    console.log(_id);
    console.log(otp);
    // const hashedOtp =  await bcrypt.hash(stringOtp,10);
    const newUserOtpVerification = await new userOtpVerification({
      userid: _id,
      otp: otp
    });
    await newUserOtpVerification.save()
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SENDER_KEY,
        pass: process.env.EMAIL_TEST_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.SENDER_KEY,
      to: email,
      subject: "Verification",
      text: "",
      html: otp + " is the otp for verifcation",
    });
    console.log("sent");

  } catch (error) {
    console.log(error);
    // res.json({
    //     status:"FAILED",
    //     message:"Error Occured in saving"
    // });
  }
};
const otpChecker = async (req, res) => {
  try {
    let { userid, otp } = req.body;
    if (otp) {//throw error("Otp not filled");

      // const userOtpRecord= await userOtpVerification.find({userid,
      // });
      // if(userOtpRecord.length <=0){
      //   res.status(400).send("Account doesnt exists");
      // }
      // else{

      //  const validOtp = await bcrypt.compare(otp,hashedOtp);
      if (stringOtp !== req.body.otp) {
        res.status(400).send("Invalid");
      }
      else {
        await userOtpVerification.findOne({ otp }, async (err, result) => {
          if (err) console.log(err);
          const userId = result.userid;
          const stringUserId = userId.toString();
          console.log(userId);
          await userData.findByIdAndUpdate({ _id: stringUserId }, { $set: { is_verified: true } })
        }).clone();
        await userOtpVerification.deleteMany({ userid });

        //     await userOtpVerification.deleteMany({userid}); 
        res.send("Valid");
      }
    }

    else {
      res.send("Enter the otp");
      //  console.log(userOtpRecord);
      //    console.log(hashedOtp);

    }
  } catch (error) {
    console.log(error);
  }
}

// module.exports.Otp = Otp;
module.exports = { sendVerifyMail, otpChecker };
