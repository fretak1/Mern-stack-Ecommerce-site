const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/user')



//register
const registerUser = async(req,res) => {
    const {userName,email,password} = req.body;

    try {
        
        const checkUser = await User.findOne({email});
        if(checkUser) return res.json({
        success:false ,message:'the email allready registered try with another email'});

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
        userName,
        email,
        password:hashPassword,
      });
       
      await newUser.save();

       res.status(200).json({
           success:true,
           message:"You are succesfuly registerd",
        })
    } catch(e) {
        console.log(e);
        res.status(500).json({
           succes:false,
           message:"something error ocured",

        })
    }
};


//login
const loginUser = async(req,res) => {
    const {email,password} = req.body;

    try {
        const checkUser = await User.findOne({email});
        if(!checkUser) return res.json({
        success:false ,message:"user doesn't exist please register first"});

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if(!checkPasswordMatch) return res.json({
        success:false ,message:"incorrect password pelease try again"});

        const token = jwt.sign({
            id : checkUser._id, 
            role : checkUser.role,
            email : checkUser.email,
            userName : checkUser.userName,
        },'CLIENT_SECRET_KEY',{expiresIn : '60m'})

        res.cookie('token',token, {httpOnly:true, secure:false}).json({
            success:true,
            message:"Logged in successfully",
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id,
                userName : checkUser.userName,

            }
        })

    } catch(e) {
        console.log(e);
        res.status(500).json({
           success:false,
           message:"something error ocured",
        })
    }
}

// Log out
const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success:true,
        message: "Logged out succesfully"
    })
}



//Middleware
const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success:false,
        message: "unauthorized user!"
    })

    try {
        const decoded = jwt.verify(token,'CLIENT_SECRET_KEY')
        req.user = decoded;
        next();
    } catch(error) {
        res.status(401).json({
           success:false,
           message: "unauthorized user!"
        })
    }
}






module.exports = { registerUser,loginUser,logoutUser,authMiddleware };

