const captainModel = require('../models/captainmodel');
const captainService = require('../services/captainservice');
const {validationResult} = require('express-validator');

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