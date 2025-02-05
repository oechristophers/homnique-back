const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true },
    profileImage: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String,},
    email: {type: String, unique: true, required: true },
    password: {type: String, required: true },
    role: {
        type: String,
        enum: ['Admin', 'KeyWorker', 'PlacementStaff'],
        required: true
    },
    otp: {type: String},
    otpExpires: {type: Date},
    createdAt: {type: Date, default: Date.now},
});
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;