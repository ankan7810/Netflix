const User=require('../models/userModels.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const Login=async (req,res)=>{
   
    try {
        const {email,Password}=req.body;
        if( !email || !Password){
            return res.status(401).json({
             message:"Invalid data",
             success:false
            })
         } 
         const user=await User.findOne({email})
         if(!user){
            return res.status(401).json({
                message:"Invalid email ID",
                success:false,
            })
        }
        //compare(password,password which is store in db previously)
        const ismatch=bcrypt.compare(Password,user.Password)
        if(!ismatch){
            return res.status(401).json({
                message:"Invalid email ID",
                success:false,
            })
        }
        const tokenData={
            id:user._id
        }
        const token=jwt.sign(tokenData, "zgmsbgksehgsehgisegkjesges", { expiresIn: "1h" })
        //"httpOnly" is a option.
        return res.status(200).cookie("token",token,{httpOnly:true}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true
        })

    } catch (error) {
        console.log("Error:",error);
    }
}

const Logout=async (req,res)=>{
    return res.status(200).cookie("token","", { expiresIn:new Date(Date.now()) , httpOnly:true}).json({
        message:`Logged out sucessfully`,
        success:true
    })
}

const Register=async (req,res)=>{
    try {
        const {fullname,email,Password}=req.body;
        if(!fullname || !email || !Password){
           return res.status(401).json({
            message:"Invalid data",
            success:false
           })
        }
        const user=await User.findOne({email})
        if(user){
            return res.status(401).json({
                message:"This email already used",
                success:false,
            })
        }
        const hashedpassword=await bcrypt.hash(Password,16);

        await User.create({
            fullname, 
            email,
            Password:hashedpassword
        });

        // await User.create({
        //     fullname,
        //     email,
        //     Password
        // });

        return res.status(201).json({
            message:"Account created sucessfully",
            success:true
        })
    } catch (error) {
        console.log("Error:",error);
    }
}

module.exports={
    Register,
    Login,
    Logout
}