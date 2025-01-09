const express = require("express")

const generateUserCredentials = require("../controllers/UserController");
const UserSignInController = require("../controllers/UserSignInController");
const router = express.Router();
const forgetPasswordController = require("../controllers/forgetPassword");
const resetPasswordController = require("../controllers/resetPasswordController");
const verifyOtpController = require("../controllers/verifyOtpController");

router.post('/signIn',  UserSignInController);
router.post('/create',  generateUserCredentials);
router.post('/resetPassword',  resetPasswordController);
router.post('/forgetPassword',  forgetPasswordController);
router.post ('/verifyOtp',  verifyOtpController);

module.exports = router;