const express = require("express");
app=express();
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
    const newuser=new userData(req.body);
    const eMail = req.body.email; 
   const token =  await newuser.createtoken();
   res.cookie("jwt",token,{
    //expires:new Date(date.now()+ 6000000),
    httpOnly:true
   });
     const registered = await newuser.save((err,result)=>{
      if(err){
        console.log(err);
        res.status(400).send("Not Registered");
      }
      else{

        res.status(200).send("Registered");
        
        
      }

     });
  const pass=req.body.password2;
     userData.findOne({email:eMail},async(err,result)=>{
      if(err)console.log(err);
      console.log(result._id);
      const id = result._id;
      const email= result.email;
      otpController.sendVerifyMail(id,email,res);
      
});}
  
    catch(err) {console.log(err);}
}
module.exports = {register,pass};