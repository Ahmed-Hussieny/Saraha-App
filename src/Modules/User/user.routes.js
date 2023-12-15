
import * as userController from './user.controller.js' 

import expressAsyncHandler from "express-async-handler";
import { Router } from "express";
const userRoute = Router();
userRoute.post('/signIn',expressAsyncHandler(userController.signIn))
userRoute.post('/addUser',expressAsyncHandler(userController.addUser))
userRoute.put('/updateUser',expressAsyncHandler(userController.updateUser))
userRoute.delete('/deleteuser',expressAsyncHandler(userController.deleteuser))
userRoute.get('/getUserData/:_id',expressAsyncHandler(userController.getUserData))


export default userRoute;