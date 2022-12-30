const express = require('express');
const router = express();
const userAuth = require('../middleware/auth');


//Login & Register Router
const authenticationController = require('../controller/authentication/authenticationController');
router.use('/register',authenticationController.register)
router.use('/login',authenticationController.login)
router.use('/verify-otp',authenticationController.verifyOtp)
router.use('/update-profile',authenticationController.updateProfile);


router.use('/login-with-google',authenticationController.loginWithGoogle);


module.exports = router;