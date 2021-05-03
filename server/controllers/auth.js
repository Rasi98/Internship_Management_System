import User from '../models/user.js';
import ErrorResponse from '../utils/errorResponse.js'

export async function login(req, res, next) {
    const { username, password } = req.body;
  
    // Check if email and password is provided
    if (!username || !password) {
      return next(new ErrorResponse("Please provide an username and password", 400));
    }
  
    try {
      // Check that user exists by email
      const user = await User.findOne({ username }).select("+password");
  
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
  
      // Check that password match
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        res.status(404).json({success:false,error:"Invalide credentials"})
      }
  
      sendToken(user,200,res);

    } catch (err) {
      res.status(500).json({success:false,error:err.message})
    }
  }

  // Register user
export async function register(req, res, next){
    const { username, password } = req.body;
  
    try {
      const user = await User.create({
        username,
        password,
      });

    sendToken(user,201,res);
  
    } catch (error) {
      next(error)
    }
  };

  const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };