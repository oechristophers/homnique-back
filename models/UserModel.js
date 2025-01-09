const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true },
    username: { type: String, unique: true },
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