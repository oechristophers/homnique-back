const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSignInController = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username: username });
        if(!user){
            return res.status(404).json({
                message: 'Username not found',
                error: true,
                success: false
            })
        };
 
        // Check if the provided password matches the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid password',
                error: true,
                success: false
            })
        };

        const token = jwt.sign({ userId: user.userId, username: user.username, role: user.role }, process.env.APP_SECRET_KEY, {
            expiresIn: '1h',
        });

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        // Set user role in another cookie (optional but useful for middleware)
        res.cookie('user-role', user.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
        });


        res.status(201).json({ 
            token: token,
            message: 'Successfully logged In',
            error: false,
            success: true,
            username: user.username,
            role: user.role
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = UserSignInController;