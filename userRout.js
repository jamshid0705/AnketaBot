const express=require('express')
const userController=require('./userController')
const userRouter=express.Router()

userRouter.route('/').get(userController.getAllUser)

module.exports=userRouter