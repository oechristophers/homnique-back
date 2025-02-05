const ReportModel = require('../../models/ReportModel');

// Update report
const updateReportController = async (req, res) => {
    try {
        const { caseId, reportName, reportType, staffName } = req.body;
        const reportId = req.params.id;

        const updatedReport = await ReportModel.findByIdAndUpdate(
            reportId,
            {
                caseId,
                reportName,
                reportType,
                staffName
            },
            { new: true, runValidators: true }
        );

        if (!updatedReport) {
            return res.status(404).json({
                success: false,
                message: 'Report not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Report updated successfully',
            data: updatedReport
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: true
        });
    }
};

module.exports= updateReportController;