import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config();

const app =express();
app.use(cors());
app.use(express.json());


import companyRouter from './routes/company.js'
import authRouter from './routes/auth.js'
import errorHandler from './middleware/error.js'
app.use('/company',companyRouter);
app.use('/api/auth',authRouter);

//Error handler middleware(should be the last one)
app.use(errorHandler);

const port=process.env.port||5000;
const uri='mongodb+srv://Rasingolla1998:Rasingolla1998@internshipdata.cshfe.mongodb.net/company?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
    .then(()=>app.listen(port,()=>console.log('Server is running successfuly')))
    .catch((error)=>console.log(error.message));


