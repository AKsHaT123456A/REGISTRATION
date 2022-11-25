const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
    {
        fullname:{
            type: String,
            required: true,
            maxlength: 100
      },
        rollno:{
          type:String,
          // required:true,
          maxlength:13
        },
        year:{
          type:String,
          required:true,
          maxlength:4
        },
        branch:{
          type:String,
          required:true,
    
        },
        gender:{
         type:String,
        //  required:true
        },
        mobno:{
          type:String,
          maxlength:10,
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: 1
        },
        password:{
            type:String,
            required: true,
            minlength:8
        },
        password2:{
            type:String,
            required: true,
            minlength:8
    
        },
        tokens:[{
          token:{
            type: String,
            required:true}
        }],
        is_verified:{
          type:Boolean,
          default:false
        },
        loginFlag:{
          type:Number,
          default:0
        },
        otp:{
          type:Number,
        },
        
    });
    userSchema.pre("save",async function(next){
      if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,10);
      }
      next();
    });
    userSchema.methods.createtoken = async function(){
      try {
        const token = await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token});
        await this.save();
        console.log(token);
        return token;
      } catch (error) {
        console.log(error);
      }
    }
    module.exports= userSchema;