const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const userSchema=require('../models/userSchema');
const userData = mongoose.model("userData",userSchema);
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");
const login = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail= await userData.findOne({email:email});
        const isMatch = await bcrypt.compare(password,userEmail.password);
        const token =  await userEmail.createtoken();
        res.cookie("jwt",token,{
            //expires:new Date(date.now()+ 6000000),
            httpOnly:true
           });
        console.log(userEmail);
        if(userEmail){
            if(isMatch)
            {
                res.status(200).send(token);
            }
            else{
                res.status(400).send("Password did not matched");
            }
        }
        else{
            res.status(400).send("Email does not exist");
        }
    } catch (error) {
        res.status(400).send("Invalid Email");
        console.log(error);
    }
}
module.exports = login;