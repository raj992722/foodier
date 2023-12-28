const jwt=require('jsonwebtoken');



require('dotenv').config();


const verifyToken=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message:'unauthorized access'})
    }
    const token=req.headers.authorization.split(' ')[1];

    jwt.verify(token,process.env.ACCESS_POINT,(error,decoded)=>{

        if(error){
            return res.status(401).send({message:'invalid token'});
        }
        req.decoded=decoded;
        next();
    })
}

module.exports=verifyToken;