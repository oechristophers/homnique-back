const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    caseID: { type: String, required: true },
    reportName: { type: String, required: true },
    reportType: { type: String, required: true }, 
    staff: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Report', ReportSchema);
