import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 600,
  });
};


const User=mongoose.model("User", userSchema);
 export default User;