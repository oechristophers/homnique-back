const StaffProfile = require("../../models/StaffProfileModel");

const getAllStaffProfileController= async (req, res) => {
    try {
      const profiles = await StaffProfile.find();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
module.exports = getAllStaffProfileController;
  