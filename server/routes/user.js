import express from 'express'
import {getUsers,createUsers} from '../controllers/user.js'
const userRouter=express.Router();

userRouter.get('/',getUsers);
userRouter.post('/',createUsers);

export default userRouter;