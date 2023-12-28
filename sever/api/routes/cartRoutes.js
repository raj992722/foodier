const express=require('express');

const router=express.Router();

const cartController=require('../controllers/cartControllers');

const verifyToken=require('../middleware/verifyToken');


router.get('/',verifyToken,cartController.getCartByEmail);

router.post('/',cartController.addToCart);

router.delete('/:id',cartController.deleteCart);

router.put('/:id',cartController.updateCart);

router.get('/:id',cartController.singleCart);


module.exports=router;