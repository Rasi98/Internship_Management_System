import express from 'express'
const authRouter=express.Router();
import {login,register} from '../controllers/auth.js'

authRouter.post('/login',login);
authRouter.post('/register',register);

export default authRouter;