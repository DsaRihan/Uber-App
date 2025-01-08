const expressset = require('express');
const router = express.Router();
const {body} = require('express-validator');
const usercontrol = require('../controllers/usercontroller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Invalid password'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long '),
],usercontrol.registerUser)

module.exports = router;