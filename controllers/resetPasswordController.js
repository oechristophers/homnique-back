const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");


const resetPasswordController = async (req, res)=> {
    try {
        const { otp, newPassword, confirmPassword }= req.body;
        if(newPassword !=confirmPassword){
            return  res.status(400).json({
                
                    message: "Passwords do not match",
                    error: true,
                    success: false
                
            })
        }
  

        const user = await UserModel.findOne({
            otp: otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                message: "Invalid or expired OTP", 
                error: true 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.otp = undefined; // Clear OTP
        user.otpExpires = undefined; // Clear OTP expiry
        await user.save();

        // res.status(200).json({ message: "Password reset successfully", error: false });

        // //Hash the new password
        // user.password = await bcrypt.hash(newPassword, 10);
        
        // //update the user's password and clear OTP fields
        // user.otp = null;
        // user.otpExpires = null;
        // user.password = newPassword
        // await user.save();
        console.log(`Password reset successfully for email: ${user.email}`);

        res.status(200).json({
            message: 'Password reset successfully',
            error: false,
            success: true})


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = resetPasswordController;