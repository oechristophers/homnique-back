const UserModel = require('../models/UserModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const forgetPasswordController = async(req, res)=>{
    const {email}= req.body;
    try {
        //check if user exists
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            })
        }

        //Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log(`Generated OTP: ${otp} for email: ${email}`); // Debugging log

        //Set OTP and expiration time (e.g, 10mins from now)
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; //10 minutes from now
        await user.save();
        console.log(`Sending OTP to ${email}`); // Log before sending email

        //Send OTP via email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        })

        const mailOptions = {
            From: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. it will expires in 10 minutes`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: 'OTP successfully sent to email',
            error: false,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false})
    }
}

module.exports = forgetPasswordController;