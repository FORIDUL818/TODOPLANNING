let mongoose=require("mongoose")

const monoSchema=new mongoose.Schema({
    name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,required:true},
      Photo:{type:String},
      createDate:{type:Date,default:Date.now()}
   },{versionKey:false})
   
   
   const userModel=mongoose.model("users",monoSchema)
   module.exports=userModel


