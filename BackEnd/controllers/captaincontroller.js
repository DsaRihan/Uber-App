const captainModel = require('../models/captainmodel');
const captainService = require('../services/captainservice');
const {validationResult} = require('express-validator');
const blacklistToken = require('../models/blacklisttokens');


module.exports.captainregister = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        res.status(400).json({error: error.array()});
    }

    const {fullname, email, password, vehicle} = req.body;

    // if the email already exists
    const iscaptainalreadyexists = await captainModel.findOne({email});
    if(iscaptainalreadyexists){
        return res.status(400).json({Message:'Captain Already exists'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicletype: vehicle.vehicletype,
    })

    const token = captain.generateAuth();
    res.status(201).json({ token,captain})
}

module.exports.captainlogin = async(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        res.status(400).json({error: error.array()});
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:'Invalid email or password'})
    }

    const isMatch = await captain.comparePasswords(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'})
    }
    const token = captain.generateAuth();
    res.cookie('token',token)
}

module.exports.getcaptainprofile = async (req, res) => {
    res.status(200).json({captain: req.captain});
}

module.exports.logoutcaptain = async (req, res) => {
    const token = res.cookie.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token});

    res.clearCookie('token');

    res.status(200).json({message:"Lofout Succesful"})
}