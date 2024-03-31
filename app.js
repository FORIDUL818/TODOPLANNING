const express=require("express")
const router=require("./src/Routes/api")
const mongoose=require("mongoose")
const rateLimit=require("express-rate-limit")
require('dotenv').config();
const bodyPerser=require("body-parser")
const app=express()
const cors=require("cors")

 app.use(cors())
app.use(bodyPerser.json());
app.use(rateLimit({windowMs:15*6*1000,
  max:100
}));

mongoose.connect("mongodb+srv://MyApp:kYnV2364rLXbRrtA@cluster0.p6zgz4y.mongodb.net/MyApp")
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err))

app.use("/api/v1",router);
app.use("*",(req,res)=>{

    res.status(404).json({status:"bad requiest"})
})

module.exports=app;
