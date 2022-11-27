//jshint esversion:6
require('dotenv').config();
const express = require("express");  
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose =require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const router  = require('./controllers/user');
const cors = require("cors");
const app =express();
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use("/",router)
app.use(cookieParser());


//const otp = require("./controllers/otp")
const port = process.env.PORT || 3000 ;
mongoose.connect(process.env.DATABASE_KEY,{useNewUrlParser:true}).then(console.log("Connection Successfully"));
const userData=require('./models/userSchema');
app.listen(port,function(err){
if(err)console.log(err);
else console.log("Server Started");
});