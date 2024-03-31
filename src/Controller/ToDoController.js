const TodoModel=require("../Models/ToDoModal")
// create ToDo start
exports.CreateTodo= async (req,res)=>{
    try{
        let reqbody=req.body;
        reqbody.email=req.headers.email;
        const toDo=await TodoModel.create(reqbody);
        res.status(200).json({staus:"sucsses",Data:toDo})
        
    }
    catch(err){
        res.status(200).json({status:"fail",Data:err})
    }
}
// create ToDo end
// UpdateTodo start
exports.UpdateToDo=async (req,res)=>{
    
    try{
        let id=req.params.id;
        let status=req.params.status;
        let quary={_id:id}
        let body={status:status}
        let todo=await TodoModel.updateOne(quary,body)
        res.status(200).json({status:"sucsess",data:todo})
    }
    catch(err){
        res.status(200).json({status:"fail",data:err})
    }
    
}

// UpdateTodo end
// delete todo start

  exports.DeleteToDo=async function(req,res){
  try{
   const id=req.params.id;
   const quary={_id:id};
   const todo= await TodoModel.deleteOne(quary)
    res.status(200).json({status:"success",todo})
}
catch(err){
  res.status(200).json({status:"fail",data:err})
}
}
// delete todo end

// todolistbystatus start
  exports.TodoListByStatus=async (req,res)=>{
  
    try{
        let status=req.params.status;
        let email=req.headers.email;
    console.log(status)
        const result= await TodoModel.aggregate(
            
            [
             {
              $match:{status:status,email:email}
             },
             {$project:{_id:1,title:1,description:1,status:1,createDate:{$dateToString: {format:"%d-%m-%Y", date:"$createDate"}}}}
            ]
            )
            res.status(200).json({status:"succsess",data:result})
    }
    catch(err){
    
      res.status(200).json({status:"faild",data:err})
    }
}
// todolistbystatus end


// todoCountbySatus start
  exports.TodoCountBystatus=async (req,res)=>{
 try{
    
    let email=req.headers.email

    const result=await TodoModel.aggregate(
         [
          {$match:{email:email}},
          {$group:{_id:"$status",count:{$count:{}} }}
        ]
        )
        res.status(200).json({status:"success",data:result})
}
 catch(err){
  res.status(200).json({status:"faild",data:err})
}
}
// todoCountbySatus end