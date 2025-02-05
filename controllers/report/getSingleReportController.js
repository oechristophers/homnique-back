const ReportModel = require('../../models/ReportModel');
// Get single report by ID
const getReportById = async (req, res) => {
    try {
        const report = await ReportModel.findById(req.params.id);
        
        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Report fetched successfully',
            data: report
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: true
        });
    }
};

module.exports= getReportById;