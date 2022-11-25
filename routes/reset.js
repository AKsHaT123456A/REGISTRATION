const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const userSchema= require("../models/userSchema");
const { json } = require("body-parser");
express.json({extended:true});
const userData = mongoose.model("userData",userSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const sendResetMails = async (req,res)=>{
    try {
        const email = req.body.email;
         userData.findOne({email},function(err,result){

        
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
    
      let info =  transporter.sendMail({
        from:process.env.SENDER_KEY,
        to:email,
        subject:"RESET", 
        text: "The password is:-", 
         html: result.password2
      });  
      console.log("sent");
    });
     
    }catch (error) {
      console.log(error);
    //   res.json({
    //       status:"FAILED",
    //       message:"Error Occured in saving"
    //   });
        }};  
        module.exports=sendResetMails;