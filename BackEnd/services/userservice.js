const userModel = require('../models/usermodel');

module.exports.createUser = async ({firstname, lastname, email, password})=>{
    if(!firstname || !email || !password){
        throw new Error ("All fields  must be provided")
    }
    const user = userModel.create({
        fullname:{
            firstname,lastname
        },email,password
    })
    return user
}