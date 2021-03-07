import mongoose from 'mongoose'

const Schema =mongoose.Schema;

const userSchema=new Schema({  
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps=true,
});

module.exports=mongoose.model('User',userSchema);

