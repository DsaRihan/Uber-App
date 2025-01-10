const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklisted = require('../models/blacklisttokens');
const captainModel = require('../models/captainmodel');

module.exports.authuser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorisation?.split(' ')[1];
    if (!token) {
        return res.staus(401).json({menubar: 'UnAuthorized'});
    }

    // to check if token is blacklisted
    const isblacklisted = await blacklisted.findOne({token: token});
    if (isblacklisted) {
        return res.staus(401).json({menubar: 'UnAuthorized'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    }
    catch(err) {
        return res.staus(401).json({message: 'UnAuthorized'});
    }

}

module.exports.captainauth = async (req, res) => {
    const token = req.cookies.token || req.headers.authorisation?.split(' ')[1];
    if (!token) {
        return res.staus(401).json({menubar: 'UnAuthorized'});
    }

    // to check if token is blacklisted
    const isblacklisted = await blacklisted.findOne({token: token});
    if (isblacklisted) {
        return res.staus(401).json({menubar: 'UnAuthorized'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await captainModel.findById(decoded._id);

        req.user = user;
        return next();
    }
    catch(err) {
        return res.staus(401).json({message: 'UnAuthorized'});
    }
};

