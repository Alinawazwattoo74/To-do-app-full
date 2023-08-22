const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config();
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors())



mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log("Connected To Database")
}).catch((error)=>{
    console.log(error)
})



const TodoItemRoute=require("./routes/todoItems")
app.use("/",TodoItemRoute)
app.listen(5000,()=>{
    console.log("Server is Listeing on 3000")
})