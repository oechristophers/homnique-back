const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    caseId: { type: String, required: true, unique: true },
    reportName: { type: String, required: true },
    reportType: { type: String, enum: ['Placement', 'Young Person', 'Staff Performance', 'Incident Investigation'], required: true },
    staffName: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;

