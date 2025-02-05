const ReportModel = require('../../models/ReportModel');


const getReports = async (req, res) => {
  try {
      const { 
          fromDate, 
          toDate, 
          reportType, 
          staffName, 
          caseId 
      } = req.query;

      const filters = {};

      // Add filters if they exist in query
      if (fromDate && toDate) {
          filters.dateCreated = {
              $gte: new Date(fromDate),
              $lte: new Date(toDate)
          };
      }

      if (reportType) {
          filters.reportType = reportType;
      }

      if (staffName) {
          filters.staffName = staffName;
      }

      if (caseId) {
          filters.caseId = caseId;
      }

      const reports = await ReportModel.find(filters).sort({ dateCreated: -1 });

      res.status(200).json({
          success: true,
          message: 'Reports fetched successfully',
          data: reports
      });

  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message,
          error: true
      });
  }
};

module.exports =  getReports ;


