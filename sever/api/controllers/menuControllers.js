const Menu=require('../models/Menu');


const getAllMenuItems=async(req,res)=>{
    try {
        const items=await Menu.find({}).sort({createdAt:-1});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send({message:error.message
        })
    }
};

const postMenuItem=async(req,res)=>{
    const newItem=req.body;
    try {
        const result=await Menu.create(newItem);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteMenuItem=async(req,res)=>{
    const id=req.params.id;
    try {
        const item=await Menu.findByIdAndDelete(id);
        if(!item){
            return res.status(400).json({message:"Item not found "});
        }
        res.status(200).json({message:'Item deleted successfully'});
        
    } catch (error) {
      res.status(500).json({message:error.message});  
    }
}


const singleMenuItem=async(req,res)=>{
    const id=req.params.id;
    try {
        const item=await Menu.findById(id);
        if(!item){
            return res.status(401).json({message:'No item found with given id'});
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({message:error.message})
    }

};


const updateMenuItem=async(req,res)=>{
    const id=req.params.id;
    const {name,recipe,category,price,image}=req.body;
    try {
       
        const item=await Menu.findByIdAndUpdate(id,{name,recipe,category,price,image},{new:true,runValidators:true})
        if(!item){
            return res.status(401).json({message:'Item does not exist'});
        }
        res.status(200).json(item);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={
    getAllMenuItems,
    updateMenuItem,
    singleMenuItem,
    deleteMenuItem,
    postMenuItem
}