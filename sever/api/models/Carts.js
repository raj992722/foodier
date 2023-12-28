const mongoose=require('mongoose');

const {Schema}=mongoose;

const cartSchema=new Schema({
    menuItemId:String,
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3
    },
    recipe:String,
    price:Number,
    quantity:Number,
    image:String,
    email:{
        type:String,
        required:true
    }
});

const Carts=mongoose.model('Cart',cartSchema);

module.exports=Carts;