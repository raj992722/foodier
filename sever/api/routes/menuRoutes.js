const express=require('express');

const router=express.Router();


const menuControllers=require('../controllers/menuControllers');

const verifyToken=require('../middleware/verifyToken');

router.get('/',menuControllers.getAllMenuItems);

router.post('/',menuControllers.postMenuItem);

router.delete('/:id',menuControllers.deleteMenuItem);

router.get('/:id',menuControllers.singleMenuItem);

router.put("/:id",menuControllers.updateMenuItem);


module.exports=router;