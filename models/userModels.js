const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true,
        unique:true
    }
},{timestamps:true})

const User=mongoose.model("User",userschema)

module.exports=User