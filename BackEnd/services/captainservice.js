const captainModel = require('../models/captainmodel');

module.exports.createCaptain = async ({firstname, lastname, email, password, color,plate,capacity,vehicleType})=>{
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity){
        throw new Error("All fields must be provided")
    }
    const captain = captainModel.create({
        fullname: {
            firstname,lastname
        },
        email,password,
        vehicle:{
            color,capacity,vehicleType,plate
        }
    })
    return captain
}