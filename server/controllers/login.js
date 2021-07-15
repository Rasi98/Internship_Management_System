import studentLogin from "../models/student.js";
import itaLogin from "../models/ita.js";
import itaaLogin from "../models/itaa.js";
import AdminModel from "../models/itpc.js"
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config();

const Login = async (req, res) => {
  let user;
  try {
    const {username, password, role} = req.body;
    console.log(req.body)
    if (!username || !password) {
      return res.json({
        status: 403,
        msg: "Username or Password fields are empty",
      })
    }
    else {
      if (role === "itpc") {
        user = await AdminModel.findOne({username: username})
      } else if (role === "itaa") {
        user = await itaaLogin.findOne({username: username})
      } else if (role === "ita") {
        user = await itaLogin.findOne({username: username})
      } else if (role === "student") {
        user = await studentLogin.findOne({username: username})
      }
    }
    console.log(user);
    if (!user) {
      return res.json({status: 403, msg: "Invalid User or Usertype"});
    }
    else if(password !== user.password) {
        return res.json({status: 403, msg: "Incorrect Password!"});
    }
    else if(username===user.username && password===user.password) {
        //Set Token
        const token = jwt.sign({_id: user._id,role:user.role,name:user.name}, process.env.jwtKey)
        //Response
        return res.json({status:200, jwt: token, msg: 'success'})
      }
    }

    catch(error)
    {
      console.log(error);
    }

};

export default Login;
