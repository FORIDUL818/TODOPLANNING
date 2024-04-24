const OtpModel = require("../Models/OtpModel");
const userModel=require("../Models/UserModels")
var jwt = require('jsonwebtoken');
const SendEmailUtility = require("../Utility/SendMailUtility");

// start ragistration
exports.Ragistration=async(req,res)=>{
  try{
  let reqbody=req.body;
  let user=await userModel.create(reqbody)
  res.status(200).json({status:"success",data:user})
  }
  catch(err){
    res.status(200).json({status:"faild",data:err})
  }
}
// end ragistration
// start login
exports.login= async function(req,res){ 
 try{
let reqbody=req.body;
let userData= await userModel.findOne(reqbody);

let user={ email:reqbody.email}
if (!user){
    res.status(200).json({status:"email not match"})
}
if(userData.password !==reqbody.password){
  res.status(200).json({status:"password not match"})
}
else{
    let payload={exp:Math.floor(Date.now()/1000)+(60*60),data:user['email']}
    let token=jwt.sign(payload, process.env.JWT_SECRET)
    res.status(200).json({status:"sussece",data:userData,Token:token})
}
}
catch(err){
   res.status(200).json({status:"faild",data:err.massege})  
}
}
// end login

// profile update start

exports.profileUpdate=async function(req,res){
  try{
    let email=req.headers.email;
    let body=req.body
    let quary={email:email}
    let user=await userModel.updateOne(quary,body)
    res.status(200).json({status:"success",data:user})
}
catch(err){
    res.status(200).json({status:"fail",data:err})
}
}
exports.profileDetails=async function(req,res){
    try{
    let email=req.headers.email;
    let body=req.body
    let quary={email:email}
    let user=await userModel.findOne(quary,body)
    res.status(200).json({status:"success",data:user})
}
catch(err){
    res.status(200).json({status:"fail",data:err})
}
}

// recover email and otp varification start

  exports.RecoverVaryfyEmail=async(req,res)=>{
    let Email=req.params.email;
    let Otp=Math.floor(Math.random() * 1000000)
    
    try{
     let user= await userModel.findOne({email:Email})
     if(!user){
     res.status(200).json({status:"faid",data:"user not found"})
    }
    else{
      let crateOtp=await OtpModel.create({email:Email,Otp:Otp})
      let sendMail=SendEmailUtility(Email,Otp)
      return res.status(200).json({status:"success",data:"your email and otp varification successfully",crateOtp:crateOtp, sendMail:sendMail})
    }
    }
    catch(err){
    res.status(200).json({status:"faild",data:err})
    }
    
}
// recover email and otp varification end

// otp varification start
    exports.OtpVarification=async (req,res)=>{
      let email=req.params.email;
      let otp=req.params.otp;
      let status=0;
      let statusUpdate=1

      try{
       let otpchack=await OtpModel.aggregate(
        [
          {$match:{email:email,otp:otp,status:status}},
          {$count:"total"}
        ]
        )

        if(otpchack.length>0){
        let otpUpdate=await OtpModel.updateOne({email:email,otp:otp},{status:statusUpdate})
        res.status(200).json({status:"success",data:otpUpdate})
        }else{
         res.status(200).json({status:"faild",data:"otp Invalid"}) 
        }
    }catch(err){
      res.status(200).json({status:"faild",data:err})
    }
    }
// otp varification end

// password reset start
  exports.passwordReset=async(req,res)=>{
    let email=req.body.email;
    let Otp=req.body.Otp;
    let statusUpdate=1
    let newPassword=req.body.Password
  try{
let otpchack=await OtpModel.aggregate(
    [
        {$match:{email:email,Otp:Otp,status:statusUpdate}},
        {$count:"total"}
      ]
     )
     if(otpchack.length>0){
     let updatePassword=await userModel.updateOne({email:email},{Password:newPassword})
     res.status(200).json({status:"success",data:updatePassword})
    }
}
catch(err){
res.status(200).status({status:"faild",data:err})
}
}
// password reset end