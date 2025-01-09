const expressset = require('express');
const router = express.Router();
const {body} = require('express-validator');
const usercontrol = require('../controllers/usercontroller');
const authmiddle = require('../middleware/usermiddleware');

// register user
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Invalid password'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long '),
],usercontrol.registerUser)

// login user
router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Invalid password'),
],usercontrol.loginUser)

// profile
router.get('/profile', authmiddle.authuser,usercontrol.getuserprofile)

// logout user
router.get('/logout', authmiddle.authuser,usercontrol.logoutuser);

module.exports = router;