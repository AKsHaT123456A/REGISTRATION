const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const regController=require("../routes/register")
const cors = require("cors");
// const router = express();
app.use(function(req, res, next) {
  if (context.Request.HttpMethod.ToLower() == "options")
  {
     var origin = context.Request.Headers["origin"];
     context.Response.StatusCode = 200;
     context.Response.AddHeader("Access-Control-Allow-Origin", origin);
     context.Response.AddHeader("Access-Control-Allow-Credentials", "true");
     context.Response.AddHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
     context.Response.End();
  }
  
  next();
});
app.use(cors());
const userSchema= require("../models/userSchema");

// express.json({extended:true});
const userData = mongoose.model("userData",userSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const sendResetMail= async(req,res)=>{
    try {
        const email = req.body.email;
         const passUser=  await userData.findOne({email});
         if(passUser){
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
        text: "The password is:- "+passUser.password2, 
       // html:password
      });  
      console.log("sent");
      res.status(200).send("Sent");}
      else{
        res.send("Invalid");
      }
    //  res.send(result.password2);
   
     
    }catch (error) {
      console.log(error);
      res.json({
          status:"FAILED",
          message:"Error Occured in saving"
      });
        }};
        module.exports=sendResetMail;