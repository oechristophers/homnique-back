const user = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const verifyOtpController = async (req, res) =>{
    const { email, otp } = req.body;

    try {
        //Find user by email
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            })
        }

        //check if OTP is valid
        if(!user.otp || user.otpExpires < Date.now() || user.otp !==otp){
            return res.status(400).json({
                message: 'Invalid or expired OTP',
                error: true,
                success: false
            })
        }
        console.log(`OTP verified for email: ${email}`); // Log successful verification

        res.status(200).json({
            message: 'OTP verified successfully. You can reset your password now!',
            error: false,

            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        })
    }
}

module.exports = verifyOtpController;