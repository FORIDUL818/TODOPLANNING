const mongoose=require("mongoose")

const todoSchema= new mongoose.Schema(
 {
  title:{type:String},
  description:{type:String},
  email:{type:String,unique:true},
  status:{type:String},
  createDate:{type:Date,default:Date.now()}
},
{versionKey:false}
)

const TodoModel=mongoose.model("todos",todoSchema)
module.exports=TodoModel;