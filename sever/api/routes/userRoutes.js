const express=require('express');


const router=express.Router();

const userController=require('../controllers/userControllers');
const verifyToken=require('../middleware/verifyToken');
const verifyAdmin=require('../middleware/verifyAdmin')

router.get("/",verifyToken,verifyAdmin,userController.getAllUsers);

router.post('/',userController.createUser);

router.delete('/:id',verifyToken,verifyAdmin,userController.deleteUser);

router.get('/admain/:email',verifyToken,userController.getAdmin);

router.put('/admain/:id',verifyToken,verifyAdmin,userController.makeAdmin);


module.exports=router;