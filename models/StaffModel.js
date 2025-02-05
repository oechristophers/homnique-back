const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true } // Placement Worker, Key Worker, etc.
});

const StaffModel = mongoose.model('Staff', StaffSchema);
module.exports= StaffModel;