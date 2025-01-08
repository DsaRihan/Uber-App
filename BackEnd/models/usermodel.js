const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// user model
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : 'string',
            required: true,
            minlenght :[3,'first name must be atleast 3 characters long']
        },
        lastname:{
            type : 'string',
            minlenght :[3,'last name must be atleast 3 characters long']
        }
    },
    email:{
        type : 'string',
        required: true,
        minlenght :[5,'first name must be atleast 5 characters long']
    },
    passwords:{
        type : 'string',
        required: true,
        select : false
    },
    socketid:{
        type : 'string',
    }

});
// to create a new token 
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY)
    return token
}

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10)
}

const User = mongoose.model('User', userSchema);
module.exports = User;
