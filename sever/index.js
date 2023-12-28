const express=require('express');

const app=express();


const cors=require('cors');

const jwt=require('jsonwebtoken');

const mongoose=require('mongoose');

app.use(cors);

app.use(express.json());

require('dotenv').config();

mongoose.connect(url).then(()=>{
    console.log('Mongoose connected successfully');
}).catch((error)=>{
    console.log('error occured in connecting to database',error)
});

const port=process.env.PORT || 3000;

const userRoutes=require('./api/routes/userRoutes');

const cartRoutes=require('./api/routes/cartRoutes');

const menuRoutes=require('./api/routes/menuRoutes');


app.use('/users',userRoutes);
app.use('/carts',cartRoutes);
app.use('/menus',menuRoutes);

app.post('/jwt',(req,res)=>{
    const user=req.body;
    const token= jwt.sign(user,process.env.ACCESS_POINT,{
        expiresIn:'1hr'
    });
    res.send({token});
})

app.listen(port,console.log('server is running'));