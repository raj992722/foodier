const Cart=require('../models/Carts');


const getCartByEmail=async(req,res)=>{
    const email=req.query.email;
    const query={email:email};

    try {
        const result=await Cart.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({message:error.message})
    }

};


const addToCart=async(req,res)=>{
    const {price,menuItemId,quantity,name,email,recipe,image}=req.body;
    try {
        const existingCart=await Cart.findOne({menuItemId,email});
        if(existingCart){
            return res.status(400).json({message:'Product already exist in the cart'});
        }
        const result=await Cart.create({price,menuItemId,quantity,name,email,recipe,image});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

const deleteCart=async(req,res)=>{
    const cartId=req.params.id;
    try {
       const deletecart=await Cart.findByIdAndDelete(cartId);
       if(!deletecart){
        return res.status(401).json({message:'Item does not exist'});
       } 
       res.status(200).json({message:'Item deleted successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const updateCart=async(req,res)=>{
    const cartId=req.params.id;
    const {price,name,email,quantity,recipe,image,menuItemId}=req.body;
    try {
        const item=await Cart.findByIdAndUpdate(cartId,{
            price,email,quantity,name,menuItemId,recipe,image
        },{new:true,runValidators:true});
        if(!item){
            return res.status(401).json({message:'item does not exist'})
        }
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const singleCart=async (req,res)=>{
    const cartId=req.params.id;
    try {
        const item=await Cart.findById(cartId);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={
    getCartByEmail,
    updateCart,
    deleteCart,
    addToCart,
    singleCart
}