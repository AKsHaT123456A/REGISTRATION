const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userSchema=require('../models/userSchema');
const otpController = require("../routes/otp")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRound =10;
const userData = mongoose.model("userData",userSchema);
const register= async (req,res)=>{
    try{
    const newuser=new userData(req.body)
    otpController.sendVerifyMail(req.body.email,res);
   const token =  await newuser.createtoken();
   res.cookie("jwt",token,{
    //expires:new Date(date.now()+ 6000000),
    httpOnly:true
   });
     const registered = await newuser.save((err,doc)=>{
      if(err){
        console.log(err);
        res.status(400).send("Not Registered");
      }
      else{

        res.status(200).send("Registered");
        
        
      }
     });
}
    catch(err) {console.log(err);}
}
module.exports = register;