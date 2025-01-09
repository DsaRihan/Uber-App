const userModel = require('../models/usermodel');
const userService  = require('../services/userservice');
const {validationResult} = require("express-validator");
const blacklistToken = require('../models/blacklisttokens');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;
    const useraleadyexists = await userModel.findOne({ email });
    if(useraleadyexists){
        res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword =  await userModel.hashPassword(password);

    const user = await userService.createUser({firstname:fullname.firstname,
         lastname:fullname.lastname, email, password:hashedPassword});

    const token = user.generateAuthToken();
    res.status(200).json({token: token,user : user});
};

module.exports.loginUser = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    // to check if the user exixst 
    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user) {
        res.status(401).json({message:"Invalid user"});
    }

    const isMatch = await user.comparePasswords(password);
    if(!isMatch) {
        res.status(401).json({message : "Invalid password"});
    }

    const token = await user.generateAuthToken();
    res.status(200).json({token,user});
}

module.exports.getuserprofile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutuser = async (req, res, next) =>{
    res.clearCookie('token');
    
    const token = res.cookie.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token});

    res.status(200).json({message: "User logged out"});
}


