const mongoose=require("mongoose")



const TodoItemSchema=new mongoose.Schema({

    item:{
        type:String,
        reuired:true
    }
})


module.exports=mongoose.model("todo",TodoItemSchema)