import LoginuserModel from "../models/user.js";
import bcrypt from "bcrypt";

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await LoginuserModel.findOne({
      username: username,
    });

    if (!username || !password) {
      return res.json({
        status: 403,
        msg: "Username or Password fields are empty",
      });
    } else if (!user) {
      return res.json({ status: 403, msg: "Invalid Username" });
    }

    const validate = await bcrypt.compare(password, user.password);

    if (!validate) {
      return res.json({ status: 403, msg: "Invalid Password!" });
    } else if (validate) {
      //check role ->
      if (user.role == "admin")
        return res.json({ status: 200, msg: "successadmin" });
      else if (user.role == "student")
        return res.json({ status: 200, msg: "successstudent" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default Login;
