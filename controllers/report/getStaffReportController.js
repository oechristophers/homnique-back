const StaffModel = require('../../models/StaffModel');

const getStaffReport= async (req, res) => {
    try {
        const staffList = await StaffModel.find({}, 'name role'); // Fetch only name and role fields

        res.status(200).json({
            success: true,
            data: staffList,
            message: 'Staff list fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching staff list',
            error: error.message
        });
    }
};
module.exports= getStaffReport;