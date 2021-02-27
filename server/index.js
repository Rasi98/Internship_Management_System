import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRoute from './routes/user.js'

const app =express();
app.use(cors());
app.use(express.json());

app.use('/users',usersRoute);

const port=process.env.port||5000;
const uri='mongodb+srv://Rasingolla1998:Rasingolla1998@internshipdata.cshfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
    .then(()=>app.listen(port,()=>console.log('Server is running successfuly')))
    .catch((error)=>console.log(error.message));


