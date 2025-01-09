const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:12,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minLength:5
    },
    age:{
      type:Number,
    }
})



const User = mongoose.model("users",UserSchema)


module.exports = User;



