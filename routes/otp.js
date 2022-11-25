const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const userOtpVerification = require("../models/passverification");
const { error } = require("console");
const { stringify } = require("querystring");
express.json({extended:true});
app.use(bodyParser.urlencoded({extended:true}));
const otp = Math.floor(1000 + Math.random() * 9000);
// const hashedOtp =  bcrypt.hash(otp,10);
const sendVerifyMail = async (email,res)=>{
  try {
        
        const newUserOtpVerification = await new userOtpVerification({
            otp:otp
        });
        await newUserOtpVerification.save()
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS:true,
      auth: {
        user: process.env.SENDER_KEY, 
        pass: process.env.EMAIL_TEST_PASSWORD,  
      },
    });
  
    let info = await transporter.sendMail({
      from:process.env.SENDER_KEY,
      to:email,
      subject:"Verification", 
      text: "", 
       html:otp +" is the otp for verifcation",
    });  
    console.log("sent");
   
  }catch (error) {
    console.log(error);
    res.json({
        status:"FAILED",
        message:"Error Occured in saving"
    });
      }};  
      const otpChecker=async(req,res)=>{
      try {
        let otp = req.body;
        if(!otp)throw error("Otp not filled");
        else{
            const userOtpRecord= await userOtpVerification.find({otp:otp});
            console.log(userOtpRecord);
        //    console.log(hashedOtp);

        }
      } catch (error) {
        console.log(error);
      }
    }

// module.exports.Otp = Otp;
module.exports = {sendVerifyMail,otpChecker};
