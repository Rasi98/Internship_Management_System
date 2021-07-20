import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import imlogo from "../resources/imlogo.png";
import { useForm } from "react-hook-form";
import validator from "validator";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {Form} from "react-bootstrap";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        href="https://science.kln.ac.lk/depts/im/"
      >
        Department of Industrial Management
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    Width: "auto",
    height: "auto",
    marginBottom: "5%",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
      // pdfgen()
    const validuname = validator.trim(data.username);
    const validData = {
      username: validuname,
      password: data.password,
        role:data.role,
    };
    axios.post("http://localhost:5000/login", validData)
        .then((res) => {
         console.log(res.data);
         const statuscode=res.data.status;
            console.log(statuscode);
            if(statuscode===200){
                localStorage.setItem("token", res.data.jwt);
                const role=jwtDecode(res.data.jwt).role;
                console.log(role);
                if(role==="itpc"){
                    history.push("/admin")
                }
                else if(role==="student"){
                    history.push("/student")
                }
                else if(role==="ita"){
                    history.push("/ita")
                }
                else if(role==="itaa"){
                    history.push("/itaa")
                }
                else {
                    history.push("/")
                }
            }
            else if(statuscode===403){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.msg,
                }).then(r => {})
            }
        })
        .catch((err)=>{
            console.log("Error:",err)
        })


  };

    // function pdfgen(){
    //     const obj={
    //         url:window.location.href
    //     }
    //     axios.post("http://localhost:5000/pdf/pdfgen",obj)
    //         .then((res)=>{
    //             console.log(res)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.logo} src={imlogo} alt="imlogo" />
        <Typography color="inherit" component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            {...register("username")}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            {...register("password")}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Role</Form.Label>
                <Form.Control
                    as="select"
                    {...register("role")}
                    required
                    variant="outlined"
                    margin="normal"
                    custom
                    id="role"
                    name="role"
                    style={{fontSize:"15px"}}
                >
                    <option value={"student"} selected>STUDENT</option>
                    <option value={"itpc"}>PLACEMENT COORDINATOR</option>
                    <option value={"itaa"}>ACADEMIC ADVISOR</option>
                    <option value={"ita"}>TRAINING ADVISOR</option>
                </Form.Control>
            </Form.Group>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;
