const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captain = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String,
            required : true,
            minlength : [3,'First Name must be at least 3 characters']
        },
        lastname:{
            type : String,
            minlength : [3,'First Name must be at least 3 characters']
        }
    },
    email:{
        type : String,
        required : true,
        undefined : true,
        lowercase : true,
        match : [/^[a-zA-Z]+$/,'Please enter a valid email address']
    },
    password:{
        type : String,
        required : true,
        select : false,
    },
    socketId: {
        type : String,
    },
    status: {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inaactive',
    },
    vehicle: {
        color:{
            type : String,
            required : true,
            minlength :[3,'color must be at least 3 characters']
        },
        plate : {
            type : String,
            required : true,
            minlength :[3,'Plate must be at least 3 characters']
        },
        capacity: {
            type : String,
            required : true,
            min : [1,'capacity must be at least 1'],
        },
        vehicleType: {
            type : String,
            required : true,
            enum : ['car','motorcycle','auto']
        }
    },
    location :{
        lat :{
            type : Number
        },
        long :{
            type :Number
        }
    }
})

// methods for captain
captain.methods.generateAuth = function () {
    const token = jwt.sign({_id : this._id},process.env.JWT_SECRET_KEY,{expiresIn : '24h'})
    return token;
}

captain.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password,this.password);
}

captain.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10)
}

const captainModel = mongoose.model('captain',captain);
module.exports = captainModel;