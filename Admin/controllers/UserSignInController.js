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

        res.status(201).json({ 
            token: token,
            message: 'Successfully logged In',
            error: false,
            success: true
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