const ReportModel = require('../../models/ReportModel');

const createReportController = async (req, res) => {
    try {
        const { caseId, reportName, reportType, staffName } = req.body;

        // Validate required fields
        if (!caseId || !reportName || !reportType || !staffName) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                error: true
            });
        }

        // Create new report
        const newReport = new ReportModel({
            caseId,
            reportName,
            reportType,
            staffName
        });

        const savedReport = await newReport.save();

        res.status(201).json({
            success: true,
            message: 'Report created successfully',
            data: savedReport
        });

    } catch (error) {
        if (error.code === 11000) { // Duplicate caseId error
            return res.status(400).json({
                success: false,
                message: 'Case ID already exists',
                error: true
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
            error: true
        });
    }
};

module.exports= createReportController;