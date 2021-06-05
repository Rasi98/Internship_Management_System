import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import companyRouter from "./routes/company.js";
import userRouter from "./routes/user.js";
import loginRouter from "./routes/login.js";
import studentRouter from "./routes/usercontrol/studentcontrol.js";
import itpcRouter from "./routes/usercontrol/itpccontrol.js";
import itaaRouter from "./routes/usercontrol/itaacontrol.js";
import itaRouter from "./routes/usercontrol/itacontrol.js";
import hrmRouter from "./routes/usercontrol/hrm.js";
import stu_profile_router from "./routes/StudentRoutes/profile.js";

app.use("/company", companyRouter);
app.use("/user", userRouter);
app.use("/", loginRouter);
app.use("/student", studentRouter);
app.use("/itpc", itpcRouter);
app.use("/itaa", itaaRouter);
app.use("/ita", itaRouter);
app.use("/hrm", hrmRouter);
app.use("/studentprofile", stu_profile_router);

const port = process.env.port || 5000;
const uri =
  "mongodb+srv://Rasingolla1998:Rasingolla1998@internshipdata.cshfe.mongodb.net/company?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log("Server is running successfuly"))
  )
  .catch((error) => console.log(error.message));
