let mongoose=require("mongoose")

const monoSchema=new mongoose.Schema({
    Name:{type:String,required:true},
      Email:{type:String,required:true,unique:true},
      Password:{type:String,required:true},
      Photo:{type:String},
      CreateDate:{type:Date,default:Date.now()}
   },{versionKey:false})
   
   
   const userModel=mongoose.model("users",monoSchema)
   module.exports=userModel


