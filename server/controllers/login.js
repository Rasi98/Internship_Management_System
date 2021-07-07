import studentLogin from "../models/student.js";
import itaLogin from "../models/ita.js";
import itaaLogin from "../models/itaa.js";
import bcrypt from "bcrypt";
import AdminModel from "../models/itpc.js"
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config();

const Login = async (req, res) => {
  let user;
  console.log(req.body);
  try {
  const { username, password,role } = req.body;
    console.log(role)
    if(role==="itpc"){
    user = await AdminModel.findOne({username: username})
    }
    if(role==="itaa"){
      user = await itaaLogin.findOne({username: username})
    }
    if(role==="ita"){
      user = await itaLogin.findOne({username: username})
    }
    if(role==="student"){
      user = await studentLogin.findOne({username: username})
    }
    console.log(user)
    if (!username || !password) {
      return res.json({
        status: 403,
        msg: "Username or Password fields are empty",
      });
    } else if (!user) {
      return res.json({ status: 403, msg: "Invalid Username" });
    }

    // const validate = await bcrypt.compare(password, user.password);

    if (password!==user.password) {
      return res.json({ status: 403, msg: "Invalid Password!" });
    } else{
      //Set Token
      const token = jwt.sign({_id : user._id, email: user.email,role:user.role},  process.env.jwtKey)
      //Response
      res.status(200)
          .header('x-auth-token', token)
          .json({
            jwt: token,
            msg: 'success'
          })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default Login;
