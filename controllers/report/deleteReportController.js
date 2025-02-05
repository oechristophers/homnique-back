const ReportModel = require('../../models/ReportModel');

// Delete report
const deleteReportController = async (req, res) => {
    try {
        const deletedReport = await ReportModel.findByIdAndDelete(req.params.id);

        if (!deletedReport) {
            return res.status(404).json({
                success: false,
                message: 'Report not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Report deleted successfully',
            data: deletedReport
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: true
        });
    }
};

module.exports = deleteReportController;
