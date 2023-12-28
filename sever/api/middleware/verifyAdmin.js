const User=require('../models/User');


const verifyAdmin=async(req,res,next)=>{
    const email=req.decoded.email;
    const query={email:email};

    const isAdmin=await User.findOne(query);
    if(!isAdmin){
        return res.status(401).send({message:'forbidden access'});
    }
    next();
}

module.exports=verifyAdmin;