import LoginuserModel from "../models/user.js";
import bcrypt from "bcrypt";

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await LoginuserModel.findOne({ username: username });

    if (username == "" || password == "") {
      return res.json({
        status: 403,
        msg: "Username or Password fields are empty",
      });
    }

    if (!admin) {
      return res.json({ status: 403, msg: "Invalid Username" });
    }

    const validate = await bcrypt.compare(password, admin.password);

    if (validate) {
      return res.json({ status: 200, msg: "Login Success!" });
    }
    if (!validate) return res.json({ status: 403, msg: "Invalid Password!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default adminLogin;
