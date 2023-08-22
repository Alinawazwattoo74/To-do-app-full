const router=require("express").Router()
const todoItemsModel=require("../models/todoitems")







router.post("/api/item",async(req,res)=>{
    try{
        const item=req.body.item;
        const newItem=new todoItemsModel({
            item:item
        })
const saveItem=await newItem.save();
res.status(200).json(saveItem)
    }catch(error){
        res.json(error)

    }
})



router.get("/api/items",async(req,res)=>{
    try{
        const data= await todoItemsModel.find({})
        res.json(data)

    }catch(error){
        console.log(error)


    }
})



router.post("/api/item/:id",async(req,res)=>{
    const id=req.params.id;
    const newItem=req.body
    try{
        const updateItem=await todoItemsModel.findByIdAndUpdate(id,newItem)
        res.json("Item Updated")
        
    }catch(error){
        console.log(error)

    }

})



router.delete("/api/item/:id",async (req,res)=>{
    try{
        const delteItem=await todoItemsModel.findByIdAndDelete(req.params.id)
        res.json("Item delted")

    }catch(error){
        console.log(error)
    }
})

module.exports=router