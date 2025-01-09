const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true } // Placement Worker, Key Worker, etc.
});

module.exports = mongoose.model('Staff', StaffSchema);
