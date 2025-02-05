// 2. Fetch Report Types
const Report = require('../../models/ReportModel');

const getReportType =  async (req, res) => {
    try {
        const reportTypes = ['Placement', 'Young Person', 'Staff Performance', 'Incident Investigation'];

        res.status(200).json({
            success: true,
            data: reportTypes,
            message: 'Report types fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching report types',
            error: error.message
        });
    }
};

module.exports= getReportType;