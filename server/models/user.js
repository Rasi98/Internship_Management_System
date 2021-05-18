import mongoose from 'mongoose'

const Schema =mongoose.Schema;

const userSchema=new Schema({  
    username: {
        type: String,
        required: [true, "Please provide username"],
      },
      password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: 6,
        select: false,
      }
});


const User=mongoose.model("User", userSchema);
 export default User;