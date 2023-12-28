const User=require('../models/User');



const getAllUsers=async(req,res)=>{
    try {
        const allUsers=await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const createUser=async(req,res)=>{
    const user=req.body;
    const query={email:user.email};
    try {
        const existingUser=await User.findOne(query);
        if(existingUser){
            return res.status(400).json({message:'User already exist'});
        }  
        const newuser=await User.create(user);
        res.status(201).json(newuser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try {
       const deleteID=await User.findByIdAndDelete(id);
       if(!deleteID){
        return res.status(402).send('User does not exist');
       } 
       res.status(200).json({message:'User deleted successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const getAdmin=async(req,res)=>{
    const email=req.params.email;
    const query={email:email};

    try {
        const user=await User.findOne(query);
        if(email!==req.decoded.email){
            return res.status(400).json({message:'Forbidden access'});
        }
        let admin=false;
        if(user){
            admin=user?.role==='admin';
        }
        res.status(200).json({admin});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}

const makeAdmin=async(req,res)=>{
    const id=req.params.id;
    const {name,photoURL,role,email}=req.body;

    try {
        const updateUserRole=await User.findByIdAndUpdate(id,{role:'Admin'},{new:true,runValidators:true});
        if(!updateUserRole){
            return res.status(400).json({message:'User not found'})
        }
        res.status(201).json(updateUserRole);
    } catch (error) {
        res.status(500).json({message:error.message});

    }
}

module.exports={
    makeAdmin,
    getAdmin,
    getAllUsers,
    deleteUser,
    createUser
}