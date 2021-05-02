import React, { Component } from 'react';
import {Grid,Paper,Avatar,TextField,Button} from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


const paperStyle={padding :20,height:'70vh',width:800, margin:"20px auto"}
const avatarStyle={backgroundColor:'#3498DB'}
const btnstyle={margin:'30px 0'}

class login extends Component {
   
    render() { 
        return (  
           <Grid>
               <Paper elevation={5} style={paperStyle}>
               <Grid align='center'>
                     <Avatar style={avatarStyle}>< AccountCircleRoundedIcon/></Avatar>
                    <h2 style={{padding:"10px",fontFamily:'inherit'}}>Sign In</h2>
                </Grid>
                <TextField margin='normal' size='small' variant='outlined' label='Username' placeholder='Enter username' fullWidth required/>
                <TextField margin='normal' size='small' variant='outlined' label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
               </Paper>
           </Grid>
        );
    }
}
 
export default login;
