const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captaincontroller = require('../controllers/captaincontroller');
const middleware = require('../middleware/usermiddleware.js');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Invalid password'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long '),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long '),
    body('vehicle.Plate').isLength({min:3}).withMessage('Plate must be at least 3 characters long '),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicletype').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type ')
],captaincontroller.captainregister);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Invalid password'),
],captaincontroller.captainlogin)

router.get('/profile',middleware.captainauth,captaincontroller.getcaptainprofile)

router.get('/logout',middleware.captainauth,captaincontroller.logoutcaptain)

module.exports = router;