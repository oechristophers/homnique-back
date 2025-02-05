const StaffProfile = require("../../models/StaffProfileModel");

const getSingleStaffProfileController=  async (req, res) => {
    try {
      const profile = await StaffProfile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = getSingleStaffProfileController;
  