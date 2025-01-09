const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSignUpController = async(req, res) =>{
    try {
        const { firstName, lastName, email, password, role} = req.body;
        if(!firstName){
            throw new Error("First name is required")
        };
        if(!lastName){
            throw new Error("Last name is required")
        };
        if(!email){
            throw new Error("Email is required")
        };
        if(!password){
            throw new Error("Password is required")
        };
        if(!role){
            throw new Error("Role is required")
        };

        //Hash a password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if(!hashedPassword){
            throw new Error("Password hashing failed")
        };

        //check for existing user
        const userExists = await UserModel.findOne({email: email});
        if(userExists){
            return res.status(409).json({ message: "Email already exist"})
        }

        const payload = {
            ...req.body,
            password: hashedPassword
        };

        //create new user
        const userData = new UserModel(payload);
        await userData.save();

        //Generate JWT token
        const token = jwt.sign({userId: userData._id }, process.env.APP_SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(201).json({
            token: token,
            message: "Successfully sign up",
            data: userData
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = UserSignUpController;