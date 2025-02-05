const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const UserSignInController = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username: username });
        
        if (!user) {
            return res.status(404).json({
                message: 'Username not found',
                error: true,
                success: false
            });
        }

        // Log for debugging: Checking user details
        console.log('Stored password hash:', user.password);
        console.log('Provided password:', password);

        // Check if the provided password matches the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Result:", isMatch); // Debugging log

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid password',
                error: true,
                success: false
            });
        }

        // Log for debugging: Token generation
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.APP_SECRET_KEY,
            { expiresIn: '1h' }
        );
        console.log("Generated JWT token:", token); // Debugging log

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: false, // Only send over HTTPS in production
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        // Set user role in another cookie (optional but useful for middleware)
        res.cookie('user-role', user.role, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({ 
            token: token,
            message: 'Successfully logged In',
            error: false,
            success: true,
            username: user.username,
            role: user.role,
            user,
        });

    } catch (error) {
        console.error(`Error during sign-in: ${error.message}`);
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = UserSignInController